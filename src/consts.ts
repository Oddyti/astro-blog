// Global site data.

export const SITE_TITLE = '余地';
export const SITE_DESCRIPTION = 'Oddyti的小站';
export const SITE_SUBTITLE = '是谁来自山川湖海，却囿于昼夜厨房与爱。';
export const SITE_OWNER = 'Oddyti';
export const AUTHOR_NAME = '不酸奶';
export const SITE_SINCE = 2020;
export const LICENSE_TEXT = 'Licensed under CC BY-NC-SA 4.0';

// Category metadata migrated from the original Hugo blog.
export const CATEGORIES: Record<
	string,
	{ description: string; color: string }
> = {
	出神: {
		description:
			'有时候胡思乱想到出神，而这里记录了让我出神的时刻，回忆、思考、情感……',
		color: '#2c9d8f',
	},
	递手: {
		description: '分享与推荐，把好东西递到你手中。不妨来吃吃安利。',
		color: '#f4a262',
	},
	闲逛: {
		description: '在彩色的世界中漫无目的闲逛。诶，好大的玉米！',
		color: '#e9c46a',
	},
	行囊: {
		description:
			'成长路上知识太多脑袋装不下，于是装在了这里。别以为写了笔记就等于学会了！',
		color: '#264653',
	},
};

export const SOCIAL_LINKS = [
	{ name: 'Bilibili', url: 'https://space.bilibili.com/51329228', icon: 'bilibili' },
	{ name: 'GitHub', url: 'https://github.com/Oddyti', icon: 'github' },
	{ name: '网易云', url: 'https://y.music.163.com/m/user?id=556522560', icon: 'netease-music' },
];

// Recommended reading shown on the homepage.
export const RECOMMENDED_POSTS = [
	{ label: '来看看去年的总结', href: '/post/summary-2025/' },
	{ label: '尝试留了长发，这是结的果', href: '/post/longhair/' },
	{ label: '这里有好听的', href: '/tags/%E6%8E%A8%E6%AD%8C/' },
];

// Friend links from the original Hugo blog.
export const FRIEND_LINKS = [
	{
		title: 'Anomie',
		description: 'Blog of a PhD student, utilitarian, scientism-ist.',
		website: 'https://dong2000.xyz',
		image: 'https://dong2000.xyz/wombo.png',
	},
	{
		title: '暄暄！',
		description: '咸鱼暄的代码空间',
		website: 'https://xuan-insr.github.io/',
		image: 'https://xuan-insr.github.io/logo.ico',
	},
	{
		title: '观昔望今',
		description: '一个个人小站',
		website: 'https://sci-tech.top/',
		image: 'https://sci-tech.top/images/logo.jpg',
	},
];