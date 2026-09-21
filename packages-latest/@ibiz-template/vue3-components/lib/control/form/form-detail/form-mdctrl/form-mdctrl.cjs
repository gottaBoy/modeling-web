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
    var _a;
    const ns = vue3Util.useNamespace("form-mdctrl");
    vue3Util.useController(props.controller);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.form);
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
      return vue.createVNode("div", {
        "class": this.ns.b()
      }, [vue.createVNode("div", {
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
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlMD"), {
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
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlForm"), {
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
        content = vue.createVNode(vue.resolveComponent("iBizFormMDCtrlRepeater"), {
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
        vue.createVNode("div", null, [ibiz.i18n.t("app.noSupport")]);
        break;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass, this.hasCaption ? this.ns.m("show-caption") : "", this.semanticClass("mdctrl", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl", {
        mdctrl: this.controller
      })
    }, [this.hasHeader && vue.createVNode("div", {
      "class": [this.ns.b("header"), this.semanticClass("mdctrl.header", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.header", {
        mdctrl: this.controller
      })
    }, [vue.createVNode("div", {
      "class": [this.ns.b("title"), this.semanticClass("mdctrl.caption", {
        mdctrl: this.controller
      })],
      "style": this.semanticStyle("mdctrl.caption", {
        mdctrl: this.controller
      })
    }, [this.hasCaption ? this.c.model.caption : ""]), model.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
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

exports.FormMDCtrl = FormMDCtrl;
exports.default = FormMDCtrl;
