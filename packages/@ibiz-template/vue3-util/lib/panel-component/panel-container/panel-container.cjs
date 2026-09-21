'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelContainer_controller = require('./panel-container.controller.cjs');
require('./panel-container.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelContainer_controller.PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-container");
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
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

exports.PanelContainer = PanelContainer;
