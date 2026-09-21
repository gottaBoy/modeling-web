'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var singleDataContainer_controller = require('./single-data-container.controller.cjs');
require('./single-data-container.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const SingleDataContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSingleDataContainer",
  props: {
    /**
     * @description 单项数据容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 单项数据容器控制器
     */
    controller: {
      type: singleDataContainer_controller.SingleDataContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("single-data-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const keys = Object.keys(props.controller.panelItems);
    keys.forEach((key) => {
      const panelItem = props.controller.panelItems[key];
      panelItem.state = vue.reactive(panelItem.state);
    });
    const renderPanelItem = vue.inject("renderPanelItem");
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ...props.controller.containerClass];
      return result;
    });
    return {
      ns,
      classArr,
      renderPanelItem,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let content;
    if (this.$slots.default) {
      content = this.$slots.default();
    } else {
      content = vue.createVNode(vue.resolveComponent("iBizRow"), {
        "class": [this.ns.b("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content"),
        "layout": this.modelData.layout
      }, {
        default: () => {
          var _a;
          return [(_a = this.modelData.panelItems) == null ? void 0 : _a.map((panelItem) => {
            let _slot;
            const childController = this.controller.panelItems[panelItem.id];
            return vue.createVNode(vue.resolveComponent("iBizCol"), {
              "class": this.semanticClass("item", {
                item: childController
              }),
              "style": this.semanticStyle("item", {
                item: childController
              }),
              "layoutPos": panelItem.layoutPos,
              "state": childController.state
            }, _isSlot(_slot = this.renderPanelItem(panelItem, {
              providers: this.controller.providers,
              panelItems: this.controller.panelItems
            })) ? _slot : {
              default: () => [_slot]
            });
          })];
        }
      });
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.SingleDataContainer = SingleDataContainer;
