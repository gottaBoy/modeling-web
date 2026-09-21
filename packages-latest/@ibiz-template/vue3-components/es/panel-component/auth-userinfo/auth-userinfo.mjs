import { defineComponent, createVNode, resolveComponent, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './auth-userinfo.css';
import { AuthUserinfoController } from './auth-userinfo.controller.mjs';

"use strict";
const AuthUserinfo = /* @__PURE__ */ defineComponent({
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
      type: AuthUserinfoController,
      required: true
    }
  },
  setup(prop) {
    var _a;
    const ns = useNamespace("user-info");
    const c = prop.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const {
      srfusername = ibiz.i18n.t("panelComponent.authUserinfo.visitor"),
      loginname
    } = ((_a = ibiz.appData) == null ? void 0 : _a.context) || {};
    const router = useRouter();
    const ctx = inject("ctx", void 0);
    const menuAlign = computed(() => {
      if (ctx == null ? void 0 : ctx.view) {
        return ctx.view.model.mainMenuAlign || "LEFT";
      }
      return "LEFT";
    });
    const onClick = () => {
      ibiz.hub.controller.logout();
    };
    const isCollapse = computed(() => {
      const {
        strictly
      } = c.rawItemParams;
      if (strictly && strictly === "true") {
        return false;
      }
      return c.panel.view.state.isCollapse;
    });
    const isReadonly = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("left", this.menuAlign === "LEFT"), this.ns.is("top", this.menuAlign === "TOP"), this.ns.is("collapse", this.isCollapse), this.ns.is("readonly", this.isReadonly), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("el-dropdown"), {
      "disabled": this.isReadonly,
      "popper-class": this.semanticClass("popup")
    }, {
      default: () => createVNode("div", {
        "class": [this.ns.b("info"), this.ns.is("collapse", this.isCollapse)]
      }, [createVNode("div", {
        "class": this.ns.b("label")
      }, [createVNode(resolveComponent("el-avatar"), {
        "class": [this.ns.b("avatar"), this.semanticClass("avatar")],
        "style": this.semanticStyle("avatar"),
        "src": "./assets/images/user-avatar.png"
      }, null), createVNode("div", {
        "class": [this.ns.b("name"), this.ns.is("collapse", this.isCollapse), this.semanticClass("name")],
        "style": this.semanticStyle("name")
      }, [createVNode("div", {
        "class": this.ns.be("name", "user-name")
      }, [this.srfusername]), this.menuAlign === "LEFT" && this.loginname && createVNode("div", {
        "class": this.ns.be("name", "person-name")
      }, [this.loginname])])]), createVNode("ion-icon", {
        "class": [this.ns.e("down"), this.ns.is("collapse", this.isCollapse)],
        "name": "chevron-down-outline"
      }, null)]),
      dropdown: () => createVNode(resolveComponent("el-dropdown-menu"), null, {
        default: () => [createVNode(resolveComponent("el-dropdown-item"), {
          "class": [this.ns.b("item"), this.semanticClass("item")],
          "style": this.semanticStyle("item")
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "log-out-outline",
            "class": this.ns.e("icon")
          }, null), createVNode("span", {
            "onClick": this.onClick
          }, [ibiz.i18n.t("app.logout")])]
        })]
      })
    })]);
  }
});

export { AuthUserinfo };
