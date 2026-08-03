# Architecture

- Keep transport/provider code separate from agent behavior, memory, tools, safety, and analytics.
- Use one canonical message loop and add providers around it.
- Perform slow work asynchronously without losing conversation ordering.
- Model provider limitations as capabilities, not scattered conditionals.
- Design human-feeling acknowledgements, typing, and response timing without fabricating platform guarantees.

Official source: <https://photon.codes/docs/best-practices/architecture>
