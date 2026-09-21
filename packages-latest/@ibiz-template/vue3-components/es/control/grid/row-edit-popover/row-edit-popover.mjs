import { isVNode, defineComponent, createVNode, resolveComponent, ref } from 'vue';
import { useNamespace, useEventListener } from '@ibiz-template/vue3-util';
import './row-edit-popover.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizRowEditPopover = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("row-edit-popover");
    const onCancel = () => {
      emit("cancel");
    };
    const onConfirm = () => {
      emit("confirm");
    };
    const componentRef = ref(document);
    useEventListener(
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("hidden", !this.show)]
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.onConfirm
    }, _isSlot(_slot = ibiz.i18n.t("control.common.determine")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.onCancel
    }, _isSlot(_slot2 = ibiz.i18n.t("app.cancel")) ? _slot2 : {
      default: () => [_slot2]
    })]);
  }
});

export { IBizRowEditPopover };
