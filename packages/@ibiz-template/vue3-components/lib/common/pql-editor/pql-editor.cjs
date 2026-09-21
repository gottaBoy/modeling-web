'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var editor = require('@wangeditor/editor');
var pqlEditor_module = require('./pql-editor.module.cjs');
require('./components/index.cjs');
var index = require('./utils/index.cjs');
require('./pql-editor.css');
var pqlEditorSuggestion = require('./components/pql-editor-suggestion/pql-editor-suggestion.cjs');

"use strict";
const IBizPqlEditor = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPqlEditor",
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object
    },
    renderItem: {
      type: Function
    }
  },
  emits: {
    change: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("pql-editor");
    const editorRef = vue.ref();
    let editor$1;
    let overlayPopover;
    const connectionList = [{
      type: "pql-field-connection",
      label: "and",
      value: "and"
    }, {
      type: "pql-field-connection",
      label: "or",
      value: "or"
    }];
    const getCodeListItems = async (appCodeListId) => {
      if (!props.context) {
        return [];
      }
      const app = ibiz.hub.getApp(props.context.srfappid);
      const items = await app.codeList.get(appCodeListId, props.context);
      return items;
    };
    const getPreviousNode = (node) => {
      var _a;
      if (!editor$1 || !node) {
        return;
      }
      const path = editor.DomEditor.findPath(editor$1, node);
      if (path && editor.SlatePath.hasPrevious(path)) {
        const slateNode = (_a = editor.SlateEditor.node(editor$1, editor.SlatePath.previous(path))) == null ? void 0 : _a[0];
        if (slateNode) {
          if (slateNode.type || slateNode.text) {
            return slateNode;
          }
          return getPreviousNode(slateNode);
        }
      }
    };
    const getCurrentNode = () => {
      var _a;
      if (!editor$1) {
        return;
      }
      const selection = editor$1.selection;
      if (selection) {
        const slateNode = (_a = editor.SlateEditor.node(editor$1, selection)) == null ? void 0 : _a[0];
        if (slateNode) {
          if (slateNode.type || slateNode.text) {
            return slateNode;
          }
          return getPreviousNode(slateNode);
        }
      }
    };
    const getEntitySuggestionItems = async (field) => {
      if (!field || !field.appDataEntityId) {
        return;
      }
      const service = await ibiz.hub.getAppDEService(props.context.srfappid, field.appDataEntityId, props.context);
      const data = await service.fetchDefault(props.context, props.params);
      if (data && Array.isArray(data.data)) {
        const items = data.data;
        if (items.length) {
          return items.map((item) => {
            return {
              type: "pql-field-value",
              label: item.srfmajortext,
              value: item.srfkey
            };
          });
        }
        return [{
          _msg: ibiz.i18n.t("control.common.currentNoData")
        }];
      }
    };
    const getSuggestionItems = async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (!editor$1) {
        return [];
      }
      const currenNode = getCurrentNode();
      const {
        selection
      } = editor$1;
      if (!selection) {
        return [];
      }
      if (selection && ((_b = (_a = selection.focus) == null ? void 0 : _a.path) == null ? void 0 : _b[0]) !== 0) {
        return [];
      }
      if (!currenNode) {
        if (selection && ((_c = selection.focus) == null ? void 0 : _c.offset) === 0) {
          const node = editor.SlateEditor.node(editor$1, selection)[0];
          if (node) {
            const el = editor$1.toDOMNode(node);
            if (index.isMove(el)) {
              return [];
            }
          }
        }
      }
      if (editor$1.selection) {
        const node = editor.SlateEditor.node(editor$1, editor$1.selection);
        if (node && ((_d = node[0]) == null ? void 0 : _d.type)) {
          return [];
        }
      }
      const nodeItems = index.generateNodeItems(currenNode, getPreviousNode);
      const nodeItem = nodeItems[nodeItems.length - 1];
      if (nodeItem && nodeItem.type === "condition") {
        if (((_e = nodeItem.operator) == null ? void 0 : _e.value) && index.InOPs.includes(nodeItem.operator.value)) {
          if (nodeItem.value) {
            if (currenNode === nodeItem.value[nodeItem.value.length - 1] && currenNode.text) {
              const text = currenNode.text.slice(0, selection.focus.offset).trim();
              if (text === "," || text === "[") {
                const field = props.fields.find((item) => {
                  var _a2;
                  return item.appDEFieldId === ((_a2 = nodeItem.key) == null ? void 0 : _a2.value);
                });
                if (field && field.appCodeListId) {
                  const items = await getCodeListItems(field.appCodeListId);
                  return items.map((item) => {
                    return {
                      type: "pql-field-value",
                      label: item.text,
                      value: item.value
                    };
                  });
                }
                const entitySuggestionItems = await getEntitySuggestionItems(field);
                if (entitySuggestionItems) {
                  return entitySuggestionItems;
                }
              }
              if (text === "]" || text === "[]") {
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
      if (currenNode && currenNode.type === "pql-field") {
        const field = props.fields.find((item) => item.appDEFieldId === currenNode.value);
        if (field && field.valueOPs) {
          return index.FilterModes.filter((mode) => field.valueOPs.includes(mode.valueOP)).map((item) => {
            return {
              type: "pql-field-operator",
              label: item.label,
              value: item.valueOP
            };
          });
        }
        return [];
      }
      if (currenNode && currenNode.type === "pql-field-value") {
        return connectionList;
      }
      if (currenNode && currenNode.type === "pql-field-operator") {
        const mode = index.FilterModes.find((_mode) => _mode.valueOP === currenNode.value);
        if (mode) {
          if (index.InputOPs.includes(mode.valueOP)) {
            return [];
          }
          if (index.ExcludeOPs.includes(mode.valueOP)) {
            return connectionList;
          }
          const previousNode = getPreviousNode(currenNode);
          if (previousNode && previousNode.type === "pql-field") {
            const field = props.fields.find((item) => item.appDEFieldId === previousNode.value);
            if (field && field.appCodeListId) {
              const items = await getCodeListItems(field.appCodeListId);
              return items.map((item) => {
                return {
                  type: "pql-field-value",
                  label: item.text,
                  value: item.value
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
      if (currenNode && currenNode.type === "pql-field-connection") {
        return props.fields.map((item) => {
          return {
            type: "pql-field",
            label: item.caption,
            value: item.appDEFieldId
          };
        });
      }
      if (currenNode && !currenNode.type) {
        const previousNode = getPreviousNode(currenNode);
        if (previousNode && previousNode.type === "pql-field-operator") {
          if (((_f = editor$1.selection) == null ? void 0 : _f.focus.offset) !== 0) {
            return connectionList;
          }
          return [];
        }
        if (previousNode && previousNode.type === "pql-field") {
          if (((_g = editor$1.selection) == null ? void 0 : _g.focus.offset) !== 0) {
            return connectionList;
          }
          const field = props.fields.find((item) => item.appDEFieldId === previousNode.value);
          if (field && field.valueOPs) {
            return index.FilterModes.filter((mode) => field.valueOPs.includes(mode.valueOP)).map((item) => {
              return {
                type: "pql-field-operator",
                label: item.label,
                value: item.valueOP
              };
            });
          }
        }
        if (previousNode && previousNode.type === "pql-field-connection") {
          if (((_h = editor$1.selection) == null ? void 0 : _h.focus.offset) !== 0) {
            return connectionList;
          }
          return props.fields.map((item) => {
            return {
              type: "pql-field",
              label: item.caption,
              value: item.appDEFieldId
            };
          });
        }
        if (previousNode && previousNode.type === "pql-field-value") {
          return connectionList;
        }
        return [];
      }
      return props.fields.map((item) => {
        return {
          type: "pql-field",
          label: item.caption,
          value: item.appDEFieldId
        };
      });
    };
    const handelSuggestionSelect = (item) => {
      if (!editor$1) {
        return;
      }
      editor$1.restoreSelection();
      if (!item.type) {
        editor$1.insertText(item.label);
        return;
      }
      const node = {
        type: item.type,
        label: item.label,
        value: item.value,
        children: [{
          text: ""
        }]
      };
      editor$1.insertNode(node);
      editor$1.move(1);
      if (item.type === "pql-field-operator" && index.InOPs.includes(item.value)) {
        editor$1.insertText("[]");
        editor$1.moveReverse(1);
      }
    };
    const showSuggestion = async () => {
      if (!editor$1) {
        return;
      }
      const popover = overlayPopover;
      overlayPopover = void 0;
      await (popover == null ? void 0 : popover.dismiss());
      const selection = window.getSelection();
      if (!selection) {
        return;
      }
      const {
        focusNode
      } = selection;
      if (!focusNode || !focusNode.parentNode) {
        return;
      }
      const items = await getSuggestionItems();
      if (overlayPopover || !editor$1.isFocused()) {
        return;
      }
      if (!items || !items.length) {
        return;
      }
      overlayPopover = ibiz.overlay.createPopover(() => {
        return vue.createVNode(pqlEditorSuggestion.IBizPqlEditorSuggestion, {
          "items": items,
          "renderItem": props.renderItem,
          "onSelect": handelSuggestionSelect
        }, null);
      }, void 0, {
        placement: "bottom-start",
        autoClose: true,
        width: "200px",
        noArrow: true
      });
      await overlayPopover.present(focusNode.parentNode);
      await overlayPopover.onWillDismiss();
      overlayPopover = void 0;
    };
    const errorMsg = vue.ref();
    const errorMsgEl = vue.ref();
    const verifyNode = () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      if (!editor$1) {
        return;
      }
      const nodes = ((_a = editor$1.children[0]) == null ? void 0 : _a.children) || [];
      const children = nodes.filter((node) => node.type || node.text);
      if (!children.length) {
        return;
      }
      const items = index.generateNodeItems(children[children.length - 1], getPreviousNode);
      if (!items.length) {
        return;
      }
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type === "connection") {
          if (((_b = items[i - 1]) == null ? void 0 : _b.type) === "connection" || i === 0 || i === items.length - 1) {
            return {
              msg: ibiz.i18n.t("component.pqlEditor.noExpression"),
              child: (_c = item.value) == null ? void 0 : _c[0]
            };
          }
          continue;
        }
        if (item.type === "condition" && ((_d = items[i - 1]) == null ? void 0 : _d.type) === "condition") {
          let child;
          if (item.key) {
            child = item.key;
          } else if (item.operator) {
            child = item.operator;
          } else if (item.value) {
            child = (_e = item.value) == null ? void 0 : _e[0];
          }
          return {
            msg: ibiz.i18n.t("component.pqlEditor.noConnection"),
            child
          };
        }
        if (!item.key) {
          let child;
          if (item.operator) {
            child = item.operator;
          } else if (item.value) {
            child = (_f = item.value) == null ? void 0 : _f[0];
          }
          return {
            msg: ibiz.i18n.t("component.pqlEditor.noKey"),
            child
          };
        }
        if (!item.operator) {
          let child = item.key;
          if (item.value) {
            child = item.value[0];
          } else if (items[i + 1]) {
            if (items[i + 1].type === "connection") {
              child = (_g = items[i + 1].value) == null ? void 0 : _g[0];
            } else if (items[i + 1].key) {
              child = items[i + 1].key;
            } else if (items[i + 1].operator) {
              child = items[i + 1].operator;
            } else if (items[i + 1].value) {
              child = (_h = items[i + 1].value) == null ? void 0 : _h[0];
            }
          }
          return {
            msg: ibiz.i18n.t("component.pqlEditor.noOperator"),
            child
          };
        }
        if (item.operator.value && !index.ExcludeOPs.includes(item.operator.value) && !item.value) {
          let child = item.operator;
          if (items[i + 1]) {
            if (items[i + 1].type === "connection") {
              child = (_i = items[i + 1].value) == null ? void 0 : _i[0];
            } else if (items[i + 1].key) {
              child = items[i + 1].key;
            } else if (items[i + 1].operator) {
              child = items[i + 1].operator;
            } else if (items[i + 1].value) {
              child = (_j = items[i + 1].value) == null ? void 0 : _j[0];
            }
          }
          return {
            msg: ibiz.i18n.t("component.pqlEditor.noValue"),
            child
          };
        }
        if (item.operator.value && index.InOPs.includes(item.operator.value)) {
          const value = item.value;
          if (Array.isArray(value)) {
            if (value.length > 1 && ((_k = value[0].text) == null ? void 0 : _k.trim()) !== "[") {
              return {
                msg: ibiz.i18n.t("component.pqlEditor.errorCombination"),
                child: value[0]
              };
            }
            let type = "value";
            for (let j = 1; j < value.length; j++) {
              if (j === value.length - 1) {
                if (((_l = value[value.length - 1].text) == null ? void 0 : _l.trim()) !== "]") {
                  let child = value[value.length - 1];
                  if (child.type === "pql-field-value") {
                    if (items[i + 1]) {
                      if (items[i + 1].type === "connection") {
                        child = (_m = items[i + 1].value) == null ? void 0 : _m[0];
                      } else if (items[i + 1].key) {
                        child = items[i + 1].key;
                      } else if (items[i + 1].operator) {
                        child = items[i + 1].operator;
                      } else if (items[i + 1].value) {
                        child = (_n = items[i + 1].value) == null ? void 0 : _n[0];
                      }
                    }
                  }
                  return {
                    msg: ibiz.i18n.t("component.pqlEditor.errorCombination"),
                    child
                  };
                }
                continue;
              }
              if (type === "value") {
                if (value[j].type !== "pql-field-value") {
                  return {
                    msg: ibiz.i18n.t("component.pqlEditor.errorDelimiter"),
                    child: value[j]
                  };
                }
                type = "text";
              } else if (type === "text") {
                if (value[j].type || ((_o = value[j].text) == null ? void 0 : _o.trim()) !== ",") {
                  return {
                    msg: ibiz.i18n.t("component.pqlEditor.noDelimiter"),
                    child: value[j]
                  };
                }
                type = "value";
              }
            }
          }
        }
      }
    };
    const verify = () => {
      if (errorMsg.value) {
        return false;
      }
      return true;
    };
    const currentValue = vue.ref("");
    const htmlText = vue.ref("");
    vue.watch(() => props.value, async () => {
      if (props.value === currentValue.value) {
        return;
      }
      if (!props.value) {
        currentValue.value = "";
        htmlText.value = "";
        editor$1 == null ? void 0 : editor$1.clear();
        return;
      }
      const pqlItems = index.parseCustomCond(props.value);
      if (pqlItems) {
        const nodes = await index.pqlItemsToPqlNodes(pqlItems);
        if (nodes && nodes.length) {
          const html = index.pqlNodesToHtml(nodes);
          currentValue.value = props.value;
          htmlText.value = html;
          editor$1 == null ? void 0 : editor$1.setHtml(html);
          return;
        }
      }
      currentValue.value = "";
      htmlText.value = "";
      editor$1 == null ? void 0 : editor$1.clear();
    }, {
      immediate: true
    });
    vue.watch(() => props.fields, async () => {
      if (!props.value) {
        currentValue.value = "";
        htmlText.value = "";
        editor$1 == null ? void 0 : editor$1.clear();
        return;
      }
      const pqlItems = index.parseCustomCond(props.value);
      if (pqlItems) {
        const nodes = await index.pqlItemsToPqlNodes(pqlItems);
        if (nodes && nodes.length) {
          const html = index.pqlNodesToHtml(nodes);
          currentValue.value = props.value;
          htmlText.value = html;
          editor$1 == null ? void 0 : editor$1.setHtml(html);
          return;
        }
      }
      currentValue.value = "";
      htmlText.value = "";
      editor$1 == null ? void 0 : editor$1.clear();
    }, {
      immediate: true
    });
    const handleChange = () => {
      var _a;
      if (!editor$1) {
        return;
      }
      const nodes = ((_a = editor$1.children[0]) == null ? void 0 : _a.children) || [];
      const children = nodes.filter((node) => node.type || node.text);
      setTimeout(() => {
        var _a2;
        if (!editor$1) {
          return;
        }
        const {
          msg,
          child
        } = verifyNode() || {};
        errorMsg.value = msg || "";
        (_a2 = errorMsgEl.value) == null ? void 0 : _a2.classList.remove(ns.b("error-msg"));
        if (child) {
          const el = editor$1.toDOMNode(child);
          if (el) {
            errorMsgEl.value = el;
            el.classList.add(ns.b("error-msg"));
          }
        }
        if (!msg) {
          try {
            const items = index.generateNodeItems(children[children.length - 1], getPreviousNode);
            const customCond = index.generateCustomCond(items, props.fields);
            currentValue.value = customCond;
            emit("change", customCond);
          } catch (err) {
            ibiz.log.error(err == null ? void 0 : err.message);
          }
        }
      }, 10);
    };
    let cleanupKeydown = () => {
    };
    let cleanupClick = () => {
    };
    vue.onMounted(() => {
      if (!editorRef.value) {
        return;
      }
      if (!window.PqlModule) {
        editor.Boot.registerModule(pqlEditor_module.PqlModule);
        window.PqlModule = true;
      }
      const editorConfig = {
        autoFocus: false,
        readOnly: props.readonly,
        placeholder: props.placeholder,
        EXTEND_CONF: {
          pql: {
            showSuggestion
          }
        },
        onFocus: () => {
          setTimeout(() => {
            showSuggestion();
          }, 10);
        },
        onChange: handleChange
      };
      editor$1 = editor.createEditor({
        selector: editorRef.value,
        config: editorConfig,
        mode: "simple"
      });
      editor$1.setHtml(htmlText.value);
      cleanupKeydown = core.listenJSEvent(editorRef.value, "keydown", (event) => {
        setTimeout(() => {
          if ((event.key === "ArrowUp" || event.key === "ArrowDown") && editor$1) {
            setTimeout(() => {
              showSuggestion();
            }, 10);
          }
          if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && editor$1) {
            const {
              selection
            } = editor$1;
            if (selection && selection.focus.offset === 0) {
              const node = editor.SlateEditor.node(editor$1, selection)[0];
              if (node) {
                const el = editor$1.toDOMNode(node);
                if (index.isMove(el)) {
                  if (event.key === "ArrowLeft") {
                    editor$1.moveReverse(1);
                  }
                  if (event.key === "ArrowRight") {
                    editor$1.move(1);
                  }
                }
              }
            }
            setTimeout(() => {
              showSuggestion();
            }, 10);
          }
        }, 10);
        if (event.key === "Escape" || event.key === "Enter") {
          event.stopPropagation();
          overlayPopover == null ? void 0 : overlayPopover.dismiss();
        }
      });
      if (!props.readonly) {
        cleanupClick = core.listenJSEvent(editorRef.value, "click", () => {
          setTimeout(() => {
            showSuggestion();
          }, 10);
        });
      }
    });
    vue.onUnmounted(() => {
      cleanupKeydown();
      cleanupClick();
      overlayPopover == null ? void 0 : overlayPopover.dismiss();
    });
    return {
      ns,
      editorRef,
      editor: editor$1,
      errorMsg,
      verify
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "ref": "editorRef",
      "class": this.ns.b("content")
    }, null), vue.createVNode("div", {
      "class": this.ns.b("footer")
    }, [this.errorMsg])]);
  }
});

exports.IBizPqlEditor = IBizPqlEditor;
