# Text and Markdown

- Use plain text for maximum portability.
- Use the Markdown builder for bold, italic, strikethrough, code, and other documented formatting.
- Let providers translate Markdown into their native formatting model.
- Escape user-generated Markdown when literal text is required.
- Handle unsupported formatting as documented; do not promise identical rendering.
- Streaming text has a start/update/complete lifecycle and must be completed or aborted.

Official sources:
- <https://photon.codes/docs/spectrum-ts/content/text>
- <https://photon.codes/docs/spectrum-ts/content/markdown>
