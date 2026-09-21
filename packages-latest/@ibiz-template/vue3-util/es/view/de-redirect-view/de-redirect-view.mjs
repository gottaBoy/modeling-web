import { defineComponent, h, resolveComponent, withDirectives, createVNode, resolveDirective, ref, toRaw, watch } from 'vue';
import { RuntimeError } from '@ibiz-template/core';
import { ViewController, getDERedirectToView } from '@ibiz-template/runtime';
import '../../use/index.mjs';
import { useViewController } from '../../use/view/use-view-controller/use-view-controller.mjs';

"use strict";
const DeRedirectView = /* @__PURE__ */ defineComponent({
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
    const c = useViewController((...args) => new ViewController(...args));
    const toViewId = ref();
    const toViewContext = ref();
    const toViewParams = ref();
    c.evt.on("onCreated", () => {
      getDERedirectToView(toRaw(props.modelData), toRaw(c.context), toRaw(c.params)).then(async (result) => {
        if (result.type === "view") {
          toViewId.value = result.viewId;
          toViewContext.value = result.context;
          toViewParams.value = result.params;
        } else {
          throw new RuntimeError(ibiz.i18n.t("vue3Util.view.embeddedRedirectionView"));
        }
      });
    });
    if (props.isEmbedCtrlNav) {
      watch(() => [c.context, c.params], () => {
        getDERedirectToView(toRaw(props.modelData), toRaw(c.context), toRaw(c.params)).then(async (result) => {
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
      return h(resolveComponent("IBizViewShell"), {
        context: this.toViewContext,
        params: this.toViewParams,
        viewId: this.toViewId,
        ...this.$attrs
      }, this.$slots);
    }
    return withDirectives(createVNode("div", {
      "style": "width: 100%; height: 100%;"
    }, null), [[resolveDirective("loading"), !this.toViewId]]);
  }
});

export { DeRedirectView };
