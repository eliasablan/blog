# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in `eliasablan/blog`.
Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body-file <path>`.
  Use a file containing actual newlines for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments`,
  with appropriate `--label` and `--state` filters.
- **Make an issue a sub-issue**: `gh issue create --parent <parent> ...`,
  or `gh issue edit <parent> --add-sub-issue <child>` afterwards (`gh` 2.94+).
  If unavailable, put `Part of #<parent>` at the top of the child body.
- **Comment**: `gh issue comment <number> --body-file <path>`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` /
  `--remove-label "..."`.
- **Close**: `gh issue close <number> --comment "..."`.

Infer the repo from `git remote -v`; `gh` does this automatically inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.
