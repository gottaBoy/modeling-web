'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var navPosIndex_controller = require('./nav-pos-index.controller.cjs');
require('./nav-pos-index.css');

"use strict";
const NavPosIndex = /* @__PURE__ */ vue.defineComponent({
  name: "IBizNavPosIndex",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: navPosIndex_controller.NavPosIndexController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const c = props.controller;
    const ns = vue3Util.useNamespace("nav-pos-index");
    const onViewCreated = (event) => {
      c.onViewCreated(event);
    };
    const router = vueRouter.useRouter();
    c.setRouter(router);
    if (c.routeDepth) {
      vue3Util.onRouteChange((args) => {
        c.onRouteChange(args);
      }, c.routeDepth + 1);
      if (c.panel.view.model.viewType === "APPINDEXVIEW" && !c.navTabs) {
        const route = vueRouter.useRoute();
        let cacheFullPath = "";
        (_a = c.appmenu) == null ? void 0 : _a.evt.on("onClick", () => {
          cacheFullPath = route.fullPath;
        });
        router.beforeEach((to, from, next) => {
          if (from.fullPath === cacheFullPath) {
            c.clearCache();
          }
          next();
        });
      }
    }
    return {
      ns,
      onViewCreated,
      c
    };
  },
  render() {
    const {
      state,
      viewModals
    } = this.c;
    const {
      currentKey,
      cacheKeys
    } = state;
    if (!currentKey) {
      return;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("no-nav", ibiz.config.view.disableHomeTabs)]
    }, [this.c.routeDepth ? vue.createVNode(vue.resolveComponent("iBizRouterView"), {
      "manualKey": currentKey,
      "modal": viewModals[currentKey],
      "onCreated": this.onViewCreated
    }, {
      default: ({
        Component
      }) => {
        if (this.c.noCache) {
          return Component ? vue.createVNode(Component, null, null) : null;
        }
        return vue.createVNode(vue.resolveComponent("keepAlive"), {
          "include": cacheKeys,
          "max": 30,
          "isKey": true
        }, {
          default: () => [Component && vue.createVNode(Component, null, null)]
        });
      }
    }) : vue.createVNode("div", null, [ibiz.i18n.t("panelComponent.navPosIndex.noSupportPrompt")])]);
  }
});

exports.NavPosIndex = NavPosIndex;
