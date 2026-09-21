'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./form-mdctrl.css');

"use strict";
const FormMDCtrl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormMDCtrl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormMDCtrlController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-mdctrl");
    vue3Util.useController(props.controller);
    const c = props.controller;
    const hasCaption = c.model.showCaption && !!c.model.caption;
    const hasHeader = hasCaption || c.model.uiactionGroup;
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, event);
    };
    return {
      c,
      ns,
      hasCaption,
      hasHeader,
      onActionClick
    };
  },
  render() {
    const {
      model
    } = this.c;
    let content;
    switch (model.contentType) {
      case "GRID":
      case "LIST":
      case "DATAVIEW":
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlMD"), {
          "controller": this.c
        }, null);
        break;
      case "FORM":
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlForm"), {
          "controller": this.c
        }, null);
        break;
      case "REPEATER":
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlRepeater"), {
          "controller": this.c
        }, null);
        break;
      default:
        vue.createVNode("div", null, [ibiz.i18n.t("app.noSupport")]);
        break;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass, this.hasCaption ? this.ns.m("show-caption") : ""]
    }, [this.hasHeader && vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [vue.createVNode("div", {
      "class": this.ns.e("title")
    }, [this.hasCaption ? this.c.model.caption : ""]), model.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "class": this.ns.e("toolbar"),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": this.controller.state.actionGroupState,
      "onActionClick": this.onActionClick
    }, null)]), content]);
  }
});

exports.FormMDCtrl = FormMDCtrl;
exports.default = FormMDCtrl;
