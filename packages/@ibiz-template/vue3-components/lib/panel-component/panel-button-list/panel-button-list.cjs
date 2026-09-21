'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var panelButtonList_controller = require('./panel-button-list.controller.cjs');
require('./panel-button-list.css');

"use strict";
const PanelButtonList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelButtonList",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelButtonList_controller.PanelButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-button-list");
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

exports.PanelButtonList = PanelButtonList;
exports.default = PanelButtonList;
