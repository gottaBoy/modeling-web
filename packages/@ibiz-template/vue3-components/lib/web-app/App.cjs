'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('./App.css');

"use strict";
var App = /* @__PURE__ */ vue.defineComponent({
  setup() {
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1
    });
    const destroyAppHub = () => {
      window.removeEventListener("unload", destroyAppHub);
      ibiz.hub.destroy();
    };
    window.addEventListener("unload", destroyAppHub);
    vue.onUnmounted(() => {
      destroyAppHub();
    });
    return {
      modal
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("router-view"), {
      "modal": this.modal
    }, null);
  }
});

exports.default = App;
