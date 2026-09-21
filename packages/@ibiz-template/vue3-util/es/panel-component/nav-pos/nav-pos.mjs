import { isVNode, defineComponent, ref, watch, createVNode, resolveComponent, h } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
import { NavPosController } from './nav-pos.controller.mjs';
import './nav-pos.css';
import '../../use/index.mjs';
import '../../util/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { getNestedRoutePath } from '../../util/route/route.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NavPos = /* @__PURE__ */ defineComponent({
  name: "IBizNavPos",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: NavPosController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("nav-pos");
    const onViewCreated = (event) => {
      c.onViewCreated(event);
    };
    const router = useRouter();
    const route = useRoute();
    const isPresetView = ref(false);
    c.setRouter(router);
    if (c.routeDepth) {
      const expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
      watch(() => route.fullPath, () => {
        const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
        if (expViewRoutePath === currentRoutePath && route.matched.length > c.routeDepth) {
          if (route.matched.length === c.routeDepth + 1) {
            isPresetView.value = !!route.name;
            if (isPresetView.value) {
              return;
            }
          }
          c.onRouteChange(route);
        }
      }, {
        immediate: true
      });
    }
    return {
      ns,
      c,
      isPresetView,
      onViewCreated
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
        return createVNode(RouterView, null, null);
      }
      content = createVNode(resolveComponent("iBizRouterView"), {
        "manualKey": currentKey,
        "modal": viewModals[currentKey],
        "onCreated": this.onViewCreated
      }, {
        default: ({
          Component
        }) => {
          const routerContent = currentKey === "" || !Component ? null : createVNode(Component, null, null);
          return cache ? createVNode(resolveComponent("keepAlive"), {
            "include": cacheKeys,
            "max": 30,
            "isKey": true
          }, _isSlot(routerContent) ? routerContent : {
            default: () => [routerContent]
          }) : routerContent;
        }
      });
    } else {
      const view = currentKey && navViewMsgs[currentKey] ? h(resolveComponent("IBizViewShell"), {
        context: navViewMsgs[currentKey].context,
        params: navViewMsgs[currentKey].params,
        key: !this.c.ignoreEmbedKey ? currentKey : void 0,
        viewId: navViewMsgs[currentKey].viewId,
        onCreated: this.onViewCreated
      }) : null;
      content = cache ? createVNode(resolveComponent("keepAlive"), {
        "include": cacheKeys,
        "max": 30,
        "isKey": true
      }, _isSlot(view) ? view : {
        default: () => [view]
      }) : view;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass]
    }, [content]);
  }
});

export { NavPos };
