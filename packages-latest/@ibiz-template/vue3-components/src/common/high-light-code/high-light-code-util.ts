/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

// 关键字
const KEYWORDS = new Set([
  'async',
  'function',
  'Function',
  'return',
  'const',
  'let',
  'var',
  'await',
  'new',
  'this',
  'null',
  'undefined',
  'true',
  'false',
]);

/**
 * @description 转换html字符
 * @param {string} s
 * @returns {*}  {string}
 */
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * 找到函数体最外层花括号 `{ ... }`，若其内容中没有换行符，
 * 则在 `{` 后和 `}` 前各插入一个换行符 + 两空格缩进。
 */
function normalizeFunctionBody(src: string): string {
  const open = src.lastIndexOf('{');
  if (open === -1) return src;

  // 找到与之匹配的 '}'（跳过字符串、注释中的括号）
  let depth = 0;
  let close = -1;
  let i = open;

  while (i < src.length) {
    const ch = src[i];

    // 跳过字符串
    if (ch === '"' || ch === "'" || ch === '`') {
      const q = ch;
      i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\') i++;
        i++;
      }
      i++;
      continue;
    }

    // 跳过行注释
    if (ch === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }

    // 跳过块注释
    if (ch === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length - 1 && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        close = i;
        break;
      }
    }

    i++;
  }

  if (close === -1) return src;

  const inner = src.slice(open + 1, close);

  // 已有换行符则不处理
  if (/\n/.test(inner)) return src;

  const trimmed = inner.trim();
  const indented = trimmed ? `\n  ${trimmed}\n` : '\n';

  return src.slice(0, open + 1) + indented + src.slice(close);
}

/**
 * @description 高亮代码
 * @param {string} src
 * @returns {*}  {string}
 */
export const highlight = (src: string): string => {
  // 先规范化函数体换行
  src = normalizeFunctionBody(src);
  let result = '';
  let i = 0;

  while (i < src.length) {
    // Line comment
    if (src[i] === '/' && src[i + 1] === '/') {
      let j = i;
      while (j < src.length && src[j] !== '\n') j++;
      result += `<span class="comment">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Block comment
    if (src[i] === '/' && src[i + 1] === '*') {
      let j = i + 2;
      while (j < src.length - 1 && !(src[j] === '*' && src[j + 1] === '/')) j++;
      j += 2;
      result += `<span class="comment">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // String literals
    if (src[i] === '"' || src[i] === "'" || src[i] === '`') {
      const quote = src[i];
      let j = i + 1;
      while (j < src.length && src[j] !== quote) {
        if (src[j] === '\\') j++;
        j++;
      }
      j++;
      result += `<span class="string">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[0-9._]/.test(src[j])) j++;
      result += `<span class="number">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Identifiers & keywords
    if (/[a-zA-Z_$]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);

      let k = j;
      while (k < src.length && src[k] === ' ') k++;
      const isCall = src[k] === '(';

      let m = j;
      while (m < src.length && src[m] === ' ') m++;
      const isTyped = src[m] === ':';

      if (KEYWORDS.has(word)) {
        result += `<span class="keyword">${escapeHtml(word)}</span>`;
      } else if (isTyped) {
        result += `<span class="param">${escapeHtml(word)}</span>`;
      } else if (isCall) {
        result += `<span class="fn-call">${escapeHtml(word)}</span>`;
      } else {
        result += `<span class="ident">${escapeHtml(word)}</span>`;
      }
      i = j;
      continue;
    }

    // Colon → read following type annotation
    if (src[i] === ':') {
      result += `<span class="punct">:</span>`;
      i++;
      let ws = '';
      while (i < src.length && src[i] === ' ') {
        ws += src[i];
        i++;
      }
      if (ws) result += ws;
      if (i < src.length && /[a-zA-Z_$]/.test(src[i])) {
        let j = i;
        while (j < src.length && /[a-zA-Z0-9_$<>[\]|&]/.test(src[j])) j++;
        result += `<span class="type">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
      }
      continue;
    }

    // Brackets
    if ('(){}[]'.includes(src[i])) {
      const cls = '([{'.includes(src[i]) ? 'bracket-open' : 'bracket-close';
      result += `<span class="bracket ${cls}">${escapeHtml(src[i])}</span>`;
      i++;
      continue;
    }

    // Punctuation
    if (',;.'.includes(src[i])) {
      result += `<span class="punct">${escapeHtml(src[i])}</span>`;
      i++;
      continue;
    }

    // Operators
    if ('=><+-*/%!&|^~'.includes(src[i])) {
      result += `<span class="operator">${escapeHtml(src[i])}</span>`;
      i++;
      continue;
    }

    result += escapeHtml(src[i]);
    i++;
  }

  return result;
};
