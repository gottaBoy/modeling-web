import { isVNode, defineComponent, computed, ref, watch, createVNode, resolveComponent, withDirectives, resolveDirective } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { DataViewControlController, ControlVO } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';
import './data-view.css';
import '../../util/index.mjs';
import { usePagination } from '../../util/pagination/use-pagination.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataViewControl = /* @__PURE__ */ defineComponent({
  name: "IBizDataViewControl",
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
    const c = useControlController((...args) => new DataViewControlController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const classNames = computed(() => {
      return [ns.is("enable-page", c.model.enablePagingBar === true)];
    });
    const isCollapse = ref(false);
    const isLodeMoreDisabled = computed(() => {
      if (c.model.enablePagingBar === true) {
        return true;
      }
      if (c.model.pagingMode !== 2) {
        return true;
      }
      return c.state.items.length >= c.state.total || c.state.isLoading || c.state.total <= c.state.size;
    });
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
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination(c);
    const onRowClick = (item, event) => {
      event.stopPropagation();
      return c.onRowClick(item);
    };
    const onDbRowClick = (item, event) => {
      event.stopPropagation();
      return c.onDbRowClick(item);
    };
    const renderPanelItem = (item, modelData) => {
      const {
        context,
        params
      } = c;
      return createVNode(resolveComponent("iBizControlShell"), {
        "data": item,
        "modelData": modelData,
        "context": context,
        "params": params,
        "onClick": (event) => onRowClick(item, event),
        "onDblclick": (event) => onDbRowClick(item, event)
      }, null);
    };
    const renderItemAction = (item) => {
      var _a;
      return createVNode(resolveComponent("iBizActionToolbar"), {
        "class": ns.bem("item-content", "bottom", "actions"),
        "action-details": (_a = c.getOptItemModel().deuiactionGroup) == null ? void 0 : _a.uiactionGroupDetails,
        "actions-state": c.getOptItemAction(item),
        "onActionClick": (detail, event) => c.onActionClick(detail, item, event)
      }, null);
    };
    const renderDefaultItem = (item) => {
      return createVNode("div", {
        "class": ns.b("item-content")
      }, [createVNode("div", {
        "class": ns.be("item-content", "top")
      }, [createVNode("div", {
        "class": ns.bem("item-content", "top", "title")
      }, [item.srfmajortext]), createVNode("div", {
        "class": ns.bem("item-content", "top", "description")
      }, [item.content])]), c.getOptItemModel() ? createVNode("div", {
        "class": ns.be("item-content", "bottom")
      }, [renderItemAction(item)]) : null]);
    };
    const renderCard = (item) => {
      const findIndex = c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      });
      let showActive = findIndex !== -1;
      if (c.view.model.viewType === "DEDATAVIEW" && c.state.mdctrlActiveMode === 1 && c.state.singleSelect === true) {
        showActive = false;
      }
      const cardClass = [ns.b("item"), ns.is("active", showActive)];
      const cardStyle = {};
      if (c.model.cardWidth) {
        Object.assign(cardStyle, {
          width: "".concat(c.model.cardWidth, "px")
        });
      }
      if (c.model.cardHeight) {
        Object.assign(cardStyle, {
          height: "".concat(c.model.cardHeight, "px")
        });
      }
      const itemStyle = ns.cssVarBlock({
        "item-bg-color": "".concat(item.bgcolor || ""),
        "text-color": "".concat(item.fontcolor || ""),
        "hover-bg-color": "".concat(item.hovercolor || ""),
        "active-bg-color": "".concat(item.activecolor || "")
      });
      const panel = props.modelData.itemLayoutPanel;
      return createVNode(resolveComponent("el-card"), {
        "shadow": "hover",
        "class": cardClass,
        "style": itemStyle,
        "body-style": cardStyle,
        "onClick": (event) => onRowClick(item, event),
        "onDblclick": (event) => onDbRowClick(item, event)
      }, {
        default: () => [panel ? renderPanelItem(item, panel) : renderDefaultItem(item)]
      });
    };
    const renderGroup = (group) => {
      const {
        cardColXS,
        cardColSM,
        cardColMD,
        cardColLG,
        groupSysCss
      } = c.model;
      return createVNode("div", {
        "class": [ns.be("group-content", "item"), groupSysCss == null ? void 0 : groupSysCss.cssName, ns.is("collapse", c.state.collapseKeys.includes(group.key.toString()))]
      }, [createVNode("div", {
        "class": ns.be("group-content", "item-header")
      }, [createVNode("span", {
        "class": ns.be("group-content", "item-title")
      }, [group.caption]), createVNode("span", {
        "class": ns.be("group-content", "item-action")
      }, [c.model.groupUIActionGroup && group.groupActionGroupState && createVNode(resolveComponent("iBizActionToolbar"), {
        "class": ns.be("group-content", "header-actions"),
        "action-details": c.model.groupUIActionGroup.uiactionGroupDetails,
        "actions-state": group.groupActionGroupState,
        "onActionClick": (detail, event) => {
          c.onGroupToolbarClick(detail, event, group);
        }
      }, null)])]), cardColXS || cardColSM || cardColMD || cardColLG ? createVNode(resolveComponent("el-row"), {
        "class": ns.be("group-content", "item-row")
      }, {
        default: () => [group.children.length > 0 ? group.children.map((child) => {
          let _slot;
          return createVNode(resolveComponent("el-col"), {
            "xs": cardColXS,
            "sm": cardColSM,
            "md": cardColMD,
            "lg": cardColLG,
            "class": ns.be("group-content", "item-col")
          }, _isSlot(_slot = renderCard(child)) ? _slot : {
            default: () => [_slot]
          });
        }) : createVNode("div", {
          "class": ns.bem("group-content", "item", "empty")
        }, [ibiz.i18n.t("app.noData")])]
      }) : createVNode("div", {
        "class": ns.be("group-content", "item-content")
      }, [group.children.length > 0 ? group.children.map((child) => {
        return renderCard(child);
      }) : createVNode("div", {
        "class": ns.bem("group-content", "item", "empty")
      }, [ibiz.i18n.t("app.noData")])])]);
    };
    const renderDataViewContent = () => {
      const {
        cardColXS,
        cardColSM,
        cardColMD,
        cardColLG
      } = c.model;
      if (c.model.enableGroup) {
        return createVNode("div", {
          "class": ns.b("group-content")
        }, [c.state.groups.map((group) => {
          return createVNode("div", {
            "class": [ns.b("scroll-item")]
          }, [renderGroup(group)]);
        })]);
      }
      let tempItems = c.state.items;
      if (isCollapse.value) {
        tempItems = c.state.items.slice(0, c.state.size);
      }
      if (cardColXS || cardColSM || cardColMD || cardColLG) {
        let _slot3;
        return createVNode(resolveComponent("el-row"), {
          "class": [ns.b("item-row")]
        }, _isSlot(_slot3 = tempItems.map((item) => {
          let _slot2;
          return createVNode(resolveComponent("el-col"), {
            "xs": cardColXS,
            "sm": cardColSM,
            "md": cardColMD,
            "lg": cardColLG,
            "class": [ns.b("item-col")]
          }, _isSlot(_slot2 = renderCard(item)) ? _slot2 : {
            default: () => [_slot2]
          });
        })) ? _slot3 : {
          default: () => [_slot3]
        });
      }
      return tempItems.map((item) => {
        return createVNode("div", {
          "class": [ns.b("scroll-item")]
        }, [renderCard(item)]);
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
    const renderHasData = () => {
      return withDirectives(createVNode("div", {
        "class": [ns.b("scroll"), ns.e("content")],
        "infinite-scroll-distance": 10,
        "infinite-scroll-disabled": isLodeMoreDisabled.value,
        "ref": "infiniteScroll",
        "key": infiniteScrollKey.value
      }, [renderDataViewContent()]), [[resolveDirective("infinite-scroll"), () => c.loadMore()]]);
    };
    const renderNoData = () => {
      const {
        isLoaded
      } = c.state;
      if (!isLoaded) {
        return;
      }
      const noDataSlots = {};
      if (hasEmptyPanelRenderer(c)) {
        Object.assign(noDataSlots, {
          customRender: () => createVNode(IBizCustomRender, {
            "controller": c
          }, null)
        });
      }
      return createVNode(resolveComponent("iBizNoData"), {
        "class": ns.e("content"),
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
      classNames,
      infiniteScroll,
      renderHasData,
      renderNoData,
      onPageChange,
      onPageRefresh,
      onPageSizeChange,
      renderCollapseExpandIcon
    };
  },
  render() {
    const {
      items,
      isCreated
    } = this.c.state;
    let content = null;
    if (isCreated) {
      content = [this.c.state.noSort ? null : createVNode(resolveComponent("iBizSortBar"), {
        "onSortChange": (item, order) => {
          this.c.setSort(item.key, order);
          this.c.load({
            isInitialLoad: this.c.model.pagingMode === 2 || this.c.model.pagingMode === 3
          });
        },
        "sortItems": this.c.state.sortItems
      }, null), items.length > 0 ? this.renderHasData() : this.renderNoData(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? createVNode(resolveComponent("iBizPagination"), {
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

export { DataViewControl };
