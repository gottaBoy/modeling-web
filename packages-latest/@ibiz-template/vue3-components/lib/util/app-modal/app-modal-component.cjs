'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var runtime = require('@ibiz-template/runtime');
require('./app-modal-component.css');
var core = require('@ibiz-template/core');
var icon = require('../icon/icon.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
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
    let modalView;
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
    const viewShellHooks = new runtime.ViewShellHooks();
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
      modalView == null ? void 0 : modalView.call(runtime.SysUIActionTag.PREV_RECORD);
    };
    const nextRecord = () => {
      modalView == null ? void 0 : modalView.call(runtime.SysUIActionTag.NEXT_RECORD);
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
    return vue.h(vue.resolveComponent("el-dialog"), {
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
      this.options.openIndicator && vue.createVNode("div", {
        "class": this.ns.e("record")
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "class": this.ns.em("record", "prev"),
        "title": ibiz.i18n.t("util.appModal.prev"),
        "onClick": this.prevRecord
      }, _isSlot(_slot = icon.ArrowLeftBold()) ? _slot : {
        default: () => [_slot]
      }), vue.createVNode(vue.resolveComponent("el-button"), {
        "class": this.ns.em("record", "next"),
        "title": ibiz.i18n.t("util.appModal.next"),
        "onClick": this.nextRecord
      }, _isSlot(_slot2 = icon.ArrowRightBold()) ? _slot2 : {
        default: () => [_slot2]
      })])
    ]);
  }
});
function createModal(render, opts) {
  return new vue3Util.OverlayContainer(AppModalComponent, render, opts);
}

exports.AppModalComponent = AppModalComponent;
exports.createModal = createModal;
