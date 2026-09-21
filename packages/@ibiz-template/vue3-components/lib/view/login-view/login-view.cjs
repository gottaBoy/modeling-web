'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var core = require('@ibiz-template/core');
var qs = require('qs');
require('../../util/index.cjs');
require('./login-view.css');
var keydownUtil = require('../../util/keydown-util/keydown-util.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const LoginView = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const ns = vue3Util.useNamespace("login-view");
    const rules = {
      username: [{
        required: true,
        message: ibiz.i18n.t("app.pleaseEnterAccount"),
        trigger: "blur"
      }],
      password: [{
        required: true,
        message: ibiz.i18n.t("app.pleaseEnterPassword"),
        trigger: "blur"
      }, {
        type: "string",
        min: 6,
        message: ibiz.i18n.t("view.loginView.passwordLength"),
        trigger: "blur"
      }]
    };
    const loginData = vue.reactive({
      username: "",
      password: ""
    });
    const formRef = vue.ref(null);
    const route = vueRouter.useRoute();
    const ru = route.query.ru || "/";
    const hasLoginView = vue.ref(false);
    const loginView = vue.ref(null);
    const viewShell = vue.resolveComponent("IBizViewShell");
    const context = core.IBizContext.create({});
    const params = {};
    const loading = vue.ref(false);
    const isMounted = vue.ref(false);
    const isRemember = vue.ref(false);
    const isAnonymous = vue.ref(true);
    let appTitle = ibiz.env.AppTitle;
    const getTitle = async () => {
      const app = await ibiz.hub.getAppAsync(ibiz.env.appId);
      const model = app.model;
      if (model.caption && !appTitle) {
        appTitle = model.caption;
      }
    };
    const loginFailed = vue.computed(() => {
      return window.location.href.indexOf("srfthird_auth_success=false") >= 0;
    });
    getTitle();
    const platform = window.navigator.userAgent.toUpperCase();
    const thirdAuth = () => {
      if (platform.indexOf("DINGTALK") !== -1) {
        ibiz.thirdAuth.auth("DINGTALK", "EMBED");
      } else if (platform.indexOf("WXWORK") !== -1) {
        ibiz.thirdAuth.auth("WXWORK", "EMBED");
      }
    };
    if (!loginFailed.value && ibiz.env.loginMode !== core.LoginMode.OAUTH) {
      thirdAuth();
    }
    ibiz.appData = void 0;
    ibiz.orgData = void 0;
    const onClick = async () => {
      formRef.value.validate(async (vaild) => {
        if (vaild) {
          loading.value = true;
          const bol = await ibiz.auth.login(loginData.username, loginData.password, isRemember.value);
          if (bol === true) {
            window.location.hash = ru;
            window.history.pushState({}, "");
            if (loginFailed.value) {
              const path = window.location.href.replace("?srfthird_auth_success=false", "");
              window.location.href = path;
            } else {
              window.location.reload();
            }
          }
          loading.value = false;
        }
      });
    };
    const onKeyUp = (e) => {
      if (e.key === "Enter") {
        onClick();
      }
    };
    const {
      cleanup
    } = keydownUtil.useFocusByEnter(document, ["a", 'input:not([type="checkbox"])', "button", "textarea", "select", '[tabindex]:not([tabindex="-1"])']);
    vue.onMounted(async () => {
      const search = qs.parse(window.location.search.replace("?", ""));
      if (loginFailed.value) {
        ibiz.message.error(ibiz.i18n.t("view.loginView.thirdAuthFail"));
      }
      if ((platform.indexOf("DINGTALK") !== -1 || platform.indexOf("WXWORK") !== -1) && !loginFailed.value) {
        return;
      }
      if (search.isAnonymous === "true") {
        const bol = await ibiz.auth.anonymousLogin();
        if (bol === true) {
          window.location.hash = ru;
          window.location.reload();
        }
      } else {
        try {
          const loginViewConfig = await ibiz.hub.config.view.get("AppLoginView");
          if (loginViewConfig) {
            loginView.value = loginViewConfig;
            hasLoginView.value = true;
          }
        } catch (err) {
          ibiz.log.warn(err);
        }
        isAnonymous.value = false;
      }
      ibiz.util.hiddenAppLoading();
      isMounted.value = true;
    });
    vue.onUnmounted(() => {
      cleanup();
    });
    return () => {
      if (isMounted.value && isAnonymous.value === false) {
        let _slot;
        return hasLoginView.value ? vue.h(viewShell, {
          context,
          params,
          viewId: loginView.value.id
        }) : vue.createVNode("div", {
          "class": ns.b()
        }, [vue.createVNode("div", {
          "class": ns.b("box")
        }, [vue.createVNode("header", {
          "class": ns.b("box-header")
        }, [vue.createVNode("img", {
          "src": "./assets/images/login-header.png"
        }, null), vue.createVNode("span", {
          "class": ns.b("box-header-title")
        }, [appTitle])]), vue.createVNode("main", {
          "class": ns.b("box-main")
        }, [vue.createVNode("img", {
          "class": ns.be("box-main", "avatar"),
          "src": "./assets/images/login-avatar.png"
        }, null), vue.createVNode("div", {
          "class": ns.b("box-main-content")
        }, [vue.createVNode(vue.resolveComponent("el-form"), {
          "model": loginData,
          "rules": rules,
          "ref": formRef
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
            "size": "large",
            "prop": "username"
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
              "modelValue": loginData.username,
              "onUpdate:modelValue": ($event) => loginData.username = $event,
              "clearable": true,
              "placeholder": ibiz.i18n.t("app.pleaseEnterAccount")
            }, {
              prefix: () => vue.createVNode("ion-icon", {
                "name": "person"
              }, null)
            })]
          }), vue.createVNode(vue.resolveComponent("el-form-item"), {
            "size": "large",
            "prop": "password"
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
              "type": "password",
              "modelValue": loginData.password,
              "onUpdate:modelValue": ($event) => loginData.password = $event,
              "show-password": true,
              "placeholder": ibiz.i18n.t("app.pleaseEnterPassword")
            }, {
              prefix: () => vue.createVNode("ion-icon", {
                "name": "unlock-alt"
              }, null)
            })]
          }), vue.createVNode(vue.resolveComponent("el-checkbox"), {
            "modelValue": isRemember.value,
            "onUpdate:modelValue": ($event) => isRemember.value = $event,
            "label": ibiz.i18n.t("app.rememberMe")
          }, null), vue.createVNode(vue.resolveComponent("el-form-item"), {
            "size": "large"
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "primary",
              "onClick": onClick,
              "size": "large",
              "round": true,
              "loading": loading.value,
              "onKeyup": (e) => onKeyUp(e)
            }, _isSlot(_slot = ibiz.i18n.t("view.loginView.login")) ? _slot : {
              default: () => [_slot]
            })]
          })]
        })])])])]);
      }
      return null;
    };
  }
});

exports.LoginView = LoginView;
