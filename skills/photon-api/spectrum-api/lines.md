# Spectrum API: lines

Use the current `lines` OpenAPI tag for dedicated-line inventory and mutations.

Adding a dedicated iMessage line can update subscription quantity and create prorated billing. Removing a line can disrupt active routing. Require explicit confirmation before either paid or destructive mutation.

Example documented operation:

```text
POST /projects/{projectId}/lines/
```

The current add-line response includes both the allocated line and billing information. Do not assume every project or plan is eligible, and do not assume a free project immediately owns a dedicated line.

For every endpoint, verify method, path, body, response, and billing consequences in the current OpenAPI.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
