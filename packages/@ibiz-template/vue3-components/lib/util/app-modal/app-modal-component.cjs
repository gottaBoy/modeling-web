'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var runtime = require('@ibiz-template/runtime');
require('./app-modal-component.css');
var core = require('@ibiz-template/core');

"use strict";
const AppModalComponent = /* @__PURE__ */ vue.defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = vue3Util.useNamespace("modal");
    const isShow = vue.ref(false);
    const {
      zIndex
    } = vue3Util.useUIStore();
    const modalZIndex = zIndex.increment();
    const customStyle = vue.reactive({});
    const {
      width,
      height
    } = props.opts;
    if (width) {
      if (lodashEs.isNumber(width)) {
        customStyle.width = core.calcOpenModeStyle(width, "modal");
      } else {
        customStyle.width = width;
      }
    }
    if (height) {
      if (lodashEs.isNumber(height)) {
        customStyle.height = core.calcOpenModeStyle(height, "modal");
      } else {
        customStyle.height = height;
      }
    }
    const options = vue.ref({
      footerHide: true,
      modalClass: ""
    });
    if (props.opts) {
      Object.assign(options.value, props.opts);
    }
    const modal = new runtime.Modal({
      mode: options.value.isRouteModal ? runtime.ViewMode.ROUTE_MODAL : runtime.ViewMode.MODAL,
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
    return vue.h(vue.resolveComponent("el-dialog"), {
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
  return new vue3Util.OverlayContainer(AppModalComponent, render, opts);
}

exports.AppModalComponent = AppModalComponent;
exports.createModal = createModal;
