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
      type: panelButtonList_controller.PanelButtonListController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-button-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
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
      return vue.createVNode(vue.resolveComponent("iBizButtonList"), {
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

exports.PanelButtonList = PanelButtonList;
exports.default = PanelButtonList;
