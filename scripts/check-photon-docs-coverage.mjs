#!/usr/bin/env node
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coveragePath = path.join(root, "docs/photon-docs-coverage.json");
const coverage = JSON.parse(await readFile(coveragePath, "utf8"));

const normalize = (value) => {
  const clean = value.split("#", 1)[0].replace(/\/+$/, "");
  return clean || "/";
};

const currentPaths = new Set();
try {
  const response = await fetch("https://photon.codes/docs/llms.txt", {
    headers: { "user-agent": "photon-skills-doc-coverage" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const index = await response.text();
  const links = index.matchAll(/https:\/\/photon\.codes(\/docs\/[^\s)\]"'<>]+)/g);
  for (const match of links) {
    const value = normalize(match[1]);
    if (!/\/docs\/llms(?:-[^/]+)?(?:-full)?\.txt$/.test(value)) currentPaths.add(value);
  }
} catch (error) {
  console.error(`Unable to fetch Photon documentation index: ${error.message}`);
  process.exit(2);
}

const mappedCurrent = new Set(
  coverage
    .filter((entry) => entry.status === "covered" && entry.documentationPath.startsWith("/docs/"))
    .map((entry) => normalize(entry.documentationPath)),
);

const unmapped = [...currentPaths].filter((item) => !mappedCurrent.has(item)).sort();
const stale = [...mappedCurrent].filter((item) => !currentPaths.has(item)).sort();

const missingOwners = [];
for (const entry of coverage) {
  try {
    await access(path.join(root, entry.owner));
  } catch {
    missingOwners.push(`${entry.documentationPath} -> ${entry.owner}`);
  }
}

const ownerByPath = new Map();
const duplicates = [];
for (const entry of coverage) {
  const key = normalize(entry.documentationPath);
  if (ownerByPath.has(key) && ownerByPath.get(key) !== entry.owner) {
    duplicates.push(`${key}: ${ownerByPath.get(key)} <> ${entry.owner}`);
  }
  ownerByPath.set(key, entry.owner);
}

const skillDirs = await readdir(path.join(root, "skills"), { withFileTypes: true });
const structureErrors = [];
for (const dir of skillDirs.filter((entry) => entry.isDirectory())) {
  const skillPath = path.join(root, "skills", dir.name, "SKILL.md");
  try {
    const text = await readFile(skillPath, "utf8");
    const front = text.match(/^---\n([\s\S]*?)\n---/);
    if (!front) throw new Error("missing YAML frontmatter");
    const name = front[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const license = front[1].match(/^license:\s*(.+)$/m)?.[1]?.trim();
    const version = front[1].match(/^\s*version:\s*['\"]?([^'\"\n]+)['\"]?$/m)?.[1]?.trim();
    if (name !== dir.name) structureErrors.push(`${dir.name}: name is ${name ?? "missing"}`);
    if (license !== "MIT") structureErrors.push(`${dir.name}: license is ${license ?? "missing"}`);
    if (!version) structureErrors.push(`${dir.name}: version missing`);
  } catch (error) {
    structureErrors.push(`${dir.name}: ${error.message}`);
  }
}

console.log(`Unmapped current Photon documentation pages: ${unmapped.length}`);
console.log(`Mapped files that do not exist: ${missingOwners.length}`);
console.log(`Unapproved duplicate owners: ${duplicates.length}`);
console.log(`Stale current-page mappings: ${stale.length}`);
console.log(`Invalid skill structures: ${structureErrors.length}`);

for (const [label, values] of [
  ["Unmapped", unmapped],
  ["Missing owners", missingOwners],
  ["Duplicate owners", duplicates],
  ["Stale mappings", stale],
  ["Structure errors", structureErrors],
]) {
  if (values.length) {
    console.error(`\n${label}:`);
    for (const value of values) console.error(`- ${value}`);
  }
}

if (unmapped.length || missingOwners.length || duplicates.length || stale.length || structureErrors.length) {
  process.exit(1);
}
