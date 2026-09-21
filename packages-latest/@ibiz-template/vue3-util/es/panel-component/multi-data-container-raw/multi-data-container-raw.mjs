import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, watch, reactive, inject, computed } from 'vue';
import '../../use/index.mjs';
import { MultiDataContainerRawController } from './multi-data-container-raw.controller.mjs';
import './multi-data-container-raw.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const MultiDataContainerRaw = /* @__PURE__ */ defineComponent({
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
      type: MultiDataContainerRawController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("multi-data-container-raw");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    watch(() => props.controller.state.items, () => {
      const keys = Object.keys(props.controller.panelItems);
      keys.forEach((key) => {
        const panelItem = props.controller.panelItems[key];
        panelItem.state = reactive(panelItem.state);
      });
    }, {
      immediate: true,
      deep: true
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
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [content]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { MultiDataContainerRaw };
