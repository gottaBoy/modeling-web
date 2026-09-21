/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DomEditor,
  IDomEditor,
  IModuleConf,
  SlateEditor,
  SlateElement,
} from '@wangeditor/editor';
import { VNode, h } from 'snabbdom';
import { isMove } from './utils';

// pql节点
const pqlType = [
  'pql-field',
  'pql-field-value',
  'pql-field-operator',
  'pql-field-connection',
];

/**
 * PQL插件
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:39
 * @export
 * @template T
 * @param {T} editor
 * @return {*}
 */
export function withPqlPlugin<T extends IDomEditor>(editor: T): T {
  const { isVoid, isInline, deleteBackward, deleteFragment, insertText } =
    editor;
  const newEditor = editor;

  const config = newEditor.getConfig();

  const pql = config.EXTEND_CONF?.pql;

  let timer: number | undefined;

  // 更新光标
  const updateCursor = () => {
    const { selection } = editor;
    if (selection && selection.focus?.offset === 0) {
      const node = SlateEditor.node(editor, selection)[0];
      if (node) {
        const el = editor.toDOMNode(node);
        if (isMove(el)) {
          editor.move(1);
        }
      }
    }
  };

  newEditor.isVoid = el => {
    const type = DomEditor.getNodeType(el);
    if (pqlType.includes(type)) {
      return true;
    }

    return isVoid(el);
  };

  newEditor.isInline = el => {
    const type = DomEditor.getNodeType(el);
    if (pqlType.includes(type)) {
      return true;
    }

    return isInline(el);
  };

  newEditor.deleteBackward = unit => {
    deleteBackward(unit);
    if (pql && pql.showSuggestion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        updateCursor();
        pql.showSuggestion();
      }, 10);
    }
  };

  newEditor.deleteFragment = direction => {
    deleteFragment(direction);
    if (pql && pql.showSuggestion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        updateCursor();
        pql.showSuggestion();
      }, 10);
    }
  };

  newEditor.insertText = text => {
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

/**
 * 渲染PQL元素
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:14
 * @export
 * @param {IData} el
 * @return {*}  {VNode}
 */
export function renderPqlElement(el: IData): VNode {
  const { type, label = '' } = el;

  if (type === 'pql-field-operator' || type === 'pql-field-connection') {
    return h(
      'span',
      {
        props: {
          contentEditable: false,
        },
        style: {
          display: 'inline-block',
          lineHeight: '22px',
        },
      },
      [label],
    );
  }

  if (type === 'pql-field-value') {
    return h(
      'span',
      {
        props: {
          contentEditable: false,
        },
        style: {
          display: 'inline-block',
          lineHeight: '22px',
          color: '#5dcfff',
        },
      },
      [label],
    );
  }

  const vNode = h(
    'span',
    {
      props: {
        contentEditable: false,
      },
      style: {
        color: '#6698ff',
        backgroundColor: '#edf2fd',
        display: 'inline-block',
        padding: '0 5px',
        borderRadius: '3px',
        lineHeight: '22px',
      },
    },
    [label],
  );

  return vNode;
}

/**
 * 转换PQL元素为html
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:38
 * @param {IData} el
 * @return {*}  {string}
 */
export function pqlToHtml(el: IData): string {
  const type = el.type || '';

  if (!type) {
    return el.text || '';
  }

  // 生成 HTML 代码
  const html = `<span
        data-pql="true"
        data-w-e-type="${type}"
        data-w-e-is-void
        data-w-e-is-inline
        data-label="${el.label || ''}"
        data-value="${el.value || ''}"
    ></span>`;

  return html;
}

/**
 * 转换html为PQL元素
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:32
 * @export
 * @param {Element} domElem
 * @return {*}  {SlateElement}
 */
export function parsePqlHtml(domElem: Element): SlateElement {
  const type = domElem.getAttribute('data-w-e-type') || '';
  const label = domElem.getAttribute('data-label') || '';
  const value = domElem.getAttribute('data-value') || '';
  if (type) {
    return {
      type,
      label,
      value,
      children: [{ text: '' }],
    } as SlateElement;
  }
  return {
    children: [{ text: '' }],
  };
}

/**
 * PQL模块
 *
 */
export const PqlModule: Partial<IModuleConf> = {
  editorPlugin: withPqlPlugin,
  renderElems: pqlType.map(type => {
    return {
      type,
      renderElem: renderPqlElement,
    };
  }),
  elemsToHtml: pqlType.map(type => {
    return {
      type,
      elemToHtml: pqlToHtml,
    };
  }),
  parseElemsHtml: [
    {
      selector: 'span[data-pql="true"]',
      parseElemHtml: parsePqlHtml,
    },
  ],
};
