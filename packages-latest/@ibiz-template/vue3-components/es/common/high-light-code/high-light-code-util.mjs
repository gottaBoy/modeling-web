"use strict";
const KEYWORDS = /* @__PURE__ */ new Set([
  "async",
  "function",
  "Function",
  "return",
  "const",
  "let",
  "var",
  "await",
  "new",
  "this",
  "null",
  "undefined",
  "true",
  "false"
]);
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function normalizeFunctionBody(src) {
  const open = src.lastIndexOf("{");
  if (open === -1)
    return src;
  let depth = 0;
  let close = -1;
  let i = open;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const q = ch;
      i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === "\\")
          i++;
        i++;
      }
      i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n")
        i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < src.length - 1 && !(src[i] === "*" && src[i + 1] === "/"))
        i++;
      i += 2;
      continue;
    }
    if (ch === "{")
      depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        close = i;
        break;
      }
    }
    i++;
  }
  if (close === -1)
    return src;
  const inner = src.slice(open + 1, close);
  if (/\n/.test(inner))
    return src;
  const trimmed = inner.trim();
  const indented = trimmed ? "\n  ".concat(trimmed, "\n") : "\n";
  return src.slice(0, open + 1) + indented + src.slice(close);
}
const highlight = (src) => {
  src = normalizeFunctionBody(src);
  let result = "";
  let i = 0;
  while (i < src.length) {
    if (src[i] === "/" && src[i + 1] === "/") {
      let j = i;
      while (j < src.length && src[j] !== "\n")
        j++;
      result += '<span class="comment">'.concat(escapeHtml(src.slice(i, j)), "</span>");
      i = j;
      continue;
    }
    if (src[i] === "/" && src[i + 1] === "*") {
      let j = i + 2;
      while (j < src.length - 1 && !(src[j] === "*" && src[j + 1] === "/"))
        j++;
      j += 2;
      result += '<span class="comment">'.concat(escapeHtml(src.slice(i, j)), "</span>");
      i = j;
      continue;
    }
    if (src[i] === '"' || src[i] === "'" || src[i] === "`") {
      const quote = src[i];
      let j = i + 1;
      while (j < src.length && src[j] !== quote) {
        if (src[j] === "\\")
          j++;
        j++;
      }
      j++;
      result += '<span class="string">'.concat(escapeHtml(src.slice(i, j)), "</span>");
      i = j;
      continue;
    }
    if (/[0-9]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[0-9._]/.test(src[j]))
        j++;
      result += '<span class="number">'.concat(escapeHtml(src.slice(i, j)), "</span>");
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_$]/.test(src[j]))
        j++;
      const word = src.slice(i, j);
      let k = j;
      while (k < src.length && src[k] === " ")
        k++;
      const isCall = src[k] === "(";
      let m = j;
      while (m < src.length && src[m] === " ")
        m++;
      const isTyped = src[m] === ":";
      if (KEYWORDS.has(word)) {
        result += '<span class="keyword">'.concat(escapeHtml(word), "</span>");
      } else if (isTyped) {
        result += '<span class="param">'.concat(escapeHtml(word), "</span>");
      } else if (isCall) {
        result += '<span class="fn-call">'.concat(escapeHtml(word), "</span>");
      } else {
        result += '<span class="ident">'.concat(escapeHtml(word), "</span>");
      }
      i = j;
      continue;
    }
    if (src[i] === ":") {
      result += '<span class="punct">:</span>';
      i++;
      let ws = "";
      while (i < src.length && src[i] === " ") {
        ws += src[i];
        i++;
      }
      if (ws)
        result += ws;
      if (i < src.length && /[a-zA-Z_$]/.test(src[i])) {
        let j = i;
        while (j < src.length && /[a-zA-Z0-9_$<>[\]|&]/.test(src[j]))
          j++;
        result += '<span class="type">'.concat(escapeHtml(src.slice(i, j)), "</span>");
        i = j;
      }
      continue;
    }
    if ("(){}[]".includes(src[i])) {
      const cls = "([{".includes(src[i]) ? "bracket-open" : "bracket-close";
      result += '<span class="bracket '.concat(cls, '">').concat(escapeHtml(src[i]), "</span>");
      i++;
      continue;
    }
    if (",;.".includes(src[i])) {
      result += '<span class="punct">'.concat(escapeHtml(src[i]), "</span>");
      i++;
      continue;
    }
    if ("=><+-*/%!&|^~".includes(src[i])) {
      result += '<span class="operator">'.concat(escapeHtml(src[i]), "</span>");
      i++;
      continue;
    }
    result += escapeHtml(src[i]);
    i++;
  }
  return result;
};

export { highlight };
