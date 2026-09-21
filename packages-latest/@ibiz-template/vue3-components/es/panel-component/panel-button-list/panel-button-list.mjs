import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { PanelButtonListController } from './panel-button-list.controller.mjs';
import './panel-button-list.css';

"use strict";
const PanelButtonList = /* @__PURE__ */ defineComponent({
  name: "IBizPanelButtonList",
  props: {
    /**
     * @description 面板按钮组模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板按钮组控制器
     */
    controller: {
      type: PanelButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-button-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const handleClick = async (id, e) => {
      e == null ? void 0 : e.stopPropagation();
      c.handleClick(id, e);
    };
    return {
      ns,
      handleClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      state
    } = this.controller;
    if (state.visible)
      return createVNode(resolveComponent("iBizButtonList"), {
        "class": [this.ns.b(), ...this.controller.containerClass],
        "semantic": {
          semanticClass: this.semanticClass,
          semanticStyle: this.semanticStyle
        },
        "model": this.modelData,
        "disabled": state.disabled,
        "buttonsState": state.buttonsState,
        "onClick": this.handleClick
      }, null);
    return null;
  }
});

export { PanelButtonList, PanelButtonList as default };
