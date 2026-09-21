'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
require('./share-view.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ShareView = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const ns = vue3Util.useNamespace("share-view");
    const route = vueRouter.useRoute();
    const loading = vue.ref(false);
    const isMounted = vue.ref(false);
    const shareUser = vue.ref({});
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
    vue.onMounted(async () => {
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.b("box")
    }, [vue.createVNode("header", {
      "class": this.ns.b("box-header")
    }, [vue.createVNode("img", {
      "src": "./assets/images/login-header.png"
    }, null), vue.createVNode("div", {
      "class": this.ns.b("box-header-title")
    }, [vue.createVNode("div", null, [this.shareUser.userName]), ibiz.i18n.t("view.shareView.inviting")])]), vue.createVNode("main", {
      "class": this.ns.b("box-main")
    }, [vue.createVNode("div", {
      "class": this.ns.b("box-main-content")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handleApply,
      "size": "large",
      "round": true,
      "loading": this.loading
    }, _isSlot(_slot = ibiz.i18n.t("view.shareView.use")) ? _slot : {
      default: () => [_slot]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handleCancel,
      "size": "large",
      "round": true
    }, _isSlot(_slot2 = ibiz.i18n.t("view.shareView.cancel")) ? _slot2 : {
      default: () => [_slot2]
    })])])])]);
  }
});

exports.ShareView = ShareView;
