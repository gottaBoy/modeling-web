'use strict';

var editor = require('@wangeditor/editor');
var svg = require('../constants/svg.cjs');

"use strict";
function genDefaultToolbarKeys() {
  return [
    "headerSelect",
    // 'header1',
    // 'header2',
    // 'header3',
    "blockquote",
    "|",
    "bold",
    "underline",
    "italic",
    {
      key: "group-more-style",
      // 以 group 开头
      title: editor.t("editor.more"),
      iconSvg: svg.MORE_SVG,
      menuKeys: ["through", "code", "sup", "sub", "clearStyle"]
    },
    "color",
    "bgColor",
    "|",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "|",
    "bulletedList",
    "numberedList",
    "todo",
    {
      key: "group-justify",
      // 以 group 开头
      title: editor.t("editor.justify"),
      iconSvg: svg.JUSTIFY_LEFT_SVG,
      menuKeys: [
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify"
      ]
    },
    {
      key: "group-indent",
      // 以 group 开头
      title: editor.t("editor.indent"),
      iconSvg: svg.INDENT_RIGHT_SVG,
      menuKeys: ["indent", "delIndent"]
    },
    "|",
    "emotion",
    "insertLink",
    // 'editLink',
    // 'unLink',
    // 'viewLink',
    {
      key: "group-image",
      // 以 group 开头
      title: editor.t("editor.image"),
      iconSvg: svg.IMAGE_SVG,
      menuKeys: ["insertImage", "uploadImage"]
    },
    // 'deleteImage',
    // 'editImage',
    // 'viewImageLink',
    {
      key: "group-video",
      // 以 group 开头
      title: editor.t("editor.video"),
      iconSvg: svg.VIDEO_SVG,
      menuKeys: ["insertVideo", "uploadVideo"]
    },
    // 'deleteVideo',
    "insertTable",
    "codeBlock",
    // 'codeSelectLang',
    "divider",
    // 'deleteTable',
    "|",
    "undo",
    "redo",
    "|",
    "fullScreen",
    "emoji"
  ];
}

exports.genDefaultToolbarKeys = genDefaultToolbarKeys;
