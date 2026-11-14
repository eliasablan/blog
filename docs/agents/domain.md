# Domain Docs

How engineering skills should consume this repo's domain documentation.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root.
- **`docs/adr/`**: read ADRs relevant to the area you're about to work in.

If these files don't exist, proceed silently. Don't flag their absence
or suggest creating them upfront. The `/domain-modeling` skill creates
them lazily when terms or decisions get resolved.

## File structure

Single-context repo:

    /
    ├── GLOSSARY.md
    ├── docs/adr/
    └── src/

## Use the glossary's vocabulary

When naming a domain concept in an issue, proposal, hypothesis, or test,
use the term defined in `GLOSSARY.md`. Avoid synonyms the glossary excludes.

If a concept is missing, reconsider whether it belongs to the domain,
or note the gap for `/domain-modeling`.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather
than silently overriding it:

> Contradicts ADR-0007 (event-sourced orders), but worth reopening because…
