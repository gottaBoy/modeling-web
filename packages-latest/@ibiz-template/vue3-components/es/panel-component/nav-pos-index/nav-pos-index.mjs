import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode, onRouteChange } from '@ibiz-template/vue3-util';
import { useRouter, useRoute } from 'vue-router';
import { NavPosIndexController } from './nav-pos-index.controller.mjs';
import './nav-pos-index.css';

"use strict";
const NavPosIndex = /* @__PURE__ */ defineComponent({
  name: "IBizNavPosIndex",
  props: {
    /**
     * @description 导航占位模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 导航占位控制器
     */
    controller: {
      type: NavPosIndexController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const c = props.controller;
    const ns = useNamespace("nav-pos-index");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const onViewCreated = (event) => {
      c.onViewCreated(event);
    };
    const router = useRouter();
    c.setRouter(router);
    if (c.routeDepth) {
      onRouteChange((args) => {
        c.onRouteChange(args);
      }, c.routeDepth + 1);
      if (c.panel.view.model.viewType === "APPINDEXVIEW" && !c.navTabs) {
        const route = useRoute();
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
      c,
      semanticClass,
      semanticStyle
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("no-nav", ibiz.config.view.disableHomeTabs), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [this.c.routeDepth ? createVNode(resolveComponent("iBizRouterView"), {
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "manualKey": currentKey,
      "modal": viewModals[currentKey],
      "onCreated": this.onViewCreated
    }, {
      default: ({
        Component
      }) => {
        if (this.c.noCache) {
          return Component ? createVNode(Component, null, null) : null;
        }
        return createVNode(resolveComponent("keepAlive"), {
          "include": cacheKeys,
          "max": 30,
          "isKey": true
        }, {
          default: () => [Component && createVNode(Component, null, null)]
        });
      }
    }) : createVNode("div", null, [ibiz.i18n.t("panelComponent.navPosIndex.noSupportPrompt")])]);
  }
});

export { NavPosIndex };
