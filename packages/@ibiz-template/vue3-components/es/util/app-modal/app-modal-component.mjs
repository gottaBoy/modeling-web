import { defineComponent, ref, reactive, h, resolveComponent } from 'vue';
import { useNamespace, useUIStore, OverlayContainer } from '@ibiz-template/vue3-util';
import { isNumber } from 'lodash-es';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import './app-modal-component.css';
import { calcOpenModeStyle } from '@ibiz-template/core';

"use strict";
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
    return {
      ns,
      isShow,
      options,
      modalZIndex,
      customStyle,
      modal,
      present,
      dismiss,
      onBeforeClose
    };
  },
  render() {
    var _a, _b;
    return h(resolveComponent("el-dialog"), {
      modelValue: this.isShow,
      alignCenter: true,
      class: [this.ns.b(), this.options.placement && this.ns.m(this.options.placement), this.options.modalClass],
      style: this.customStyle,
      zIndex: this.modalZIndex,
      beforeClose: this.onBeforeClose,
      ...this.options
    }, (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal));
  }
});
function createModal(render, opts) {
  return new OverlayContainer(AppModalComponent, render, opts);
}

export { AppModalComponent, createModal };
