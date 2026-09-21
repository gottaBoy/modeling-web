import { defineComponent, computed, ref, resolveComponent, onMounted, h, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import { IBizContext } from '@ibiz-template/core';
import './unauthorized-view.css';

"use strict";
const UnauthorizedView = /* @__PURE__ */ defineComponent({
  setup() {
    const ns = useNamespace("unauthorized-view");
    const route = useRoute();
    const viewCodeName = computed(() => {
      return "".concat(route.params.viewcodename);
    });
    const hasAppView = ref(false);
    const appView = ref(null);
    const viewShell = resolveComponent("IBizViewShell");
    const context = IBizContext.create({});
    const params = {};
    const isMounted = ref(false);
    onMounted(async () => {
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
        return hasAppView.value ? h(viewShell, {
          context,
          params,
          viewId: appView.value.id
        }) : createVNode("div", {
          "class": ns.b()
        }, [createVNode("img", {
          "class": ns.e("img"),
          "src": "".concat(ibiz.env.assetsUrl, "/images/404.png")
        }, null), createVNode("div", {
          "class": ns.e("tips")
        }, [ibiz.i18n.t("view.noResourcesView.noResourcePrompt"), createVNode("br", null, null), ibiz.i18n.t("view.noResourcesView.noExistPrompt", {
          code: viewCodeName.value
        })])]);
      }
      return null;
    };
  }
});

export { UnauthorizedView };
