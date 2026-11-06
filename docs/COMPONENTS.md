# Notes backend capabilities

| Capability | Entry point | Responsibility |
|---|---|---|
| Notes backlinks invalid-link isolation | `Vault.backlinks`, `Vault.link_target`, `Vault.resolve` | Skips rejected outgoing links via the existing resolver; requested-note validation unchanged. No shared shell capability or UI dependency. |
