'use strict';

var vue = require('vue');
var vueRouter = require('vue-router');
var navPos_controller = require('./nav-pos.controller.cjs');
require('./nav-pos.css');
require('../../use/index.cjs');
require('../../util/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');
var route = require('../../util/route/route.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const NavPos = /* @__PURE__ */ vue.defineComponent({
  name: "IBizNavPos",
  props: {
    /**
     * @description 导航占位模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 导航占位控制器
     */
    controller: {
      type: navPos_controller.NavPosController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = namespace.useNamespace("nav-pos");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const onViewCreated = (event) => {
      c.onViewCreated(event);
    };
    const router = vueRouter.useRouter();
    const route$1 = vueRouter.useRoute();
    const isPresetView = vue.ref(false);
    c.setRouter(router);
    if (c.routeDepth) {
      const expViewRoutePath = route.getNestedRoutePath(route$1, c.routeDepth);
      vue.watch(() => route$1.fullPath, () => {
        const currentRoutePath = route.getNestedRoutePath(route$1, c.routeDepth);
        if (expViewRoutePath === currentRoutePath && route$1.matched.length > c.routeDepth) {
          if (route$1.matched.length === c.routeDepth + 1) {
            isPresetView.value = !!route$1.name;
            if (isPresetView.value) {
              return;
            }
          }
          c.onRouteChange(route$1);
        }
      }, {
        immediate: true
      });
    }
    return {
      ns,
      c,
      isPresetView,
      onViewCreated,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      viewModals,
      state
    } = this.c;
    const {
      currentKey,
      cacheKeys,
      navViewMsgs,
      cache
    } = state;
    let content = null;
    if (state.routeOpen) {
      if (this.isPresetView) {
        return vue.createVNode(vueRouter.RouterView, {
          "class": this.semanticClass("root"),
          "style": this.semanticStyle("root")
        }, null);
      }
      content = vue.createVNode(vue.resolveComponent("iBizRouterView"), {
        "class": this.semanticClass("content"),
        "style": this.semanticStyle("content"),
        "manualKey": currentKey,
        "modal": viewModals[currentKey],
        "onCreated": this.onViewCreated
      }, {
        default: ({
          Component
        }) => {
          const routerContent = currentKey === "" || !Component ? null : vue.createVNode(Component, null, null);
          return cache ? vue.createVNode(vue.resolveComponent("keepAlive"), {
            "include": cacheKeys,
            "max": 30,
            "isKey": true
          }, _isSlot(routerContent) ? routerContent : {
            default: () => [routerContent]
          }) : routerContent;
        }
      });
    } else {
      const view = currentKey && navViewMsgs[currentKey] ? vue.h(vue.resolveComponent("IBizViewShell"), {
        class: this.semanticClass("content"),
        style: this.semanticStyle("content"),
        context: navViewMsgs[currentKey].context,
        params: navViewMsgs[currentKey].params,
        key: !this.c.ignoreEmbedKey ? currentKey : void 0,
        viewId: navViewMsgs[currentKey].viewId,
        onCreated: this.onViewCreated
      }) : null;
      content = cache ? vue.createVNode(vue.resolveComponent("keepAlive"), {
        "include": cacheKeys,
        "max": 30,
        "isKey": true
      }, _isSlot(view) ? view : {
        default: () => [view]
      }) : view;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [content]);
  }
});

exports.NavPos = NavPos;
