import { defineComponent, createVNode, resolveComponent } from 'vue';
import { FormButtonListController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-button-list.css';

"use strict";
const FormButtonList = /* @__PURE__ */ defineComponent({
  name: "IBizFormButtonList",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-button-list");
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

export { FormButtonList, FormButtonList as default };
