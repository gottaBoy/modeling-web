import { defineComponent, ref, reactive, computed, onUnmounted, watch, createVNode, resolveComponent, createTextVNode } from 'vue';
import { useControlController, useNamespace, getNestedRoutePath, route2routePath } from '@ibiz-template/vue3-util';
import { useRouter, useRoute } from 'vue-router';
import { hasSubRoute } from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { showTitle } from '@ibiz-template/core';
import { DRTabController } from './drtab.controller.mjs';
import { useAppDRTab } from './drtab-control.util.mjs';
import './drtab.css';

"use strict";
const DRTabControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new DRTabController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const router = useRouter();
    const controlRef = ref();
    const counterData = reactive({});
    const {
      visibleItems,
      moreItems
    } = useAppDRTab(c, controlRef, counterData);
    const fn = (counter) => {
      Object.assign(counterData, counter);
    };
    const tabPosition = ((_a = c.view.model.tabLayout) == null ? void 0 : _a.toLowerCase()) || "top";
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });
    const activeTab = computed(() => {
      return c.state.drTabPages.find((tab) => tab.tag === c.state.activeName);
    });
    onUnmounted(() => {
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
    const route = useRoute();
    let expViewRoutePath = "";
    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }
    if (route) {
      watch(() => route.fullPath, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const depth = c.routeDepth;
          if (depth) {
            const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
            if (currentRoutePath === expViewRoutePath) {
              const routePath = route2routePath(route);
              const {
                srfnav
              } = routePath.pathNodes[depth - 1];
              const isRoutePushed = !!c.routeDepth && hasSubRoute(c.routeDepth);
              if (srfnav && c.state.activeName && c.state.activeName !== srfnav) {
                c.state.activeName = srfnav;
                c.handleTabChange(isRoutePushed);
              } else if (!srfnav) {
                const routeNoSub = !!c.routeDepth && !hasSubRoute(c.routeDepth);
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
      return createVNode(resolveComponent("el-dropdown"), {
        "trigger": "click",
        "class": ns.b("dropdown-list"),
        "popper-class": ns.be("dropdown-list", "popper"),
        "onCommand": onTabChange
      }, {
        default: () => {
          var _a2, _b, _c;
          return createVNode("div", {
            "class": ns.be("dropdown-list", "trigger")
          }, [((_a2 = activeTab.value) == null ? void 0 : _a2.sysImage) && createVNode(resolveComponent("iBizIcon"), {
            "icon": activeTab.value.sysImage
          }, null), createVNode("div", {
            "class": "caption"
          }, [(_b = activeTab.value) == null ? void 0 : _b.caption, ((_c = activeTab.value) == null ? void 0 : _c.counterId) && createVNode(resolveComponent("iBizBadge"), {
            "value": counterData[activeTab.value.counterId],
            "counterMode": activeTab.value.counterMode
          }, null)]), createVNode("ion-icon", {
            "name": "chevron-down-outline"
          }, null)]);
        },
        dropdown: () => {
          return createVNode("div", {
            "class": ns.bem("dropdown-list", "popper", "content")
          }, [c.state.drTabPages.map((tab) => {
            if (!tab.hidden) {
              return createVNode(resolveComponent("el-dropdown-item"), {
                "class": [ns.bem("dropdown-list", "popper", "item"), ns.is("active", tab.tag === c.state.activeName)],
                "command": tab.tag,
                "disabled": tab.disabled
              }, {
                default: () => [tab.sysImage && createVNode(resolveComponent("iBizIcon"), {
                  "icon": tab.sysImage
                }, null), createVNode("span", {
                  "class": "caption"
                }, [tab.caption]), tab.counterId && createVNode(resolveComponent("iBizBadge"), {
                  "value": counterData[tab.counterId],
                  "counterMode": tab.counterMode
                }, null), tab.tag === c.state.activeName && createVNode("ion-icon", {
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
    const more = createVNode(resolveComponent("el-dropdown"), {
      "trigger": "click",
      "class": this.ns.b("more-dropdown"),
      "popper-class": this.ns.b("more-dropdown-popper")
    }, {
      default: () => {
        return createVNode("div", {
          "class": this.ns.be("more-dropdown", "link"),
          "onClick": (e) => e.stopPropagation()
        }, [createVNode("span", null, [ibiz.i18n.t("app.more"), createTextVNode(" ")]), createVNode("svg", {
          "viewBox": "0 0 16 16",
          "xmlns": "http://www.w3.org/2000/svg",
          "height": "1em",
          "width": "1em"
        }, [createVNode("g", {
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [createVNode("path", {
          "d": "M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"
        }, null)])])]);
      },
      dropdown: () => {
        return createVNode(resolveComponent("el-dropdown-menu"), null, {
          default: () => {
            return this.moreItems.map((item) => {
              return createVNode(resolveComponent("el-dropdown-item"), {
                "class": [this.c.state.activeName === item.tag ? this.ns.be("more-dropdown-popper", "active") : ""],
                "onClick": () => this.onTabChange(item.tag)
              }, {
                default: () => [createVNode("span", {
                  "class": [this.ns.be("more-dropdown-popper", "label")]
                }, [createVNode("span", {
                  "class": this.ns.bem("more-dropdown-popper", "label", "text"),
                  "title": showTitle(item.caption || "")
                }, [item.caption || ""]), item.counterId && this.counterData[item.counterId] != null && createVNode(resolveComponent("iBizBadge"), {
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
    return createVNode(resolveComponent("iBizControlBase"), {
      "ref": "controlRef",
      "controller": this.c,
      "class": [this.ns.b(), this.moreItems.length > 0 ? this.ns.b("more") : ""]
    }, {
      default: () => [isCreated && isCalculatedPermission && this.tabPosition === "top_dropdownlist" ? this.renderDropdownList() : createVNode(resolveComponent("el-tabs"), {
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "onTabChange": this.handleTabChange
      }, {
        default: () => [this.visibleItems.map((tab) => {
          const counterNum = tab.counterId ? this.counterData[tab.counterId] : void 0;
          if (!tab.hidden) {
            return createVNode(resolveComponent("el-tab-pane"), {
              "class": this.ns.e("tab-item"),
              "label": tab.caption + counterNum,
              "disabled": tab.disabled,
              "name": tab.tag
            }, {
              label: () => {
                return createVNode("span", {
                  "class": this.ns.b("label")
                }, [tab.sysImage && createVNode(resolveComponent("iBizIcon"), {
                  "class": this.ns.be("label", "icon"),
                  "icon": tab.sysImage
                }, null), createVNode("span", {
                  "class": this.ns.be("label", "text")
                }, [tab.caption]), !isNil(counterNum) && createVNode(resolveComponent("iBizBadge"), {
                  "class": this.ns.e("counter"),
                  "value": counterNum,
                  "counterMode": tab.counterMode
                }, null)]);
              }
            });
          }
          return null;
        }), this.moreItems.length > 0 && createVNode(resolveComponent("el-tab-pane"), {
          "label": "",
          "name": moreTab.tag
        }, {
          label: () => more
        })]
      })]
    });
  }
});

export { DRTabControl };
