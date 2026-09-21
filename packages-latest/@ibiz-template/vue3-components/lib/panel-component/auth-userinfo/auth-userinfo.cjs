'use strict';

var vue = require('vue');
var vueRouter = require('vue-router');
var vue3Util = require('@ibiz-template/vue3-util');
require('./auth-userinfo.css');
var authUserinfo_controller = require('./auth-userinfo.controller.cjs');

"use strict";
const AuthUserinfo = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAuthUserinfo",
  props: {
    /**
     * @description 用户信息控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 用户信息控件控制器
     */
    controller: {
      type: authUserinfo_controller.AuthUserinfoController,
      required: true
    }
  },
  setup(prop) {
    var _a;
    const ns = vue3Util.useNamespace("user-info");
    const c = prop.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      srfusername = ibiz.i18n.t("panelComponent.authUserinfo.visitor"),
      loginname
    } = ((_a = ibiz.appData) == null ? void 0 : _a.context) || {};
    const router = vueRouter.useRouter();
    const ctx = vue.inject("ctx", void 0);
    const menuAlign = vue.computed(() => {
      if (ctx == null ? void 0 : ctx.view) {
        return ctx.view.model.mainMenuAlign || "LEFT";
      }
      return "LEFT";
    });
    const onClick = () => {
      ibiz.hub.controller.logout();
    };
    const isCollapse = vue.computed(() => {
      const {
        strictly
      } = c.rawItemParams;
      if (strictly && strictly === "true") {
        return false;
      }
      return c.panel.view.state.isCollapse;
    });
    const isReadonly = vue.computed(() => {
      const {
        readonly
      } = c.rawItemParams;
      return readonly === "true";
    });
    return {
      ns,
      c,
      onClick,
      srfusername,
      loginname,
      router,
      menuAlign,
      isCollapse,
      isReadonly,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("left", this.menuAlign === "LEFT"), this.ns.is("top", this.menuAlign === "TOP"), this.ns.is("collapse", this.isCollapse), this.ns.is("readonly", this.isReadonly), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "disabled": this.isReadonly,
      "popper-class": this.semanticClass("popup")
    }, {
      default: () => vue.createVNode("div", {
        "class": [this.ns.b("info"), this.ns.is("collapse", this.isCollapse)]
      }, [vue.createVNode("div", {
        "class": this.ns.b("label")
      }, [vue.createVNode(vue.resolveComponent("el-avatar"), {
        "class": [this.ns.b("avatar"), this.semanticClass("avatar")],
        "style": this.semanticStyle("avatar"),
        "src": "./assets/images/user-avatar.png"
      }, null), vue.createVNode("div", {
        "class": [this.ns.b("name"), this.ns.is("collapse", this.isCollapse), this.semanticClass("name")],
        "style": this.semanticStyle("name")
      }, [vue.createVNode("div", {
        "class": this.ns.be("name", "user-name")
      }, [this.srfusername]), this.menuAlign === "LEFT" && this.loginname && vue.createVNode("div", {
        "class": this.ns.be("name", "person-name")
      }, [this.loginname])])]), vue.createVNode("ion-icon", {
        "class": [this.ns.e("down"), this.ns.is("collapse", this.isCollapse)],
        "name": "chevron-down-outline"
      }, null)]),
      dropdown: () => vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
        default: () => [vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
          "class": [this.ns.b("item"), this.semanticClass("item")],
          "style": this.semanticStyle("item")
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "log-out-outline",
            "class": this.ns.e("icon")
          }, null), vue.createVNode("span", {
            "onClick": this.onClick
          }, [ibiz.i18n.t("app.logout")])]
        })]
      })
    })]);
  }
});

exports.AuthUserinfo = AuthUserinfo;
