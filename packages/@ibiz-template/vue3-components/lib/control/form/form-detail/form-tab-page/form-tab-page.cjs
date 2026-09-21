'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-tab-page.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormTabPage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormTabPage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormTabPageController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-tab-page");
    vue3Util.useController(props.controller);
    return {
      ns
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass],
      "layout": this.modelData.layout,
      "onClick": (event) => this.controller.onClick(event)
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "layoutPos": c.model.layoutPos,
        "state": c.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.FormTabPage = FormTabPage;
exports.default = FormTabPage;
