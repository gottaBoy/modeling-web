'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./form-druipart.css');

"use strict";
const FormDRUIPart = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormDRUIPart",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormDRUIPartController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("form-druipart");
    vue3Util.useController(props.controller);
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const isDesignPreview = ((_a = props.controller.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    const onCreated = (event) => {
      props.controller.setEmbedView(event.view);
    };
    return {
      ns,
      isDesignPreview,
      onCreated,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible && !this.controller.state.keepAlive || !this.controller.state.viewComponentKey) {
      return null;
    }
    if (this.isDesignPreview) {
      return vue.createVNode("div", {
        "class": this.ns.b()
      }, [vue.createVNode("div", {
        "class": this.ns.b("preview-content")
      }, [ibiz.i18n.t("control.form.formDruipart.defaultText")])]);
    }
    const viewShell = vue.resolveComponent("IBizViewShell");
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.semanticClass("druipart", {
        druipart: this.controller
      }), ...this.controller.containerClass],
      "style": this.semanticStyle("druipart", {
        druipart: this.controller
      }),
      "onClick": (event) => this.controller.onClick(event)
    }, [vue.h(viewShell, {
      context: this.controller.navContext,
      params: this.controller.navParams,
      key: this.controller.state.viewComponentKey,
      viewId: this.controller.model.appViewId,
      state: {
        noLoadDefault: true
      },
      onCreated: this.onCreated
    }), this.controller.state.showMask && vue.createVNode("div", {
      "class": this.ns.e("mask")
    }, [this.modelData.maskInfo || ibiz.i18n.t("control.form.formDruipart.saveFirst")])]);
  }
});

exports.FormDRUIPart = FormDRUIPart;
exports.default = FormDRUIPart;
