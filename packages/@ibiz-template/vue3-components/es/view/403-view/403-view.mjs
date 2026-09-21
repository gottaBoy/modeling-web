import { defineComponent, onMounted, computed, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRouter, useRoute } from 'vue-router';
import './403-view.css';

"use strict";
const View403 = /* @__PURE__ */ defineComponent({
  name: "IBizView403",
  setup() {
    const ns = useNamespace("403-view");
    const router = useRouter();
    const route = useRoute();
    const gotoIndexView = async () => {
      await router.push("/");
      window.location.reload();
    };
    onMounted(() => ibiz.util.hiddenAppLoading());
    const isTop = computed(() => {
      return route && !route.params.view1;
    });
    return {
      ns,
      isTop,
      gotoIndexView
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("top", this.isTop)]
    }, [createVNode("img", {
      "class": this.ns.b("img"),
      "src": "./assets/images/403.png"
    }, null), createVNode("div", {
      "class": this.ns.b("text")
    }, [createVNode("div", {
      "class": this.ns.be("text", "text1")
    }, [ibiz.i18n.t("view.noPermissionView.noPermissionPrompt")]), this.isTop ? createVNode("div", {
      "class": this.ns.be("text", "text2")
    }, [ibiz.i18n.t("view.noPermissionView.noPermission"), createVNode("a", {
      "onClick": this.gotoIndexView
    }, [ibiz.i18n.t("view.common.backHomepage")]), ibiz.i18n.t("view.common.continueBrowsing")]) : null])]);
  }
});

export { View403 };
