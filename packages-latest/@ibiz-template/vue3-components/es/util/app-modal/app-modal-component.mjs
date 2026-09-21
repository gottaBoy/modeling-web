import { isVNode, defineComponent, h, resolveComponent, createVNode, ref, reactive } from 'vue';
import { useNamespace, useUIStore, OverlayContainer } from '@ibiz-template/vue3-util';
import { isNumber } from 'lodash-es';
import { Modal, ViewMode, ViewShellHooks, SysUIActionTag } from '@ibiz-template/runtime';
import './app-modal-component.css';
import { calcOpenModeStyle } from '@ibiz-template/core';
import { ArrowLeftBold, ArrowRightBold } from '../icon/icon.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AppModalComponent = /* @__PURE__ */ defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = useNamespace("modal");
    const isShow = ref(false);
    const {
      zIndex
    } = useUIStore();
    const modalZIndex = zIndex.increment();
    let modalView;
    const customStyle = reactive({});
    const {
      width,
      height
    } = props.opts;
    if (width) {
      if (isNumber(width)) {
        customStyle.width = calcOpenModeStyle(width, "modal");
      } else {
        customStyle.width = width;
      }
    }
    if (height) {
      if (isNumber(height)) {
        customStyle.height = calcOpenModeStyle(height, "modal");
      } else {
        customStyle.height = height;
      }
    }
    const options = ref({
      footerHide: true,
      modalClass: ""
    });
    if (props.opts) {
      Object.assign(options.value, props.opts);
    }
    const modal = new Modal({
      mode: options.value.isRouteModal ? ViewMode.ROUTE_MODAL : ViewMode.MODAL,
      viewUsage: 2,
      dismiss: (data) => {
        zIndex.decrement();
        isShow.value = false;
        ctx.emit("dismiss", data);
      }
    });
    const viewShellHooks = new ViewShellHooks();
    viewShellHooks.hooks.viewCreated.tapPromise(async (_event) => {
      modalView = _event.view;
    });
    const handleViewCreated = (event) => {
      modalView = event.view;
    };
    const onBeforeClose = async (done) => {
      const isClose = await modal.dismiss();
      if (isClose) {
        done();
      }
    };
    const dismiss = (_data) => {
      modal.dismiss(_data);
    };
    const present = () => {
      isShow.value = true;
    };
    const prevRecord = () => {
      modalView == null ? void 0 : modalView.call(SysUIActionTag.PREV_RECORD);
    };
    const nextRecord = () => {
      modalView == null ? void 0 : modalView.call(SysUIActionTag.NEXT_RECORD);
    };
    return {
      ns,
      isShow,
      options,
      modalZIndex,
      customStyle,
      modal,
      viewShellHooks,
      present,
      dismiss,
      onBeforeClose,
      prevRecord,
      nextRecord,
      handleViewCreated
    };
  },
  render() {
    var _a, _b;
    let _slot, _slot2;
    return h(resolveComponent("el-dialog"), {
      modelValue: this.isShow,
      alignCenter: true,
      class: [this.ns.b(), this.options.placement && this.ns.m(this.options.placement), this.options.modalClass],
      style: this.customStyle,
      zIndex: this.modalZIndex,
      beforeClose: this.onBeforeClose,
      ...this.options
    }, [
      // eslint-disable-next-line vue/no-multiple-slot-args
      (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal, this.viewShellHooks),
      this.options.openIndicator && createVNode("div", {
        "class": this.ns.e("record")
      }, [createVNode(resolveComponent("el-button"), {
        "class": this.ns.em("record", "prev"),
        "title": ibiz.i18n.t("util.appModal.prev"),
        "onClick": this.prevRecord
      }, _isSlot(_slot = ArrowLeftBold()) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("el-button"), {
        "class": this.ns.em("record", "next"),
        "title": ibiz.i18n.t("util.appModal.next"),
        "onClick": this.nextRecord
      }, _isSlot(_slot2 = ArrowRightBold()) ? _slot2 : {
        default: () => [_slot2]
      })])
    ]);
  }
});
function createModal(render, opts) {
  return new OverlayContainer(AppModalComponent, render, opts);
}

export { AppModalComponent, createModal };
