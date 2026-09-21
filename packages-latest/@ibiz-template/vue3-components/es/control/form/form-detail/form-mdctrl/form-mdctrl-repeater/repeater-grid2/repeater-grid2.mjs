import { isVNode, defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, toRaw, h, ref, reactive, watch, onUnmounted } from 'vue';
import Sortable from '../../../../../../node_modules/.pnpm/sortablejs@1.15.6/node_modules/sortablejs/modular/sortable.esm.mjs';
import { EditFormController, ControlVO, FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';
import { useNamespace, useSemanticNode, useCtx } from '@ibiz-template/vue3-util';
import { recursiveIterate } from '@ibiz-template/core';
import { useLoadMore } from '../form-mdctrl-repeater.util.mjs';
import './repeater-grid2.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RepeaterGrid2 = /* @__PURE__ */ defineComponent({
  name: "IBizRepeaterGrid2",
  props: {
    controller: {
      type: FormMDCtrlRepeaterController,
      required: true
    }
  },
  emits: {
    change: (_value) => true
  },
  setup(props, {
    emit
  }) {
    var _a, _b;
    const ns = useNamespace("repeater-grid2");
    const ns2 = useNamespace("form-mdctrl");
    const formItems = [];
    const tableRef = ref();
    const tableKey = ref(createUUID());
    const chunkSize = ((_a = props.controller.model.ctrlParams) == null ? void 0 : _a.chunkSize) ? Number((_b = props.controller.model.ctrlParams) == null ? void 0 : _b.chunkSize) : 100;
    const {
      renderItems,
      loadMore,
      updateTotalItems
    } = useLoadMore(props.controller.value, chunkSize);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    recursiveIterate(props.controller.repeatedForm, (item) => {
      var _a2;
      if (item.detailType === "FORMITEM") {
        if (((_a2 = item.editor) == null ? void 0 : _a2.editorType) !== "HIDDEN") {
          formItems.push(item);
        }
      }
    }, {
      childrenFields: ["deformPages", "deformTabPages", "deformDetails"]
    });
    const onSingleValueChange = (value, index) => {
      const arrData = [...props.controller.value || []];
      arrData[index] = value;
      emit("change", arrData);
    };
    const ctx = useCtx();
    const formControllers = reactive([]);
    const addFormController = async (data = {}) => {
      const formC = new EditFormController(props.controller.repeatedForm, props.controller.context, props.controller.params, ctx);
      formC.state.isSimple = true;
      await formC.created();
      formC.state = reactive(formC.state);
      const keys = Object.keys(formC.details);
      keys.forEach((key) => {
        const detail = formC.details[key];
        detail.state = reactive(detail.state);
      });
      formC.setSimpleData(data);
      formControllers.push(formC);
      props.controller.setRepeaterController("".concat(formControllers.length - 1), formC);
      formC.evt.on("onFormDataChange", (event) => {
        const item = event.data[0];
        const formData = item instanceof ControlVO ? item.clone() : {
          ...item
        };
        const index = formControllers.indexOf(formC);
        onSingleValueChange(formData, index);
      });
    };
    watch(() => props.controller.value, (newVal) => {
      if (newVal && newVal.length > 0) {
        newVal.forEach((item, index) => {
          const formC = formControllers[index];
          if (formC) {
            const changeVal = item || {};
            const find = Object.keys(formC.data).find((key) => {
              return changeVal[key] !== formC.data[key];
            });
            if (find) {
              formC.setSimpleData(changeVal);
            }
          } else {
            addFormController(item);
          }
        });
      }
      updateTotalItems(newVal || []);
    }, {
      immediate: true,
      deep: true
    });
    let sortable;
    const rowDrop = () => {
      var _a2, _b2;
      const wrapper = (_b2 = (_a2 = tableRef.value) == null ? void 0 : _a2.$el) == null ? void 0 : _b2.querySelector(".el-table__body-wrapper tbody");
      if (!wrapper || !props.controller.enableSort)
        return;
      sortable = Sortable.create(wrapper, {
        animation: 150,
        handle: ".".concat(ns.e("drag-icon")),
        ghostClass: "".concat(ns.e("sortable-ghost")),
        onEnd({
          newIndex,
          oldIndex
        }) {
          props.controller.dragChange(oldIndex, newIndex);
          tableKey.value = createUUID();
        }
      });
    };
    watch(() => tableRef.value, () => {
      if (!props.controller.enableSort)
        return;
      tableRef.value ? rowDrop() : sortable == null ? void 0 : sortable.destroy();
    });
    onUnmounted(() => sortable == null ? void 0 : sortable.destroy());
    const renderRemoveBtn = (index) => {
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return createVNode(resolveComponent("el-popconfirm"), {
          "popper-class": ["el-popover", ns2.b("popper")],
          "title": ibiz.i18n.t("control.form.repeaterGrid.promptInformation"),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => {
            props.controller.remove(index);
            formControllers.splice(index, 1);
          }
        }, {
          reference: () => {
            return createVNode("ion-icon", {
              "name": "remove-outline",
              "title": ibiz.i18n.t("app.delete"),
              "class": [ns.b("remove-btn"), ns2.b("button"), semanticClass("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })],
              "style": semanticStyle("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })
            }, null);
          }
        });
      }
      return createVNode("ion-icon", {
        "name": "remove-outline",
        "title": ibiz.i18n.t("app.delete"),
        "class": [ns.b("remove-btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        }),
        "onClick": () => {
          props.controller.remove(index);
          formControllers.splice(index, 1);
        }
      }, null);
    };
    return {
      ns,
      ns2,
      tableRef,
      tableKey,
      formItems,
      renderItems,
      formControllers,
      renderRemoveBtn,
      loadMore,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a;
    const tableHeight = (_a = this.controller.model.layoutPos) == null ? void 0 : _a.height;
    const heightObject = tableHeight ? {
      height: tableHeight
    } : {};
    const isEmpty = this.renderItems.length === 0;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("el-table"), mergeProps({
      "ref": "tableRef",
      "key": this.tableKey,
      "show-header": true,
      "class": [this.ns.e("table")],
      "row-class-name": (...args) => {
        return [this.ns2.b("item"), this.semanticClass("mdctrl.item", {
          mdctrl: this.controller,
          args
        })].join(" ");
      },
      "row-style": (...args) => this.semanticStyle("mdctrl.item", {
        mdctrl: this.controller,
        args
      }),
      "data": isEmpty && this.controller.enableCreate ? [{}] : this.renderItems,
      "cell-class-name": ({
        columnIndex
      }) => {
        const shouldShowIndex = this.controller.enableSort ? columnIndex === 1 : columnIndex === 0;
        return shouldShowIndex ? this.ns.b("index") : "";
      }
    }, heightObject), {
      default: () => {
        return [this.controller.enableSort && createVNode(resolveComponent("el-table-column"), {
          "width": 26,
          "type": "default"
        }, {
          default: () => {
            if (isEmpty) {
              return "";
            }
            return createVNode("svg", {
              "viewBox": "0 0 16 16",
              "xmlns": "http://www.w3.org/2000/svg",
              "height": "1em",
              "width": "1em",
              "class": this.ns.e("drag-icon"),
              "preserveAspectRatio": "xMidYMid meet",
              "focusable": "false"
            }, [createVNode("g", {
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [createVNode("g", {
              "transform": "translate(5 1)",
              "fill-rule": "nonzero"
            }, [createVNode("path", {
              "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            }, null)])])]);
          }
        }), createVNode(resolveComponent("el-table-column"), {
          "type": "index",
          "width": 66,
          "align": "center"
        }, {
          default: (opts) => {
            if (isEmpty) {
              return "";
            }
            const {
              $index
            } = opts;
            return createVNode("span", null, [$index + 1]);
          }
        }), this.formItems.length > 0 && this.formItems.map((item) => {
          const width = item.labelWidth;
          let widthName = "width";
          let columnWidth = "";
          if (typeof width === "number") {
            if (width === 1) {
              widthName = "min-width";
            }
            columnWidth = "".concat(width, "px");
          }
          return createVNode(resolveComponent("el-table-column"), mergeProps({
            "label": item.caption,
            "prop": item.id
          }, {
            [widthName]: columnWidth
          }, {
            "align": "center"
          }), {
            default: (opts) => {
              if (isEmpty) {
                return "";
              }
              const {
                $index
              } = opts;
              const formC = toRaw(this.formControllers[$index]);
              if (!formC || !formC.state.isLoaded) {
                return createVNode("div", null, [ibiz.i18n.t("control.form.repeaterGrid.absentOrLoad")]);
              }
              const formItemC = formC.formItems.find((x) => x.name === item.id);
              let editor = null;
              if (!formItemC.editorProvider) {
                editor = createVNode(resolveComponent("not-supported-editor"), {
                  "modelData": item.editor
                }, null);
              } else {
                const component = resolveComponent(formItemC.editorProvider.formEditor);
                editor = h(component, {
                  value: formItemC.value,
                  data: formItemC.data,
                  controller: formItemC.editor,
                  disabled: formItemC.state.disabled,
                  readonly: formItemC.state.readonly,
                  onChange: (val, name) => {
                    formItemC.setDataValue(val, name);
                  }
                });
              }
              return createVNode(resolveComponent("iBizGridEditItem"), {
                "error": formItemC.state.error,
                "required": formItemC.state.required
              }, _isSlot(editor) ? editor : {
                default: () => [editor]
              });
            }
          });
        }), (this.controller.enableCreate || this.controller.enableDelete) && createVNode(resolveComponent("el-table-column"), {
          "width": 80,
          "align": "center"
        }, {
          default: (opts) => {
            const {
              $index
            } = opts;
            return createVNode("div", {
              "class": this.ns.b("action-group")
            }, [this.controller.enableCreate && createVNode("ion-icon", {
              "name": "add-outline",
              "title": ibiz.i18n.t("app.add"),
              "class": [this.ns.b("add-btn"), this.ns2.b("button"), this.semanticClass("mdctrl.button", {
                mdctrl: this.controller,
                tag: "create"
              })],
              "style": this.semanticStyle("mdctrl.button", {
                mdctrl: this.controller,
                tag: "create"
              }),
              "onClick": () => {
                this.controller.create(isEmpty ? 0 : $index + 1);
              }
            }, null), this.controller.enableDelete && !isEmpty && this.renderRemoveBtn($index)]);
          }
        })];
      },
      append: () => {
        return [tableHeight && withDirectives(createVNode("div", {
          "infinite-scroll-distance": 20
        }, null), [[resolveDirective("infinite-scroll"), () => this.loadMore()]])];
      }
    })]);
  }
});

export { RepeaterGrid2 };
