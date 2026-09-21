import { defineComponent, createVNode, resolveComponent, h } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { ViewPanelController } from '@ibiz-template/runtime';
import './view-panel.css';

"use strict";
const ViewPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizViewPanelControl",
  props: {
    /**
     * @description 视图面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    }
  },
  setup() {
    var _a;
    const c = useControlController((...args) => new ViewPanelController(...args));
    const ns = useNamespace("control-".concat((_a = c.model.controlType) == null ? void 0 : _a.toLowerCase()));
    const onCreated = (event) => {
      if (event && event.view) {
        c.setEmbedView(event.view);
      }
    };
    return {
      c,
      ns,
      onCreated
    };
  },
  render() {
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [this.c.state.isCreated && (this.$slots.default ? this.$slots.default({
        context: this.c.context,
        params: this.c.params,
        onCreated: this.onCreated
      }) : h(resolveComponent("IBizViewShell"), {
        context: this.c.context,
        params: this.c.params,
        viewId: this.c.model.embeddedAppDEViewId,
        onCreated: this.onCreated
      }))]
    });
  }
});

export { ViewPanelControl };
