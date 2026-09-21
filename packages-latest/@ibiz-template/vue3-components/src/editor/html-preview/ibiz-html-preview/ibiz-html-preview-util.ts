/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-syntax */
/**
 * 获取选中文本的像素位置（坐标）
 * @returns {IData | null}
 */
export const getSelectionPosition = (container: HTMLElement): IData | null => {
  const selection = window.getSelection();

  if (!selection || !selection.rangeCount) {
    return null;
  }

  const range = selection.getRangeAt(0);

  // 获取选区的边界矩形
  const rects = range.getClientRects();

  if (rects.length === 0) {
    return null;
  }

  // 最后一个矩形
  const lastRect = rects[rects.length - 1];
  const parentRect = container.getBoundingClientRect();

  return {
    left: lastRect.right - parentRect.left,
    top: lastRect.bottom - parentRect.top,
  };
};

/**
 * 简单转义html
 */
export const escapeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const unescapeHTML = (escapedHTML: string): string => {
  const div = document.createElement('div');
  div.innerHTML = escapedHTML;
  return div.textContent || '';
};

// tab缩进
const tabSize = 4;
export const TAB = ' '.repeat(tabSize);

/**
 * @description 获取当前选中范围
 * @export
 * @returns {*}  {(Range | null)}
 */
function getSelectionRange(): Range | null {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    return null;
  }
  return selection.getRangeAt(0);
}

/**
 * @description DOM位置转换
 * @param {*} node
 * @param {*} offset
 * @returns {*}
 */
function getOffset(editor: HTMLElement, node: Node, offset: number) {
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.setEnd(node, offset);
  return range.toString().length;
}

/**
 * @description 恢复光标位置
 * @export
 * @param {*} pos
 * @param {*} [end=pos]
 * @returns {*}
 */
function restoreCursor(editor: HTMLElement, pos: number, end = pos): void {
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node: any;
  let count = 0;
  while ((node = walker.nextNode())) {
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

/**
 * @description 恢复选区
 * @param {HTMLElement} editor
 * @param {number} start
 * @param {number} end
 * @param {number} startOffset
 * @param {number} endOffset
 * @returns {*}
 */
function restoreSelection(
  editor: HTMLElement,
  start: number,
  end: number,
  startOffset: number,
  endOffset: number,
) {
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node: any;
  let pos = 0;
  let startNode = null;
  let endNode = null;
  while ((node = walker.nextNode())) {
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
  if (!startNode || !endNode) return;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  const selection = window.getSelection();
  selection!.removeAllRanges();
  selection!.addRange(range);
}

/**
 * @description 插入文本
 * @export
 * @param {string} text
 */
export function insertText(text: string): void {
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

/**
 * @description shift+tab
 * @export
 * @param {HTMLElement} editor
 * @returns {*}
 */
export function removeIndent(editor: HTMLElement) {
  const range = getSelectionRange();
  if (!range) {
    return;
  }
  const text = editor.innerText;
  const pos = getOffset(editor, range.startContainer, range.startOffset);
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const line = text.substring(lineStart, pos);
  const remove = line.match(/^ {1,4}/);
  if (remove) {
    insertText('');
    const newText =
      editor.innerText.substring(0, lineStart) +
      line.replace(/^ {1,4}/, '') +
      editor.innerText.substring(pos);
    editor.innerText = newText;
    restoreCursor(editor, pos - remove[0].length);
  }
}

/**
 * @description 多行缩进
 * @export
 * @param {HTMLElement} editor
 * @param {boolean} [remove=false]
 * @returns {*}  {void}
 */
export function indentSelection(editor: HTMLElement, remove = false): void {
  const text = editor.innerText;
  const range = getSelectionRange();
  if (!range) {
    return undefined;
  }
  const startOffset = range.startOffset;
  let start = getOffset(editor, range.startContainer, range.startOffset);
  const startIndex = text.substring(0, start).lastIndexOf('\n');
  if (startIndex !== -1) {
    start = startIndex + 1;
  }
  const endOffset = range.endOffset;
  let end = getOffset(editor, range.endContainer, range.endOffset);
  const endIndex = text.substring(end).indexOf('\n');
  if (endIndex !== -1) {
    end += endIndex;
  }
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  let lines = selected.split('\n');
  lines = lines.map(line => {
    if (remove) {
      return line.replace(/^ {1,4}/, '');
    }
    return TAB + line;
  });
  const result = before + lines.join('\n') + text.substring(end);
  editor.innerText = result;
  const indent = remove ? -tabSize : tabSize;
  const contentLen = lines.slice(0, lines.length - 1).join('\n').length;
  requestAnimationFrame(() => {
    restoreSelection(
      editor,
      start + startOffset + indent,
      before.length + contentLen + endOffset + indent,
      startOffset + indent,
      endOffset + indent,
    );
  });
}
