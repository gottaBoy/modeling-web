'use strict';

var editor = require('@wangeditor/editor');

"use strict";
const Plugin = (editor$1) => {
  const { isInline, isVoid } = editor$1;
  editor$1.isInline = (elem) => {
    const type = editor.DomEditor.getNodeType(elem);
    if (type === "emoji") {
      return true;
    }
    return isInline(elem);
  };
  editor$1.isVoid = (elem) => {
    const type = editor.DomEditor.getNodeType(elem);
    if (type === "emoji") {
      return true;
    }
    return isVoid(elem);
  };
  return editor$1;
};

exports.Plugin = Plugin;
