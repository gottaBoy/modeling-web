import { defineComponent, createVNode, resolveComponent, h } from 'vue';
import { useNamespace, useController, useSemanticNode } from '@ibiz-template/vue3-util';
import { FormDRUIPartController } from '@ibiz-template/runtime';
import './form-druipart.css';

"use strict";
const FormDRUIPart = /* @__PURE__ */ defineComponent({
  name: "IBizFormDRUIPart",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormDRUIPartController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("form-druipart");
    useController(props.controller);
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.form);
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
      return createVNode("div", {
        "class": this.ns.b()
      }, [createVNode("div", {
        "class": this.ns.b("preview-content")
      }, [ibiz.i18n.t("control.form.formDruipart.defaultText")])]);
    }
    const viewShell = resolveComponent("IBizViewShell");
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.semanticClass("druipart", {
        druipart: this.controller
      }), ...this.controller.containerClass],
      "style": this.semanticStyle("druipart", {
        druipart: this.controller
      }),
      "onClick": (event) => this.controller.onClick(event)
    }, [h(viewShell, {
      context: this.controller.navContext,
      params: this.controller.navParams,
      key: this.controller.state.viewComponentKey,
      viewId: this.controller.model.appViewId,
      state: {
        noLoadDefault: true
      },
      onCreated: this.onCreated
    }), this.controller.state.showMask && createVNode("div", {
      "class": this.ns.e("mask")
    }, [this.modelData.maskInfo || ibiz.i18n.t("control.form.formDruipart.saveFirst")])]);
  }
});

export { FormDRUIPart, FormDRUIPart as default };
