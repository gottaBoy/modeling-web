/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-useless-escape */
import { RuntimeError } from '@ibiz-template/core';
import { ValueOP } from '@ibiz-template/runtime';
import { SlateNode } from '@wangeditor/editor';
import {
  IPqlItem,
  IPqlNode,
  IPqlNodeItem,
  ISchemaField,
} from '../../../interface';

// 过滤操作模式
export const getFilterModes = (): IData[] => {
  return [
    {
      valueOP: ValueOP.EQ,
      label: ibiz.i18n.t('control.searchBar.conditions.eq'),
      sqlOP: '=',
    },
    {
      valueOP: ValueOP.NOT_EQ,
      label: ibiz.i18n.t('control.searchBar.conditions.not_eq'),
      sqlOP: '<>',
    },
    {
      valueOP: ValueOP.GT,
      label: ibiz.i18n.t('control.searchBar.conditions.gt'),
      sqlOP: '>',
    },
    {
      valueOP: ValueOP.GT_AND_EQ,
      label: ibiz.i18n.t('control.searchBar.conditions.gt_and_eq'),
      sqlOP: '>=',
    },
    {
      valueOP: ValueOP.LT,
      label: ibiz.i18n.t('control.searchBar.conditions.lt'),
      sqlOP: '<',
    },
    {
      valueOP: ValueOP.LT_AND_EQ,
      label: ibiz.i18n.t('control.searchBar.conditions.lt_and_eq'),
      sqlOP: '<=',
    },
    {
      valueOP: ValueOP.IS_NULL,
      label: ibiz.i18n.t('control.searchBar.conditions.is_null'),
      sqlOP: 'IS NULL',
    },
    {
      valueOP: ValueOP.IS_NOT_NULL,
      label: ibiz.i18n.t('control.searchBar.conditions.is_not_null'),
      sqlOP: 'IS NOT NULL',
    },
    {
      valueOP: ValueOP.IN,
      label: ibiz.i18n.t('control.searchBar.conditions.in'),
      sqlOP: 'IN',
    },
    {
      valueOP: ValueOP.NOT_IN,
      label: ibiz.i18n.t('control.searchBar.conditions.not_in'),
      sqlOP: 'NOT IN',
    },
    {
      valueOP: ValueOP.LIKE,
      label: ibiz.i18n.t('control.searchBar.conditions.like'),
      sqlOP: 'LIKE',
    },
  ];
};

// 不需要下拉提示的操作符
export const InputOPs: string[] = [ValueOP.IN, ValueOP.NOT_IN, ValueOP.LIKE];

// 不需要编辑器的操作符
export const ExcludeOPs: string[] = [
  ValueOP.IS_NULL,
  ValueOP.IS_NOT_NULL,
  ValueOP.EXISTS,
  ValueOP.NOT_EXISTS,
];

// 范围操作符
export const InOPs: string[] = [ValueOP.IN, ValueOP.NOT_IN];

// 过滤操作模式映射
export const getFilterModeMap = (): Map<unknown, IData> => {
  const filterModes = getFilterModes();
  const filterModeMap = new Map();
  filterModes.forEach(mode => {
    filterModeMap.set(mode.valueOP, mode);
  });
  return filterModeMap;
};

// 过滤操作符号映射
export const getSymbolMap = (): Map<any, string> => {
  const filterModes = getFilterModes();
  const symbolMap = new Map();
  filterModes.forEach(mode => {
    symbolMap.set(mode.sqlOP, mode.valueOP);
  });
  return symbolMap;
};

// 生成pql项
export const generateItems = (children: IData[]): IPqlItem[] => {
  if (!children.length) {
    return [];
  }
  const items: IPqlItem[] = [];
  for (let i = 0; i < children.length; i++) {
    if (i !== 0) {
      const connection = children[i];
      if (connection && connection.type === 'pql-field-connection') {
        if (i === children.length - 1) {
          throw new RuntimeError('pql节点解析错误');
        }
        items.push({
          type: 'connection',
          value: {
            label: connection.label,
            value: connection.value,
          },
        });
      } else {
        throw new RuntimeError('pql节点解析错误');
      }
    }
    const key = children[i !== 0 ? ++i : i];
    const operator = children[++i];
    if (
      key &&
      operator &&
      key.type === 'pql-field' &&
      operator.type === 'pql-field-operator'
    ) {
      if (operator.value && ExcludeOPs.includes(operator.value)) {
        items.push({
          type: 'condition',
          key: {
            label: key.label,
            value: key.value,
          },
          operator: {
            label: operator.label,
            value: operator.value,
          },
        });
        continue;
      } else {
        const value = children[++i];
        if (value && (value.type === 'pql-field-value' || value.text)) {
          items.push({
            type: 'condition',
            key: {
              label: key.label,
              value: key.value,
            },
            operator: {
              label: operator.label,
              value: operator.value,
            },
            value: {
              type: value.type,
              label:
                value.type === 'pql-field-value' ? value.label : value.text,
              value:
                value.type === 'pql-field-value' ? value.value : value.text,
            },
          });
          continue;
        }
      }
    }

    throw new RuntimeError('pql节点解析错误');
  }

  return items;
};

// 生成节点项
export const generateNodeItems = (
  currentNode?: IData,
  getPreviousNode?: (node?: SlateNode) => SlateNode | undefined,
): IPqlNodeItem[] => {
  if (!currentNode || !getPreviousNode) {
    return [];
  }
  const nodes: IPqlNode[] = [];
  while (currentNode) {
    nodes.push(currentNode as IPqlNode);
    currentNode = getPreviousNode(currentNode as SlateNode);
  }
  const result: IPqlNodeItem[] = [];
  nodes.reverse();
  let current: IPqlNodeItem = { type: 'condition' };
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 'pql-field') {
      if (current.key || current.operator || current.value) {
        result.push(current);
        current = { type: 'condition', key: node };
      } else {
        current.key = node;
      }
    }
    if (node.type === 'pql-field-operator') {
      if (current.operator || current.value) {
        result.push(current);
        current = { type: 'condition', operator: node };
      } else {
        current.operator = node;
      }
      if (
        node.value &&
        InOPs.includes(node.value) &&
        i < nodes.length - 1 &&
        nodes[i + 1].type !== 'pql-field-connection'
      ) {
        if (
          nodes[i + 1].type === 'pql-field' ||
          nodes[i + 1].type === 'pql-field-operator'
        ) {
          continue;
        }
        current.value = [];
        i++;
        while (
          i < nodes.length &&
          nodes[i].type !== 'pql-field-connection' &&
          nodes[i].type !== 'pql-field' &&
          nodes[i].type !== 'pql-field-operator'
        ) {
          current.value.push(nodes[i]);
          i++;
        }
        if (
          i < nodes.length &&
          (nodes[i].type === 'pql-field-connection' ||
            nodes[i].type === 'pql-field' ||
            nodes[i].type === 'pql-field-operator')
        ) {
          i--;
        }
      }
    }
    if (node.type === 'pql-field-value') {
      if (
        current.value ||
        (current.operator?.value && ExcludeOPs.includes(current.operator.value))
      ) {
        current = { type: 'condition', value: [node] };
      } else {
        current.value = [node];
      }
    }
    if (node.type === 'pql-field-connection') {
      if (current.key || current.operator || current.value) {
        result.push(current);
      }
      result.push({ type: 'connection', value: [node] });
      current = { type: 'condition' };
    }
    if (!node.type && node.text) {
      if (
        current.value ||
        (current.operator?.value && ExcludeOPs.includes(current.operator.value))
      ) {
        result.push(current);
        current = { type: 'condition', value: [node] };
      } else {
        current.value = [node];
      }
    }
  }

  if (current.key || current.operator || current.value) {
    result.push(current);
  }
  return result;
};

// 生成自定义条件
export const generateCustomCond = (
  items: IPqlNodeItem[],
  fields: ISchemaField[],
): string => {
  const map = new Map<string, ISchemaField>();
  fields.forEach(item => {
    map.set(item.appDEFieldId, item);
  });
  let cond = '';
  items.forEach(item => {
    if (item.type === 'condition') {
      const { key, operator, value } = item;
      const filterModeMap = getFilterModeMap();
      const symbol = filterModeMap.get(operator?.value)?.sqlOP;
      const valueText = value
        ?.filter(_v => _v.type || _v.text)
        .map(_v => {
          if (_v.type) {
            return `\$${JSON.stringify({
              value: _v?.value || '',
              caption: _v?.label || '',
              field: `${
                map.get(key?.value || '')?.appDataEntityFullTag || ''
              }.${key?.value || ''}`,
            })}`;
          }
          if (operator?.value === ValueOP.LIKE) {
            return `'%${_v.text?.trim() || ''}%'`;
          }
          if (operator?.value && InOPs.includes(operator.value)) {
            return (
              _v.text?.trim().replace(/^\[/, '(').replace(/\]$/, ')') || ''
            );
          }
          return _v.text?.trim() || '';
        })
        .join('')
        .replace(/\s+/g, ' ');
      const valueStr = value ? `  ${valueText}` : '';
      cond += `\$${JSON.stringify({
        name: key?.value || '',
        caption: key?.label || '',
      })}  ${symbol}${valueStr}`;
    }

    if (item.type === 'connection') {
      cond += `  ${item.value
        ?.filter(_v => _v.value)
        .map(_v => _v.value)
        .join()}  `;
    }
  });
  return cond;
};

// 解析自定义条件
export const parseCustomCond = (cond: string): IData[] | undefined => {
  try {
    const items = cond.split(`  `);
    const pqlItems: IPqlItem[] = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== 0) {
        const connection = items[i];
        if (connection === 'and' || connection === 'or') {
          if (i === items.length - 1) {
            throw new RuntimeError('pql自定义条件解析错误');
          }
          pqlItems.push({
            type: 'connection',
            value: {
              label: connection,
              value: connection,
            },
          });
        } else {
          throw new RuntimeError('pql自定义条件解析错误');
        }
      }
      const key = items[i !== 0 ? ++i : i];
      const operator = items[++i];

      if (key && /^\$/.test(key) && operator) {
        const keyObj: IData = JSON.parse(key.slice(1));
        const symbolMap = getSymbolMap();
        const filterModeMap = getFilterModeMap();
        if (
          symbolMap.get(operator) &&
          ExcludeOPs.includes(symbolMap.get(operator)!)
        ) {
          pqlItems.push({
            type: 'condition',
            key: {
              label: keyObj.caption,
              value: keyObj.name,
            },
            operator: {
              label: filterModeMap.get(symbolMap.get(operator))?.label || '',
              value: symbolMap.get(operator),
            },
          });
          continue;
        } else {
          const value = items[++i];
          if (value) {
            const valueObj: IData = /^\$/.test(value)
              ? JSON.parse(value.slice(1))
              : { caption: value, value };
            pqlItems.push({
              type: 'condition',
              key: {
                label: keyObj.caption,
                value: keyObj.name,
              },
              operator: {
                label: filterModeMap.get(symbolMap.get(operator))?.label || '',
                value: symbolMap.get(operator),
              },
              value: {
                type: /^\$/.test(value) ? 'pql-field-value' : undefined,
                label: valueObj.caption,
                value: valueObj.value,
              },
            });
            continue;
          }
        }
      }
      throw new RuntimeError('pql自定义条件解析错误');
    }
    return pqlItems;
  } catch (err) {
    ibiz.log.error((err as IData)?.message);
  }
};

// pql项转pql节点
export const pqlItemsToPqlNodes = async (
  items: IPqlItem[],
): Promise<IPqlNode[]> => {
  const nodes: IPqlNode[] = [];
  items.forEach(item => {
    if (item.type === 'condition') {
      const { key, operator, value } = item;
      nodes.push({
        type: 'pql-field',
        label: key?.label,
        value: key?.value,
      });
      nodes.push({
        type: 'pql-field-operator',
        label: operator?.label,
        value: operator?.value,
      });
      if (!value?.type) {
        if (operator?.value && InOPs.includes(operator.value)) {
          if (value?.value && /^\(.*?\)$/.test(value.value)) {
            const valueText = value.value.slice(1, -1).trim();
            let splitArr = valueText.split(/\},\s*/g);
            splitArr = splitArr.map((text, i) =>
              i === splitArr.length - 1 ? text : `${text}}`,
            );
            if (splitArr.length && splitArr.every(text => /^\$/.test(text))) {
              nodes.push({
                text: '[',
              });
              splitArr.forEach((text, i) => {
                let valueObj: IData;
                try {
                  valueObj = JSON.parse(text.slice(1));
                } catch (err) {
                  valueObj = { caption: text, value: text };
                }
                nodes.push({
                  type: 'pql-field-value',
                  label: valueObj?.caption,
                  value: valueObj?.value,
                });
                if (i !== splitArr.length - 1) {
                  nodes.push({
                    text: ',',
                  });
                }
              });
              nodes.push({
                text: ']',
              });
              return;
            }
          }
        }
        if (operator?.value === ValueOP.LIKE) {
          if (
            value?.value &&
            value.value.startsWith(`'%`) &&
            value.value.endsWith(`%'`)
          ) {
            nodes.push({
              text: value.value.slice(2, -2),
            });
            return;
          }
        }
        nodes.push({
          text: value?.value,
        });
      } else {
        nodes.push({
          type: 'pql-field-value',
          label: value?.label,
          value: value?.value,
        });
      }
    }
    if (item.type === 'connection') {
      nodes.push({
        type: 'pql-field-connection',
        label: item.value?.label,
        value: item.value?.value,
      });
    }
  });
  return nodes;
};

// pql节点转html
export const pqlNodeToHtml = (node: IPqlNode): string => {
  const type = node.type || '';

  if (!type) {
    return node.text || '';
  }

  // 生成 HTML 代码
  const html = `<span
        data-pql="true"
        data-w-e-type="${type}"
        data-w-e-is-void
        data-w-e-is-inline
        data-label="${node.label || ''}"
        data-value="${node.value || ''}"
    ></span>`;

  return html;
};

// pql节点集合转html
export const pqlNodesToHtml = (nodes: IPqlNode[]): string => {
  let html = '<p>';
  nodes.forEach(node => {
    html += pqlNodeToHtml(node);
  });
  html += '</p>';
  return html;
};

// 是否移动光标
export function isMove(el?: HTMLElement | null): boolean {
  if (!el) {
    return false;
  }
  if (
    el.getAttribute('data-slate-node') === 'element' &&
    el.getAttribute('data-slate-inline') &&
    el.getAttribute('data-slate-void')
  ) {
    return true;
  }
  return isMove(el.parentElement);
}
