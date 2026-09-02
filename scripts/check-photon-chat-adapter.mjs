#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  "README.md",
  "skills/chat-adapter-imessage/SKILL.md",
  "skills/chat-adapter-imessage/configuration.md",
  "skills/chat-adapter-imessage/receiving-messages.md",
  "skills/chat-adapter-imessage/features-and-limitations.md",
  "skills/chat-adapter-imessage/deployment-and-troubleshooting.md",
  "skills/spectrum/integrations/chat-sdk.md",
];

const texts = new Map();
for (const relative of targets) {
  texts.set(relative, await readFile(path.join(root, relative), "utf8"));
}

const errors = [];
const implementationFiles = targets.filter((file) => file !== "README.md");
for (const relative of implementationFiles) {
  const text = texts.get(relative);
  if (/from\s+["']chat-adapter-imessage["']/.test(text)) {
    errors.push(`${relative}: imports the obsolete unscoped package`);
  }
  if (/(?:npm|pnpm|yarn|bun)\s+(?:add|install)[^\n]*\bchat-adapter-imessage\b/.test(text) && !text.includes("@photon-ai/chat-adapter-imessage")) {
    errors.push(`${relative}: installs the obsolete unscoped package`);
  }
  if (/createiMessageAdapter\s*\(\s*\{\s*local\s*:\s*true|IMESSAGE_LOCAL|defaults?\s+local\s+unless|local mode requires macOS/i.test(text)) {
    errors.push(`${relative}: describes removed local adapter mode as supported`);
  }
}

const required = {
  "README.md": ["@photon-ai/chat-adapter-imessage"],
  "skills/chat-adapter-imessage/SKILL.md": [
    "@photon-ai/chat-adapter-imessage",
    "Local on-device mode has been removed",
    "bot.webhooks.imessage",
  ],
  "skills/chat-adapter-imessage/configuration.md": [
    "credentials",
    "webhookVerifier",
    "local: true` throws",
  ],
  "skills/chat-adapter-imessage/features-and-limitations.md": [
    "sendEffect",
    "sendMiniApp",
    "sendVoice",
    "setBackground",
    "fetchMessage",
    "Remove reactions",
  ],
  "skills/spectrum/integrations/chat-sdk.md": ["@photon-ai/chat-adapter-imessage"],
};

for (const [relative, markers] of Object.entries(required)) {
  const text = texts.get(relative);
  for (const marker of markers) {
    if (!text.includes(marker)) errors.push(`${relative}: missing current-contract marker ${marker}`);
  }
}

console.log(`Chat SDK adapter contract errors: ${errors.length}`);
if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
