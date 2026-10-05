// Remark 插件：把 B 站视频写法转成响应式 iframe 嵌入。
//
// 支持两种写法：
//
// 1) 代码围栏（推荐，.md 与 .mdx 都可用）
//
//    ```bilibili
//    BV16t421a7iW        <- BV 号；可在同一行再跟一个分 P 号
//    ```
//
//    之所以推荐这种：围栏是 Markdown 自己的节点类型，MDX 不会把它当作
//    JSX 解析，因此不会出现 `{` 引发的语法错误。
//
// 2) Hugo 短代码（历史写法，仅 .md 可用）
//
//    {{< bilibili BV16t421a7iW >}}
//
//    MDX 下 `{` 会被视作 JSX 表达式而导致构建失败，故新文章请用围栏写法。

const SHORTCODE = /\{\{< bilibili ([A-Za-z0-9]+)(?:\s+(\d+))? >\}\}/;

function iframeHtml(bvid, page) {
	return (
		'<div class="video-container">' +
		`<iframe src="https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&autoplay=0&muted=0"` +
		' scrolling="no" border="0" frameborder="no" framespacing="0"' +
		' allowfullscreen="true" loading="lazy" title="bilibili video"></iframe>' +
		'</div>'
	);
}

/** 解析围栏内容，形如 "BV16t421a7iW" 或 "BV16t421a7iW 3" */
function parseFence(value) {
	const m = value.trim().match(/^([A-Za-z0-9]+)(?:\s+(\d+))?$/);
	return m ? { bvid: m[1], page: m[2] || '1' } : null;
}

function transform(children) {
	const out = [];
	for (const child of children) {
		// 围栏写法
		if (child.type === 'code' && child.lang === 'bilibili') {
			const parsed = parseFence(child.value ?? '');
			if (parsed) {
				out.push({ type: 'html', value: iframeHtml(parsed.bvid, parsed.page) });
				continue;
			}
		}

		if (child.type === 'text') {
			const parts = child.value.split(SHORTCODE);
			if (parts.length === 1) {
				out.push(child);
				continue;
			}
			let i = 0;
			while (i < parts.length) {
				if (parts[i]) out.push({ type: 'text', value: parts[i] });
				i++;
				if (i < parts.length) {
					const bvid = parts[i++];
					const page = parts[i++] || '1';
					out.push({ type: 'html', value: iframeHtml(bvid, page) });
				}
			}
			continue;
		}

		if (child.children) child.children = transform(child.children);
		out.push(child);
	}
	return out;
}

export default function remarkBilibili() {
	return function (tree) {
		tree.children = transform(tree.children);
	};
}
