import { isVNode, defineComponent, createVNode, resolveComponent, createTextVNode, ref, onMounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../../../util/index.mjs';
import './export-excel.css';
import { convertBtnType } from '../../../util/button-util/button-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizExportExcel = /* @__PURE__ */ defineComponent({
  name: "IBizExportExcel",
  props: {
    mode: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    item: {
      type: Object,
      required: true
    },
    btnContent: {
      type: Function,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  emits: ["exportExcel"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("export-excel");
    const startPage = ref(1);
    const endPage = ref(9999);
    const maxRowCount = ref();
    const xdataControl = props.controller.xdataControl;
    onMounted(() => {
      if (xdataControl)
        xdataControl.evt.on("onMounted", () => {
          var _a;
          maxRowCount.value = ((_a = xdataControl.dataExport) == null ? void 0 : _a.maxRowCount) || ibiz.config.common.maxExportRowsDefault;
        });
    });
    const onCommand = (command, e) => {
      if (!command) {
        return;
      }
      emit("exportExcel", e, {
        type: command,
        startPage: startPage.value,
        endPage: endPage.value
      });
    };
    return {
      ns,
      maxRowCount,
      endPage,
      startPage,
      onCommand
    };
  },
  render() {
    return this.$props.mode === "menu" ? createVNode(resolveComponent("el-sub-menu"), {
      "index": this.$props.item.id,
      "class": this.ns.b("submenu"),
      "popper-class": this.ns.b("submenu-popper")
    }, {
      title: () => {
        let _slot;
        return createVNode(resolveComponent("el-button"), {
          "title": showTitle(this.item.tooltip),
          "size": this.$props.size,
          "type": convertBtnType(this.item.buttonStyle),
          "class": this.ns.b("submenu-button")
        }, _isSlot(_slot = this.btnContent(this.item)) ? _slot : {
          default: () => [_slot]
        });
      },
      default: () => {
        let _slot2, _slot3, _slot4, _slot5;
        return [createVNode(resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("maxRowCount", e)
        }, _isSlot(_slot2 = ibiz.i18n.t("control.toolbar.exportExcel.exportAll", {
          maxRowCount: this.maxRowCount
        })) ? _slot2 : {
          default: () => [_slot2]
        }), createVNode(resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("activatedPage", e)
        }, _isSlot(_slot3 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentPage")) ? _slot3 : {
          default: () => [_slot3]
        }), createVNode(resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("selectedRows", e)
        }, _isSlot(_slot4 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentSelect")) ? _slot4 : {
          default: () => [_slot4]
        }), createVNode(resolveComponent("el-menu-item"), {
          "class": [this.ns.b("menu-item"), this.ns.e("custom")]
        }, {
          default: () => [createVNode(resolveComponent("el-input"), {
            "type": "number",
            "modelValue": this.startPage,
            "onUpdate:modelValue": ($event) => this.startPage = $event,
            "size": "small",
            "maxlength": "4",
            "onClick": (event) => {
              event.stopPropagation();
            },
            "onChange": (value) => {
              this.startPage = value;
            }
          }, null), createVNode("span", {
            "class": "item-text",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, [createTextVNode("-")]), createVNode(resolveComponent("el-input"), {
            "modelValue": this.endPage,
            "onUpdate:modelValue": ($event) => this.endPage = $event,
            "size": "small",
            "type": "number",
            "maxlength": "4",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, null), createVNode("span", {
            "class": "item-text",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, [ibiz.i18n.t("control.toolbar.exportExcel.page")]), createVNode(resolveComponent("el-button"), {
            "onClick": (e) => this.onCommand("customPage", e),
            "size": "small"
          }, _isSlot(_slot5 = ibiz.i18n.t("control.toolbar.exportExcel.export")) ? _slot5 : {
            default: () => [_slot5]
          })]
        })];
      }
    }) : createVNode(resolveComponent("el-dropdown"), {
      "trigger": "click",
      "size": this.$props.size,
      "onCommand": this.onCommand,
      "popper-class": this.ns.b()
    }, {
      default: () => {
        let _slot6;
        return createVNode(resolveComponent("el-button"), {
          "size": this.$props.size,
          "class": this.ns.e("button"),
          "title": showTitle(this.item.tooltip),
          "type": convertBtnType(this.item.buttonStyle)
        }, _isSlot(_slot6 = this.btnContent(this.item)) ? _slot6 : {
          default: () => [_slot6]
        });
      },
      dropdown: () => {
        let _slot7, _slot8, _slot9, _slot0;
        return createVNode(resolveComponent("el-dropdown-menu"), null, {
          default: () => [createVNode(resolveComponent("el-dropdown-item"), {
            "command": "maxRowCount"
          }, _isSlot(_slot7 = ibiz.i18n.t("control.toolbar.exportExcel.exportAll", {
            maxRowCount: this.maxRowCount
          })) ? _slot7 : {
            default: () => [_slot7]
          }), createVNode(resolveComponent("el-dropdown-item"), {
            "command": "activatedPage"
          }, _isSlot(_slot8 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentPage")) ? _slot8 : {
            default: () => [_slot8]
          }), createVNode(resolveComponent("el-dropdown-item"), {
            "command": "selectedRows"
          }, _isSlot(_slot9 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentSelect")) ? _slot9 : {
            default: () => [_slot9]
          }), createVNode(resolveComponent("el-dropdown-item"), {
            "class": this.ns.e("custom"),
            "command": ""
          }, {
            default: () => [createVNode(resolveComponent("el-input"), {
              "type": "number",
              "modelValue": this.startPage,
              "onUpdate:modelValue": ($event) => this.startPage = $event,
              "size": "small",
              "maxlength": "4",
              "onClick": (event) => {
                event.stopPropagation();
              },
              "onChange": (value) => {
                this.startPage = value;
              }
            }, null), createVNode("span", {
              "class": "item-text",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, [createTextVNode("-")]), createVNode(resolveComponent("el-input"), {
              "modelValue": this.endPage,
              "onUpdate:modelValue": ($event) => this.endPage = $event,
              "size": "small",
              "type": "number",
              "maxlength": "4",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, null), createVNode("span", {
              "class": "item-text",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, [ibiz.i18n.t("control.toolbar.exportExcel.page")]), createVNode(resolveComponent("el-button"), {
              "onClick": (e) => this.onCommand("customPage", e),
              "size": "small"
            }, _isSlot(_slot0 = ibiz.i18n.t("control.toolbar.exportExcel.export")) ? _slot0 : {
              default: () => [_slot0]
            })]
          })]
        });
      }
    });
  }
});

export { IBizExportExcel };
