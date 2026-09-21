'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
const AppRedirectView = /* @__PURE__ */ vue.defineComponent({
  setup() {
    var _a;
    const context = core.IBizContext.create(((_a = ibiz.appData) == null ? void 0 : _a.context) || {});
    vue.onUnmounted(() => {
      context.destroy();
    });
    const {
      href
    } = window.location;
    async function toRedirect() {
      await runtime.toLocalOpenWFRedirectView(context, href);
    }
    vue.onMounted(() => ibiz.util.hiddenAppLoading());
    toRedirect();
  },
  render() {
    return vue.createVNode("div", null, [ibiz.i18n.t("vue3Util.view.redirectionProgress")]);
  }
});

exports.AppRedirectView = AppRedirectView;
