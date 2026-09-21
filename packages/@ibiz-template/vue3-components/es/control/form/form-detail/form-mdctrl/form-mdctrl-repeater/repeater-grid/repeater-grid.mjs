import { isVNode, defineComponent, reactive, watch, createVNode, resolveComponent, toRaw, h } from 'vue';
import { FormMDCtrlRepeaterController, EditFormController, ControlVO } from '@ibiz-template/runtime';
import { useNamespace, useCtx } from '@ibiz-template/vue3-util';
import { recursiveIterate, showTitle } from '@ibiz-template/core';
import './repeater-grid.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RepeaterGrid = /* @__PURE__ */ defineComponent({
  name: "IBizRepeaterGrid",
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
    const ns = useNamespace("repeater-grid");
    const formItems = [];
    recursiveIterate(props.controller.repeatedForm, (item) => {
      if (item.detailType === "FORMITEM") {
        formItems.push(item);
      }
    }, {
      childrenFields: ["deformPages", "deformTabPages", "deformDetails"]
    });
    const onSingleValueChange = (value, index) => {
      const arrData = [...props.controller.value];
      arrData[index] = value;
      emit("change", arrData);
    };
    const ctx = useCtx();
    const formControllers = reactive([]);
    const addFormController = async (data = {}) => {
      const formC = new EditFormController(props.controller.repeatedForm, props.controller.context, props.controller.params, ctx);
      formC.state.isSimple = true;
      await formC.created();
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
        if (newVal.length < formControllers.length) {
          formControllers.forEach((c, index) => {
            if (index >= newVal.length) {
              c.state.isLoaded = false;
            }
          });
        }
      }
    }, {
      immediate: true,
      deep: true
    });
    const renderRemoveBtn = (index) => {
      let _slot2;
      if (!props.controller.enableDelete) {
        return null;
      }
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return createVNode(resolveComponent("el-popconfirm"), {
          "title": showTitle(ibiz.i18n.t("control.form.repeaterGrid.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => props.controller.remove(index)
        }, {
          reference: () => {
            let _slot;
            return createVNode(resolveComponent("el-button"), {
              "text": true,
              "type": "danger",
              "class": [ns.be("index", "remove")]
            }, _isSlot(_slot = ibiz.i18n.t("app.delete")) ? _slot : {
              default: () => [_slot]
            });
          }
        });
      }
      return createVNode(resolveComponent("el-button"), {
        "text": true,
        "type": "danger",
        "class": [ns.be("index", "remove")],
        "onClick": () => props.controller.remove(index)
      }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
        default: () => [_slot2]
      });
    };
    return {
      ns,
      formItems,
      formControllers,
      renderRemoveBtn
    };
  },
  render() {
    let _slot3;
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.controller.enableCreate && createVNode(resolveComponent("el-button"), {
      "class": this.ns.e("add-btn"),
      "onClick": () => {
        this.controller.create();
      }
    }, _isSlot(_slot3 = ibiz.i18n.t("app.add")) ? _slot3 : {
      default: () => [_slot3]
    }), createVNode(resolveComponent("el-table"), {
      "class": this.ns.e("table"),
      "show-header": true,
      "data": this.controller.value,
      "cell-class-name": ({
        columnIndex
      }) => {
        return columnIndex === 0 ? this.ns.b("index") : "";
      }
    }, {
      default: () => [createVNode(resolveComponent("el-table-column"), {
        "type": "index",
        "width": 66,
        "align": "center"
      }, {
        default: (opts) => {
          const {
            $index
          } = opts;
          if (!this.controller.enableDelete) {
            return createVNode("span", null, [$index + 1]);
          }
          return [this.renderRemoveBtn($index), createVNode("span", {
            "class": this.ns.be("index", "text")
          }, [$index + 1])];
        }
      }), this.formItems.length > 0 && this.formItems.map((item) => {
        const width = item.labelWidth;
        let columnWidth = "";
        if (typeof width === "number") {
          columnWidth = "".concat(width, "px");
        }
        return createVNode(resolveComponent("el-table-column"), {
          "label": item.caption,
          "prop": item.id,
          "width": columnWidth,
          "align": "center"
        }, {
          default: (opts) => {
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
      })]
    })]);
  }
});

export { RepeaterGrid };
