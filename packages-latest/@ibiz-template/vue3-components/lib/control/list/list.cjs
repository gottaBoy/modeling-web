'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
var runtime = require('@ibiz-template/runtime');
var draggable = require('vuedraggable');
var core = require('@ibiz-template/core');
require('../../util/index.cjs');
require('./list.css');
var usePagination = require('../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ListControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizListControl",
  components: {
    draggable
  },
  props: {
    /**
     * @description 列表模型数据
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
    const c = vue3Util.useControlController((...args) => new runtime.ListController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    vue3Util.useControlPopoverzIndex(c);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      pageSemantic,
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    const infiniteScroll = vue.ref();
    const reverseScroll = c.model.controlStyle === "EXTVIEW3";
    const disabledLodeMore = vue.computed(() => {
      if (c.model.enablePagingBar === true)
        return true;
      if (c.model.pagingMode !== 2)
        return true;
      return c.state.items.length >= c.state.total || c.state.isLoading || c.state.total <= c.state.size;
    });
    const isCollapse = vue.ref(false);
    const showCollapseOrExpandIcon = vue.computed(() => {
      return !c.state.enableGroup && (c.model.pagingMode === 2 || c.model.pagingMode === 3);
    });
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
    const scrollToTop = () => {
      var _a;
      (_a = infiniteScroll.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    const handleScrollLoad = async () => {
      if (!infiniteScroll.value || disabledLodeMore.value)
        return;
      const scrollTop = infiniteScroll.value.scrollTop;
      const scrollHeight = infiniteScroll.value.scrollHeight;
      const clientHeight = infiniteScroll.value.clientHeight;
      if (!reverseScroll && scrollHeight - scrollTop - clientHeight < 10) {
        await c.loadMore();
      } else if (reverseScroll && scrollTop < 10) {
        await c.loadMore();
        const newScrollHeight = infiniteScroll.value.scrollHeight;
        infiniteScroll.value.scrollTop = scrollTop + (newScrollHeight - scrollHeight);
      }
    };
    c.evt.on("onLoadSuccess", (evt) => {
      if (evt.isInitialLoad && reverseScroll) {
        setTimeout(() => {
          if (!infiniteScroll.value)
            return;
          const scrollHeight = infiniteScroll.value.scrollHeight;
          const clientHeight = infiniteScroll.value.clientHeight;
          infiniteScroll.value.scrollTop = scrollHeight + clientHeight;
        }, 100);
      }
    });
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
    const isSelected = (item) => {
      let selected = !!c.state.selectedData.find((data) => data.srfkey === item.srfkey);
      if (c.view.model.viewType === "DELISTVIEW" && c.state.mdctrlActiveMode === 1 && c.state.singleSelect === true)
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
    vue.watch(() => props.data, () => {
      if (props.isSimple)
        initSimpleData();
    }, {
      deep: true
    });
    const renderPanelItem = (item, modelData) => {
      const {
        context,
        params
      } = c;
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": item,
        "params": params,
        "context": context,
        "class": ns.b("item"),
        "modelData": modelData,
        "onClick": () => c.onRowClick(item),
        "onDblclick": () => c.onDbRowClick(item)
      }, null);
    };
    const renderItemAction = (item) => {
      return vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "class": [semanticClass("item.action", {
          item
        }), ns.bem("item", "right", "actions")],
        "style": semanticStyle("item.action", {
          item
        }),
        "action-details": c.getOptItemModel(),
        "actions-state": c.state.uaState[item.srfkey],
        "zIndex": c.state.zIndex,
        "onActionClick": (detail, event) => c.onActionClick(detail, item, event)
      }, null);
    };
    const renderNewItem = (group) => {
      return vue.createVNode("div", {
        "title": ibiz.i18n.t("app.newlyBuild"),
        "style": semanticStyle("item.new", {
          group
        }),
        "class": [ns.b("item"), ns.be("item", "new"), semanticClass("item.new", {
          group
        })],
        "onClick": (event) => {
          c.onClickNew(event, group == null ? void 0 : group.key);
        }
      }, [vue.createVNode("ion-icon", {
        "name": "add-outline"
      }, null)]);
    };
    const renderDefaultItem = (item) => {
      const actionModel = c.getOptItemModel();
      return vue.createVNode("div", {
        "key": item.srfkey,
        "class": ns.b("item"),
        "onClick": () => c.onRowClick(item),
        "onDblclick": () => c.onDbRowClick(item)
      }, [vue.createVNode("span", {
        "class": ns.be("item", "caption")
      }, ["".concat(lodashEs.isNil(item.srfmajortext) ? "" : item.srfmajortext)]), actionModel.length ? vue.createVNode("div", {
        "class": ns.be("item", "right")
      }, [renderItemAction(item)]) : null]);
    };
    const renderGroupAction = (group) => {
      if (c.model.groupUIActionGroup && group.groupActionGroupState) {
        return vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
          "zIndex": c.state.zIndex,
          "style": semanticStyle("group.action", {
            group
          }),
          "class": [semanticClass("group.action", {
            group
          }), ns.be("group-content", "header-actions")],
          "action-details": c.model.groupUIActionGroup.uiactionGroupDetails,
          "actions-state": group.groupActionGroupState,
          "onActionClick": (detail, event) => {
            c.onGroupToolbarClick(detail, event, group);
          }
        }, null);
      }
    };
    const renderRowDetail = (item) => {
      const {
        navAppViewId,
        navViewHeight
      } = c.model;
      const {
        context,
        params
      } = c.calcNavParams(item);
      const style = {
        height: navViewHeight ? "".concat(navViewHeight, "px") : "auto"
      };
      return vue.createVNode(vue.resolveComponent("iBizViewShell"), {
        "style": style,
        "params": params,
        "context": context,
        "viewId": navAppViewId,
        "class": ns.be("row-detail", "view")
      }, null);
    };
    const renderItem = (item) => {
      const cardStyle = ns.cssVarBlock({
        "item-bg-color": "".concat(item.bgcolor || ""),
        "text-color": "".concat(item.fontcolor || ""),
        "hover-bg-color": "".concat(item.hovercolor || ""),
        "active-bg-color": "".concat(item.activecolor || "")
      });
      const panel = props.modelData.itemLayoutPanel;
      return vue.createVNode("div", {
        "style": {
          ...cardStyle,
          ...semanticStyle("item", {
            item
          })
        },
        "class": [ns.b("scroll-item"), semanticClass("item", {
          item
        }), ns.is("active", isSelected(item))]
      }, [c.state.draggable && !c.state.readonly && vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "class": ns.e("drag-icon"),
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("g", {
        "transform": "translate(5 1)",
        "fill-rule": "nonzero"
      }, [vue.createVNode("path", {
        "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      }, null)])])]), c.model.controlStyle === "EXTVIEW2" && !c.state.singleSelect && vue.createVNode(vue.resolveComponent("el-checkbox"), {
        "size": "large",
        "style": semanticStyle("item.checkbox", {
          item
        }),
        "class": [ns.be("scroll-item", "checkbox"), semanticClass("item.checkbox", {
          item
        })],
        "modelValue": isSelected(item),
        "onChange": () => toggleSelection(item)
      }, null), c.model.navAppViewId && c.state.showRowDetail && vue.createVNode("ion-icon", {
        "name": item.__isExpand ? "chevron-down-outline" : "chevron-forward-outline",
        "class": ns.be("scroll-item", "icon"),
        "onClick": () => item.__isExpand = !item.__isExpand
      }, null), panel ? renderPanelItem(item, panel) : renderDefaultItem(item)]);
    };
    const renderListItems = (items, group, disabled = true) => {
      const {
        navAppViewId
      } = c.model;
      return vue.createVNode(draggable, {
        "itemKey": "srfkey",
        "modelValue": items,
        "group": c.model.id,
        "handle": ".".concat(ns.e("drag-icon")),
        "class": [ns.e("layout-flex"), ns.em("layout-flex", "draggable")],
        "disabled": disabled || c.state.updating || c.state.readonly,
        "onChange": (evt) => onDraggableChange(evt, group == null ? void 0 : group.key)
      }, {
        item: ({
          element
        }) => {
          if (navAppViewId && c.state.showRowDetail)
            return vue.createVNode("div", {
              "class": ns.b("row-detail")
            }, [renderItem(element), element.__isExpand && renderRowDetail(element)]);
          return renderItem(element);
        },
        footer: () => {
          if (c.enableNew && !c.state.readonly)
            return renderNewItem(group);
        }
      });
    };
    const renderGroup = (group) => {
      return vue.createVNode(vue.resolveComponent("el-collapse-item"), {
        "class": ns.be("group-content", "item"),
        "name": group.key.toString()
      }, {
        title: () => {
          return vue.createVNode("div", {
            "class": ns.be("group-content", "item-header")
          }, [vue.createVNode("span", {
            "class": [ns.be("group-content", "item-title"), semanticClass("group.title", {
              group
            })],
            "style": semanticStyle("group.title", {
              group
            })
          }, [core.showTitle(group.caption)]), vue.createVNode("span", {
            "class": ns.be("group-content", "item-action")
          }, [renderGroupAction(group)])]);
        },
        default: () => group.children.length > 0 ? renderListItems(group.children, group, !c.state.draggable) : vue.createVNode("div", {
          "class": ns.bem("group-content", "item", "empty")
        }, [ibiz.i18n.t("app.noData")])
      });
    };
    const renderGroupStyle2 = () => {
      var _a;
      return vue.createVNode("div", {
        "class": [ns.e("layout-flex"), ns.em("layout-flex", "group-style2")]
      }, [(_a = c.state.groups) == null ? void 0 : _a.map((group) => {
        return vue.createVNode("div", {
          "class": [ns.b("group-style2"), semanticClass("group", {
            group
          })],
          "style": semanticStyle("group", {
            group
          })
        }, [vue.createVNode("div", {
          "class": ns.be("group-style2", "header")
        }, [vue.createVNode("div", {
          "class": [ns.bem("group-style2", "header", "title"), semanticClass("group.title", {
            group
          })],
          "style": semanticStyle("group.title", {
            group
          })
        }, [core.showTitle(group.caption)])]), vue.createVNode("div", {
          "class": ns.be("group-style2", "content")
        }, [group.children.length > 0 ? renderListItems(group.children) : vue.createVNode("div", {
          "class": ns.bem("group-style2", "content", "empty")
        }, [ibiz.i18n.t("app.noData")])])]);
      })]);
    };
    const renderListContent = () => {
      if (c.state.enableGroup && !c.state.isSimple && c.model.groupStyle !== "STYLE2") {
        return vue.createVNode(vue.resolveComponent("el-collapse"), {
          "modelValue": c.state.expandedKeys,
          "onUpdate:modelValue": ($event) => c.state.expandedKeys = $event,
          "class": [ns.b("content"), ns.b("group-content"), semanticClass("content"), ns.is("show-underLine", c.model.controlStyle !== "EXTVIEW1")],
          "style": semanticStyle("content")
        }, {
          default: () => {
            var _a;
            return [(_a = c.state.groups) == null ? void 0 : _a.map((group) => {
              return vue.createVNode("div", {
                "style": semanticStyle("group", {
                  group
                }),
                "class": [ns.b("group"), semanticClass("group", {
                  group
                })]
              }, [renderGroup(group)]);
            })];
          }
        });
      }
      return vue.createVNode("div", {
        "ref": "infiniteScroll",
        "class": [ns.b("scroll"), ns.b("content"), semanticClass("content"), ns.is("reverse-scroll", reverseScroll), ns.is("show-underLine", c.model.controlStyle !== "EXTVIEW1" && c.model.groupStyle !== "STYLE2")],
        "style": semanticStyle("content"),
        "onScroll": lodashEs.debounce(handleScrollLoad, 300)
      }, [c.state.enableGroup && c.model.groupStyle === "STYLE2" ? renderGroupStyle2() : renderListItems(isCollapse.value ? c.state.items.slice(0, c.state.size) : c.state.items, void 0, !c.enableEditOrder)]);
    };
    const upIcon = () => {
      return vue.createVNode("div", {
        "class": [semanticClass("more"), ns.be("content", "icon"), ns.e("collapse-expand-icon")],
        "style": semanticStyle("more")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-up",
        "title": ibiz.i18n.t("control.common.collapseData"),
        "onClick": onCollapseData,
        "aria-hidden": "true"
      }, null)]);
    };
    const downIcon = () => {
      return vue.createVNode("div", {
        "class": [semanticClass("more"), ns.be("content", "icon"), ns.e("collapse-expand-icon")],
        "style": semanticStyle("more")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.expandData"),
        "onClick": onExpandData,
        "aria-hidden": "true"
      }, null)]);
    };
    const loadMoreIcon = () => {
      return vue.createVNode("div", {
        "class": [semanticClass("more"), ns.e("load-more"), ns.be("content", "icon")],
        "style": semanticStyle("more")
      }, [vue.createVNode("i", {
        "class": "fa fa-angle-double-down",
        "title": ibiz.i18n.t("control.common.loadMore"),
        "onClick": () => c.loadMore(),
        "aria-hidden": "true"
      }, null)]);
    };
    const renderBatchToolBar = () => {
      var _a;
      const ctrlModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!ctrlModel)
        return;
      return vue.createVNode("div", {
        "class": [ns.e("batchtoolbar"), ns.is("show", c.showBatchToolbar), semanticClass("batchtoolbar")],
        "style": semanticStyle("batchtoolbar")
      }, [vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
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
        return vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
          "modelData": ctrlModel,
          "context": c.context,
          "params": c.params,
          "class": [ns.e("quicktoolbar"), semanticClass("quicktoolbar")],
          "style": semanticStyle("quicktoolbar")
        }, null);
      }
      const noDataSlots = {};
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
      if (!showCollapseOrExpandIcon.value)
        return null;
      const {
        pagingMode
      } = c.model;
      const {
        items,
        total,
        size,
        isCreated
      } = c.state;
      const hasMoreItems = items.length < total && total > size;
      const exceedsInitialSize = items.length > size;
      if (pagingMode === 2) {
        if (isCollapse.value)
          return reverseScroll ? upIcon() : downIcon();
        if (exceedsInitialSize)
          return reverseScroll ? downIcon() : upIcon();
      }
      if (pagingMode === 3) {
        if (isCollapse.value)
          return reverseScroll ? upIcon() : downIcon();
        if (hasMoreItems)
          return loadMoreIcon();
        if (isCreated && exceedsInitialSize)
          return reverseScroll ? downIcon() : upIcon();
      }
      return null;
    };
    const renderSkeletonItem = () => {
      return vue.createVNode("div", {
        "class": ns.b("skeleton-item")
      }, [vue.createVNode(vue.resolveComponent("el-skeleton"), {
        "animated": true,
        "class": ns.be("skeleton-item", "avatar")
      }, {
        template: () => vue.createVNode(vue.resolveComponent("el-skeleton-item"), {
          "variant": "circle"
        }, null)
      }), vue.createVNode(vue.resolveComponent("el-skeleton"), {
        "animated": true,
        "rows": 2
      }, null)]);
    };
    const renderGroupSkeleton = () => {
      return vue.createVNode("div", {
        "class": ns.b("skeleton")
      }, [Array.from({
        length: 3
      }, () => vue.createVNode("div", {
        "class": ns.b("skeleton-group")
      }, [vue.createVNode("div", {
        "class": ns.be("skeleton-group", "header")
      }, [vue.createVNode(vue.resolveComponent("el-skeleton"), {
        "animated": true,
        "rows": 1
      }, {
        template: () => vue.createVNode(vue.resolveComponent("el-skeleton-item"), {
          "variant": "rect",
          "style": "width: 15%"
        }, null)
      })]), vue.createVNode("div", {
        "class": [ns.be("skeleton", "content"), ns.be("skeleton-group", "content")]
      }, [Array.from({
        length: 3
      }, () => renderSkeletonItem())])]))]);
    };
    const renderGroupStyle2Skeleton = () => {
      return vue.createVNode("div", {
        "class": ns.b("skeleton")
      }, [Array.from({
        length: 3
      }, () => vue.createVNode("div", {
        "class": [ns.b("skeleton-group"), ns.b("skeleton-group-style2")]
      }, [vue.createVNode("div", {
        "class": [ns.be("skeleton-group", "header"), ns.be("skeleton-group-style2", "header")]
      }, [vue.createVNode(vue.resolveComponent("el-skeleton"), {
        "animated": true,
        "rows": 1,
        "style": "width: 15%"
      }, {
        template: () => vue.createVNode(vue.resolveComponent("el-skeleton-item"), {
          "variant": "rect"
        }, null)
      })]), vue.createVNode("div", {
        "class": [ns.be("skeleton", "content"), ns.be("skeleton-group", "content"), ns.be("skeleton-group-style2", "content")]
      }, [Array.from({
        length: 3
      }, () => renderSkeletonItem())])]))]);
    };
    const renderSkeleton = () => {
      if (c.state.enableGroup && !c.state.isSimple) {
        if (c.model.groupStyle === "STYLE2") {
          return renderGroupStyle2Skeleton();
        }
        return renderGroupSkeleton();
      }
      const count = c.state.size || 6;
      return vue.createVNode("div", {
        "class": ns.b("skeleton")
      }, [vue.createVNode("div", {
        "class": ns.be("skeleton", "content")
      }, [Array.from({
        length: Math.min(count, 20)
      }, () => renderSkeletonItem())])]);
    };
    return {
      c,
      ns,
      pageSemantic,
      semanticClass,
      semanticStyle,
      reverseScroll,
      infiniteScroll,
      renderNoData,
      onPageChange,
      onPageRefresh,
      onPageSizeChange,
      renderListContent,
      renderBatchToolBar,
      renderCollapseExpandIcon,
      renderSkeleton
    };
  },
  render() {
    let content = null;
    if (this.c.state.isCreated) {
      content = [!this.c.state.isLoaded ? this.renderSkeleton() : this.c.state.items.length > 0 ? this.renderListContent() : this.renderNoData(), this.renderBatchToolBar(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? vue.createVNode(vue.resolveComponent("iBizPagination"), {
        "size": this.c.state.size,
        "total": this.c.state.total,
        "semantic": this.pageSemantic,
        "onChange": this.onPageChange,
        "mode": this.c.paginationMode,
        "curPage": this.c.state.curPage,
        "onPageRefresh": this.onPageRefresh,
        "totalPages": this.c.state.totalPages,
        "onPageSizeChange": this.onPageSizeChange,
        "style": this.semanticStyle("pagination"),
        "class": [this.ns.e("pagination"), this.semanticClass("pagination")]
      }, null) : null];
    }
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": [this.semanticClass("root"), this.ns.is("enable-page", !!this.c.state.enablePagingBar)],
        "style": this.semanticStyle("root")
      }, {
        default: () => [this.reverseScroll && this.renderCollapseExpandIcon(), content, this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : vue.createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null, !this.reverseScroll && this.renderCollapseExpandIcon()]
      })]
    });
  }
});

exports.ListControl = ListControl;
