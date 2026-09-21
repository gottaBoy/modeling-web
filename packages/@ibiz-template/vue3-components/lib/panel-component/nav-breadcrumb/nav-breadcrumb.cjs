'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var navBreadcrumb_controller = require('./nav-breadcrumb.controller.cjs');
require('./nav-breadcrumb.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const NavBreadcrumb = /* @__PURE__ */ vue.defineComponent({
  name: "IBizNavBreadcrumb",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: navBreadcrumb_controller.NavBreadcrumbController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("nav-breadcrumb");
    const c = props.controller;
    const route = vueRouter.useRoute();
    const router = vueRouter.useRouter();
    c.onCreated(router);
    vue.watch(() => route.fullPath, () => {
      c.onRouteChange(router);
    }, {
      immediate: true
    });
    const items = vue.computed(() => {
      const {
        breadcrumbItems
      } = c.state;
      let result = breadcrumbItems.filter((x) => x.caption);
      if (!c.showHome) {
        result = result.filter((x) => x.viewName !== ibiz.hub.defaultAppIndexViewName);
      }
      return result;
    });
    return {
      ns,
      c,
      items
    };
  },
  render() {
    let _slot;
    return vue.createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.m(this.c.navMode)]
    }, [vue.createVNode(vue.resolveComponent("el-breadcrumb"), {
      "separator": this.c.separator
    }, _isSlot(_slot = this.items.map((item) => {
      let label = item.caption;
      if (item.dataInfo) {
        label += " - ".concat(item.dataInfo);
      }
      return vue.createVNode(vue.resolveComponent("el-breadcrumb-item"), {
        "to": item.fullPath
      }, _isSlot(label) ? label : {
        default: () => [label]
      });
    })) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

exports.NavBreadcrumb = NavBreadcrumb;
