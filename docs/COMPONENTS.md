# Notes components

Backend domain primitives remain app-owned. These are not replacements for shared Wizard shell capabilities.

| Capability | Entry point | Ownership and reuse |
|---|---|---|
| Owner-selected Notes vault and confined trash | `app/server.py:Vault`, `start.py` | Extends the existing Notes vault and startup primitives with explicitly selected folders, validated runtime IDs and confined hidden trash paths. No new shell UI, authentication transport or shared-files service. |
