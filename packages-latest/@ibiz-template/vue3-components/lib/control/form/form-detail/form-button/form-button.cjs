'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('../../../../util/index.cjs');
require('./form-button.css');
var buttonUtil = require('../../../../util/button-util/button-util.cjs');

"use strict";
const FormButton = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormButton",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormButtonController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-button");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const captionText = vue.computed(() => {
      const {
        caption,
        captionItemName
      } = props.modelData;
      if (captionItemName && props.controller.data[captionItemName]) {
        return props.controller.data[captionItemName];
      }
      return caption;
    });
    return {
      ns,
      captionText,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return null;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.ns.is("loading", this.controller.state.loading), this.ns.is("readonly", this.controller.state.readonly), this.semanticClass("button", {
        button: this.controller
      }), this.modelData.detailStyle && this.ns.m(this.modelData.detailStyle.toLowerCase()), ...ibiz.config.common.enhancedUI === false ? this.controller.containerClass : []],
      "style": this.semanticStyle("button", {
        button: this.controller
      })
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "sime": "small",
      "onClick": this.controller.onClick.bind(this.controller),
      "type": buttonUtil.convertBtnType(this.modelData.buttonStyle),
      "loading": this.controller.state.loading,
      "disabled": this.controller.state.disabled,
      "title": core.showTitle(this.modelData.tooltip),
      "class": [...ibiz.config.common.enhancedUI === true ? this.controller.containerClass : []]
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.b("content")
      }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [this.ns.bm("content", "icon"), this.semanticClass("button.icon", {
          button: this.controller
        })],
        "style": this.semanticStyle("button.icon", {
          button: this.controller
        }),
        "icon": this.modelData.sysImage
      }, null), this.modelData.showCaption ? vue.createVNode("span", {
        "class": [this.ns.bm("content", "caption"), this.semanticClass("button.caption", {
          button: this.controller
        })],
        "style": this.semanticStyle("button.caption", {
          button: this.controller
        })
      }, [this.captionText]) : null])]
    })]);
  }
});

exports.FormButton = FormButton;
exports.default = FormButton;
