'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var navBreadcrumb_controller = require('./nav-breadcrumb.controller.cjs');
var navBreadcrumb_util = require('./nav-breadcrumb.util.cjs');
require('./nav-breadcrumb.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const NavBreadcrumb = /* @__PURE__ */ vue.defineComponent({
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
      type: navBreadcrumb_controller.NavBreadcrumbController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("nav-breadcrumb");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
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
      const indexViewName = navBreadcrumb_util.getAppIndexViewName(c.panel.context);
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.m(this.c.navMode), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-breadcrumb"), {
      "separator": this.c.separator,
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content")
    }, _isSlot(_slot = this.items.map((item) => {
      let label = item.caption;
      if (item.dataInfo) {
        label += " - ".concat(item.dataInfo);
      }
      return vue.createVNode(vue.resolveComponent("el-breadcrumb-item"), {
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
    }), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])]);
  }
});

exports.NavBreadcrumb = NavBreadcrumb;
