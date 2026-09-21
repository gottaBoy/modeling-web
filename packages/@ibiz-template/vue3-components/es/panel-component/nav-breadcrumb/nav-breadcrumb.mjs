import { isVNode, defineComponent, watch, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { NavBreadcrumbController } from './nav-breadcrumb.controller.mjs';
import './nav-breadcrumb.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NavBreadcrumb = /* @__PURE__ */ defineComponent({
  name: "IBizNavBreadcrumb",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: NavBreadcrumbController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("nav-breadcrumb");
    const c = props.controller;
    const route = useRoute();
    const router = useRouter();
    c.onCreated(router);
    watch(() => route.fullPath, () => {
      c.onRouteChange(router);
    }, {
      immediate: true
    });
    const items = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.m(this.c.navMode)]
    }, [createVNode(resolveComponent("el-breadcrumb"), {
      "separator": this.c.separator
    }, _isSlot(_slot = this.items.map((item) => {
      let label = item.caption;
      if (item.dataInfo) {
        label += " - ".concat(item.dataInfo);
      }
      return createVNode(resolveComponent("el-breadcrumb-item"), {
        "to": item.fullPath
      }, _isSlot(label) ? label : {
        default: () => [label]
      });
    })) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

export { NavBreadcrumb };
