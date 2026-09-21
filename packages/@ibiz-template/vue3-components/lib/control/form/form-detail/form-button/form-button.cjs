'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-button.css');
var core = require('@ibiz-template/core');

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
      captionText
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return null;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.ns.is("loading", this.controller.state.loading), this.modelData.detailStyle && this.ns.m(this.modelData.detailStyle.toLowerCase()), ...this.controller.containerClass]
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "sime": "small",
      "onClick": this.controller.onClick.bind(this.controller),
      "loading": this.controller.state.loading,
      "disabled": this.controller.state.disabled,
      "title": core.showTitle(this.modelData.tooltip)
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.b("content")
      }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": this.ns.bm("content", "icon"),
        "icon": this.modelData.sysImage
      }, null), this.modelData.showCaption ? vue.createVNode("span", {
        "class": this.ns.bm("content", "caption")
      }, [this.captionText]) : null])]
    })]);
  }
});

exports.FormButton = FormButton;
exports.default = FormButton;
