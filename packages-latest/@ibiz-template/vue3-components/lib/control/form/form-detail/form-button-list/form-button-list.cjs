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
    var _a;
    const ns = vue3Util.useNamespace("form-button-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
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
      return vue.createVNode(vue.resolveComponent("iBizButtonList"), {
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

exports.FormButtonList = FormButtonList;
exports.default = FormButtonList;
