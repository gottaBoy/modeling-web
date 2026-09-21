import { DomEditor } from '@wangeditor/editor';

"use strict";
const Plugin = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "emoji") {
      return true;
    }
    return isInline(elem);
  };
  editor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "emoji") {
      return true;
    }
    return isVoid(elem);
  };
  return editor;
};

export { Plugin };
