import { defineComponent, resolveComponent, createVNode, h } from 'vue';
import { useNamespace, useController } from '@ibiz-template/vue3-util';
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
    const ns = useNamespace("form-druipart");
    useController(props.controller);
    const onCreated = (event) => {
      props.controller.setEmbedView(event.view);
    };
    return {
      ns,
      onCreated
    };
  },
  render() {
    if (!this.controller.state.visible && !this.controller.state.keepAlive || !this.controller.state.viewComponentKey) {
      return null;
    }
    const viewShell = resolveComponent("IBizViewShell");
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass],
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
