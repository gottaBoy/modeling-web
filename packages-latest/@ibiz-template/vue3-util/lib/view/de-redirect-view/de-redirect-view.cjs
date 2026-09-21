'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
require('../../use/index.cjs');
var useViewController = require('../../use/view/use-view-controller/use-view-controller.cjs');

"use strict";
const DeRedirectView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDeRedirectView",
  props: {
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    modelData: {
      type: Object,
      required: true
    },
    isEmbedCtrlNav: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const c = useViewController.useViewController((...args) => new runtime.ViewController(...args));
    const toViewId = vue.ref();
    const toViewContext = vue.ref();
    const toViewParams = vue.ref();
    c.evt.on("onCreated", () => {
      runtime.getDERedirectToView(vue.toRaw(props.modelData), vue.toRaw(c.context), vue.toRaw(c.params)).then(async (result) => {
        if (result.type === "view") {
          toViewId.value = result.viewId;
          toViewContext.value = result.context;
          toViewParams.value = result.params;
        } else {
          throw new core.RuntimeError(ibiz.i18n.t("vue3Util.view.embeddedRedirectionView"));
        }
      });
    });
    if (props.isEmbedCtrlNav) {
      vue.watch(() => [c.context, c.params], () => {
        runtime.getDERedirectToView(vue.toRaw(props.modelData), vue.toRaw(c.context), vue.toRaw(c.params)).then(async (result) => {
          if (result.type === "view") {
            toViewId.value = result.viewId;
            toViewContext.value = result.context;
          }
        });
      }, {
        deep: true
      });
    }
    return {
      c,
      toViewId,
      toViewContext,
      toViewParams
    };
  },
  render() {
    if (this.toViewId) {
      return vue.h(vue.resolveComponent("IBizViewShell"), {
        context: this.toViewContext,
        params: this.toViewParams,
        viewId: this.toViewId,
        ...this.$attrs
      }, this.$slots);
    }
    return vue.withDirectives(vue.createVNode("div", {
      "style": "width: 100%; height: 100%;"
    }, null), [[vue.resolveDirective("loading"), !this.toViewId]]);
  }
});

exports.DeRedirectView = DeRedirectView;
