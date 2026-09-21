'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelTabPage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelTabPage",
  props: {
    modelData: {
      // IPanelTabPage 不能使用 IPanelTabPage模型 否则会类型报错
      type: Object,
      required: true
    },
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-tab-page");
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.classArr],
      "layout": this.modelData.layout
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

exports.PanelTabPage = PanelTabPage;
