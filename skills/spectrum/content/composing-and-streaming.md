# Composing and streaming

- Send multiple content items in one logical operation only when grouping semantics are intended.
- Distinguish grouped visual content from sequential sends.
- Use multipart replies when every part belongs under the same target.
- Complete or abort streaming text deterministically.
- Propagate cancellation and do not leave partial streams open.

Official sources:
- <https://photon.codes/docs/spectrum-ts/content/composing-content>
- <https://photon.codes/docs/spectrum-ts/content/text>
