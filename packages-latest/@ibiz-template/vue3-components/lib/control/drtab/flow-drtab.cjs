'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
var qxUtil = require('qx-util');
require('./flow-drtab.css');

"use strict";
const FlowDrtab = /* @__PURE__ */ vue.defineComponent({
  name: "FlowDrtab",
  props: {
    pagesState: {
      type: Array,
      default: () => []
    },
    drtabpages: {
      type: Array,
      default: () => []
    },
    context: {
      type: Object,
      default: () => {
      }
    },
    params: {
      type: Object,
      default: () => {
      }
    },
    counterData: {
      type: Array,
      default: () => {
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    activeTab: {
      type: Object,
      default: () => {
      }
    },
    controller: {
      type: Object,
      default: () => {
      }
    },
    semanticClass: {
      type: Function,
      required: true
    },
    semanticStyle: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("flow-drtab");
    const uuid = qxUtil.createUUID();
    const c = props.controller;
    const navtag = vue.ref("");
    const viewList = vue.ref([]);
    const navbarpos = vue.ref();
    const navBarWidth = vue.ref(200);
    const visibleViews = [];
    const scrollTop = vue.ref(0);
    const navbarRef = vue.ref();
    const completedViews = vue.ref(0);
    const tempTimer = vue.ref();
    const tempTarget = vue.ref();
    navbarpos.value = c.navbarpos;
    navBarWidth.value = c.navbarwidth;
    const allVisibleViews = vue.computed(() => {
      return props.pagesState.filter((item) => {
        const target = props.drtabpages.find((page) => {
          return page.id === item.tag;
        });
        return target && !item.hidden;
      }).length;
    });
    const allNavTags = vue.computed(() => {
      if (props.pagesState) {
        return props.pagesState.map((item) => {
          const target = props.drtabpages.find((page) => {
            return page.id === item.tag;
          });
          return "".concat(target == null ? void 0 : target.appViewId, "_").concat(item.tag);
        });
      }
      return [];
    });
    const scrollToTarget = () => {
      if (navtag.value) {
        const el = document.getElementById("".concat(navtag.value));
        if (el) {
          el.scrollIntoView();
        }
      }
    };
    const isFullyVisible = (element, container) => {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      return (
        // 元素顶部不超出容器顶部
        elementRect.top >= containerRect.top && // 元素底部不超出容器底部
        elementRect.bottom <= containerRect.bottom && // 元素左侧不超出容器左侧
        elementRect.left >= containerRect.left && // 元素右侧不超出容器右侧
        elementRect.right <= containerRect.right
      );
    };
    const scrollToTargetNavItem = () => {
      const anchor = document.getElementById("navbar_".concat(navtag.value));
      if (anchor && navbarRef.value && !isFullyVisible(anchor, navbarRef.value)) {
        anchor.scrollIntoView({
          behavior: "smooth"
        });
      }
    };
    const computeSelectItem = () => {
      if (visibleViews.length > 0) {
        navtag.value = visibleViews[0];
      }
      if (tempTarget.value) {
        clearTimeout(tempTimer.value);
        tempTimer.value = setTimeout(() => {
          navtag.value = tempTarget.value;
          scrollToTargetNavItem();
          tempTarget.value = "";
        }, 200);
      } else {
        scrollToTargetNavItem();
      }
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        var _a, _b;
        if (entry.isIntersecting) {
          if (entry.target && entry.target.id) {
            if (visibleViews.length > 0) {
              const curIndex = (_a = allNavTags.value) == null ? void 0 : _a.findIndex((tag) => tag === entry.target.id);
              const index = (_b = allNavTags.value) == null ? void 0 : _b.findIndex((tag) => tag === visibleViews[0]);
              if (curIndex < index) {
                visibleViews.unshift(entry.target.id);
              } else {
                visibleViews.push(entry.target.id);
              }
            } else {
              visibleViews.push(entry.target.id);
            }
          }
        } else if (entry.target && entry.target.id) {
          const index = visibleViews.indexOf(entry.target.id);
          if (index >= 0) {
            visibleViews.splice(index, 1);
          }
        }
      });
      visibleViews.sort((a, b) => {
        var _a, _b;
        const aIndex = (_a = allNavTags.value) == null ? void 0 : _a.findIndex((tag) => tag === a);
        const bIndex = (_b = allNavTags.value) == null ? void 0 : _b.findIndex((tag) => tag === b);
        return aIndex - bIndex;
      });
      if (allVisibleViews.value !== completedViews.value || !c.enableAnchor) {
        return;
      }
      computeSelectItem();
    });
    const onViewMounted = (item) => {
      const target = props.drtabpages.find((page) => {
        return page.id === item.tag;
      });
      completedViews.value += 1;
      if (completedViews.value === allVisibleViews.value && !navtag.value) {
        navtag.value = "".concat(target == null ? void 0 : target.appViewId, "_").concat(props.pagesState[0].tag);
      }
      const el = document.getElementById("".concat(target == null ? void 0 : target.appViewId, "_").concat(item.tag));
      if (el) {
        observer.observe(el);
      }
      if (completedViews.value === allVisibleViews.value && props.activeTab && props.activeTab.tag !== props.drtabpages[0].id) {
        vue.nextTick(() => {
          scrollToTarget();
        });
      }
    };
    vue.watch(() => props.activeTab, (newVal, oldVal) => {
      if (newVal && newVal.tag !== (oldVal == null ? void 0 : oldVal.tag)) {
        const target = props.drtabpages.find((page) => {
          return page.id === newVal.tag;
        });
        navtag.value = "".concat(target == null ? void 0 : target.appViewId, "_").concat(newVal.tag);
        if (newVal.tag !== props.drtabpages[0].id) {
          scrollToTarget();
        }
      }
    }, {
      deep: true,
      immediate: true
    });
    vue.watch(() => props.drtabpages, (newVal) => {
      if (newVal) {
        Promise.all(newVal.map(async (item) => {
          const view = await ibiz.hub.getAppView(item.appViewId);
          return {
            id: item.id,
            height: view == null ? void 0 : view.height,
            width: view == null ? void 0 : view.width
          };
        })).then((res) => {
          viewList.value = res;
        });
      }
    }, {
      deep: true,
      immediate: true
    });
    vue.onActivated(() => {
      vue.nextTick(() => {
        const el = document.getElementById("".concat(uuid));
        if (el) {
          el.scrollTop = scrollTop.value;
        }
      });
    });
    const calcStyle = (tag) => {
      const target = viewList.value.find((item) => {
        return item.id === tag;
      });
      if (target) {
        return {
          height: target.height ? "".concat(target.height, "px") : "100%",
          width: target.width ? "".concat(target.width, "px") : "100%"
        };
      }
    };
    const onClickBar = (item) => {
      const target = props.drtabpages.find((page) => {
        return page.id === item.tag;
      });
      tempTarget.value = "".concat(target == null ? void 0 : target.appViewId, "_").concat(item.tag);
      const el = document.getElementById("".concat(target == null ? void 0 : target.appViewId, "_").concat(item.tag));
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          container: "nearest"
        });
        if (visibleViews.includes(tempTarget.value)) {
          navtag.value = tempTarget.value;
        }
      }
    };
    const renderAnchorBar = () => {
      if (c.enableAnchor) {
        return vue.createVNode("div", {
          "class": [ns.e("anchor-bar"), ns.is(navbarpos.value, true), props.semanticClass("anchor")],
          "style": {
            width: "".concat(navBarWidth.value, "px"),
            ...props.semanticStyle("anchor")
          }
        }, [vue.createVNode("div", {
          "class": [ns.e("anchor-items"), ns.is(navbarpos.value)],
          "ref": (el) => {
            navbarRef.value = el;
          }
        }, [props.pagesState.map((item) => {
          const target = props.drtabpages.find((page) => {
            return page.id === item.tag;
          });
          if (!target || item.hidden) {
            return null;
          }
          return vue.createVNode("div", {
            "class": [ns.e("anchor-item"), props.semanticClass("anchor.item", {
              item
            }), ns.is("active", "".concat(target == null ? void 0 : target.appViewId, "_").concat(item.tag) === navtag.value)],
            "style": props.semanticStyle("anchor.item", {
              item
            }),
            "id": "navbar_".concat(target.appViewId, "_").concat(item.tag),
            "onClick": () => onClickBar(item)
          }, [item.caption]);
        })])]);
      }
    };
    const handleScroll = () => {
      const el = document.getElementById("".concat(uuid));
      if (el) {
        scrollTop.value = el.scrollTop;
      }
    };
    const onCollapseChange = (item) => {
      if (!c.enableCollapse)
        return;
      c.onCollapseChange(item.tag);
    };
    return {
      c,
      ns,
      uuid,
      navbarpos,
      calcStyle,
      navBarWidth,
      handleScroll,
      onViewMounted,
      renderAnchorBar,
      onCollapseChange
    };
  },
  render() {
    var _a, _b;
    const tabs = this.pagesState.map((item) => {
      const counterNum = item.counterId ? this.counterData[item.counterId] : void 0;
      const viewShell = vue.resolveComponent("IBizViewShell");
      const target = this.drtabpages.find((page) => {
        return page.id === item.tag;
      });
      if (!target || item.hidden)
        return null;
      return vue.createVNode("div", {
        "id": "".concat(target.appViewId, "_").concat(item.tag),
        "style": this.semanticStyle("item", {
          item
        }),
        "class": [this.ns.e("item"), this.ns.e("tab-item"), this.semanticClass("item", {
          item
        }), this.ns.is("enable-collapse", this.c.enableCollapse), this.ns.is("collapse", this.c.enableCollapse && !this.c.state.expandedKeys.includes(item.tag))]
      }, [this.showHeader && vue.createVNode("div", {
        "class": this.ns.em("tab-item", "label"),
        "onClick": () => this.onCollapseChange(item)
      }, [this.c.enableCollapse && vue.createVNode("div", {
        "class": [this.ns.e("icon"), this.ns.em("icon", "collapse")]
      }, [vue.createVNode("ion-icon", {
        "name": "chevron-down-outline"
      }, null)]), item.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [this.ns.be("label", "icon"), this.ns.em("item", "icon"), this.semanticClass("item.icon", {
          item
        })],
        "style": this.semanticStyle("item.icon", {
          item
        }),
        "icon": item.sysImage
      }, null), vue.createVNode("span", {
        "class": [this.ns.be("label", "text"), this.ns.em("item", "caption"), this.semanticClass("item.caption", {
          item
        })],
        "style": this.semanticStyle("item.caption", {
          item
        })
      }, [item.caption]), !ramda.isNil(counterNum) && vue.createVNode(vue.resolveComponent("iBizBadge"), {
        "class": [this.ns.e("counter"), this.ns.em("item", "counter"), this.semanticClass("item.counter", {
          item,
          counter: this.counterData
        })],
        "style": this.semanticStyle("item.counter", {
          item,
          counter: this.counterData
        }),
        "value": counterNum,
        "counterMode": item.counterMode
      }, null)]), vue.createVNode("div", {
        "class": [this.ns.em("item", "content"), this.ns.em("tab-item", "tab-view"), this.semanticClass("item.content", {
          item
        })],
        "style": {
          ...this.calcStyle(item.tag),
          ...this.semanticStyle("item.content", {
            item
          })
        }
      }, [vue.h(viewShell, {
        context: item.context || this.context,
        params: item.params || this.params,
        viewId: target.appViewId,
        onMounted: () => this.onViewMounted(item)
      })])]);
    });
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.navbarpos), this.ns.is("left", (_a = this.navbarpos) == null ? void 0 : _a.includes("left")), this.ns.is("right", (_b = this.navbarpos) == null ? void 0 : _b.includes("right")), this.ns.is("enable-anchor", this.c.enableAnchor)],
      "onScroll": this.handleScroll,
      "id": this.uuid
    }, [this.renderAnchorBar(), vue.createVNode("div", {
      "class": this.ns.e("container"),
      "style": {
        "--navbarwidth": "".concat(this.navBarWidth, "px")
      }
    }, [tabs])]);
  }
});

exports.FlowDrtab = FlowDrtab;
