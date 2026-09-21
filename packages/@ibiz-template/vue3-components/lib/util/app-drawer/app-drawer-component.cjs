'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');
require('./app-drawer-component.css');
var core = require('@ibiz-template/core');

"use strict";
const AppDrawerComponent = /* @__PURE__ */ vue.defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = vue3Util.useNamespace("drawer");
    const isShow = vue.ref(false);
    let data;
    const {
      zIndex
    } = vue3Util.useUIStore();
    const drawerZIndex = zIndex.increment();
    const size = vue.ref("100%");
    const {
      width,
      height,
      placement
    } = props.opts;
    if (placement === "top" || placement === "bottom") {
      if (lodashEs.isNumber(height)) {
        size.value = core.calcOpenModeStyle(height, "drawer");
      } else {
        size.value = "100%";
      }
    }
    if (placement === "left" || placement === "right") {
      if (lodashEs.isNumber(width)) {
        size.value = core.calcOpenModeStyle(width, "drawer");
      } else {
        size.value = 800;
      }
    }
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.DRAWER,
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
    return vue.h(vue.resolveComponent("el-drawer"), {
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
  return new vue3Util.OverlayContainer(AppDrawerComponent, render, opts);
}

exports.AppDrawerComponent = AppDrawerComponent;
exports.createDrawer = createDrawer;
