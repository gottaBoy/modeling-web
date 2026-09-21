import { defineComponent, onUnmounted, onMounted, createVNode } from 'vue';
import { IBizContext } from '@ibiz-template/core';
import { toLocalOpenWFRedirectView } from '@ibiz-template/runtime';

"use strict";
const AppRedirectView = /* @__PURE__ */ defineComponent({
  setup() {
    var _a;
    const context = IBizContext.create(((_a = ibiz.appData) == null ? void 0 : _a.context) || {});
    onUnmounted(() => {
      context.destroy();
    });
    const {
      href
    } = window.location;
    async function toRedirect() {
      await toLocalOpenWFRedirectView(context, href);
    }
    onMounted(() => ibiz.util.hiddenAppLoading());
    toRedirect();
  },
  render() {
    return createVNode("div", null, [ibiz.i18n.t("vue3Util.view.redirectionProgress")]);
  }
});

export { AppRedirectView };
