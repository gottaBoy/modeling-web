"use strict";
const getSelectionPosition = (container) => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const rects = range.getClientRects();
  if (rects.length === 0) {
    return null;
  }
  const lastRect = rects[rects.length - 1];
  const parentRect = container.getBoundingClientRect();
  return {
    left: lastRect.right - parentRect.left,
    top: lastRect.bottom - parentRect.top
  };
};
const escapeHTML = (html) => {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
};
const unescapeHTML = (escapedHTML) => {
  const div = document.createElement("div");
  div.innerHTML = escapedHTML;
  return div.textContent || "";
};
const tabSize = 4;
const TAB = " ".repeat(tabSize);
function getSelectionRange() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    return null;
  }
  return selection.getRangeAt(0);
}
function getOffset(editor, node, offset) {
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.setEnd(node, offset);
  return range.toString().length;
}
function restoreCursor(editor, pos, end = pos) {
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node;
  let count = 0;
  while (node = walker.nextNode()) {
    const len = node.length;
    if (pos >= count && pos <= count + len) {
      const range = document.createRange();
      range.setStart(node, pos - count);
      range.setEnd(node, end - count);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
      return;
    }
    count += len;
  }
}
function restoreSelection(editor, start, end, startOffset, endOffset) {
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node;
  let pos = 0;
  let startNode = null;
  let endNode = null;
  while (node = walker.nextNode()) {
    const next = pos + node.length;
    if (!startNode && start >= pos && start <= next) {
      startNode = node;
    }
    if (end >= pos && end <= next) {
      endNode = node;
      break;
    }
    pos = next;
  }
  if (!startNode || !endNode)
    return;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
function insertText(text) {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
function removeIndent(editor) {
  const range = getSelectionRange();
  if (!range) {
    return;
  }
  const text = editor.innerText;
  const pos = getOffset(editor, range.startContainer, range.startOffset);
  const lineStart = text.lastIndexOf("\n", pos - 1) + 1;
  const line = text.substring(lineStart, pos);
  const remove = line.match(/^ {1,4}/);
  if (remove) {
    insertText("");
    const newText = editor.innerText.substring(0, lineStart) + line.replace(/^ {1,4}/, "") + editor.innerText.substring(pos);
    editor.innerText = newText;
    restoreCursor(editor, pos - remove[0].length);
  }
}
function indentSelection(editor, remove = false) {
  const text = editor.innerText;
  const range = getSelectionRange();
  if (!range) {
    return void 0;
  }
  const startOffset = range.startOffset;
  let start = getOffset(editor, range.startContainer, range.startOffset);
  const startIndex = text.substring(0, start).lastIndexOf("\n");
  if (startIndex !== -1) {
    start = startIndex + 1;
  }
  const endOffset = range.endOffset;
  let end = getOffset(editor, range.endContainer, range.endOffset);
  const endIndex = text.substring(end).indexOf("\n");
  if (endIndex !== -1) {
    end += endIndex;
  }
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  let lines = selected.split("\n");
  lines = lines.map((line) => {
    if (remove) {
      return line.replace(/^ {1,4}/, "");
    }
    return TAB + line;
  });
  const result = before + lines.join("\n") + text.substring(end);
  editor.innerText = result;
  const indent = remove ? -tabSize : tabSize;
  const contentLen = lines.slice(0, lines.length - 1).join("\n").length;
  requestAnimationFrame(() => {
    restoreSelection(
      editor,
      start + startOffset + indent,
      before.length + contentLen + endOffset + indent,
      startOffset + indent,
      endOffset + indent
    );
  });
}

export { TAB, escapeHTML, getSelectionPosition, indentSelection, insertText, removeIndent, unescapeHTML };
