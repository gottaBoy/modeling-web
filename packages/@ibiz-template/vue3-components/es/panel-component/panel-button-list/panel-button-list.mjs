import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { PanelButtonListController } from './panel-button-list.controller.mjs';
import './panel-button-list.css';

"use strict";
const PanelButtonList = /* @__PURE__ */ defineComponent({
  name: "IBizPanelButtonList",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-button-list");
    const c = props.controller;
    const handleClick = async (e, actionId) => {
      e.stopPropagation();
      c.doUIAction(actionId, e);
    };
    return {
      ns,
      handleClick
    };
  },
  render() {
    const {
      state
    } = this.controller;
    if (state.visible) {
      return createVNode(resolveComponent("iBizButtonList"), {
        "class": [this.ns.b(), ...this.controller.containerClass],
        "model": this.modelData,
        "disabled": state.disabled,
        "buttonsState": state.buttonsState,
        "onClick": this.handleClick
      }, null);
    }
    return null;
  }
});

export { PanelButtonList, PanelButtonList as default };
