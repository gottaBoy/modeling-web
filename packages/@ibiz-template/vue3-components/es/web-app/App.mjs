import { defineComponent, onUnmounted, createVNode, resolveComponent } from 'vue';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import './App.css';

"use strict";
var App = /* @__PURE__ */ defineComponent({
  setup() {
    const modal = new Modal({
      mode: ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1
    });
    const destroyAppHub = () => {
      window.removeEventListener("unload", destroyAppHub);
      ibiz.hub.destroy();
    };
    window.addEventListener("unload", destroyAppHub);
    onUnmounted(() => {
      destroyAppHub();
    });
    return {
      modal
    };
  },
  render() {
    return createVNode(resolveComponent("router-view"), {
      "modal": this.modal
    }, null);
  }
});

export { App as default };
