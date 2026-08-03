# Spaces and users

A Space is the conversation boundary. Use it to send content, bracket typing with `responding`, resolve participants, inspect display names and avatars, and create direct or group conversations through documented provider capabilities.

Current operations to account for:

- send one or more content items;
- start and stop responding/typing safely;
- add or edit supported conversation state;
- retrieve and update avatars;
- retrieve display names;
- resolve participants to Users;
- create direct and group spaces;
- preserve resource IDs and thread IDs as distinct opaque values.

Provider feature degradation must be explicit. Do not silently turn a threaded reply, group mutation, or native app card into unrelated content unless the official provider docs define that fallback.

Official source: <https://photon.codes/docs/spectrum-ts/spaces-and-users>
