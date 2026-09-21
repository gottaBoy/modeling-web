'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizFormPageItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormPageItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormPageController,
      required: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("form-page-item");
    return {
      ns
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    defaultSlots.forEach((item) => {
      var _a2;
      const data = (_a2 = item.component) == null ? void 0 : _a2.data;
      if (data) {
        data.class = {
          [this.ns.b("child")]: true
        };
      }
    });
    return vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass],
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.IBizFormPageItem = IBizFormPageItem;
