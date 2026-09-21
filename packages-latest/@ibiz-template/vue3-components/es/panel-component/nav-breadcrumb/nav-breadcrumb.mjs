import { isVNode, defineComponent, createVNode, withDirectives, resolveComponent, resolveDirective, watch, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { NavBreadcrumbController } from './nav-breadcrumb.controller.mjs';
import { getAppIndexViewName } from './nav-breadcrumb.util.mjs';
import './nav-breadcrumb.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NavBreadcrumb = /* @__PURE__ */ defineComponent({
  name: "IBizNavBreadcrumb",
  props: {
    /**
     * @description 面包屑导航数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面包屑导航控制器
     */
    controller: {
      type: NavBreadcrumbController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("nav-breadcrumb");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
      const indexViewName = getAppIndexViewName(c.panel.context);
      if (!c.showHome) {
        result = result.filter((x) => x.viewName !== indexViewName);
      }
      return result;
    });
    const childClass = [{
      class: semanticClass("separator"),
      selector: ".el-breadcrumb__separator"
    }];
    const childStyle = [{
      style: semanticStyle("separator"),
      selector: ".el-breadcrumb__separator"
    }];
    const onClick = (event, item) => {
      if (item.type === "menuItem") {
        event.stopPropagation();
        c.openMenuItemView(item, event);
      }
    };
    return {
      ns,
      c,
      items,
      onClick,
      semanticClass,
      semanticStyle,
      childClass,
      childStyle
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.m(this.c.navMode), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [withDirectives(createVNode(resolveComponent("el-breadcrumb"), {
      "separator": this.c.separator,
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content")
    }, _isSlot(_slot = this.items.map((item) => {
      let label = item.caption;
      if (item.dataInfo) {
        label += " - ".concat(item.dataInfo);
      }
      return createVNode(resolveComponent("el-breadcrumb-item"), {
        "class": [this.ns.is("link", item.type === "menuItem"), this.semanticClass("item", {
          item
        })],
        "style": this.semanticStyle("item", {
          item
        }),
        "to": item.fullPath,
        "onClick": (event) => this.onClick(event, item)
      }, _isSlot(label) ? label : {
        default: () => [label]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
  }
});

export { NavBreadcrumb };
