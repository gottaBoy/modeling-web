'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./index-actions.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IndexActions = /* @__PURE__ */ vue.defineComponent({
  name: "IBizIndexActions",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: vue3Util.PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("index-actions");
    const {
      id
    } = props.modelData;
    const isCollapse = vue.computed(() => {
      return props.controller.panel.view.state.isCollapse;
    });
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("collapse", isCollapse.value)];
      return result;
    });
    return {
      ns,
      classArr,
      isCollapse
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "slot": "content",
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
    return vue.createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [this.controller.model.cssStyle ? vue.createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

exports.IndexActions = IndexActions;
