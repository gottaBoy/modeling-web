import { defineComponent, h, resolveComponent, withDirectives, createVNode, resolveDirective, inject, provide, ref } from 'vue';
import { ViewType, ViewController, getControlProvider } from '@ibiz-template/runtime';
import './control-shell.css';
import { IBizContext } from '@ibiz-template/core';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const IBizControlShell = /* @__PURE__ */ defineComponent({
  name: "IBizControlShell",
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ctx = inject("ctx");
    if (ctx) {
      ctx.evt.emit("onForecast", props.modelData.name);
    } else {
      const viewModel = {
        name: "AppView",
        id: "AppView",
        viewType: ViewType.DE_CUSTOM_VIEW,
        appId: ibiz.env.appId
      };
      provide(
        "ctx",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new ViewController(viewModel, IBizContext.create({})).ctx
      );
    }
    const isComplete = ref(false);
    const errMsg = ref("");
    const provider = ref();
    getControlProvider(props.modelData).then((item) => {
      if (!item) {
        errMsg.value = ibiz.i18n.t("vue3Util.common.onFoundCorrespondingPart");
      } else {
        provider.value = item;
      }
      isComplete.value = true;
    }).catch((err) => {
      ibiz.log.error(err);
      errMsg.value = err.message;
      isComplete.value = true;
    });
    const ns = useNamespace("control-shell");
    return {
      ns,
      isComplete,
      errMsg,
      provider
    };
  },
  render() {
    if (this.isComplete && this.provider) {
      return h(resolveComponent(this.provider.component), {
        provider: this.provider,
        ...this.$props,
        ...this.$attrs
      }, this.$slots);
    }
    return withDirectives(createVNode("div", {
      "class": this.ns.b()
    }, [this.isComplete ? this.errMsg : null]), [[resolveDirective("loading"), !this.isComplete]]);
  }
});

export { IBizControlShell };
