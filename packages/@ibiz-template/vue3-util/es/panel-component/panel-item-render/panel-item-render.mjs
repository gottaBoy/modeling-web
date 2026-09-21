import { defineComponent, computed, createVNode } from 'vue';
import '../../use/index.mjs';
import { PanelItemRenderController } from './panel-item-render.controller.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelItemRender = /* @__PURE__ */ defineComponent({
  name: "IBizPanelItemRender",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemRenderController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("panel-item-render");
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
      htmlCode
    };
  },
  render() {
    return createVNode("div", {
      "class": this.classArr,
      "innerHTML": this.htmlCode
    }, null);
  }
});

export { PanelItemRender };
