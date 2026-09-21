'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./index-blank-placeholder.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IndexBlankPlaceholder = /* @__PURE__ */ vue.defineComponent({
  name: "IBizIndexBlankPlaceholder",
  props: {
    /**
     * @description 空白占位模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 空白占位控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("index-blank-placeholder");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    if (c.routeDepth) {
      vue3Util.onRouteChange((args) => {
        c.setVisible(!args.currentKey);
      }, c.routeDepth + 1);
    }
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = vue.createVNode(vue.resolveComponent("iBizRow"), {
      "slot": "content",
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state,
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        })
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    return vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "onClick": (event) => this.controller.onClick(event)
    }, [this.controller.model.cssStyle ? vue.createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

exports.IndexBlankPlaceholder = IndexBlankPlaceholder;
