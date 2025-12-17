# Table Size Plugin

An Obsidian plugin that automatically adjusts column widths in Markdown tables based on the length of dashes in the table separator line.

## Description

This plugin enhances the display of Markdown tables in Obsidian's preview mode by dynamically setting column widths proportional to the dashes in the separator row (the row with `|---|` etc.). This creates more visually balanced tables without manual CSS styling.

The plugin works by:
- Scanning rendered tables in preview mode
- Finding the separator line in the source Markdown
- Calculating relative widths based on dash lengths
- Applying CSS column widths via `<colgroup>` elements

## Installation

1. Download the plugin files (`main.js`, `manifest.json`, `styles.css`)
2. Place them in your vault's `.obsidian/plugins/table-size-plugin/` folder
3. Reload Obsidian and enable the plugin in **Settings → Community plugins**

## Usage

Simply write your Markdown tables as usual. The plugin automatically processes them in preview mode.

### Example

**Markdown source:**
```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Short    | Medium length | Very long content here |
| Data     | More data    | Even more data        |
```

**Result:** The table columns will be sized proportionally based on the dashes in the separator line. In this case, all columns have equal dashes (`----------`), so they'll be equally wide.

**Another example with different widths:**
```markdown
| Short | Medium length | Very long content here |
|-------|---------------|-------------------------|
| A     | B             | C                       |
```

Here, the columns will be sized approximately 6%, 15%, and 25% respectively, based on the dash counts.

## Limitations

- **Preview mode only**: The plugin only affects tables in preview mode, not in edit mode or live preview.
- **Standard table format required**: Tables must use the standard Markdown pipe syntax with a separator line containing dashes.
- **No complex tables**: Does not handle merged cells, nested tables, or tables with irregular formatting.
- **Performance**: May have minor impact on rendering large documents with many tables.
- **Mobile compatibility**: Works on desktop; mobile behavior may vary due to different rendering.

## Compatibility

- Requires Obsidian v0.12.0 or later
- Desktop only (may work on mobile but not tested)

## Contributing

Feel free to report issues or suggest improvements on the GitHub repository.

## License

This plugin is released under the MIT License.
