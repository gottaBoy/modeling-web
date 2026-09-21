import { defineComponent, createVNode, resolveComponent, h } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { PickupViewPanelController } from '@ibiz-template/runtime';
import './pickup-view-panel.css';

"use strict";
const PickupViewPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizPickupViewPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: true
    },
    noLoadDefault: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const c = useControlController((...args) => new PickupViewPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const onCreated = (event) => {
      c.setEmbedView(event.view);
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
        context: this.c.state.context,
        params: this.c.state.params,
        state: {
          singleSelect: this.c.state.singleSelect,
          noLoadDefault: this.noLoadDefault
        },
        onCreated: this.onCreated
      }) : h(resolveComponent("IBizViewShell"), {
        context: this.c.state.context,
        params: this.c.state.params,
        viewId: this.c.model.embeddedAppDEViewId,
        state: {
          singleSelect: this.c.state.singleSelect,
          noLoadDefault: this.noLoadDefault
        },
        onCreated: this.onCreated
      }))]
    });
  }
});

export { PickupViewPanelControl };
