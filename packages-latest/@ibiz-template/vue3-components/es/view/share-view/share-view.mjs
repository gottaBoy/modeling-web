import { isVNode, defineComponent, createVNode, resolveComponent, ref, onMounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute } from 'vue-router';
import './share-view.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ShareView = /* @__PURE__ */ defineComponent({
  setup() {
    const ns = useNamespace("share-view");
    const route = useRoute();
    const loading = ref(false);
    const isMounted = ref(false);
    const shareUser = ref({});
    let shareTheme = {};
    let shareThemeId = "";
    const getShareTheme = async () => {
      const {
        userId
      } = shareUser.value;
      shareTheme = await ibiz.util.theme.getShareTheme(userId, shareThemeId);
      if (shareTheme) {
        ibiz.util.theme.previewCustomTheme(shareTheme.themeTag, shareTheme.themeVars);
      }
    };
    onMounted(async () => {
      const params = route.query;
      shareThemeId = window.atob(params.shareThemeId);
      shareUser.value = {
        userId: params.shareUserId,
        userName: params.shareUserName
      };
      ibiz.util.hiddenAppLoading();
      await ibiz.util.theme.initCustomTheme(false);
      await getShareTheme();
      isMounted.value = true;
    });
    const handleApply = async () => {
    };
    const handleCancel = () => {
    };
    return {
      ns,
      loading,
      isMounted,
      shareUser,
      handleApply,
      handleCancel
    };
  },
  render() {
    let _slot, _slot2;
    if (!this.isMounted) {
      return;
    }
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.b("box")
    }, [createVNode("header", {
      "class": this.ns.b("box-header")
    }, [createVNode("img", {
      "src": "./assets/images/login-header.png"
    }, null), createVNode("div", {
      "class": this.ns.b("box-header-title")
    }, [createVNode("div", null, [this.shareUser.userName]), ibiz.i18n.t("view.shareView.inviting")])]), createVNode("main", {
      "class": this.ns.b("box-main")
    }, [createVNode("div", {
      "class": this.ns.b("box-main-content")
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.handleApply,
      "size": "large",
      "round": true,
      "loading": this.loading
    }, _isSlot(_slot = ibiz.i18n.t("view.shareView.use")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.handleCancel,
      "size": "large",
      "round": true
    }, _isSlot(_slot2 = ibiz.i18n.t("view.shareView.cancel")) ? _slot2 : {
      default: () => [_slot2]
    })])])])]);
  }
});

export { ShareView };
