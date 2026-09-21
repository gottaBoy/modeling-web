import { defineComponent, h, resolveComponent, ref } from 'vue';
import { useNamespace, useUIStore, OverlayContainer } from '@ibiz-template/vue3-util';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { isNumber } from 'lodash-es';
import './app-drawer-component.css';
import { calcOpenModeStyle } from '@ibiz-template/core';

"use strict";
const AppDrawerComponent = /* @__PURE__ */ defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = useNamespace("drawer");
    const isShow = ref(false);
    let data;
    const {
      zIndex
    } = useUIStore();
    const drawerZIndex = zIndex.increment();
    const size = ref("100%");
    const {
      width,
      height,
      placement
    } = props.opts;
    if (placement === "top" || placement === "bottom") {
      if (isNumber(height)) {
        size.value = calcOpenModeStyle(height, "drawer");
      } else {
        size.value = "100%";
      }
    }
    if (placement === "left" || placement === "right") {
      if (isNumber(width)) {
        size.value = calcOpenModeStyle(width, "drawer");
      } else {
        size.value = 800;
      }
    }
    const modal = new Modal({
      mode: ViewMode.DRAWER,
      viewUsage: 2,
      dismiss: (_data) => {
        zIndex.decrement();
        isShow.value = false;
        data = _data;
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
    const onClosed = () => {
      ctx.emit("dismiss", data);
    };
    let direction = "";
    switch (props.opts.placement) {
      case "left":
        direction = "ltr";
        break;
      case "top":
        direction = "ttb";
        break;
      case "bottom":
        direction = "btt";
        break;
      default:
        direction = "rtl";
    }
    return {
      ns,
      isShow,
      size,
      direction,
      drawerZIndex,
      modal,
      dismiss,
      present,
      onClosed,
      onBeforeClose
    };
  },
  render() {
    var _a, _b;
    const option = this.opts || {};
    return h(resolveComponent("el-drawer"), {
      modelValue: this.isShow,
      lockScroll: true,
      size: this.size,
      class: this.ns.b(),
      zIndex: this.drawerZIndex,
      direction: this.direction,
      beforeClose: this.onBeforeClose,
      onClosed: this.onClosed,
      ...option
    }, (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal));
  }
});
function createDrawer(render, opts) {
  return new OverlayContainer(AppDrawerComponent, render, opts);
}

export { AppDrawerComponent, createDrawer };
