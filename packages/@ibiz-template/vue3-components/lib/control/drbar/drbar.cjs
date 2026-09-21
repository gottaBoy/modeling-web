'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var drbar_controller = require('./drbar.controller.cjs');
require('./drbar.css');

"use strict";
const DRBarControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDrBarControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    srfnav: {
      type: String,
      required: false
    },
    showMode: {
      type: String,
      default: "vertical"
    },
    hideEditItem: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props) {
    const c = vue3Util.useControlController((...args) => new drbar_controller.DRBarController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const router = vueRouter.useRouter();
    const counterData = vue.reactive({});
    const fn = (counter) => {
      Object.assign(counterData, counter);
    };
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });
    vue.onUnmounted(() => {
      var _a;
      (_a = c.counter) == null ? void 0 : _a.offChange(fn);
    });
    c.setRouter(router);
    const handleSelect = (key) => {
      c.handleSelectChange(key);
    };
    const route = vueRouter.useRoute();
    let expViewRoutePath = "";
    const opens = [];
    vue.watch(() => c.state.isCreated, (_newVal, _oldVal) => {
      if (props.showMode !== "horizontal") {
        const {
          drBarItems
        } = c.state;
        drBarItems.forEach((item) => {
          opens.push(item.tag);
        });
      }
    });
    if (c.routeDepth) {
      expViewRoutePath = vue3Util.getNestedRoutePath(route, c.routeDepth);
    }
    if (route) {
      vue.watch(() => route.fullPath, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const depth = c.routeDepth;
          if (depth) {
            const currentRoutePath = vue3Util.getNestedRoutePath(route, c.routeDepth);
            if (currentRoutePath === expViewRoutePath) {
              const routePath = vue3Util.route2routePath(route);
              const {
                srfnav
              } = routePath.pathNodes[depth - 1];
              c.handleSelectChange(srfnav);
            }
          }
        }
      }, {
        immediate: true
      });
    }
    const renderMenuItems = (item) => {
      if (!item.visible) {
        return;
      }
      if (item.children) {
        let subtitle = "";
        if (props.showMode === "horizontal") {
          if (item.tag !== c.state.selectedItem) {
            const find = item.children.find((x) => x.tag === c.state.selectedItem);
            if (find) {
              subtitle = "-".concat(find.caption);
            }
          }
        }
        return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
          "class": ns.b("group"),
          "index": item.tag,
          "disabled": item.disabled
        }, {
          default: () => item.children.map((child) => {
            return renderMenuItems(child);
          }),
          title: () => [vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": ns.e("icon"),
            "icon": item.sysImage
          }, null), vue.createVNode("span", null, [item.caption, subtitle])]
        });
      }
      return vue.createVNode(vue.resolveComponent("el-menu-item"), {
        "class": ns.e("item"),
        "index": item.tag,
        "disabled": item.disabled
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": ns.e("icon"),
          "icon": item.sysImage
        }, null), vue.createVNode("span", null, [item.caption]), item.counterId && counterData[item.counterId] != null && vue.createVNode(vue.resolveComponent("iBizBadge"), {
          "class": ns.e("counter"),
          "value": counterData[item.counterId],
          "counterMode": item.counterMode
        }, null)]
      });
    };
    return {
      c,
      ns,
      handleSelect,
      renderMenuItems,
      opens
    };
  },
  render() {
    const {
      isCreated,
      drBarItems,
      selectedItem,
      isCalculatedPermission
    } = this.c.state;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.ns.b()
    }, {
      default: () => [isCreated && isCalculatedPermission && vue.createVNode(vue.resolveComponent("el-menu"), {
        "class": this.ns.e("menu"),
        "mode": this.showMode,
        "default-active": selectedItem,
        "onSelect": this.handleSelect,
        "default-openeds": this.opens
      }, {
        default: () => {
          return drBarItems.map((item) => {
            return this.renderMenuItems(item);
          });
        }
      })]
    });
  }
});

exports.DRBarControl = DRBarControl;
