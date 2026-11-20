# Agent handoff and worktree cleanup

## Recover a handoff

When the original agent can respond, run `$handoff` there. If it stops, invoke
`$handoff` from the receiving session and give it the repository and the
original transcript path or session ID. For Claude Code, the transcript is
normally under `~/.claude/projects/<project>/<session-id>.jsonl`.

A Rex session, tab, and pane ID can locate the visible terminal output via the
`rex` skill. Use the pane to identify the run, then read its transcript for the
task history. Check `git worktree list`, `git status`, and `git diff` to confirm
where the changes actually live.

Save the handoff in the OS temporary directory. Include the issue or spec, base
commit, branch and worktree path, uncommitted changes, and the last successful
check. Link to those sources and omit credentials. The recipient should be
able to open the worktree and identify the first remaining check.

## Retire a completed worktree

Once the changes are integrated, check that the branch tip is an ancestor of
the branch that will keep the work and that the worktree has no uncommitted or
untracked work. Remove the worktree with `git worktree remove`, then delete the
local branch with `git branch -d`. Leave locked or dirty worktrees for review
with their original agent or owner.
