'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var multiDataContainer_controller = require('./multi-data-container.controller.cjs');
require('./multi-data-container.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MultiDataContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMultiDataContainer",
  props: {
    /**
     * @description 多项数据容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 多项数据容器控制器
     */
    controller: {
      type: multiDataContainer_controller.MultiDataContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("multi-data-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    vue.watch(() => props.controller.state.items, () => {
      props.controller.dataItems.forEach((item) => {
        item.state = vue.reactive(item.state);
        const keys = Object.keys(item.panelItems);
        keys.forEach((key) => {
          const panelItem = item.panelItems[key];
          panelItem.state = vue.reactive(panelItem.state);
        });
      });
    }, {
      immediate: true
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
      content = this.controller.state.items.map((_item, index) => {
        const itemController = this.controller.dataItems[index];
        return vue.createVNode(vue.resolveComponent("iBizRow"), {
          "class": [this.ns.b("content"), this.semanticClass("item", {
            data: _item
          })],
          "style": this.semanticStyle("item", {
            data: _item
          }),
          "layout": this.modelData.layout
        }, {
          default: () => {
            var _a;
            return [(_a = this.modelData.panelItems) == null ? void 0 : _a.map((panelItem) => {
              let _slot;
              const childController = itemController.panelItems[panelItem.id];
              return vue.createVNode(vue.resolveComponent("iBizCol"), {
                "layoutPos": panelItem.layoutPos,
                "state": childController.state
              }, _isSlot(_slot = this.renderPanelItem(panelItem, {
                providers: this.controller.providers,
                panelItems: itemController.panelItems
              })) ? _slot : {
                default: () => [_slot]
              });
            })];
          }
        });
      });
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.MultiDataContainer = MultiDataContainer;
