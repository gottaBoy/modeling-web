import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useController } from '@ibiz-template/vue3-util';
import { FormMDCtrlController } from '@ibiz-template/runtime';
import './form-mdctrl.css';

"use strict";
const FormMDCtrl = /* @__PURE__ */ defineComponent({
  name: "IBizFormMDCtrl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormMDCtrlController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-mdctrl");
    useController(props.controller);
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
        content = createVNode(resolveComponent("iBizFormMDCtrlMD"), {
          "controller": this.c
        }, null);
        break;
      case "FORM":
        content = createVNode(resolveComponent("iBizFormMDCtrlForm"), {
          "controller": this.c
        }, null);
        break;
      case "REPEATER":
        content = createVNode(resolveComponent("iBizFormMDCtrlRepeater"), {
          "controller": this.c
        }, null);
        break;
      default:
        createVNode("div", null, [ibiz.i18n.t("app.noSupport")]);
        break;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass, this.hasCaption ? this.ns.m("show-caption") : ""]
    }, [this.hasHeader && createVNode("div", {
      "class": this.ns.b("header")
    }, [createVNode("div", {
      "class": this.ns.e("title")
    }, [this.hasCaption ? this.c.model.caption : ""]), model.uiactionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
      "class": this.ns.e("toolbar"),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": this.controller.state.actionGroupState,
      "onActionClick": this.onActionClick
    }, null)]), content]);
  }
});

export { FormMDCtrl, FormMDCtrl as default };
