import { isVNode, defineComponent, computed, ref, watch, createVNode, resolveComponent, withDirectives, resolveDirective } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { isNil } from 'lodash-es';
import { createUUID } from 'qx-util';
import { ListController, ControlVO } from '@ibiz-template/runtime';
import './list.css';
import { showTitle } from '@ibiz-template/core';
import '../../util/index.mjs';
import { usePagination } from '../../util/pagination/use-pagination.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ListControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new ListController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination(c);
    const isLodeMoreDisabled = computed(() => {
      if (c.model.enablePagingBar === true) {
        return true;
      }
      if (c.model.pagingMode !== 2) {
        return true;
      }
      return c.state.items.length >= c.state.total || c.state.isLoading || c.state.total <= c.state.size;
    });
    const isCollapse = ref(false);
    const showCollapseOrExpandIcon = computed(() => {
      return !c.model.enableGroup && (c.model.pagingMode === 2 || c.model.pagingMode === 3);
    });
    const infiniteScroll = ref();
    const infiniteScrollKey = ref(createUUID());
    watch(() => c.state.curPage, () => {
      var _a, _b;
      if (c.state.curPage === 1 && (c.model.pagingMode === 2 || c.model.pagingMode === 3)) {
        infiniteScrollKey.value = createUUID();
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
      c.state.items = props.data.map((item) => new ControlVO(item));
      c.afterLoad({}, c.state.items);
    };
    c.evt.on("onCreated", async () => {
      if (props.isSimple) {
        initSimpleData();
        c.state.isSimple = true;
        c.state.isLoaded = true;
      }
    });
    watch(() => props.data, () => {
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
      return createVNode(resolveComponent("iBizControlShell"), {
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
      return createVNode("div", {
        "class": itemClass,
        "key": item.srfkey,
        "onClick": () => c.onRowClick(item),
        "onDblclick": () => c.onDbRowClick(item)
      }, ["".concat(isNil(item.srfmajortext) ? "" : item.srfmajortext)]);
    };
    const renderGroupAction = (group) => {
      if (c.model.groupUIActionGroup && group.groupActionGroupState) {
        return createVNode(resolveComponent("iBizActionToolbar"), {
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
      return createVNode(resolveComponent("el-collapse-item"), {
        "class": ns.be("group-content", "item"),
        "name": group.key
      }, {
        title: () => {
          return createVNode("div", {
            "class": ns.be("group-content", "item-header")
          }, [createVNode("span", {
            "class": ns.be("group-content", "item-title")
          }, [showTitle(group.caption)]), createVNode("span", {
            "class": ns.be("group-content", "item-action")
          }, [renderGroupAction(group)])]);
        },
        default: () => group.children.length > 0 ? group.children.map((item) => {
          return panel ? renderPanelItem(item, panel) : renderDefaultItem(item);
        }) : createVNode("div", {
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
        return createVNode(resolveComponent("el-collapse"), {
          "modelValue": c.state.expandedKeys,
          "onUpdate:modelValue": ($event) => c.state.expandedKeys = $event,
          "class": [ns.b("group-content"), ns.b("content"), ns.is("show-underLine", c.model.controlStyle !== "EXTVIEW1")]
        }, {
          default: () => {
            var _a;
            return [(_a = c.state.groups) == null ? void 0 : _a.map((group) => {
              return createVNode("div", {
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
      return withDirectives(createVNode("div", {
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
        return createVNode("div", {
          "class": [ns.b("scroll-item")],
          "style": cardStyle
        }, [panel ? renderPanelItem(item, panel) : renderDefaultItem(item)]);
      })]), [[resolveDirective("infinite-scroll"), () => c.loadMore()]]);
    };
    const upIcon = () => {
      return createVNode("div", {
        "class": ns.e("collapse-expand-icon")
      }, [createVNode("i", {
        "class": "fa fa-angle-double-up",
        "title": ibiz.i18n.t("control.common.collapseData"),
        "onClick": onCollapseData,
        "aria-hidden": "true"
      }, null)]);
    };
    const downIcon = () => {
      return createVNode("div", {
        "class": ns.e("collapse-expand-icon")
      }, [createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.expandData"),
        "onClick": onExpandData,
        "aria-hidden": "true"
      }, null)]);
    };
    const loadMoreIcon = () => {
      return createVNode("div", {
        "class": ns.e("load-more")
      }, [createVNode("i", {
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
      return createVNode(resolveComponent("iBizToolbarControl"), {
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
      return createVNode("div", {
        "class": ns.b("batchtoolbar")
      }, [createVNode(resolveComponent("iBizToolbarControl"), {
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
      if (hasEmptyPanelRenderer(c)) {
        Object.assign(noDataSlots, {
          customRender: () => createVNode(IBizCustomRender, {
            "controller": c
          }, null)
        });
      }
      return isLoaded && createVNode(resolveComponent("iBizNoData"), {
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
      content = [this.c.state.items.length > 0 ? this.renderListContent() : this.renderNoData(), this.renderBatchToolBar(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? createVNode(resolveComponent("iBizPagination"), {
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
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "class": [this.ns.is("enable-page", !!this.c.state.enablePagingBar)],
        "controller": this.c
      }, {
        default: () => [content, this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null, this.renderCollapseExpandIcon()]
      })]
    });
  }
});

export { ListControl };
