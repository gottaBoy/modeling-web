'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var adaptiveScreenWidth = require('./adaptive-screen-width.cjs');
require('./App.css');

"use strict";
var App = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const route = vueRouter.useRoute();
    vue.watch(() => route.fullPath, () => {
      const {
        appContext
      } = vue3Util.route2routePath(route);
      const srflang = appContext == null ? void 0 : appContext.srflang;
      const lang = ibiz.i18n.getLang();
      if (srflang && srflang !== lang) {
        localStorage.setItem("language", srflang);
        window.location.reload();
      }
    });
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1
    });
    const destroyAppHub = () => {
      window.removeEventListener("unload", destroyAppHub);
      ibiz.hub.destroy();
    };
    window.addEventListener("unload", destroyAppHub);
    const stopAdaptiveScreenWidth = adaptiveScreenWidth.startAdaptiveScreenWidth();
    let watermarkDestroy;
    vue.onMounted(() => {
      vue3Util.AppHooks.initedApp.tapPromise(async ({
        context
      }) => {
        var _a;
        watermarkDestroy == null ? void 0 : watermarkDestroy();
        watermarkDestroy = ibiz.util.watermark.mount(ibiz.config.watermark, void 0, {
          ...context,
          ...(_a = ibiz.appData) == null ? void 0 : _a.context
        });
      });
    });
    vue.onBeforeUnmount(() => {
      watermarkDestroy == null ? void 0 : watermarkDestroy();
    });
    vue.onUnmounted(() => {
      stopAdaptiveScreenWidth();
      destroyAppHub();
      vue3Util.AppHooks.destoryApp.call(null);
    });
    return {
      modal
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("router-view"), {
      "modal": this.modal
    }, null);
  }
});

exports.default = App;
