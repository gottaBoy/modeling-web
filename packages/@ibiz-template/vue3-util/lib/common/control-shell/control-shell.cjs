'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('./control-shell.css');
var core = require('@ibiz-template/core');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizControlShell = /* @__PURE__ */ vue.defineComponent({
  name: "IBizControlShell",
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ctx = vue.inject("ctx");
    if (ctx) {
      ctx.evt.emit("onForecast", props.modelData.name);
    } else {
      const viewModel = {
        name: "AppView",
        id: "AppView",
        viewType: runtime.ViewType.DE_CUSTOM_VIEW,
        appId: ibiz.env.appId
      };
      vue.provide(
        "ctx",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new runtime.ViewController(viewModel, core.IBizContext.create({})).ctx
      );
    }
    const isComplete = vue.ref(false);
    const errMsg = vue.ref("");
    const provider = vue.ref();
    runtime.getControlProvider(props.modelData).then((item) => {
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
    const ns = namespace.useNamespace("control-shell");
    return {
      ns,
      isComplete,
      errMsg,
      provider
    };
  },
  render() {
    if (this.isComplete && this.provider) {
      return vue.h(vue.resolveComponent(this.provider.component), {
        provider: this.provider,
        ...this.$props,
        ...this.$attrs
      }, this.$slots);
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.isComplete ? this.errMsg : null]), [[vue.resolveDirective("loading"), !this.isComplete]]);
  }
});

exports.IBizControlShell = IBizControlShell;
