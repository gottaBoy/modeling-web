import { defineComponent, createVNode, resolveComponent } from 'vue';
import { FormButtonListController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
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
    var _a;
    const ns = useNamespace("form-button-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.form);
    const isDesignPreview = ((_a = c.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    const handleClick = async (id, e) => {
      e == null ? void 0 : e.stopPropagation();
      if (isDesignPreview)
        return;
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
    if (state.visible) {
      return createVNode(resolveComponent("iBizButtonList"), {
        "class": [this.ns.b(), ...this.controller.containerClass],
        "semantic": {
          semanticClass: (key, params) => {
            let tag = "buttonlist.".concat(key);
            if (key === "root") {
              tag = "buttonlist";
            }
            return this.semanticClass(tag, params);
          },
          semanticStyle: (key, params) => {
            let tag = "buttonlist.".concat(key);
            if (key === "root") {
              tag = "buttonlist";
            }
            return this.semanticStyle(tag, params);
          }
        },
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
