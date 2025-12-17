import { MarkdownView, Plugin } from 'obsidian';




export default class MyPlugin extends Plugin {
	async onload() {
		this.registerEvent(this.app.workspace.on('layout-change', () => {
			const leaves = this.app.workspace.getLeavesOfType('markdown');
			for (let leaf of leaves) {
				if(leaf.view.containerEl.attributes.getNamedItem('data-mode')?.value === 'preview')
				leaf.view.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true);
			}
			
		}));
		this.registerMarkdownPostProcessor(async (element, context) => {
			const tables = element.findAll('table');
			const usedLines: number[] = []
			for (let table of tables) {
				const section = context.getSectionInfo(table);
				if (!section) continue;
				let dashLine = null
				const lines = section.text.split('\n');
				for (let i = section.lineStart; i <= section.lineEnd; i++) {
					const start = lines[i].indexOf('|');
					const end = lines[i].lastIndexOf('|');
					if (start === -1 || end === -1 || end <= start) continue;
					if (/^[ \-\:\|]+$/.test(lines[i].substring(start+1, end)) && !usedLines.contains(i)) {
						usedLines.push(i);
						dashLine = lines[i].substring(start);
						break;
					}
				}
				if (dashLine === null) continue;
				const segments = dashLine.split('|').reduce((prev, curr) => {
					if (curr.trim() === '' || !curr.contains('-')) return prev;
					prev.push(curr.trim().replace(/:/g, ''));
					return prev;
				}, [] as string[]);
				const total = segments.reduce((sum, curr) => sum + curr.length, 0);
				const colWidths = segments.map(seg => (seg.length / total) * 100);
				const colgroupEl = document.createElement('colgroup');
				for (let width of colWidths) {
					const colEl = colgroupEl.createEl('col');
					colEl.style.width = `${width}%`;
				}
				table.prepend(colgroupEl);
			}
		});
	}

	onunload() {
		// Cleanup if needed
	}
}

