'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelTabPage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelTabPage",
  props: {
    /**
     * @description 面板分页模型
     */
    modelData: {
      // IPanelTabPage 不能使用 IPanelTabPage模型 否则会类型报错
      type: Object,
      required: true
    },
    /**
     * @description 面板分页控制器
     */
    controller: {
      type: runtime.PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-tab-page");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
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
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "layout": this.modelData.layout,
      "element-loading-text": this.controller.state.loadingText
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      return vue.createVNode(vue.resolveComponent("iBizCol"), {
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
        "layoutPos": c.model.layoutPos,
        "state": c.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.PanelTabPage = PanelTabPage;
