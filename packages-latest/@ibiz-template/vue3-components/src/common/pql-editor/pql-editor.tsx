/* eslint-disable no-continue */
import {
  PropType,
  VNode,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IOverlayPopoverContainer } from '@ibiz-template/runtime';
import { RuntimeError, listenJSEvent } from '@ibiz-template/core';
import {
  Boot,
  DomEditor,
  IDomEditor,
  IEditorConfig,
  SlateEditor,
  SlateNode,
  SlatePath,
  createEditor,
} from '@wangeditor/editor';
import { IPqlNode, ISchemaField } from '../../interface';
import { PqlModule } from './pql-editor.module';
import { IBizPqlEditorSuggestion } from './components';
import {
  ExcludeOPs,
  InOPs,
  InputOPs,
  generateCustomCond,
  generateNodeItems,
  getFilterModes,
  isMove,
  parseCustomCond,
  pqlItemsToPqlNodes,
  pqlNodesToHtml,
} from './utils';
import './pql-editor.scss';

export const IBizPqlEditor = defineComponent({
  name: 'IBizPqlEditor',
  props: {
    fields: {
      type: Array as PropType<ISchemaField[]>,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    context: {
      type: Object as PropType<IContext>,
      required: true,
    },
    params: {
      type: Object as PropType<IParams>,
    },
    renderItem: {
      type: Function as PropType<(_item: IData) => VNode>,
    },
  },
  emits: {
    change: (_value: string) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('pql-editor');

    // 编辑器容器
    const editorRef = ref<HTMLElement>();

    // 编辑器
    let editor: IDomEditor | undefined;

    // popover容器
    let overlayPopover: IOverlayPopoverContainer | undefined;

    // 连接符列表
    const connectionList = [
      {
        type: 'pql-field-connection',
        label: 'and',
        value: 'and',
      },
      {
        type: 'pql-field-connection',
        label: 'or',
        value: 'or',
      },
    ];

    // 过滤模式
    const filterModes = getFilterModes();

    // 获取代码表项
    const getCodeListItems = async (appCodeListId: string) => {
      if (!props.context) {
        return [];
      }
      const app = ibiz.hub.getApp(props.context.srfappid);
      const items = await app.codeList.get(appCodeListId, props.context);
      return items;
    };

    // 获取当前节点的前一个节点
    const getPreviousNode = (node?: SlateNode): SlateNode | undefined => {
      if (!editor || !node) {
        return;
      }
      const path = DomEditor.findPath(editor, node);
      if (path && SlatePath.hasPrevious(path)) {
        const slateNode = SlateEditor.node(
          editor,
          SlatePath.previous(path),
        )?.[0];
        if (slateNode) {
          if ((slateNode as IData).type || (slateNode as IData).text) {
            return slateNode;
          }
          return getPreviousNode(slateNode);
        }
      }
    };

    // 获取当前选中节点
    const getCurrentNode = (): SlateNode | undefined => {
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      if (selection) {
        const slateNode = SlateEditor.node(editor, selection)?.[0];
        if (slateNode) {
          if ((slateNode as IData).type || (slateNode as IData).text) {
            return slateNode;
          }
          return getPreviousNode(slateNode);
        }
      }
    };

    // 获取实体数据建议项
    const getEntitySuggestionItems = async (field?: ISchemaField) => {
      if (!field || !field.appDataEntityId) {
        return;
      }
      const service = await ibiz.hub.getAppDEService(
        props.context.srfappid,
        field.appDataEntityId,
        props.context,
      );
      const data = await service.fetchDefault(props.context, props.params);
      if (data && Array.isArray(data.data)) {
        const items = data.data;
        if (items.length) {
          return items.map(item => {
            return {
              type: 'pql-field-value',
              label: item.srfmajortext,
              value: item.srfkey,
            };
          });
        }
        return [
          {
            _msg: ibiz.i18n.t('control.common.currentNoData'),
          },
        ];
      }
    };

    // 获取搜索建议
    const getSuggestionItems = async (): Promise<IData[]> => {
      if (!editor) {
        return [];
      }
      const currenNode = getCurrentNode() as IData;
      const { selection } = editor;
      if (!selection) {
        return [];
      }
      if (selection && selection.focus?.path?.[0] !== 0) {
        return [];
      }
      if (!currenNode) {
        if (selection && selection.focus?.offset === 0) {
          const node = SlateEditor.node(editor, selection)[0];
          if (node) {
            const el = editor.toDOMNode(node);
            if (isMove(el)) {
              return [];
            }
          }
        }
      }
      if (editor.selection) {
        const node = SlateEditor.node(editor, editor.selection);
        if (node && (node[0] as IData)?.type) {
          return [];
        }
      }
      const nodeItems = generateNodeItems(currenNode, getPreviousNode);
      const nodeItem = nodeItems[nodeItems.length - 1];
      if (nodeItem && nodeItem.type === 'condition') {
        if (
          nodeItem.operator?.value &&
          InOPs.includes(nodeItem.operator.value)
        ) {
          if (nodeItem.value) {
            if (
              currenNode === nodeItem.value[nodeItem.value.length - 1] &&
              currenNode.text
            ) {
              const text = currenNode.text
                .slice(0, selection.focus.offset)
                .trim();
              if (text === ',' || text === '[') {
                const field = props.fields.find(
                  item => item.appDEFieldId === nodeItem.key?.value,
                );
                if (field && field.appCodeListId) {
                  const items = await getCodeListItems(field.appCodeListId);
                  return items.map(item => {
                    return {
                      type: 'pql-field-value',
                      label: item.text,
                      value: item.value,
                    };
                  });
                }
                const entitySuggestionItems =
                  await getEntitySuggestionItems(field);
                if (entitySuggestionItems) {
                  return entitySuggestionItems;
                }
              }
              if (text === ']' || text === '[]') {
                return connectionList;
              }
              if (nodeItem.value.length === 1 && text) {
                return connectionList;
              }
            }
          }
          return [];
        }
      }

      if (currenNode && currenNode.type === 'pql-field') {
        const field = props.fields.find(
          item => item.appDEFieldId === currenNode.value,
        );
        if (field && field.valueOPs) {
          return filterModes
            .filter(mode => field.valueOPs.includes(mode.valueOP))
            .map(item => {
              return {
                type: 'pql-field-operator',
                label: item.label,
                value: item.valueOP,
              };
            });
        }
        return [];
      }

      if (currenNode && currenNode.type === 'pql-field-value') {
        return connectionList;
      }

      if (currenNode && currenNode.type === 'pql-field-operator') {
        const mode = filterModes.find(
          _mode => _mode.valueOP === currenNode.value,
        );
        if (mode) {
          if (InputOPs.includes(mode.valueOP)) {
            return [];
          }
          if (ExcludeOPs.includes(mode.valueOP)) {
            return connectionList;
          }
          const previousNode = getPreviousNode(
            currenNode as SlateNode,
          ) as IData;
          if (previousNode && previousNode.type === 'pql-field') {
            const field = props.fields.find(
              item => item.appDEFieldId === previousNode.value,
            );
            if (field && field.appCodeListId) {
              const items = await getCodeListItems(field.appCodeListId);
              return items.map(item => {
                return {
                  type: 'pql-field-value',
                  label: item.text,
                  value: item.value,
                };
              });
            }
            const entitySuggestionItems = await getEntitySuggestionItems(field);
            if (entitySuggestionItems) {
              return entitySuggestionItems;
            }
          }
        }
        return [];
      }

      if (currenNode && currenNode.type === 'pql-field-connection') {
        return props.fields.map(item => {
          return {
            type: 'pql-field',
            label: item.caption,
            value: item.appDEFieldId,
          };
        });
      }

      if (currenNode && !currenNode.type) {
        const previousNode = getPreviousNode(
          currenNode as SlateNode,
        ) as IPqlNode;
        if (previousNode && previousNode.type === 'pql-field-operator') {
          if (editor.selection?.focus.offset !== 0) {
            return connectionList;
          }
          return [];
        }
        if (previousNode && previousNode.type === 'pql-field') {
          if (editor.selection?.focus.offset !== 0) {
            return connectionList;
          }
          const field = props.fields.find(
            item => item.appDEFieldId === previousNode.value,
          );
          if (field && field.valueOPs) {
            return filterModes
              .filter(mode => field.valueOPs.includes(mode.valueOP))
              .map(item => {
                return {
                  type: 'pql-field-operator',
                  label: item.label,
                  value: item.valueOP,
                };
              });
          }
        }
        if (previousNode && previousNode.type === 'pql-field-connection') {
          if (editor.selection?.focus.offset !== 0) {
            return connectionList;
          }
          return props.fields.map(item => {
            return {
              type: 'pql-field',
              label: item.caption,
              value: item.appDEFieldId,
            };
          });
        }
        if (previousNode && previousNode.type === 'pql-field-value') {
          return connectionList;
        }
        return [];
      }

      return props.fields.map(item => {
        return {
          type: 'pql-field',
          label: item.caption,
          value: item.appDEFieldId,
        };
      });
    };

    // 处理搜索建议选中
    const handelSuggestionSelect = (item: IData) => {
      if (!editor) {
        return;
      }
      editor.restoreSelection();
      if (!item.type) {
        editor.insertText(item.label);
        return;
      }
      const node = {
        type: item.type,
        label: item.label,
        value: item.value,
        children: [{ text: '' }],
      };
      editor.insertNode(node);
      editor.move(1);
      if (item.type === 'pql-field-operator' && InOPs.includes(item.value)) {
        editor.insertText('[]');
        editor.moveReverse(1);
      }
    };

    // 展示搜索建议
    const showSuggestion = async (): Promise<void> => {
      if (!editor) {
        return;
      }
      const popover = overlayPopover;
      overlayPopover = undefined;
      await popover?.dismiss();
      const selection = window.getSelection();
      if (!selection) {
        return;
      }
      const { focusNode } = selection;
      if (!focusNode || !focusNode.parentNode) {
        return;
      }
      const items = await getSuggestionItems();
      if (overlayPopover || !editor.isFocused()) {
        return;
      }
      if (!items || !items.length) {
        return;
      }
      overlayPopover = ibiz.overlay.createPopover(
        () => {
          return (
            <IBizPqlEditorSuggestion
              items={items}
              renderItem={props.renderItem}
              onSelect={handelSuggestionSelect}
            ></IBizPqlEditorSuggestion>
          );
        },
        undefined,
        {
          placement: 'bottom-start',
          autoClose: true,
          width: '200px',
          noArrow: true,
        },
      );
      await overlayPopover.present(focusNode.parentNode as HTMLElement);
      await overlayPopover.onWillDismiss();
      overlayPopover = undefined;
    };

    // 错误提示信息
    const errorMsg = ref<string>();

    // 错误信息高亮元素
    const errorMsgEl = ref<HTMLElement>();

    // 校验内容是否合法
    const verifyNode = () => {
      if (!editor) {
        return;
      }
      const nodes: IPqlNode[] = (editor.children[0] as IData)?.children || [];
      const children = nodes.filter(node => node.type || node.text);
      if (!children.length) {
        return;
      }
      const items = generateNodeItems(
        children[children.length - 1],
        getPreviousNode,
      );

      if (!items.length) {
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type === 'connection') {
          if (
            items[i - 1]?.type === 'connection' ||
            i === 0 ||
            i === items.length - 1
          ) {
            return {
              msg: ibiz.i18n.t('component.pqlEditor.noExpression'),
              child: item.value?.[0],
            };
          }
          continue;
        }
        if (item.type === 'condition' && items[i - 1]?.type === 'condition') {
          let child;
          if (item.key) {
            child = item.key;
          } else if (item.operator) {
            child = item.operator;
          } else if (item.value) {
            child = item.value?.[0];
          }
          return {
            msg: ibiz.i18n.t('component.pqlEditor.noConnection'),
            child,
          };
        }
        if (!item.key) {
          let child;
          if (item.operator) {
            child = item.operator;
          } else if (item.value) {
            child = item.value?.[0];
          }
          return {
            msg: ibiz.i18n.t('component.pqlEditor.noKey'),
            child,
          };
        }
        if (!item.operator) {
          let child: IPqlNode | undefined = item.key;
          if (item.value) {
            child = item.value[0];
          } else if (items[i + 1]) {
            if (items[i + 1].type === 'connection') {
              child = items[i + 1].value?.[0];
            } else if (items[i + 1].key) {
              child = items[i + 1].key;
            } else if (items[i + 1].operator) {
              child = items[i + 1].operator;
            } else if (items[i + 1].value) {
              child = items[i + 1].value?.[0];
            }
          }
          return {
            msg: ibiz.i18n.t('component.pqlEditor.noOperator'),
            child,
          };
        }
        if (
          item.operator.value &&
          !ExcludeOPs.includes(item.operator.value) &&
          !item.value
        ) {
          let child: IPqlNode | undefined = item.operator;
          if (items[i + 1]) {
            if (items[i + 1].type === 'connection') {
              child = items[i + 1].value?.[0];
            } else if (items[i + 1].key) {
              child = items[i + 1].key;
            } else if (items[i + 1].operator) {
              child = items[i + 1].operator;
            } else if (items[i + 1].value) {
              child = items[i + 1].value?.[0];
            }
          }
          return {
            msg: ibiz.i18n.t('component.pqlEditor.noValue'),
            child,
          };
        }
        if (item.operator.value && InOPs.includes(item.operator.value)) {
          const value = item.value;
          if (Array.isArray(value)) {
            if (value.length > 1 && value[0].text?.trim() !== '[') {
              return {
                msg: ibiz.i18n.t('component.pqlEditor.errorCombination'),
                child: value[0],
              };
            }
            let type = 'value';
            for (let j = 1; j < value.length; j++) {
              if (j === value.length - 1) {
                if (value[value.length - 1].text?.trim() !== ']') {
                  let child: IPqlNode | undefined = value[value.length - 1];
                  if (child.type === 'pql-field-value') {
                    if (items[i + 1]) {
                      if (items[i + 1].type === 'connection') {
                        child = items[i + 1].value?.[0];
                      } else if (items[i + 1].key) {
                        child = items[i + 1].key;
                      } else if (items[i + 1].operator) {
                        child = items[i + 1].operator;
                      } else if (items[i + 1].value) {
                        child = items[i + 1].value?.[0];
                      }
                    }
                  }
                  return {
                    msg: ibiz.i18n.t('component.pqlEditor.errorCombination'),
                    child,
                  };
                }
                continue;
              }
              if (type === 'value') {
                if (value[j].type !== 'pql-field-value') {
                  return {
                    msg: ibiz.i18n.t('component.pqlEditor.errorDelimiter'),
                    child: value[j],
                  };
                }
                type = 'text';
              } else if (type === 'text') {
                if (value[j].type || value[j].text?.trim() !== ',') {
                  return {
                    msg: ibiz.i18n.t('component.pqlEditor.noDelimiter'),
                    child: value[j],
                  };
                }
                type = 'value';
              }
            }
          }
        }
      }
    };

    // 校验编辑器内容是否合法
    const verify = () => {
      if (errorMsg.value) {
        return false;
      }
      return true;
    };

    // 当前值
    const currentValue = ref('');
    // 编辑器文本
    const htmlText = ref('');

    watch(
      () => props.value,
      async () => {
        if (props.value === currentValue.value) {
          return;
        }
        if (!props.value) {
          currentValue.value = '';
          htmlText.value = '';
          editor?.clear();
          return;
        }
        const pqlItems = parseCustomCond(props.value);
        if (pqlItems) {
          const nodes = await pqlItemsToPqlNodes(pqlItems);
          if (nodes && nodes.length) {
            const html = pqlNodesToHtml(nodes);
            currentValue.value = props.value;
            htmlText.value = html;
            editor?.setHtml(html);
            return;
          }
        }
        currentValue.value = '';
        htmlText.value = '';
        editor?.clear();
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.fields,
      async () => {
        if (!props.value) {
          currentValue.value = '';
          htmlText.value = '';
          editor?.clear();
          return;
        }
        const pqlItems = parseCustomCond(props.value);
        if (pqlItems) {
          const nodes = await pqlItemsToPqlNodes(pqlItems);
          if (nodes && nodes.length) {
            const html = pqlNodesToHtml(nodes);
            currentValue.value = props.value;
            htmlText.value = html;
            editor?.setHtml(html);
            return;
          }
        }
        currentValue.value = '';
        htmlText.value = '';
        editor?.clear();
      },
      {
        immediate: true,
      },
    );

    // 处理值变更
    const handleChange = () => {
      if (!editor) {
        return;
      }
      const nodes: IPqlNode[] = (editor.children[0] as IData)?.children || [];
      const children = nodes.filter(node => node.type || node.text);
      setTimeout(() => {
        if (!editor) {
          return;
        }
        const { msg, child } = verifyNode() || {};

        errorMsg.value = msg || '';
        errorMsgEl.value?.classList.remove(ns.b('error-msg'));
        if (child) {
          const el = editor.toDOMNode(child as SlateNode);
          if (el) {
            errorMsgEl.value = el;
            el.classList.add(ns.b('error-msg'));
          }
        }
        if (!msg) {
          try {
            const items = generateNodeItems(
              children[children.length - 1],
              getPreviousNode,
            );
            const customCond = generateCustomCond(items, props.fields);
            currentValue.value = customCond;
            emit('change', customCond);
          } catch (err) {
            ibiz.log.error((err as RuntimeError)?.message);
          }
        }
      }, 10);
    };

    // 清除监听
    let cleanupKeydown = () => {};
    let cleanupClick = () => {};

    onMounted(() => {
      if (!editorRef.value) {
        return;
      }
      if (!(window as IData).PqlModule) {
        Boot.registerModule(PqlModule);
        (window as IData).PqlModule = true;
      }
      // 编辑器配置
      const editorConfig: Partial<IEditorConfig> = {
        autoFocus: false,
        readOnly: props.readonly,
        placeholder: props.placeholder,
        EXTEND_CONF: {
          pql: { showSuggestion },
        },
        onFocus: () => {
          setTimeout(() => {
            showSuggestion();
          }, 10);
        },
        onChange: handleChange,
      };
      editor = createEditor({
        selector: editorRef.value,
        config: editorConfig,
        mode: 'simple',
      });
      editor.setHtml(htmlText.value);
      cleanupKeydown = listenJSEvent(
        editorRef.value,
        'keydown',
        (event: KeyboardEvent) => {
          setTimeout(() => {
            if (
              (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
              editor
            ) {
              setTimeout(() => {
                showSuggestion();
              }, 10);
            }
            if (
              (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
              editor
            ) {
              const { selection } = editor;
              if (selection && selection.focus.offset === 0) {
                const node = SlateEditor.node(editor, selection)[0];
                if (node) {
                  const el = editor.toDOMNode(node);
                  if (isMove(el)) {
                    if (event.key === 'ArrowLeft') {
                      editor.moveReverse(1);
                    }
                    if (event.key === 'ArrowRight') {
                      editor.move(1);
                    }
                  }
                }
              }
              setTimeout(() => {
                showSuggestion();
              }, 10);
            }
          }, 10);
          if (event.key === 'Escape' || event.key === 'Enter') {
            event.stopPropagation();
            overlayPopover?.dismiss();
          }
        },
      );
      if (!props.readonly) {
        cleanupClick = listenJSEvent(editorRef.value, 'click', () => {
          setTimeout(() => {
            showSuggestion();
          }, 10);
        });
      }
    });

    onUnmounted(() => {
      cleanupKeydown();
      cleanupClick();
      overlayPopover?.dismiss();
    });

    return {
      ns,
      editorRef,
      editor,
      errorMsg,
      verify,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div ref={'editorRef'} class={this.ns.b('content')}></div>
        <div class={this.ns.b('footer')}>{this.errorMsg}</div>
      </div>
    );
  },
});
