'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var core = require('@ibiz-template/core');
require('./unauthorized-view.css');

"use strict";
const UnauthorizedView = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const ns = vue3Util.useNamespace("unauthorized-view");
    const route = vueRouter.useRoute();
    const viewCodeName = vue.computed(() => {
      return "".concat(route.params.viewcodename);
    });
    const hasAppView = vue.ref(false);
    const appView = vue.ref(null);
    const viewShell = vue.resolveComponent("IBizViewShell");
    const context = core.IBizContext.create({});
    const params = {};
    const isMounted = vue.ref(false);
    vue.onMounted(async () => {
      try {
        const appViewConfig = await ibiz.hub.config.view.get(viewCodeName.value);
        if (appViewConfig) {
          appView.value = appViewConfig;
          hasAppView.value = true;
        }
      } catch (err) {
        ibiz.log.warn(err);
      }
      ibiz.util.hiddenAppLoading();
      isMounted.value = true;
    });
    return () => {
      if (isMounted.value) {
        return hasAppView.value ? vue.h(viewShell, {
          context,
          params,
          viewId: appView.value.id
        }) : vue.createVNode("div", {
          "class": ns.b()
        }, [vue.createVNode("img", {
          "class": ns.e("img"),
          "src": "".concat(ibiz.env.assetsUrl, "/images/404.png")
        }, null), vue.createVNode("div", {
          "class": ns.e("tips")
        }, [ibiz.i18n.t("view.noResourcesView.noResourcePrompt"), vue.createVNode("br", null, null), ibiz.i18n.t("view.noResourcesView.noExistPrompt", {
          code: viewCodeName.value
        })])]);
      }
      return null;
    };
  }
});

exports.UnauthorizedView = UnauthorizedView;
