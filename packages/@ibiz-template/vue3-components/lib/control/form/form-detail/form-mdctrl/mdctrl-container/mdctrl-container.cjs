'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./mdctrl-container.css');
var core = require('@ibiz-template/core');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MDCtrlContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMDCtrlContainer",
  props: {
    enableCreate: {
      type: Boolean,
      required: true
    },
    enableDelete: {
      type: Boolean,
      required: true
    },
    items: {
      type: Object,
      required: true
    },
    userStyle: {
      type: String
    }
  },
  emits: {
    addClick: () => true,
    removeClick: (_data, _index) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("mdctrl-container");
    const showActions = vue.computed(() => {
      return props.enableCreate || props.enableDelete;
    });
    const renderAddBtn = () => {
      let _slot;
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [ns.be("item-actions", "create"), ns.be("item-actions", "btn")],
        "onClick": () => emit("addClick")
      }, _isSlot(_slot = ibiz.i18n.t("app.add")) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderRemoveBtn = (item, index) => {
      let _slot3;
      if (!props.enableDelete) {
        return null;
      }
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return vue.createVNode(vue.resolveComponent("el-popconfirm"), {
          "title": core.showTitle(ibiz.i18n.t("control.form.mdCtrlContainer.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => emit("removeClick", item, index)
        }, {
          reference: () => {
            let _slot2;
            return vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "danger",
              "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn")]
            }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
              default: () => [_slot2]
            });
          }
        });
      }
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "danger",
        "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn")],
        "onClick": () => emit("removeClick", item, index)
      }, _isSlot(_slot3 = ibiz.i18n.t("app.delete")) ? _slot3 : {
        default: () => [_slot3]
      });
    };
    const renderStyle2AddBtn = () => {
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [ns.be("style2-item-actions", "create"), ns.be("style2-item-actions", "btn")],
        "title": ibiz.i18n.t("app.add"),
        "onClick": () => emit("addClick")
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("app.add")]
      });
    };
    const renderStyle2RemoveBtn = (item, index) => {
      let _slot4;
      if (!props.enableDelete) {
        return null;
      }
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return vue.createVNode(vue.resolveComponent("el-popconfirm"), {
          "title": core.showTitle(ibiz.i18n.t("control.form.mdCtrlContainer.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => emit("removeClick", item, index)
        }, {
          reference: () => {
            return vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "danger",
              "class": [ns.be("style2-item-actions", "remove"), ns.be("style2-item-actions", "btn")],
              "title": ibiz.i18n.t("app.delete")
            }, {
              default: () => [vue.createVNode("ion-icon", {
                "name": "trash-outline"
              }, null)]
            });
          }
        });
      }
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "danger",
        "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn")],
        "onClick": () => emit("removeClick", item, index)
      }, _isSlot(_slot4 = ibiz.i18n.t("app.delete")) ? _slot4 : {
        default: () => [_slot4]
      });
    };
    return {
      ns,
      showActions,
      renderAddBtn,
      renderRemoveBtn,
      renderStyle2AddBtn,
      renderStyle2RemoveBtn
    };
  },
  render() {
    var _a, _b;
    if (this.userStyle === "STYLE2") {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.b("style2")]
      }, [((_a = this.items) == null ? void 0 : _a.length) ? vue.createVNode("div", {
        "class": this.ns.e("item-container")
      }, [this.showActions && this.enableCreate && this.renderStyle2AddBtn(), this.items.map((item, index) => {
        const formComponent = this.$slots.item ? this.$slots.item({
          data: item,
          index
        }) : vue.createVNode("div", null, [ibiz.i18n.t("control.form.mdCtrlContainer.noSlot")]);
        return vue.createVNode("div", {
          "class": this.ns.b("item")
        }, [formComponent, this.showActions && vue.createVNode("div", {
          "class": this.ns.b("style2-item-actions")
        }, [this.renderStyle2RemoveBtn(item, index)])]);
      })]) : vue.createVNode("div", {
        "class": this.ns.b("no-data")
      }, [this.enableCreate && vue.createVNode("div", {
        "class": this.ns.b("style2-item-actions")
      }, [this.renderStyle2AddBtn()])])]);
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [((_b = this.items) == null ? void 0 : _b.length) ? this.items.map((item, index) => {
      const formComponent = this.$slots.item ? this.$slots.item({
        data: item,
        index
      }) : vue.createVNode("div", null, [ibiz.i18n.t("control.form.mdCtrlContainer.noSlot")]);
      return vue.createVNode("div", {
        "class": this.ns.b("item")
      }, [formComponent, this.showActions && vue.createVNode("div", {
        "class": this.ns.b("item-actions")
      }, [index === 0 && this.enableCreate && this.renderAddBtn(), this.renderRemoveBtn(item, index)])]);
    }) : vue.createVNode("div", {
      "class": this.ns.b("no-data")
    }, [this.enableCreate && vue.createVNode("div", {
      "class": this.ns.b("item-actions")
    }, [this.renderAddBtn()])])]);
  }
});

exports.MDCtrlContainer = MDCtrlContainer;
