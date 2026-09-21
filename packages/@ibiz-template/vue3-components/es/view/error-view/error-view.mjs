import { defineComponent, computed, onMounted, h, resolveComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import './error-view.css';
import { getErrorViewProvider } from '@ibiz-template/runtime';

"use strict";
const ErrorView = /* @__PURE__ */ defineComponent({
  name: "ErrorView",
  setup() {
    const ns = useNamespace("error-view");
    const route = useRoute();
    const code = computed(() => {
      return "".concat(route.params.code);
    });
    onMounted(() => ibiz.util.hiddenAppLoading());
    const isTop = computed(() => {
      return route && !route.params.view1;
    });
    return {
      ns,
      isTop,
      code
    };
  },
  render() {
    if (this.code) {
      const provider = getErrorViewProvider(this.code);
      if (provider) {
        if (typeof provider.component === "string") {
          return h(resolveComponent(provider.component));
        }
        return h(provider.component);
      }
    }
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [ibiz.i18n.t("view.errorView.noExistPrompt", {
      code: this.code
    })]);
  }
});

export { ErrorView };
