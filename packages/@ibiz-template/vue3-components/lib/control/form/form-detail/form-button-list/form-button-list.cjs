'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-button-list.css');

"use strict";
const FormButtonList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormButtonList",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-button-list");
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
      return vue.createVNode(vue.resolveComponent("iBizButtonList"), {
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

exports.FormButtonList = FormButtonList;
exports.default = FormButtonList;
