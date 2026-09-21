'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var core = require('@ibiz-template/core');
var drtab_controller = require('./drtab.controller.cjs');
var drtabControl_util = require('./drtab-control.util.cjs');
var flowDrtab = require('./flow-drtab.cjs');
require('./drtab.css');

"use strict";
const DRTabControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDrTabControl",
  props: {
    /**
     * @description 数据关系分页栏模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 隐藏编辑项
     */
    hideEditItem: {
      type: Boolean,
      default: void 0
    }
  },
  setup() {
    var _a;
    const c = vue3Util.useControlController((...args) => new drtab_controller.DRTabController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const router = vueRouter.useRouter();
    const controlRef = vue.ref();
    const counterData = vue.ref({});
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      visibleItems,
      moreItems
    } = drtabControl_util.useAppDRTab(c, controlRef, counterData);
    const fn = (counter) => {
      counterData.value = counter;
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
    const emitChange = () => {
      const {
        activeName
      } = c.state;
      const drTabItem = c.state.drTabPages.find((item) => item.tag === activeName);
      if (drTabItem) {
        c.evt.emit("onTabChange", {
          data: drTabItem
        });
      }
    };
    const handleTabChange = () => {
      c.handleTabChange();
      emitChange();
    };
    const onTabChange = (key) => {
      c.state.activeName = key;
      c.handleTabChange();
      emitChange();
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
        "onCommand": onTabChange,
        "style": semanticStyle("dropdown", {
          item: activeTab.value
        }),
        "popper-class": [semanticClass("popup"), ns.be("dropdown-list", "popper")],
        "popper-style": semanticStyle("popup"),
        "class": [ns.b("dropdown-list"), ns.e("dropdown"), semanticClass("dropdown", {
          item: activeTab.value
        })]
      }, {
        default: () => {
          var _a2, _b, _c;
          return vue.createVNode("div", {
            "class": ns.be("dropdown-list", "trigger")
          }, [((_a2 = activeTab.value) == null ? void 0 : _a2.sysImage) && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": [ns.em("dropdown", "icon"), semanticClass("dropdown.icon", {
              item: activeTab.value
            })],
            "style": semanticStyle("dropdown.icon", {
              item: activeTab.value
            }),
            "icon": activeTab.value.sysImage
          }, null), vue.createVNode("div", {
            "class": [ns.em("dropdown", "caption"), semanticClass("dropdown.caption", {
              item: activeTab.value
            })],
            "style": semanticStyle("dropdown.caption", {
              item: activeTab.value
            })
          }, [(_b = activeTab.value) == null ? void 0 : _b.caption]), ((_c = activeTab.value) == null ? void 0 : _c.counterId) && vue.createVNode(vue.resolveComponent("iBizBadge"), {
            "class": [ns.em("dropdown", "counter"), semanticClass("dropdown.counter", {
              item: activeTab.value,
              counter: counterData.value
            })],
            "style": semanticStyle("dropdown.counter", {
              item: activeTab.value,
              counter: counterData.value
            }),
            "value": counterData.value[activeTab.value.counterId],
            "counterMode": activeTab.value.counterMode
          }, null), vue.createVNode("ion-icon", {
            "name": "chevron-down-outline"
          }, null)]);
        },
        dropdown: () => {
          return vue.createVNode("div", {
            "class": ns.bem("dropdown-list", "popper", "content")
          }, [c.state.drTabPages.map((tab) => {
            if (!tab.hidden) {
              return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
                "class": [ns.e("item"), semanticClass("item", {
                  item: tab
                }), ns.bem("dropdown-list", "popper", "item"), ns.is("active", tab.tag === c.state.activeName)],
                "style": semanticStyle("item", {
                  item: tab
                }),
                "command": tab.tag,
                "disabled": tab.disabled
              }, {
                default: () => [tab.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
                  "icon": tab.sysImage,
                  "class": [ns.em("item", "icon"), semanticClass("item.icon", {
                    item: tab
                  })],
                  "style": semanticStyle("item.icon", {
                    item: tab
                  })
                }, null), vue.createVNode("span", {
                  "class": ["caption", ns.em("item", "caption"), semanticClass("item.caption", {
                    item: tab
                  })],
                  "style": semanticStyle("item.caption", {
                    item: tab
                  })
                }, [tab.caption]), tab.counterId && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "class": [ns.em("item", "counter"), ns.bem("dropdown-list", "popper", "counter"), semanticClass("item.counter", {
                    item: tab,
                    counter: counterData.value
                  })],
                  "style": semanticStyle("item.counter", {
                    item: tab,
                    counter: counterData.value
                  }),
                  "value": counterData.value[tab.counterId],
                  "counterMode": tab.counterMode
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
      moreItems,
      activeTab,
      controlRef,
      counterData,
      tabPosition,
      visibleItems,
      semanticClass,
      semanticStyle,
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
    if (this.tabPosition === "flow_noheader" || this.tabPosition === "flow") {
      return vue.createVNode(flowDrtab.FlowDrtab, {
        "class": this.semanticClass("root"),
        "style": this.semanticStyle("root"),
        "semanticClass": this.semanticClass,
        "semanticStyle": this.semanticStyle,
        "pagesState": this.visibleItems,
        "drtabpages": this.modelData.dedrtabPages,
        "context": this.c.context,
        "params": this.c.params,
        "showHeader": this.tabPosition === "flow",
        "counterData": this.counterData,
        "activeTab": this.activeTab,
        "controller": this.c
      }, null);
    }
    const moreTab = this.moreItems.find((tab) => tab.tag === this.c.state.activeName) || {};
    const more = vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "trigger": "click",
      "style": this.semanticStyle("more"),
      "popper-class": [this.semanticClass("popup"), this.ns.b("more-dropdown-popper")],
      "popper-style": this.semanticStyle("popup"),
      "class": [this.ns.b("more-dropdown"), this.semanticClass("more")]
    }, {
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns.be("more-dropdown", "link"),
          "onClick": (e) => e.stopPropagation()
        }, [vue.createVNode("span", null, [ibiz.i18n.t("app.more")]), vue.createVNode("svg", {
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
                "class": [this.c.state.activeName === item.tag ? this.ns.be("more-dropdown-popper", "active") : "", this.ns.bem("more-dropdown-popper", "label", "item"), this.ns.e("item"), this.semanticClass("item", {
                  item
                })],
                "style": this.semanticStyle("item", {
                  item
                }),
                "onClick": () => this.onTabChange(item.tag)
              }, {
                default: () => [vue.createVNode("span", {
                  "class": [this.ns.be("more-dropdown-popper", "label")]
                }, [vue.createVNode("span", {
                  "class": [this.ns.em("item", "caption"), this.ns.bem("more-dropdown-popper", "label", "text")],
                  "title": core.showTitle(item.caption || "")
                }, [item.caption || ""]), item.counterId && this.counterData[item.counterId] != null && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "class": [this.ns.bem("more-dropdown-popper", "label", "counter"), this.ns.em("item", "counter"), this.semanticClass("item.counter", {
                    item,
                    counter: this.counterData
                  })],
                  "style": this.semanticStyle("item.counter", {
                    item,
                    counter: this.counterData
                  }),
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
      "class": [this.ns.b(), this.semanticClass("root"), this.moreItems.length > 0 ? this.ns.b("more") : ""],
      "style": this.semanticStyle("root")
    }, {
      default: () => [isCreated && isCalculatedPermission && this.tabPosition === "top_dropdownlist" ? this.renderDropdownList() : vue.createVNode(vue.resolveComponent("el-tabs"), {
        "tabPosition": this.tabPosition,
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "onTabChange": this.handleTabChange,
        "style": this.semanticStyle("content"),
        "class": [this.ns.e("content"), this.semanticClass("content")]
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
                  "class": [this.ns.b("label"), this.ns.e("item"), this.semanticClass("item", {
                    item: tab
                  })],
                  "style": this.semanticStyle("item", {
                    item: tab
                  })
                }, [tab.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
                  "class": [this.ns.be("label", "icon"), this.ns.em("item", "icon"), this.semanticClass("item.icon", {
                    item: tab
                  })],
                  "style": this.semanticStyle("item.icon", {
                    item: tab
                  }),
                  "icon": tab.sysImage
                }, null), vue.createVNode("span", {
                  "class": [this.ns.be("label", "text"), this.ns.em("item", "caption"), this.semanticClass("item.caption", {
                    item: tab
                  })],
                  "style": this.semanticStyle("item.caption", {
                    item: tab
                  })
                }, [tab.caption]), !ramda.isNil(counterNum) && vue.createVNode(vue.resolveComponent("iBizBadge"), {
                  "class": [this.ns.e("counter"), this.ns.em("item", "counter"), this.semanticClass("item.counter", {
                    item: tab,
                    counter: this.counterData
                  })],
                  "style": this.semanticStyle("item.counter", {
                    item: tab,
                    counter: this.counterData
                  }),
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
