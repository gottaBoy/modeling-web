'use strict';

var vue = require('vue');
require('../../../use/index.cjs');
var scrollContainerItem_controller = require('./scroll-container-item.controller.cjs');
require('./scroll-container-item.css');
var namespace = require('../../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ScrollContainerItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScrollContainerItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: scrollContainerItem_controller.ScrollContainerItemController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("scroll-container-item");
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ns.is("hidden", !props.controller.state.visible)];
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
      "class": this.classArr,
      "layout": {
        layout: "FLEX"
      }
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      props.modelData.layoutPos.layout = "FLEX";
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

exports.ScrollContainerItem = ScrollContainerItem;
