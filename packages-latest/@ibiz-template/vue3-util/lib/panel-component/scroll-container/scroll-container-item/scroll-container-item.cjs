'use strict';

var vue = require('vue');
require('../../../use/index.cjs');
var scrollContainerItem_controller = require('./scroll-container-item.controller.cjs');
require('./scroll-container-item.css');
var namespace = require('../../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ScrollContainerItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScrollContainerItem",
  props: {
    /**
     * @description 面板滚动容器项模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板滚动容器项控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
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
    return vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizRow"), {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "layout": {
        layout: "FLEX"
      },
      "element-loading-text": this.controller.state.loadingText
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      props.modelData.layoutPos.layout = "FLEX";
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
    }), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.ScrollContainerItem = ScrollContainerItem;
