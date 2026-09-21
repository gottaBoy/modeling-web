import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, watch, reactive, inject, computed } from 'vue';
import '../../use/index.mjs';
import { MultiDataContainerController } from './multi-data-container.controller.mjs';
import './multi-data-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const MultiDataContainer = /* @__PURE__ */ defineComponent({
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
      type: MultiDataContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("multi-data-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    watch(() => props.controller.state.items, () => {
      props.controller.dataItems.forEach((item) => {
        item.state = reactive(item.state);
        const keys = Object.keys(item.panelItems);
        keys.forEach((key) => {
          const panelItem = item.panelItems[key];
          panelItem.state = reactive(panelItem.state);
        });
      });
    }, {
      immediate: true
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
      content = this.controller.state.items.map((_item, index) => {
        const itemController = this.controller.dataItems[index];
        return createVNode(resolveComponent("iBizRow"), {
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
              return createVNode(resolveComponent("iBizCol"), {
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
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { MultiDataContainer };
