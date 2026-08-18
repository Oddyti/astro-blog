// Remark plugin that converts Hugo bilibili shortcodes
// (`{{< bilibili BVID >}}`) into responsive iframe embeds.
export default function remarkBilibili() {
	return function (tree) {
		tree.children = transform(tree.children);
	};
}

function transform(children) {
	const out = [];
	for (const child of children) {
		if (child.type === 'text') {
			const parts = child.value.split(
				/\{\{< bilibili ([A-Za-z0-9]+)(?:\s+(\d+))? >\}\}/,
			);
			if (parts.length === 1) {
				out.push(child);
				continue;
			}
			let i = 0;
			while (i < parts.length) {
				if (parts[i]) {
					out.push({ type: 'text', value: parts[i] });
				}
				i++;
				if (i < parts.length) {
					const bvid = parts[i++];
					const page = parts[i++] || '1';
					out.push({
						type: 'html',
						value: `<div class="video-container"><iframe src="https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&autoplay=0&muted=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" loading="lazy" title="bilibili video"></iframe></div>`,
					});
				}
			}
		} else {
			if (child.children) {
				child.children = transform(child.children);
			}
			out.push(child);
		}
	}
	return out;
}