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
    /**
     * @description 首页行为容器组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 首页行为容器组件控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
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
      isCollapse,
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
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
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

exports.IndexActions = IndexActions;
