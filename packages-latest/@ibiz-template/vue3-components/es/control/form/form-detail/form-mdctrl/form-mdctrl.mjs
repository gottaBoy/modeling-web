import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useController, useSemanticNode } from '@ibiz-template/vue3-util';
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
    var _a;
    const ns = useNamespace("form-mdctrl");
    useController(props.controller);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const c = props.controller;
    const zIndex = props.controller.form.state.zIndex;
    const hasCaption = c.model.showCaption && !!c.model.caption;
    const hasHeader = hasCaption || c.model.uiactionGroup;
    const isDesignPreview = ((_a = c.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, event);
    };
    return {
      c,
      ns,
      zIndex,
      hasHeader,
      hasCaption,
      isDesignPreview,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (this.isDesignPreview) {
      return createVNode("div", {
        "class": this.ns.b()
      }, [createVNode("div", {
        "class": this.ns.b("preview-content")
      }, [ibiz.i18n.t("control.form.formMDctrl.defaultText")])]);
    }
    const {
      model
    } = this.c;
    let content;
    switch (model.contentType) {
      case "GRID":
      case "LIST":
      case "DATAVIEW":
        content = createVNode(resolveComponent("iBizFormMDCtrlMD"), {
          "class": [this.ns.b("content"), this.semanticClass("mdctrl.content", {
            mdctrl: this.controller
          })],
          "style": this.semanticStyle("mdctrl.content", {
            mdctrl: this.controller
          }),
          "controller": this.c
        }, null);
        break;
      case "FORM":
        content = createVNode(resolveComponent("iBizFormMDCtrlForm"), {
          "class": [this.ns.b("content"), this.semanticClass("mdctrl.content", {
            mdctrl: this.controller
          })],
          "style": this.semanticStyle("mdctrl.content", {
            mdctrl: this.controller
          }),
          "controller": this.c
        }, null);
        break;
      case "REPEATER":
        content = createVNode(resolveComponent("iBizFormMDCtrlRepeater"), {
          "class": [this.ns.b("content"), this.semanticClass("mdctrl.content", {
            mdctrl: this.controller
          })],
          "style": this.semanticStyle("mdctrl.content", {
            mdctrl: this.controller
          }),
          "controller": this.c
        }, null);
        break;
      default:
        createVNode("div", null, [ibiz.i18n.t("app.noSupport")]);
        break;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass, this.hasCaption ? this.ns.m("show-caption") : "", this.semanticClass("mdctrl", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl", {
        mdctrl: this.controller
      })
    }, [this.hasHeader && createVNode("div", {
      "class": [this.ns.b("header"), this.semanticClass("mdctrl.header", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.header", {
        mdctrl: this.controller
      })
    }, [createVNode("div", {
      "class": [this.ns.b("title"), this.semanticClass("mdctrl.caption", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.caption", {
        mdctrl: this.controller
      })
    }, [this.hasCaption ? this.c.model.caption : ""]), model.uiactionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
      "zIndex": this.zIndex,
      "class": [this.ns.b("toolbar"), this.semanticClass("mdctrl.toolbar", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.toolbar", {
        mdctrl: this.controller
      }),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": this.controller.state.actionGroupState,
      "onActionClick": this.onActionClick
    }, null)]), content]);
  }
});

export { FormMDCtrl, FormMDCtrl as default };
