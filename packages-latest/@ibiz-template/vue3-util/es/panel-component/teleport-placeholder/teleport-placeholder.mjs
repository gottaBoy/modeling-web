import { defineComponent, createVNode, ref, computed } from 'vue';
import '../../use/index.mjs';
import './teleport-placeholder.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
const TeleportPlaceholder = /* @__PURE__ */ defineComponent({
  name: "IBizTeleportPlaceholder",
  props: {
    /**
     * @description 传送占位模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 传送占位控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("teleport-placeholder");
    const tempStyle = ref("");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      rawItem
    } = props.modelData;
    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }
    const classArr = computed(() => {
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
      tempStyle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return createVNode("div", {
      "id": this.controller.state.teleportTag,
      "class": [this.classArr, this.semanticClass("root")],
      "style": [this.tempStyle, this.semanticStyle("root")]
    }, null);
  }
});

export { TeleportPlaceholder };
