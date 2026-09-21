'use strict';

var vue = require('vue');
var sortable_esm = require('../../../../../../node_modules/.pnpm/sortablejs@1.15.6/node_modules/sortablejs/modular/sortable.esm.cjs');
var runtime = require('@ibiz-template/runtime');
var qxUtil = require('qx-util');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var formMdctrlRepeater_util = require('../form-mdctrl-repeater.util.cjs');
require('./repeater-grid.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const RepeaterGrid = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRepeaterGrid",
  props: {
    controller: {
      type: runtime.FormMDCtrlRepeaterController,
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
    const ns = vue3Util.useNamespace("repeater-grid");
    const ns2 = vue3Util.useNamespace("form-mdctrl");
    const formItems = [];
    const tableRef = vue.ref();
    const tableKey = vue.ref(qxUtil.createUUID());
    const chunkSize = ((_a = props.controller.model.ctrlParams) == null ? void 0 : _a.chunkSize) ? Number((_b = props.controller.model.ctrlParams) == null ? void 0 : _b.chunkSize) : 100;
    const {
      renderItems,
      loadMore,
      updateTotalItems
    } = formMdctrlRepeater_util.useLoadMore(props.controller.value, chunkSize);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.form);
    core.recursiveIterate(props.controller.repeatedForm, (item) => {
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
      const arrData = [...props.controller.value];
      arrData[index] = value;
      emit("change", arrData);
    };
    const ctx = vue3Util.useCtx();
    const formControllers = vue.reactive([]);
    const addFormController = async (data = {}) => {
      const formC = new runtime.EditFormController(props.controller.repeatedForm, props.controller.context, props.controller.params, ctx);
      formC.state.isSimple = true;
      await formC.created();
      formC.state = vue.reactive(formC.state);
      const keys = Object.keys(formC.details);
      keys.forEach((key) => {
        const detail = formC.details[key];
        detail.state = vue.reactive(detail.state);
      });
      formC.setSimpleData(data);
      formControllers.push(formC);
      props.controller.setRepeaterController("".concat(formControllers.length - 1), formC);
      formC.evt.on("onFormDataChange", (event) => {
        const item = event.data[0];
        const formData = item instanceof runtime.ControlVO ? item.clone() : {
          ...item
        };
        const index = formControllers.indexOf(formC);
        onSingleValueChange(formData, index);
      });
    };
    vue.watch(() => props.controller.value, (newVal) => {
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
        if (newVal.length < formControllers.length) {
          formControllers.forEach((c, index) => {
            if (index >= newVal.length) {
              c.state.isLoaded = false;
            }
          });
        }
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
      sortable = sortable_esm.default.create(wrapper, {
        animation: 150,
        handle: ".".concat(ns.e("drag-icon")),
        ghostClass: "".concat(ns.e("sortable-ghost")),
        onEnd({
          newIndex,
          oldIndex
        }) {
          props.controller.dragChange(oldIndex, newIndex);
          tableKey.value = qxUtil.createUUID();
        }
      });
    };
    vue.watch(() => tableRef.value, () => {
      if (!props.controller.enableSort)
        return;
      tableRef.value ? rowDrop() : sortable == null ? void 0 : sortable.destroy();
    });
    vue.onUnmounted(() => sortable == null ? void 0 : sortable.destroy());
    const renderRemoveBtn = (index) => {
      let _slot2;
      if (!props.controller.enableDelete) {
        return null;
      }
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return vue.createVNode(vue.resolveComponent("el-popconfirm"), {
          "title": core.showTitle(ibiz.i18n.t("control.form.repeaterGrid.promptInformation")),
          "popper-class": ["el-popover", ns2.b("popper")],
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => props.controller.remove(index)
        }, {
          reference: () => {
            let _slot;
            return vue.createVNode(vue.resolveComponent("el-button"), {
              "text": true,
              "type": "danger",
              "style": semanticStyle("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              }),
              "class": [ns.be("index", "remove"), ns2.b("button"), semanticClass("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })]
            }, _isSlot(_slot = ibiz.i18n.t("app.delete")) ? _slot : {
              default: () => [_slot]
            });
          }
        });
      }
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "type": "danger",
        "class": [ns.be("index", "remove"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        }),
        "onClick": () => props.controller.remove(index)
      }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
        default: () => [_slot2]
      });
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
    let _slot3;
    let tableHeight = (_a = this.controller.model.layoutPos) == null ? void 0 : _a.height;
    if (tableHeight) {
      if (tableHeight > 0 && tableHeight <= 1) {
        tableHeight = "".concat(tableHeight * 100, "%");
      } else {
        tableHeight = "".concat(tableHeight, "px");
      }
    }
    const heightObject = tableHeight ? {
      height: tableHeight
    } : {};
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.controller.enableCreate && vue.createVNode(vue.resolveComponent("el-button"), {
      "class": [this.ns.e("add-btn"), this.ns2.b("button"), this.semanticClass("mdctrl.button", {
        mdctrl: this.controller,
        tag: "create"
      })],
      "style": this.semanticStyle("mdctrl.button", {
        mdctrl: this.controller,
        tag: "create"
      }),
      "onClick": () => {
        this.controller.create();
      }
    }, _isSlot(_slot3 = ibiz.i18n.t("app.add")) ? _slot3 : {
      default: () => [_slot3]
    }), vue.createVNode(vue.resolveComponent("el-table"), vue.mergeProps({
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
      "data": this.renderItems,
      "cell-class-name": ({
        columnIndex
      }) => {
        const shouldShowIndex = this.controller.enableSort ? columnIndex === 1 : columnIndex === 0;
        return shouldShowIndex ? this.ns.b("index") : "";
      }
    }, heightObject), {
      default: () => {
        return [this.controller.enableSort && vue.createVNode(vue.resolveComponent("el-table-column"), {
          "width": 26,
          "type": "default"
        }, {
          default: () => vue.createVNode("svg", {
            "viewBox": "0 0 16 16",
            "xmlns": "http://www.w3.org/2000/svg",
            "height": "1em",
            "width": "1em",
            "class": this.ns.e("drag-icon"),
            "preserveAspectRatio": "xMidYMid meet",
            "focusable": "false"
          }, [vue.createVNode("g", {
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, [vue.createVNode("g", {
            "transform": "translate(5 1)",
            "fill-rule": "nonzero"
          }, [vue.createVNode("path", {
            "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          }, null)])])])
        }), vue.createVNode(vue.resolveComponent("el-table-column"), {
          "type": "index",
          "width": 66,
          "align": "center"
        }, {
          default: (opts) => {
            const {
              $index
            } = opts;
            if (!this.controller.enableDelete) {
              return vue.createVNode("span", null, [$index + 1]);
            }
            return [this.renderRemoveBtn($index), vue.createVNode("span", {
              "class": this.ns.be("index", "text")
            }, [$index + 1])];
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
          return vue.createVNode(vue.resolveComponent("el-table-column"), vue.mergeProps({
            "label": item.caption,
            "prop": item.id
          }, {
            [widthName]: columnWidth
          }, {
            "align": "center"
          }), {
            default: (opts) => {
              const {
                $index
              } = opts;
              const formC = vue.toRaw(this.formControllers[$index]);
              if (!formC || !formC.state.isLoaded) {
                return vue.createVNode("div", null, [ibiz.i18n.t("control.form.repeaterGrid.absentOrLoad")]);
              }
              const formItemC = formC.formItems.find((x) => x.name === item.id);
              let editor = null;
              if (!formItemC.editorProvider) {
                editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
                  "modelData": item.editor
                }, null);
              } else {
                const component = vue.resolveComponent(formItemC.editorProvider.formEditor);
                editor = vue.h(component, {
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
              return vue.createVNode(vue.resolveComponent("iBizGridEditItem"), {
                "error": formItemC.state.error,
                "required": formItemC.state.required
              }, _isSlot(editor) ? editor : {
                default: () => [editor]
              });
            }
          });
        })];
      },
      append: () => {
        return [tableHeight && vue.withDirectives(vue.createVNode("div", {
          "infinite-scroll-distance": 20
        }, null), [[vue.resolveDirective("infinite-scroll"), () => this.loadMore()]])];
      }
    })]);
  }
});

exports.RepeaterGrid = RepeaterGrid;
