import { SlateEditor, DomEditor } from '@wangeditor/editor';
import '../../node_modules/.pnpm/snabbdom@3.6.2/node_modules/snabbdom/build/index.mjs';
import { isMove } from './utils/index.mjs';
import { h } from '../../node_modules/.pnpm/snabbdom@3.6.2/node_modules/snabbdom/build/h.mjs';

"use strict";
const pqlType = [
  "pql-field",
  "pql-field-value",
  "pql-field-operator",
  "pql-field-connection"
];
function withPqlPlugin(editor) {
  var _a;
  const { isVoid, isInline, deleteBackward, deleteFragment, insertText } = editor;
  const newEditor = editor;
  const config = newEditor.getConfig();
  const pql = (_a = config.EXTEND_CONF) == null ? void 0 : _a.pql;
  let timer;
  const updateCursor = () => {
    var _a2;
    const { selection } = editor;
    if (selection && ((_a2 = selection.focus) == null ? void 0 : _a2.offset) === 0) {
      const node = SlateEditor.node(editor, selection)[0];
      if (node) {
        const el = editor.toDOMNode(node);
        if (isMove(el)) {
          editor.move(1);
        }
      }
    }
  };
  newEditor.isVoid = (el) => {
    const type = DomEditor.getNodeType(el);
    if (pqlType.includes(type)) {
      return true;
    }
    return isVoid(el);
  };
  newEditor.isInline = (el) => {
    const type = DomEditor.getNodeType(el);
    if (pqlType.includes(type)) {
      return true;
    }
    return isInline(el);
  };
  newEditor.deleteBackward = (unit) => {
    deleteBackward(unit);
    if (pql && pql.showSuggestion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        updateCursor();
        pql.showSuggestion();
      }, 10);
    }
  };
  newEditor.deleteFragment = (direction) => {
    deleteFragment(direction);
    if (pql && pql.showSuggestion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        updateCursor();
        pql.showSuggestion();
      }, 10);
    }
  };
  newEditor.insertText = (text) => {
    insertText(text);
    if (pql && pql.showSuggestion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        pql.showSuggestion();
      }, 10);
    }
  };
  return newEditor;
}
function renderPqlElement(el) {
  const { type, label = "" } = el;
  if (type === "pql-field-operator" || type === "pql-field-connection") {
    return h(
      "span",
      {
        props: {
          contentEditable: false
        },
        style: {
          display: "inline-block",
          lineHeight: "22px"
        }
      },
      [label]
    );
  }
  if (type === "pql-field-value") {
    return h(
      "span",
      {
        props: {
          contentEditable: false
        },
        style: {
          display: "inline-block",
          lineHeight: "22px",
          color: "#5dcfff"
        }
      },
      [label]
    );
  }
  const vNode = h(
    "span",
    {
      props: {
        contentEditable: false
      },
      style: {
        color: "#6698ff",
        backgroundColor: "#edf2fd",
        display: "inline-block",
        padding: "0 5px",
        borderRadius: "3px",
        lineHeight: "22px"
      }
    },
    [label]
  );
  return vNode;
}
function pqlToHtml(el) {
  const type = el.type || "";
  if (!type) {
    return el.text || "";
  }
  const html = '<span\n        data-pql="true"\n        data-w-e-type="'.concat(type, '"\n        data-w-e-is-void\n        data-w-e-is-inline\n        data-label="').concat(el.label || "", '"\n        data-value="').concat(el.value || "", '"\n    ></span>');
  return html;
}
function parsePqlHtml(domElem) {
  const type = domElem.getAttribute("data-w-e-type") || "";
  const label = domElem.getAttribute("data-label") || "";
  const value = domElem.getAttribute("data-value") || "";
  if (type) {
    return {
      type,
      label,
      value,
      children: [{ text: "" }]
    };
  }
  return {
    children: [{ text: "" }]
  };
}
const PqlModule = {
  editorPlugin: withPqlPlugin,
  renderElems: pqlType.map((type) => {
    return {
      type,
      renderElem: renderPqlElement
    };
  }),
  elemsToHtml: pqlType.map((type) => {
    return {
      type,
      elemToHtml: pqlToHtml
    };
  }),
  parseElemsHtml: [
    {
      selector: 'span[data-pql="true"]',
      parseElemHtml: parsePqlHtml
    }
  ]
};

export { PqlModule, parsePqlHtml, pqlToHtml, renderPqlElement, withPqlPlugin };
