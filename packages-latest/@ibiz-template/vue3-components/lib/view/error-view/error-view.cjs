'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
require('./error-view.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
const ErrorView = /* @__PURE__ */ vue.defineComponent({
  name: "ErrorView",
  setup() {
    const ns = vue3Util.useNamespace("error-view");
    const route = vueRouter.useRoute();
    const code = vue.computed(() => {
      return "".concat(route.params.code);
    });
    vue.onMounted(() => ibiz.util.hiddenAppLoading());
    const isTop = vue.computed(() => {
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
      const provider = runtime.getErrorViewProvider(this.code);
      if (provider) {
        if (typeof provider.component === "string") {
          return vue.h(vue.resolveComponent(provider.component));
        }
        return vue.h(provider.component);
      }
    }
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [ibiz.i18n.t("view.errorView.noExistPrompt", {
      code: this.code
    })]);
  }
});

exports.ErrorView = ErrorView;
