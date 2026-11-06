# Notes backend capabilities

| Capability | Entry point | Responsibility |
|---|---|---|
| Notes backlinks invalid-link isolation | `Vault.backlinks`, `Vault.link_target`, `Vault.resolve` | EXTEND the existing vault resolver: skip rejected outgoing links while retaining requested-note validation. No shared shell capability or UI dependency. |
