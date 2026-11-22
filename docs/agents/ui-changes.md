# UI changes

For small visual changes, check formatting on the edited files and give the
user two or three concrete steps for manual browser verification. See
[Local checks](../../README.md#local-checks) for project verification commands.

Define a control's expected behavior before updating its tests. For the
language switcher, use the destination language for the label. The
[browser test](../../tests/browser.test.mjs) covers both directions.

For icon changes, check the installed `@tabler/icons` package first. Resolve
the SVG import with `import.meta.resolve()` and confirm the resolved file
exists locally.
