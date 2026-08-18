declare module 'd3-cloud' {
	interface CloudLayout {
		size(size: [number, number]): CloudLayout;
		words(words: any[]): CloudLayout;
		random(random: () => number): CloudLayout;
		padding(padding: number): CloudLayout;
		rotate(fn: (word: any) => number): CloudLayout;
		font(fn: string): CloudLayout;
		fontSize(fn: (word: any) => number): CloudLayout;
		on(event: 'word' | 'end', cb: (...args: any[]) => void): CloudLayout;
		start(): CloudLayout;
	}
	function cloud(): CloudLayout;
	export default cloud;
}