'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./row-edit-popover.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizRowEditPopover = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRowEditPopover",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    confirm: () => true,
    cancel: () => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("row-edit-popover");
    const onCancel = () => {
      emit("cancel");
    };
    const onConfirm = () => {
      emit("confirm");
    };
    const componentRef = vue.ref(document);
    vue3Util.useEventListener(
      componentRef,
      "keydown",
      (evt) => {
        if (props.show && evt.key === "Escape") {
          onCancel();
        }
      },
      {
        capture: true
      }
      // 捕获防止内部ui拦截点击事件
    );
    return {
      ns,
      onCancel,
      onConfirm
    };
  },
  render() {
    let _slot, _slot2;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("hidden", !this.show)]
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onConfirm
    }, _isSlot(_slot = ibiz.i18n.t("control.common.determine")) ? _slot : {
      default: () => [_slot]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onCancel
    }, _isSlot(_slot2 = ibiz.i18n.t("app.cancel")) ? _slot2 : {
      default: () => [_slot2]
    })]);
  }
});

exports.IBizRowEditPopover = IBizRowEditPopover;
