'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
require('./404-view.css');

"use strict";
const View404 = /* @__PURE__ */ vue.defineComponent({
  name: "IBizView404",
  setup() {
    const ns = vue3Util.useNamespace("404-view");
    const router = vueRouter.useRouter();
    const route = vueRouter.useRoute();
    const gotoIndexView = async () => {
      await router.push("/");
      window.location.reload();
    };
    vue.onMounted(() => ibiz.util.hiddenAppLoading());
    const isTop = vue.computed(() => {
      return route && !route.params.view1;
    });
    return {
      ns,
      isTop,
      gotoIndexView
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("top", this.isTop)]
    }, [vue.createVNode("img", {
      "class": this.ns.b("img"),
      "src": "./assets/images/404.png"
    }, null), vue.createVNode("div", {
      "class": this.ns.b("text")
    }, [vue.createVNode("div", {
      "class": this.ns.be("text", "text1")
    }, [ibiz.i18n.t("view.noResourcesView.noResourcePrompt")]), this.isTop ? vue.createVNode("div", {
      "class": this.ns.be("text", "text2")
    }, [ibiz.i18n.t("view.noResourcesView.resourceNoExist"), vue.createVNode("a", {
      "onClick": this.gotoIndexView
    }, [ibiz.i18n.t("view.common.backHomepage")]), ibiz.i18n.t("view.common.continueBrowsing")]) : null])]);
  }
});

exports.View404 = View404;
