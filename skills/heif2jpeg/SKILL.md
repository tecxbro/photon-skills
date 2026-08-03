---
name: heif2jpeg
description: >
  Convert HEIC or HEIF buffers to JPEG with Photon's heif2jpeg package. Use for iMessage HEIC attachments, heifToJpeg, JPEG quality, Buffer conversion, Node.js, Bun, Deno, prebuilt native binaries, libuv thread-pool behavior, source builds, invalid images, and unsupported platforms. Keywords: HEIC, HEIF, JPEG, heif2jpeg, heifToJpeg, image conversion, iMessage attachment, Buffer, native addon.
license: MIT
metadata:
  author: photon-hq
  version: '1.0.0'
---

# heif2jpeg

`heif2jpeg` is a native HEIC/HEIF-to-JPEG converter with zero runtime dependencies.

```bash
npm install heif2jpeg
```

```js
const { heifToJpeg } = require("heif2jpeg");
const { readFile, writeFile } = require("node:fs/promises");

const input = await readFile("photo.heic");
const jpeg = await heifToJpeg(input, { quality: 85 });
await writeFile("photo.jpg", jpeg);
```

## API

```ts
heifToJpeg(input: Buffer, options?: { quality?: number }): Promise<Buffer>
```

- `quality` accepts `1` through `100` and defaults to `85`.
- Input is HEIF/HEIC bytes; output is JPEG bytes.
- Processing runs in the libuv thread pool and does not block the main JavaScript thread.
- Works with Node.js, Bun, and Deno.
- Prebuilt binaries: macOS x64/arm64, Linux glibc x64/arm64, Linux musl x64/arm64, and Windows x64/arm64.
- Building from source requires Rust, CMake, and a C/C++ compiler.

## iMessage attachment conversion

Download or read the HEIC attachment as a `Buffer`, validate that it is a supported HEIF input, convert it, then upload or send the resulting JPEG buffer. Do not load arbitrarily large untrusted files without size limits. Catch conversion failures and report invalid input separately from filesystem or upload errors.

Both CommonJS and ESM consumers should use the export shape supported by the installed package version; the official page currently demonstrates CommonJS.

Official source: <https://photon.codes/docs/utilities/heif2jpeg>
