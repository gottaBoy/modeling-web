'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./export-excel.css');
var core = require('@ibiz-template/core');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizExportExcel = /* @__PURE__ */ vue.defineComponent({
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
      type: Object
    }
  },
  emits: ["exportExcel"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("export-excel");
    const startPage = vue.ref(1);
    const endPage = vue.ref(9999);
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
      endPage,
      startPage,
      onCommand
    };
  },
  render() {
    return this.$props.mode === "menu" ? vue.createVNode(vue.resolveComponent("el-sub-menu"), {
      "index": this.$props.item.id,
      "class": this.ns.b("submenu"),
      "popper-class": this.ns.b("submenu-popper")
    }, {
      title: () => {
        let _slot;
        return vue.createVNode(vue.resolveComponent("el-button"), {
          "title": core.showTitle(this.item.tooltip),
          "size": this.$props.size,
          "class": this.ns.b("submenu-button")
        }, _isSlot(_slot = this.btnContent(this.item)) ? _slot : {
          default: () => [_slot]
        });
      },
      default: () => {
        let _slot2, _slot3, _slot4, _slot5;
        return [vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("maxRowCount", e)
        }, _isSlot(_slot2 = ibiz.i18n.t("control.toolbar.exportExcel.exportAll")) ? _slot2 : {
          default: () => [_slot2]
        }), vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("activatedPage", e)
        }, _isSlot(_slot3 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentPage")) ? _slot3 : {
          default: () => [_slot3]
        }), vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "class": this.ns.b("menu-item"),
          "onClick": (e) => this.onCommand("selectedRows", e)
        }, _isSlot(_slot4 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentSelect")) ? _slot4 : {
          default: () => [_slot4]
        }), vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "class": [this.ns.b("menu-item"), this.ns.e("custom")]
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
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
          }, null), vue.createVNode("span", {
            "class": "item-text",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, [vue.createTextVNode("-")]), vue.createVNode(vue.resolveComponent("el-input"), {
            "modelValue": this.endPage,
            "onUpdate:modelValue": ($event) => this.endPage = $event,
            "size": "small",
            "type": "number",
            "maxlength": "4",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, null), vue.createVNode("span", {
            "class": "item-text",
            "onClick": (event) => {
              event.stopPropagation();
            }
          }, [ibiz.i18n.t("control.toolbar.exportExcel.page")]), vue.createVNode(vue.resolveComponent("el-button"), {
            "onClick": (e) => this.onCommand("customPage", e),
            "size": "small"
          }, _isSlot(_slot5 = ibiz.i18n.t("control.toolbar.exportExcel.export")) ? _slot5 : {
            default: () => [_slot5]
          })]
        })];
      }
    }) : vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "size": this.$props.size,
      "onCommand": this.onCommand,
      "popper-class": this.ns.b(),
      "trigger": "click"
    }, {
      default: () => {
        let _slot6;
        return vue.createVNode(vue.resolveComponent("el-button"), {
          "title": core.showTitle(this.item.tooltip),
          "size": this.$props.size,
          "class": this.ns.e("button")
        }, _isSlot(_slot6 = this.btnContent(this.item)) ? _slot6 : {
          default: () => [_slot6]
        });
      },
      dropdown: () => {
        let _slot7, _slot8, _slot9, _slot10;
        return vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
          default: () => [vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "command": "maxRowCount"
          }, _isSlot(_slot7 = ibiz.i18n.t("control.toolbar.exportExcel.exportAll")) ? _slot7 : {
            default: () => [_slot7]
          }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "command": "activatedPage"
          }, _isSlot(_slot8 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentPage")) ? _slot8 : {
            default: () => [_slot8]
          }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "command": "selectedRows"
          }, _isSlot(_slot9 = ibiz.i18n.t("control.toolbar.exportExcel.expCurrentSelect")) ? _slot9 : {
            default: () => [_slot9]
          }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "class": this.ns.e("custom"),
            "command": ""
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
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
            }, null), vue.createVNode("span", {
              "class": "item-text",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, [vue.createTextVNode("-")]), vue.createVNode(vue.resolveComponent("el-input"), {
              "modelValue": this.endPage,
              "onUpdate:modelValue": ($event) => this.endPage = $event,
              "size": "small",
              "type": "number",
              "maxlength": "4",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, null), vue.createVNode("span", {
              "class": "item-text",
              "onClick": (event) => {
                event.stopPropagation();
              }
            }, [ibiz.i18n.t("control.toolbar.exportExcel.page")]), vue.createVNode(vue.resolveComponent("el-button"), {
              "onClick": (e) => this.onCommand("customPage", e),
              "size": "small"
            }, _isSlot(_slot10 = ibiz.i18n.t("control.toolbar.exportExcel.export")) ? _slot10 : {
              default: () => [_slot10]
            })]
          })]
        });
      }
    });
  }
});

exports.IBizExportExcel = IBizExportExcel;
