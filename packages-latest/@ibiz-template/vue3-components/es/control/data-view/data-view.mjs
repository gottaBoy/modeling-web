import { isVNode, defineComponent, createVNode, resolveComponent, ref, computed, watch, withDirectives, resolveDirective, Fragment, h } from 'vue';
import { useControlController, useNamespace, useControlPopoverzIndex, useSemanticNode, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { DataViewControlController, ControlVO, getControl } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';
import draggable from 'vuedraggable';
import '../../util/index.mjs';
import './data-view.css';
import { usePagination } from '../../util/pagination/use-pagination.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataViewControl = /* @__PURE__ */ defineComponent({
  name: "IBizDataViewControl",
  components: {
    draggable
  },
  props: {
    /**
     * @description 数据视图（卡片）模型数据
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
     * @description 部件行数据默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description 是否单选
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 简单模式下传入的数据
     */
    data: {
      type: Array,
      required: false
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const c = useControlController((...args) => new DataViewControlController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    useControlPopoverzIndex(c);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
    const cardStyle = computed(() => {
      var _a, _b;
      return ((_b = (_a = c.model.controlParam) == null ? void 0 : _a.ctrlParams) == null ? void 0 : _b.CARDSTYLE) || c.controlParams.cardstyle || "default";
    });
    const showCollapseOrExpandIcon = computed(() => {
      return !c.state.enableGroup && (c.model.pagingMode === 2 || c.model.pagingMode === 3);
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
    const isSelected = (item) => {
      let selected = !!c.state.selectedData.find((data) => data.srfkey === item.srfkey);
      if (c.view.model.viewType === "DEDATAVIEW" && c.state.mdctrlActiveMode === 1 && c.state.singleSelect === true)
        selected = false;
      return selected;
    };
    const toggleSelection = (item) => {
      const selected = c.state.selectedData;
      const index = selected.findIndex((data) => data.srfkey === item.srfkey);
      if (index === -1) {
        selected.push(item);
      } else {
        selected.splice(index, 1);
      }
      c.setSelection(selected);
    };
    watch(() => props.data, () => {
      if (props.isSimple) {
        initSimpleData();
      }
    }, {
      deep: true
    });
    const {
      pageSemantic,
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
    let cacheInfo = null;
    const onDraggableChange = (evt, groupKey) => {
      if (evt.moved) {
        c.onDragChange({
          from: groupKey,
          to: groupKey,
          fromIndex: evt.moved.oldIndex,
          toIndex: evt.moved.newIndex
        });
      }
      if (evt.added) {
        cacheInfo = {
          to: groupKey,
          toIndex: evt.added.newIndex
        };
      }
      if (evt.removed) {
        if (cacheInfo) {
          cacheInfo.from = groupKey;
          cacheInfo.fromIndex = evt.removed.oldIndex;
          c.onDragChange(cacheInfo);
        }
        cacheInfo = null;
      }
    };
    const renderNewCard = (group) => {
      return createVNode(resolveComponent("el-card"), {
        "shadow": "hover",
        "class": [ns.b("item"), ns.be("item", "new"), semanticClass("item.new", {
          group
        })],
        "title": ibiz.i18n.t("app.newlyBuild"),
        "body-style": {
          width: c.model.cardWidth ? "".concat(c.model.cardWidth, "px") : "auto",
          height: c.model.cardHeight ? "".concat(c.model.cardHeight, "px") : "auto",
          ...semanticStyle("item.new", {
            group
          })
        },
        "onClick": (event) => {
          c.onClickNew(event, group == null ? void 0 : group.key);
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "add-outline"
        }, null)]
      });
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
      return createVNode(resolveComponent("iBizActionToolbar"), {
        "class": [semanticClass("item.action", {
          item
        }), ns.bem("item-content", "bottom", "actions")],
        "style": semanticStyle("item.action", {
          item
        }),
        "action-details": c.getOptItemModel(),
        "actions-state": c.state.uaState[item.srfkey],
        "zIndex": c.state.zIndex,
        "onActionClick": (detail, event) => c.onActionClick(detail, item, event)
      }, null);
    };
    const renderDefaultItem = (item) => {
      const actionModel = c.getOptItemModel();
      return createVNode("div", {
        "class": ns.b("item-content")
      }, [createVNode("div", {
        "class": ns.be("item-content", "top")
      }, [createVNode("div", {
        "class": ns.bem("item-content", "top", "title")
      }, [item.srfmajortext]), createVNode("div", {
        "class": ns.bem("item-content", "top", "description")
      }, [item.content])]), actionModel.length ? createVNode("div", {
        "class": ns.be("item-content", "bottom")
      }, [renderItemAction(item)]) : null]);
    };
    const renderCard = (item) => {
      const itemStyle = ns.cssVarBlock({
        "item-bg-color": "".concat(item.bgcolor || ""),
        "text-color": "".concat(item.fontcolor || ""),
        "hover-bg-color": "".concat(item.hovercolor || ""),
        "active-bg-color": "".concat(item.activecolor || "")
      });
      const panel = props.modelData.itemLayoutPanel;
      return createVNode(resolveComponent("el-card"), {
        "shadow": "hover",
        "class": [ns.b("item"), ns.is("active", isSelected(item))],
        "style": itemStyle,
        "body-style": {
          width: c.model.cardWidth ? "".concat(c.model.cardWidth, "px") : "auto",
          height: c.model.cardHeight ? "".concat(c.model.cardHeight, "px") : "auto"
        },
        "onClick": (event) => onRowClick(item, event),
        "onDblclick": (event) => onDbRowClick(item, event)
      }, {
        default: () => [createVNode("div", {
          "class": ns.be("item", "content")
        }, [c.state.draggable && !c.state.readonly && createVNode("svg", {
          "viewBox": "0 0 16 16",
          "xmlns": "http://www.w3.org/2000/svg",
          "height": "1em",
          "width": "1em",
          "class": ns.e("drag-icon"),
          "preserveAspectRatio": "xMidYMid meet",
          "focusable": "false"
        }, [createVNode("g", {
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [createVNode("g", {
          "transform": "translate(5 1)",
          "fill-rule": "nonzero"
        }, [createVNode("path", {
          "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        }, null)])])]), cardStyle.value === "style2" && !c.state.singleSelect && createVNode(resolveComponent("el-checkbox"), {
          "size": "large",
          "modelValue": isSelected(item),
          "onChange": () => toggleSelection(item),
          "style": semanticStyle("item.checkbox", {
            item
          }),
          "onClick": (e) => e.stopPropagation(),
          "class": [ns.bem("item", "content", "checkbox"), semanticClass("item.checkbox", {
            item
          })]
        }, null), panel ? renderPanelItem(item, panel) : renderDefaultItem(item)])]
      });
    };
    const renderCardLayout = (items, group, disabled = true) => {
      const {
        cardColXS,
        cardColSM,
        cardColMD,
        cardColLG
      } = c.model;
      if (cardColXS || cardColSM || cardColMD || cardColLG)
        return createVNode(draggable, {
          "itemKey": "srfkey",
          "modelValue": items,
          "group": c.model.id,
          "handle": ".".concat(ns.e("drag-icon")),
          "class": ["el-row", ns.e("layout-row")],
          "disabled": disabled || c.state.updating || c.state.readonly,
          "onChange": (evt) => onDraggableChange(evt, group == null ? void 0 : group.key)
        }, {
          item: ({
            element
          }) => createVNode(resolveComponent("el-col"), {
            "xs": cardColXS,
            "sm": cardColSM,
            "md": cardColMD,
            "lg": cardColLG,
            "class": ns.e("layout-col")
          }, {
            default: () => [createVNode("div", {
              "style": semanticStyle("item", {
                item: element
              }),
              "class": [ns.b("scroll-item"), semanticClass("item", {
                item: element
              })]
            }, [renderCard(element)])]
          }),
          footer: () => {
            if (c.enableNew && !c.state.readonly)
              return createVNode(resolveComponent("el-col"), {
                "xs": cardColXS,
                "sm": cardColSM,
                "md": cardColMD,
                "lg": cardColLG,
                "class": ns.e("layout-col")
              }, {
                default: () => [createVNode("div", {
                  "class": ns.b("scroll-item")
                }, [renderNewCard(group)])]
              });
          }
        });
      return createVNode(draggable, {
        "itemKey": "srfkey",
        "modelValue": items,
        "group": c.model.id,
        "class": [ns.e("layout-flex"), ns.em("layout-flex", "draggable")],
        "disabled": disabled || c.state.updating || c.state.readonly,
        "onChange": (evt) => onDraggableChange(evt, group == null ? void 0 : group.key)
      }, {
        item: ({
          element
        }) => createVNode("div", {
          "style": semanticStyle("item", {
            item: element
          }),
          "class": [ns.b("scroll-item"), semanticClass("item", {
            item: element
          })]
        }, [renderCard(element)]),
        footer: () => {
          if (c.enableNew && !c.state.readonly)
            return createVNode("div", {
              "class": ns.b("scroll-item")
            }, [renderNewCard(group)]);
        }
      });
    };
    const renderGroup = (group) => {
      const {
        groupSysCss
      } = c.model;
      return createVNode("div", {
        "class": [semanticClass("group", {
          group
        }), ns.be("group-content", "item"), groupSysCss == null ? void 0 : groupSysCss.cssName, ns.is("collapse", c.state.collapseKeys.includes(group.key.toString()))],
        "style": semanticStyle("group", {
          group
        })
      }, [createVNode("div", {
        "class": ns.be("group-content", "item-header")
      }, [createVNode("span", {
        "class": [semanticClass("group.title", {
          group
        }), ns.be("group-content", "item-title")],
        "style": semanticStyle("group.title", {
          group
        })
      }, [group.caption]), createVNode("span", {
        "class": ns.be("group-content", "item-action")
      }, [c.model.groupUIActionGroup && group.groupActionGroupState && createVNode(resolveComponent("iBizActionToolbar"), {
        "zIndex": c.state.zIndex,
        "style": semanticStyle("group.action", {
          group
        }),
        "class": [ns.be("group-content", "header-actions"), semanticClass("group.action", {
          group
        })],
        "action-details": c.model.groupUIActionGroup.uiactionGroupDetails,
        "actions-state": group.groupActionGroupState,
        "onActionClick": (detail, event) => {
          c.onGroupToolbarClick(detail, event, group);
        }
      }, null)])]), group.children.length > 0 ? renderCardLayout(group.children, group, !c.state.draggable) : createVNode("div", {
        "class": ns.bem("group-content", "item", "empty")
      }, [ibiz.i18n.t("app.noData")])]);
    };
    const renderDataViewContent = () => {
      if (c.state.enableGroup) {
        return createVNode("div", {
          "class": ns.b("group-content")
        }, [c.state.groups.map((group) => {
          return renderGroup(group);
        })]);
      }
      return renderCardLayout(isCollapse.value ? c.state.items.slice(0, c.state.size) : c.state.items, void 0, !c.enableEditOrder);
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
        "class": [semanticClass("more"), ns.em("content", "icon"), ns.e("collapse-expand-icon")],
        "style": semanticStyle("more")
      }, [createVNode("i", {
        "class": "fa fa-angle-double-up",
        "title": ibiz.i18n.t("control.common.collapseData"),
        "onClick": onCollapseData,
        "aria-hidden": "true"
      }, null)]);
    };
    const downIcon = () => {
      return createVNode("div", {
        "class": [semanticClass("more"), ns.em("content", "icon"), ns.e("collapse-expand-icon")],
        "style": semanticStyle("more")
      }, [createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.expandData"),
        "onClick": onExpandData,
        "aria-hidden": "true"
      }, null)]);
    };
    const loadMoreIcon = () => {
      return createVNode("div", {
        "class": [semanticClass("more"), ns.em("content", "icon"), ns.e("load-more")],
        "style": semanticStyle("more")
      }, [createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.loadMore"),
        "onClick": () => c.loadMore(),
        "aria-hidden": "true"
      }, null)]);
    };
    const renderHasData = () => {
      return withDirectives(createVNode("div", {
        "ref": "infiniteScroll",
        "style": semanticStyle("content"),
        "class": [semanticClass("content"), ns.e("content")],
        "infinite-scroll-distance": 10,
        "infinite-scroll-disabled": isLodeMoreDisabled.value,
        "key": infiniteScrollKey.value
      }, [renderDataViewContent()]), [[resolveDirective("infinite-scroll"), () => c.loadMore()]]);
    };
    const renderBatchToolBar = () => {
      var _a;
      const ctrlModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!ctrlModel)
        return;
      return createVNode("div", {
        "class": [ns.e("batchtoolbar"), semanticClass("batchtoolbar"), ns.is("show", c.showBatchToolbar)],
        "style": semanticStyle("batchtoolbar")
      }, [createVNode(resolveComponent("iBizToolbarControl"), {
        "modelData": ctrlModel,
        "context": c.context,
        "params": c.params
      }, null)]);
    };
    const renderNoData = () => {
      var _a;
      const {
        isLoaded
      } = c.state;
      if (!isLoaded)
        return;
      const ctrlModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_quicktoolbar");
      });
      if (ctrlModel) {
        return createVNode(resolveComponent("iBizToolbarControl"), {
          "modelData": ctrlModel,
          "context": c.context,
          "params": c.params,
          "class": [ns.e("quicktoolbar"), semanticClass("quicktoolbar")],
          "style": semanticStyle("quicktoolbar")
        }, null);
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
    const ITEM_HEIGHT = 24;
    const calcSkeletonRows = () => {
      const {
        cardHeight
      } = c.model;
      if (cardHeight) {
        return Math.max(1, Math.floor((cardHeight - 32 + 4) / ITEM_HEIGHT));
      }
      return 2;
    };
    const renderSkeletonItem = () => {
      const rows = calcSkeletonRows();
      return createVNode(resolveComponent("el-card"), {
        "class": [ns.b("item"), ns.e("skeleton-item")],
        "body-style": {
          width: c.model.cardWidth ? "".concat(c.model.cardWidth, "px") : "auto",
          height: c.model.cardHeight ? "".concat(c.model.cardHeight, "px") : "auto",
          overflow: "hidden"
        }
      }, {
        default: () => [createVNode(resolveComponent("el-skeleton"), {
          "animated": true,
          "style": "min-width: 30px;"
        }, {
          template: () => createVNode(Fragment, null, [Array.from({
            length: rows
          }, () => createVNode(resolveComponent("el-skeleton-item"), {
            "variant": "rect"
          }, null))])
        })]
      });
    };
    const renderSkeletonCardLayout = (count) => {
      const {
        cardColXS,
        cardColSM,
        cardColMD,
        cardColLG
      } = c.model;
      if (cardColXS || cardColSM || cardColMD || cardColLG) {
        return createVNode("div", {
          "class": ["el-row", ns.e("layout-row")]
        }, [Array.from({
          length: count
        }, () => createVNode(resolveComponent("el-col"), {
          "xs": cardColXS,
          "sm": cardColSM,
          "md": cardColMD,
          "lg": cardColLG,
          "class": ns.e("layout-col")
        }, {
          default: () => [createVNode("div", {
            "class": ns.b("scroll-item")
          }, [renderSkeletonItem()])]
        }))]);
      }
      return createVNode("div", {
        "class": ns.e("layout-flex")
      }, [Array.from({
        length: count
      }, () => createVNode("div", {
        "class": ns.b("scroll-item")
      }, [renderSkeletonItem()]))]);
    };
    const renderGroupSkeleton = () => {
      return createVNode("div", {
        "class": ns.b("skeleton")
      }, [Array.from({
        length: 3
      }, () => createVNode("div", {
        "class": ns.b("skeleton-group")
      }, [createVNode("div", {
        "class": ns.be("skeleton-group", "header")
      }, [createVNode(resolveComponent("el-skeleton"), {
        "animated": true,
        "rows": 1
      }, {
        template: () => createVNode(resolveComponent("el-skeleton-item"), {
          "variant": "rect",
          "style": "width: 15%"
        }, null)
      })]), createVNode("div", {
        "class": [ns.be("skeleton", "content"), ns.be("skeleton-group", "content")]
      }, [renderSkeletonCardLayout(3)])]))]);
    };
    const renderSkeleton = () => {
      if (c.state.enableGroup) {
        return renderGroupSkeleton();
      }
      const count = c.state.size || 6;
      return createVNode("div", {
        "class": ns.b("skeleton")
      }, [createVNode("div", {
        "class": ns.be("skeleton", "content")
      }, [renderSkeletonCardLayout(Math.min(count, 20))])]);
    };
    const renderNavIcon = () => {
      const {
        enableNavView,
        showNavIcon,
        showNavView
      } = c.state;
      if (enableNavView && showNavIcon)
        return !showNavView ? createVNode("ion-icon", {
          "name": "eye-outline",
          "class": ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "onClick": () => c.onShowNavViewChange()
        }, null) : createVNode("ion-icon", {
          "name": "eye-off-outline",
          "class": ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "onClick": () => c.onShowNavViewChange()
        }, null);
    };
    const renderSortBar = () => {
      if (!c.state.noSort && c.state.sortItems.length)
        return createVNode(resolveComponent("iBizSortBar"), {
          "class": semanticClass("sort"),
          "style": semanticStyle("sort"),
          "semantic": {
            class: semanticClass("sort.item"),
            style: semanticStyle("sort.item")
          },
          "onSortChange": (item, order) => {
            c.setSort(item.key, order);
            c.load({
              isInitialLoad: c.model.pagingMode === 2 || c.model.pagingMode === 3
            });
          },
          "sortItems": c.state.sortItems
        }, null);
    };
    const renderContent = () => {
      return [!c.state.isLoaded ? renderSkeleton() : c.state.items.length > 0 ? renderHasData() : renderNoData(), renderBatchToolBar(), renderNavIcon(), renderCollapseExpandIcon()];
    };
    const renderPagingBar = () => {
      if (c.state.enablePagingBar && c.model.pagingMode === 1)
        return createVNode(resolveComponent("iBizPagination"), {
          "semantic": pageSemantic,
          "mode": c.paginationMode,
          "class": [ns.e("pagination"), semanticClass("pagination")],
          "style": semanticStyle("pagination"),
          "total": c.state.total,
          "curPage": c.state.curPage,
          "size": c.state.size,
          "totalPages": c.state.totalPages,
          "onChange": onPageChange,
          "onPageSizeChange": onPageSizeChange,
          "onPageRefresh": onPageRefresh
        }, null);
    };
    const renderSearchBar = () => {
      const searchbar = getControl(c.view.model, "searchbar");
      if (!searchbar)
        return;
      const id = searchbar.name || searchbar.id;
      const provider = c.view.providers[id];
      return h(resolveComponent((provider == null ? void 0 : provider.component) || "IBizControlShell"), {
        class: [ns.e("searchbar"), semanticClass("searchbar")],
        style: semanticStyle(searchbar),
        context: c.view.context,
        params: c.view.params,
        modelData: searchbar,
        ...c.view.slotProps[id] || {},
        provider
      });
    };
    const renderDefaultStyle = () => {
      if (c.state.isCreated)
        return [renderSortBar(), ...renderContent(), renderPagingBar()];
    };
    const renderUserStyle = () => {
      return {
        sortbar: () => renderSortBar(),
        searchbar: () => renderSearchBar(),
        dataview: () => createVNode("div", {
          "class": ns.e("layout-content")
        }, [renderContent()]),
        pagingbar: () => renderPagingBar()
      };
    };
    const renderLayoutByStyle = () => {
      if (cardStyle.value === "userstyle")
        return renderUserStyle();
      return renderDefaultStyle();
    };
    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      infiniteScroll,
      renderLayoutByStyle
    };
  },
  render() {
    let _slot;
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "class": [this.semanticClass("root"), this.ns.is("enable-page", !!this.c.state.enablePagingBar)],
        "style": this.semanticStyle("root"),
        "controller": this.c
      }, _isSlot(_slot = this.renderLayoutByStyle()) ? _slot : {
        default: () => [_slot]
      })]
    });
  }
});

export { DataViewControl };
