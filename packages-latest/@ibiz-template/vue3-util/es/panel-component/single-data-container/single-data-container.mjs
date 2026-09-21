import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, reactive, inject, computed } from 'vue';
import '../../use/index.mjs';
import { SingleDataContainerController } from './single-data-container.controller.mjs';
import './single-data-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SingleDataContainer = /* @__PURE__ */ defineComponent({
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
      type: SingleDataContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("single-data-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const keys = Object.keys(props.controller.panelItems);
    keys.forEach((key) => {
      const panelItem = props.controller.panelItems[key];
      panelItem.state = reactive(panelItem.state);
    });
    const renderPanelItem = inject("renderPanelItem");
    const classArr = computed(() => {
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
      content = createVNode(resolveComponent("iBizRow"), {
        "class": [this.ns.b("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content"),
        "layout": this.modelData.layout
      }, {
        default: () => {
          var _a;
          return [(_a = this.modelData.panelItems) == null ? void 0 : _a.map((panelItem) => {
            let _slot;
            const childController = this.controller.panelItems[panelItem.id];
            return createVNode(resolveComponent("iBizCol"), {
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
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { SingleDataContainer };
