'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var multiDataContainerRaw_controller = require('./multi-data-container-raw.controller.cjs');
require('./multi-data-container-raw.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MultiDataContainerRaw = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMultiDataContainerRaw",
  props: {
    /**
     * @description 多项数据容器（仅数据）模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 多项数据容器（仅数据）控制器
     */
    controller: {
      type: multiDataContainerRaw_controller.MultiDataContainerRawController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("multi-data-container-raw");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    vue.watch(() => props.controller.state.items, () => {
      const keys = Object.keys(props.controller.panelItems);
      keys.forEach((key) => {
        const panelItem = props.controller.panelItems[key];
        panelItem.state = vue.reactive(panelItem.state);
      });
    }, {
      immediate: true,
      deep: true
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
              "layoutPos": panelItem.layoutPos,
              "state": childController.state,
              "class": this.semanticClass("item", {
                item: childController
              }),
              "style": this.semanticStyle("item", {
                item: childController
              })
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

exports.MultiDataContainerRaw = MultiDataContainerRaw;
