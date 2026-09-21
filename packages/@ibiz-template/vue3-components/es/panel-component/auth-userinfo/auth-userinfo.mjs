import { defineComponent, inject, computed, createVNode, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useNamespace } from '@ibiz-template/vue3-util';
import './auth-userinfo.css';
import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
const AuthUserinfo = /* @__PURE__ */ defineComponent({
  name: "IBizAuthUserinfo",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(prop) {
    var _a;
    const ns = useNamespace("user-info");
    const c = prop.controller;
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
      return c.panel.view.state.isCollapse;
    });
    return {
      ns,
      c,
      onClick,
      srfusername,
      loginname,
      router,
      menuAlign,
      isCollapse
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("left", this.menuAlign === "LEFT"), this.ns.is("top", this.menuAlign === "TOP"), this.ns.is("collapse", this.isCollapse)]
    }, [createVNode(resolveComponent("el-dropdown"), null, {
      default: () => createVNode("div", {
        "class": [this.ns.b("info"), this.ns.is("collapse", this.isCollapse)]
      }, [createVNode("div", {
        "class": this.ns.b("label")
      }, [createVNode(resolveComponent("el-avatar"), {
        "class": this.ns.b("avatar"),
        "src": "./assets/images/user-avatar.png"
      }, null), createVNode("div", {
        "class": [this.ns.b("name"), this.ns.is("collapse", this.isCollapse)]
      }, [createVNode("div", {
        "class": this.ns.be("name", "user-name")
      }, [this.srfusername]), this.menuAlign === "LEFT" && this.loginname && createVNode("div", {
        "class": this.ns.be("name", "person-name")
      }, [this.loginname])])]), createVNode("ion-icon", {
        "class": [this.ns.e("down"), this.ns.is("collapse", this.isCollapse)],
        "name": "chevron-down-outline"
      }, null)]),
      dropdown: () => createVNode(resolveComponent("el-dropdown-menu"), null, {
        default: () => [createVNode(resolveComponent("el-dropdown-item"), null, {
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
