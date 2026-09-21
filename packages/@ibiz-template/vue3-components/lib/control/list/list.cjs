'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
require('./list.css');
var core = require('@ibiz-template/core');
require('../../util/index.cjs');
var usePagination = require('../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ListControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizListControl",
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
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    data: {
      type: Array,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const c = vue3Util.useControlController((...args) => new runtime.ListController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    const isLodeMoreDisabled = vue.computed(() => {
      if (c.model.enablePagingBar === true) {
        return true;
      }
      if (c.model.pagingMode !== 2) {
        return true;
      }
      return c.state.items.length >= c.state.total || c.state.isLoading || c.state.total <= c.state.size;
    });
    const isCollapse = vue.ref(false);
    const showCollapseOrExpandIcon = vue.computed(() => {
      return !c.model.enableGroup && (c.model.pagingMode === 2 || c.model.pagingMode === 3);
    });
    const infiniteScroll = vue.ref();
    const infiniteScrollKey = vue.ref(qxUtil.createUUID());
    vue.watch(() => c.state.curPage, () => {
      var _a, _b;
      if (c.state.curPage === 1 && (c.model.pagingMode === 2 || c.model.pagingMode === 3)) {
        infiniteScrollKey.value = qxUtil.createUUID();
        const containerEl = (_b = (_a = infiniteScroll.value) == null ? void 0 : _a.ElInfiniteScroll) == null ? void 0 : _b.containerEl;
        if (containerEl) {
          containerEl.lastScrollTop = 0;
          containerEl.scrollTop = 0;
        }
      }
    });
    const initSimpleData = () => {
      if (!props.data) {
        return;
      }
      c.state.items = props.data.map((item) => new runtime.ControlVO(item));
      c.afterLoad({}, c.state.items);
    };
    c.evt.on("onCreated", async () => {
      if (props.isSimple) {
        initSimpleData();
        c.state.isSimple = true;
        c.state.isLoaded = true;
      }
    });
    vue.watch(() => props.data, () => {
      if (props.isSimple) {
        initSimpleData();
      }
    }, {
      deep: true
    });
    const renderPanelItem = (item, modelData) => {
      const {
        context,
        params
      } = c;
      const findIndex = c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      });
      const itemClass = [ns.b("item"), ns.is("active", findIndex !== -1)];
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "class": itemClass,
        "data": item,
        "modelData": modelData,
        "context": context,
        "params": params,
        "onClick": () => c.onRowClick(item),
        "onDblclick": () => c.onDbRowClick(item)
      }, null);
    };
    const renderDefaultItem = (item) => {
      const findIndex = c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      });
      const itemClass = [ns.b("item"), ns.is("active", findIndex !== -1)];
      return vue.createVNode("div", {
        "class": itemClass,
        "key": item.srfkey,
        "onClick": () => c.onRowClick(item),
        "onDblclick": () => c.onDbRowClick(item)
      }, ["".concat(lodashEs.isNil(item.srfmajortext) ? "" : item.srfmajortext)]);
    };
    const renderGroupAction = (group) => {
      if (c.model.groupUIActionGroup && group.groupActionGroupState) {
        return vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
          "class": ns.be("group-content", "header-actions"),
          "action-details": c.model.groupUIActionGroup.uiactionGroupDetails,
          "actions-state": group.groupActionGroupState,
          "onActionClick": (detail, event) => {
            c.onGroupToolbarClick(detail, event, group);
          }
        }, null);
      }
    };
    const renderGroup = (group) => {
      const panel = props.modelData.itemLayoutPanel;
      return vue.createVNode(vue.resolveComponent("el-collapse-item"), {
        "class": ns.be("group-content", "item"),
        "name": group.key
      }, {
        title: () => {
          return vue.createVNode("div", {
            "class": ns.be("group-content", "item-header")
          }, [vue.createVNode("span", {
            "class": ns.be("group-content", "item-title")
          }, [core.showTitle(group.caption)]), vue.createVNode("span", {
            "class": ns.be("group-content", "item-action")
          }, [renderGroupAction(group)])]);
        },
        default: () => group.children.length > 0 ? group.children.map((item) => {
          return panel ? renderPanelItem(item, panel) : renderDefaultItem(item);
        }) : vue.createVNode("div", {
          "class": ns.bem("group-content", "item", "empty")
        }, [ibiz.i18n.t("app.noData")])
      });
    };
    const scrollToTop = () => {
      var _a;
      (_a = infiniteScroll.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    c.evt.on("onScrollToTop", () => {
      scrollToTop();
    });
    const onCollapseData = () => {
      isCollapse.value = true;
      scrollToTop();
    };
    const onExpandData = () => {
      isCollapse.value = false;
    };
    const renderListContent = () => {
      if (c.model.enableGroup && !c.state.isSimple) {
        return vue.createVNode(vue.resolveComponent("el-collapse"), {
          "modelValue": c.state.expandedKeys,
          "onUpdate:modelValue": ($event) => c.state.expandedKeys = $event,
          "class": [ns.b("group-content"), ns.b("content"), ns.is("show-underLine", c.model.controlStyle !== "EXTVIEW1")]
        }, {
          default: () => {
            var _a;
            return [(_a = c.state.groups) == null ? void 0 : _a.map((group) => {
              return vue.createVNode("div", {
                "class": [ns.b("scroll-item")]
              }, [renderGroup(group)]);
            })];
          }
        });
      }
      const panel = props.modelData.itemLayoutPanel;
      let tempItems = c.state.items;
      if (isCollapse.value) {
        tempItems = c.state.items.slice(0, c.state.size);
      }
      return vue.withDirectives(vue.createVNode("div", {
        "class": [ns.b("scroll"), ns.b("content"), ns.is("show-underLine", c.model.controlStyle !== "EXTVIEW1")],
        "infinite-scroll-distance": 10,
        "infinite-scroll-disabled": isLodeMoreDisabled.value,
        "ref": "infiniteScroll",
        "key": infiniteScrollKey.value
      }, [tempItems.map((item) => {
        const cardStyle = ns.cssVarBlock({
          "item-bg-color": "".concat(item.bgcolor || ""),
          "text-color": "".concat(item.fontcolor || ""),
          "hover-bg-color": "".concat(item.hovercolor || ""),
          "active-bg-color": "".concat(item.activecolor || "")
        });
        return vue.createVNode("div", {
          "class": [ns.b("scroll-item")],
          "style": cardStyle
        }, [panel ? renderPanelItem(item, panel) : renderDefaultItem(item)]);
      })]), [[vue.resolveDirective("infinite-scroll"), () => c.loadMore()]]);
    };
    const upIcon = () => {
      return vue.createVNode("div", {
        "class": ns.e("collapse-expand-icon")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-up",
        "title": ibiz.i18n.t("control.common.collapseData"),
        "onClick": onCollapseData,
        "aria-hidden": "true"
      }, null)]);
    };
    const downIcon = () => {
      return vue.createVNode("div", {
        "class": ns.e("collapse-expand-icon")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.expandData"),
        "onClick": onExpandData,
        "aria-hidden": "true"
      }, null)]);
    };
    const loadMoreIcon = () => {
      return vue.createVNode("div", {
        "class": ns.e("load-more")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.loadMore"),
        "onClick": () => c.loadMore(),
        "aria-hidden": "true"
      }, null)]);
    };
    const renderQuickToolBar = () => {
      var _a;
      const ctrlModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_quicktoolbar");
      });
      if (!ctrlModel) {
        return;
      }
      return vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
        "modelData": ctrlModel,
        "context": c.context,
        "params": c.params
      }, null);
    };
    const renderBatchToolBar = () => {
      var _a;
      const ctrlModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!ctrlModel) {
        return;
      }
      return vue.createVNode("div", {
        "class": ns.b("batchtoolbar")
      }, [vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
        "modelData": ctrlModel,
        "context": c.context,
        "params": c.params
      }, null)]);
    };
    const renderNoData = () => {
      const {
        isLoaded
      } = c.state;
      if (!isLoaded) {
        return;
      }
      const noDataSlots = {
        default: () => renderQuickToolBar()
      };
      if (vue3Util.hasEmptyPanelRenderer(c)) {
        Object.assign(noDataSlots, {
          customRender: () => vue.createVNode(vue3Util.IBizCustomRender, {
            "controller": c
          }, null)
        });
      }
      return isLoaded && vue.createVNode(vue.resolveComponent("iBizNoData"), {
        "class": ns.b("content"),
        "text": c.model.emptyText,
        "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
        "hideNoDataImage": c.state.hideNoDataImage
      }, _isSlot(noDataSlots) ? noDataSlots : {
        default: () => [noDataSlots]
      });
    };
    const renderCollapseExpandIcon = () => {
      let icon = null;
      const loadMore = !(c.state.items.length >= c.state.total || c.state.total <= c.state.size);
      if (showCollapseOrExpandIcon.value) {
        if (c.model.pagingMode === 2) {
          if (isCollapse.value) {
            icon = downIcon();
          } else if (c.state.items.length > c.state.size) {
            icon = upIcon();
          }
        }
        if (c.model.pagingMode === 3) {
          if (isCollapse.value) {
            icon = downIcon();
          } else if (loadMore) {
            icon = loadMoreIcon();
          } else if (c.state.isCreated && c.state.items.length > c.state.size) {
            icon = upIcon();
          }
        }
      }
      return icon;
    };
    return {
      c,
      ns,
      infiniteScroll,
      renderListContent,
      renderNoData,
      renderBatchToolBar,
      onPageChange,
      onPageRefresh,
      onPageSizeChange,
      renderCollapseExpandIcon
    };
  },
  render() {
    let content = null;
    if (this.c.state.isCreated) {
      content = [this.c.state.items.length > 0 ? this.renderListContent() : this.renderNoData(), this.renderBatchToolBar(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? vue.createVNode(vue.resolveComponent("iBizPagination"), {
        "class": this.ns.e("pagination"),
        "total": this.c.state.total,
        "curPage": this.c.state.curPage,
        "size": this.c.state.size,
        "totalPages": this.c.state.totalPages,
        "onChange": this.onPageChange,
        "onPageSizeChange": this.onPageSizeChange,
        "onPageRefresh": this.onPageRefresh
      }, null) : null];
    }
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "class": [this.ns.is("enable-page", !!this.c.state.enablePagingBar)],
        "controller": this.c
      }, {
        default: () => [content, this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null, this.renderCollapseExpandIcon()]
      })]
    });
  }
});

exports.ListControl = ListControl;
