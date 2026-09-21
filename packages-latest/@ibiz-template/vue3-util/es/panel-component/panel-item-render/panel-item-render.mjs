import { defineComponent, createVNode, computed } from 'vue';
import '../../use/index.mjs';
import { PanelItemRenderController } from './panel-item-render.controller.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
const PanelItemRender = /* @__PURE__ */ defineComponent({
  name: "IBizPanelItemRender",
  props: {
    /**
     * @description 面板项模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板项控制器
     */
    controller: {
      type: PanelItemRenderController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("panel-item-render");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const nsType = useNamespace("panel-".concat((_a = props.modelData.itemType) == null ? void 0 : _a.toLowerCase()));
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      const result = [ns.b(), ns.m(id), nsType.b(), ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const htmlCode = computed(() => {
      return props.controller.getPanelItemCustomHtml(props.modelData.controlRenders, props.controller.data);
    });
    return {
      ns,
      classArr,
      htmlCode,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "innerHTML": this.htmlCode,
      "onClick": (event) => this.controller.onClick(event)
    }, null);
  }
});

export { PanelItemRender };
