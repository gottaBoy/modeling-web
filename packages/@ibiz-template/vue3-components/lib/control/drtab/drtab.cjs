'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var core = require('@ibiz-template/core');
var drtab_controller = require('./drtab.controller.cjs');
var drtabControl_util = require('./drtab-control.util.cjs');
require('./drtab.css');

"use strict";
const DRTabControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDrTabControl",
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
    }
  },
  setup() {
    var _a;
    const c = vue3Util.useControlController((...args) => new drtab_controller.DRTabController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const router = vueRouter.useRouter();
    const controlRef = vue.ref();
    const counterData = vue.reactive({});
    const {
      visibleItems,
      moreItems
    } = drtabControl_util.useAppDRTab(c, controlRef, counterData);
    const fn = (counter) => {
      Object.assign(counterData, counter);
    };
    const tabPosition = ((_a = c.view.model.tabLayout) == null ? void 0 : _a.toLowerCase()) || "top";
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });
    const activeTab = vue.computed(() => {
      return c.state.drTabPages.find((tab) => tab.tag === c.state.activeName);
    });
    vue.onUnmounted(() => {
      var _a2;
      (_a2 = c.counter) == null ? void 0 : _a2.offChange(fn);
    });
    c.setRouter(router);
    const handleTabChange = () => {
      c.handleTabChange();
    };
    const onTabChange = (key) => {
      c.state.activeName = key;
      c.handleTabChange();
    };
    const route = vueRouter.useRoute();
    let expViewRoutePath = "";
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
              const isRoutePushed = !!c.routeDepth && runtime.hasSubRoute(c.routeDepth);
              if (srfnav && c.state.activeName && c.state.activeName !== srfnav) {
                c.state.activeName = srfnav;
                c.handleTabChange(isRoutePushed);
              } else if (!srfnav) {
                const routeNoSub = !!c.routeDepth && !runtime.hasSubRoute(c.routeDepth);
                const doTabChange = c.state.activeName !== c.state.defaultName || routeNoSub;
                if (doTabChange) {
                  c.state.activeName = c.state.defaultName;
                  c.handleTabChange(isRoutePushed);
                }
              }
            }
          }
        }
      }, {
        immediate: true
      });
    }
    const renderDropdownList = () => {
      return vue.createVNode(vue.resolveComponent("el-dropdown"), {
        "trigger": "click",
        "class": ns.b("dropdown-list"),
        "popper-class": ns.be("dropdown-list", "popper"),
        "onCommand": onTabChange
      }, {
        default: () => {
          var _a2, _b, _c;
          return vue.createVNode("div", {
            "class": ns.be("dropdown-list", "trigger")
          }, [((_a2 = activeTab.value) == null ? void 0 : _a2.sysImage) && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": activeTab.value.sysImage
          }, null), vue.createVNode("div", {
            "class": "caption"
          }, [(_b = activeTab.value) == null ? void 0 : _b.caption, ((_c = activeTab.value) == null ? void 0 : _c.counterId) && vue.createVNode(vue.resolveComponent("iBizBadge"), {
            "value": counterData[activeTab.value.counterId],
            "counterMode": activeTab.value.counterMode
          }, null)]), vue.createVNode("ion-icon", {
            "name": "chevron-down-outline"
          }, null)]);
        },
        dropdown: () => {
          return vue.createVNode("div", {
            "class": ns.bem("dropdown-list", "popper", "content")
          }, [c.state.drTabPages.map((tab) => {
            if (!tab.hidden) {
              return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
                "class": [ns.bem("dropdown-list", "popper", "item"), ns.is("active", tab.tag === c.state.activeName)],
                "command": tab.tag,
                "disabled": tab.disabled
              }, {
                default: () => [tab.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
                  "icon": tab.sysImage
                }, null), vue.createVNode("span", {
                  "class": "caption"
                }, [tab.caption]), tab.counterId && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "value": counterData[tab.counterId],
                  "counterMode": tab.counterMode
                }, null), tab.tag === c.state.activeName && vue.createVNode("ion-icon", {
                  "name": "checkmark-outline"
                }, null)]
              });
            }
            return null;
          })]);
        }
      });
    };
    return {
      c,
      ns,
      controlRef,
      counterData,
      visibleItems,
      moreItems,
      tabPosition,
      onTabChange,
      handleTabChange,
      renderDropdownList
    };
  },
  render() {
    const {
      isCreated,
      isCalculatedPermission
    } = this.c.state;
    const moreTab = this.moreItems.find((tab) => tab.tag === this.c.state.activeName) || {};
    const more = vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "trigger": "click",
      "class": this.ns.b("more-dropdown"),
      "popper-class": this.ns.b("more-dropdown-popper")
    }, {
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns.be("more-dropdown", "link"),
          "onClick": (e) => e.stopPropagation()
        }, [vue.createVNode("span", null, [ibiz.i18n.t("app.more"), vue.createTextVNode(" ")]), vue.createVNode("svg", {
          "viewBox": "0 0 16 16",
          "xmlns": "http://www.w3.org/2000/svg",
          "height": "1em",
          "width": "1em"
        }, [vue.createVNode("g", {
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [vue.createVNode("path", {
          "d": "M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"
        }, null)])])]);
      },
      dropdown: () => {
        return vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
          default: () => {
            return this.moreItems.map((item) => {
              return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
                "class": [this.c.state.activeName === item.tag ? this.ns.be("more-dropdown-popper", "active") : ""],
                "onClick": () => this.onTabChange(item.tag)
              }, {
                default: () => [vue.createVNode("span", {
                  "class": [this.ns.be("more-dropdown-popper", "label")]
                }, [vue.createVNode("span", {
                  "class": this.ns.bem("more-dropdown-popper", "label", "text"),
                  "title": core.showTitle(item.caption || "")
                }, [item.caption || ""]), item.counterId && this.counterData[item.counterId] != null && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "class": this.ns.bem("more-dropdown-popper", "label", "counter"),
                  "value": this.counterData[item.counterId],
                  "counterMode": item.counterMode
                }, null)])]
              });
            });
          }
        });
      }
    });
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "ref": "controlRef",
      "controller": this.c,
      "class": [this.ns.b(), this.moreItems.length > 0 ? this.ns.b("more") : ""]
    }, {
      default: () => [isCreated && isCalculatedPermission && this.tabPosition === "top_dropdownlist" ? this.renderDropdownList() : vue.createVNode(vue.resolveComponent("el-tabs"), {
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "onTabChange": this.handleTabChange
      }, {
        default: () => [this.visibleItems.map((tab) => {
          const counterNum = tab.counterId ? this.counterData[tab.counterId] : void 0;
          if (!tab.hidden) {
            return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
              "class": this.ns.e("tab-item"),
              "label": tab.caption + counterNum,
              "disabled": tab.disabled,
              "name": tab.tag
            }, {
              label: () => {
                return vue.createVNode("span", {
                  "class": this.ns.b("label")
                }, [tab.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
                  "class": this.ns.be("label", "icon"),
                  "icon": tab.sysImage
                }, null), vue.createVNode("span", {
                  "class": this.ns.be("label", "text")
                }, [tab.caption]), !ramda.isNil(counterNum) && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "class": this.ns.e("counter"),
                  "value": counterNum,
                  "counterMode": tab.counterMode
                }, null)]);
              }
            });
          }
          return null;
        }), this.moreItems.length > 0 && vue.createVNode(vue.resolveComponent("el-tab-pane"), {
          "label": "",
          "name": moreTab.tag
        }, {
          label: () => more
        })]
      })]
    });
  }
});

exports.DRTabControl = DRTabControl;
