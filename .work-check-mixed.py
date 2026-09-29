#!/usr/bin/env python3
"""检测源文件中"脚注+正文"混排的行，以及正文被脚注截断的位置。
用法: python3 .work-check-mixed.py <源文件> [起始行] [结束行]
"""
import re, sys

def check(path, lo=1, hi=10**9):
    lines = open(path, encoding='utf-8').read().split('\n')
    mixed, truncated = [], []
    for i, l in enumerate(lines, 1):
        if not (lo <= i <= hi): continue
        s = l.strip()
        if not s: continue
        if s[0] in '①②③④⑤⑥⑦⑧⑨⑩':
            # 脚注行：判断是否混入正文
            body_markers = re.search(r'(^|[。！？；])\s*(了|的|地|得|而|但|因此|然而|所以|这就是|如果|当|与此同时|终于|首先|其次)', s)
            if len(s) > 120 or body_markers:
                mixed.append((i, len(s), s[:60]))
        else:
            # 正文行：判断是否被截断（末尾没有句末标点且下一非空行是脚注）
            if s and s[-1] not in '。！？…”）':
                for j in range(i, min(i + 4, len(lines))):
                    nxt = lines[j].strip()
                    if not nxt: continue
                    if nxt[0] in '①②③④⑤⑥⑦⑧⑨⑩':
                        truncated.append((i, s[-50:]))
                    break
    print(f'=== 混排行（脚注+正文，{len(mixed)} 处）')
    for i, n, s in mixed: print(f'  行 {i:4d} [{n:3d}字] {s}…')
    print(f'\n=== 疑似被脚注截断的正文行（{len(truncated)} 处）')
    for i, s in truncated: print(f'  行 {i:4d} …{s}')
    return len(mixed) + len(truncated)

if __name__ == '__main__':
    p = sys.argv[1] if len(sys.argv) > 1 else '/Users/oddyti/Downloads/爱的艺术.md'
    lo = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    hi = int(sys.argv[3]) if len(sys.argv) > 3 else 10**9
    sys.exit(0 if check(p, lo, hi) >= 0 else 1)
