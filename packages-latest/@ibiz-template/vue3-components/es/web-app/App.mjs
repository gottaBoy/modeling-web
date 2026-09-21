import { defineComponent, createVNode, resolveComponent, watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { route2routePath, AppHooks } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import { startAdaptiveScreenWidth } from './adaptive-screen-width.mjs';
import './App.css';

"use strict";
var App = /* @__PURE__ */ defineComponent({
  setup() {
    const route = useRoute();
    watch(() => route.fullPath, () => {
      const {
        appContext
      } = route2routePath(route);
      const srflang = appContext == null ? void 0 : appContext.srflang;
      const lang = ibiz.i18n.getLang();
      if (srflang && srflang !== lang) {
        localStorage.setItem("language", srflang);
        window.location.reload();
      }
    });
    const modal = new Modal({
      mode: ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1
    });
    const destroyAppHub = () => {
      window.removeEventListener("unload", destroyAppHub);
      ibiz.hub.destroy();
    };
    window.addEventListener("unload", destroyAppHub);
    const stopAdaptiveScreenWidth = startAdaptiveScreenWidth();
    let watermarkDestroy;
    onMounted(() => {
      AppHooks.initedApp.tapPromise(async ({
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
    onBeforeUnmount(() => {
      watermarkDestroy == null ? void 0 : watermarkDestroy();
    });
    onUnmounted(() => {
      stopAdaptiveScreenWidth();
      destroyAppHub();
      AppHooks.destoryApp.call(null);
    });
    return {
      modal
    };
  },
  render() {
    return createVNode(resolveComponent("router-view"), {
      "modal": this.modal
    }, null);
  }
});

export { App as default };
