import { isVNode, defineComponent, ref, resolveComponent, getCurrentInstance, onMounted, watch, computed, h, createVNode, withDirectives, resolveDirective } from 'vue';
import { useControlController, useNamespace, useUIStore, hasEmptyPanelRenderer, IBizCustomRender, IBizControlShell } from '@ibiz-template/vue3-util';
import { GanttController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import dayjs from 'dayjs';
import { findNodeData, formatNodeDropType } from '../tree/el-tree-util.mjs';
import './gantt.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GanttControl = /* @__PURE__ */ defineComponent({
  name: "IBizGanttControl",
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
    loadDefault: {
      type: Boolean,
      default: true
    },
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    singleSelect: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props) {
    var _a;
    const c = useControlController((...args) => new GanttController(...args));
    const ganttRef = ref();
    const isInited = ref(false);
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    let overlay = null;
    const sliderMove = ref(false);
    const iBizRawItem = resolveComponent("IBizRawItem");
    const iBizIcon = resolveComponent("IBizIcon");
    let forbidClick = false;
    const selection = [];
    const app = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app;
    onMounted(() => {
      const importGantt = () => import('@ibiz-template-plugin/gantt');
      importGantt().then((value) => {
        const defaltModule = value.default;
        app == null ? void 0 : app.use(defaltModule);
        isInited.value = true;
      });
      c.evt.on("onToggleRowExpansion", (event) => {
        const {
          row,
          expand
        } = event;
        if (ganttRef.value) {
          if (expand) {
            ganttRef.value.setExpand(row);
          } else {
            ganttRef.value.setCollapse(row);
          }
        }
      });
    });
    const getVarValue = (varName) => {
      const root = document.documentElement;
      return getComputedStyle(root).getPropertyValue(varName);
    };
    const {
      UIStore
    } = useUIStore();
    const ganttStyle = ref({});
    const calcGanttStyle = () => {
      var _a2, _b;
      return {
        primaryColor: ((_a2 = c.state.ganttStyle) == null ? void 0 : _a2.primaryColor) || getVarValue("--ibiz-color-primary"),
        textColor: ((_b = c.state.ganttStyle) == null ? void 0 : _b.textColor) || getVarValue("--ibiz-color-text-3"),
        headerBgColor: "rgba(".concat(getVarValue("--ibiz-grey-1"), ", 1)"),
        bgColor: getVarValue("--ibiz-color-bg-1"),
        weekendColor: getVarValue("--ibiz-color-fill-2"),
        todayColor: getVarValue("--ibiz-color-primary-light-active"),
        borderColor: getVarValue("--ibiz-color-tertiary-light-active")
      };
    };
    watch(() => UIStore.theme, () => {
      ganttStyle.value = calcGanttStyle();
    }, {
      immediate: true
    });
    const loading = computed(() => {
      if (c.state.isLoaded) {
        return c.state.isLoading;
      }
      return false;
    });
    const data = computed(() => {
      if (!c.state.isLoaded) {
        return [];
      }
      return c.model.rootVisible ? c.state.rootNodes : c.state.rootNodes.reduce((result, nodeData) => {
        if (nodeData._children) {
          return result.concat(nodeData._children);
        }
        return result;
      }, []);
    });
    const columns = computed(() => {
      const columnsModel = [];
      c.state.columnStates.forEach((item) => {
        var _a2;
        const columnModel = (_a2 = c.columns[item.key]) == null ? void 0 : _a2.model;
        if (!item.hidden && columnModel) {
          columnsModel.push(columnModel);
        }
      });
      return columnsModel;
    });
    const locale = computed(() => {
      return ibiz.i18n.getLang().toLowerCase();
    });
    const findNodeLayoutPanel = (id) => {
      var _a2;
      let layoutPanel;
      const nodeModel = c.getNodeModel(id);
      (_a2 = nodeModel == null ? void 0 : nodeModel.controlRenders) == null ? void 0 : _a2.forEach((renderItem) => {
        if (renderItem.renderType === "LAYOUTPANEL") {
          layoutPanel = renderItem.layoutPanel;
        }
      });
      return layoutPanel;
    };
    const onCheck = (state, item) => {
      if (state) {
        selection.push(item);
      } else {
        const index = selection.findIndex((selected) => selected._id === item._id);
        if (index > -1) {
          selection.splice(index, 1);
        }
      }
      c.setSelection(selection);
    };
    const onNodeClick = (nodeData, evt) => {
      if (forbidClick || sliderMove.value) {
        sliderMove.value = false;
        return;
      }
      c.onTreeNodeClick(nodeData, evt);
      forbidClick = true;
      setTimeout(() => {
        forbidClick = false;
      }, 200);
    };
    const onNodeDbClick = (nodeData) => {
      c.onDbTreeNodeClick(nodeData);
    };
    const onNodeExpand = (nodeData) => {
      c.onExpandChange(nodeData, true);
      if (nodeData && !nodeData._children) {
        c.refreshNodeChildren(nodeData);
      }
    };
    c.evt.on("onNewRow", (event) => {
      var _a2;
      const nodeData = event.row.data;
      (_a2 = ganttRef.value) == null ? void 0 : _a2.setExpand(nodeData);
    });
    const onNodeCollapse = (nodeData) => {
      c.onExpandChange(nodeData, false);
    };
    const allowDrop = (draggingNode, dropNode, type) => {
      const draggingNodeData = findNodeData(draggingNode._uuid, c);
      const dropNodeData = findNodeData(dropNode._uuid, c);
      const result = c.calcAllowDrop(draggingNodeData, dropNodeData, type);
      return result;
    };
    const allowDrag = (draggingNode) => {
      const nodeData = findNodeData(draggingNode._uuid, c);
      return c.calcAllowDrag(nodeData);
    };
    const handleDrop = (draggingNode, dropNode, dropType) => {
      const draggingNodeData = findNodeData(draggingNode._uuid, c);
      const dropNodeData = findNodeData(dropNode._uuid, c);
      const type = formatNodeDropType(dropType);
      c.onNodeDrop(draggingNodeData, dropNodeData, type);
    };
    const onSliderMove = (sliders) => {
      var _a2;
      const nodeData = (_a2 = sliders[0]) == null ? void 0 : _a2.row;
      const newValue = {
        begin: nodeData._beginDataItemValue ? dayjs(nodeData._beginDataItemValue).format("YYYY-MM-DD HH:mm:ss") : void 0,
        end: nodeData._endDataItemValue ? dayjs(nodeData._endDataItemValue).format("YYYY-MM-DD HH:mm:ss") : void 0
      };
      sliderMove.value = true;
      c.modifyNodeTime(nodeData, newValue);
    };
    const onSettingClick = async () => {
      let limitsize = 0;
      if (c.controlParams.limitsize) {
        limitsize = Number(c.controlParams.limitsize);
      }
      const res = await ibiz.overlay.modal((modal) => {
        const comp = resolveComponent("IBizGanttSetting");
        const options = {
          modal,
          columnStates: c.state.columnStates,
          limitsize
        };
        if (c.state.mustShowColumns) {
          options.mustShowColumns = c.state.mustShowColumns;
        }
        return h(comp, options);
      }, void 0, {
        width: "auto",
        height: "auto"
      });
      if (res.ok && res.data && res.data.length > 0) {
        c.setColumnVisible(res.data);
      }
    };
    const calcContextMenuItems = (toolbarItems, nodeData, evt, menuState) => {
      const result = [];
      toolbarItems.forEach((item) => {
        var _a2;
        if (item.itemType === "SEPERATOR") {
          result.push({
            divided: "self"
          });
          return;
        }
        const buttonState = menuState[item.id];
        if (buttonState && !buttonState.visible) {
          return;
        }
        const menuItem = {};
        if (item.showCaption && item.caption) {
          menuItem.label = item.caption;
        }
        if (item.sysImage && item.showIcon) {
          menuItem.icon = createVNode(iBizIcon, {
            "icon": item.sysImage
          }, null);
        }
        if (item.itemType === "DEUIACTION") {
          menuItem.disabled = buttonState.disabled;
          menuItem.clickClose = true;
          const {
            uiactionId
          } = item;
          if (uiactionId) {
            menuItem.onClick = () => {
              c.doUIAction(uiactionId, nodeData, evt, item.appId);
            };
          }
        } else if (item.itemType === "RAWITEM") {
          const {
            rawItem
          } = item;
          if (rawItem) {
            menuItem.label = createVNode(iBizRawItem, {
              "rawItem": item
            }, null);
          }
        } else if (item.itemType === "ITEMS") {
          if ((_a2 = item.detoolbarItems) == null ? void 0 : _a2.length) {
            menuItem.children = calcContextMenuItems(item.detoolbarItems, nodeData, evt, menuState);
          }
        }
        result.push(menuItem);
      });
      return result;
    };
    let ContextMenu;
    c.evt.on("onMounted", () => {
      if (Object.values(c.contextMenus).length > 0) {
        const importMenu = () => import('@imengyu/vue3-context-menu');
        importMenu().then((value) => {
          ContextMenu = value.default;
          if (ContextMenu.default && !ContextMenu.showContextMenu) {
            ContextMenu = ContextMenu.default;
          }
        });
      }
    });
    const onNodeContextmenu = async (nodeData, evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      const nodeModel = c.getNodeModel(nodeData._nodeId);
      if (!(nodeModel == null ? void 0 : nodeModel.decontextMenu)) {
        return;
      }
      const contextMenuC = c.contextMenus[nodeModel.decontextMenu.id];
      if (!contextMenuC.model.detoolbarItems) {
        return;
      }
      await contextMenuC.calcButtonState(nodeData._deData || (nodeData.srfkey ? nodeData : void 0), nodeModel.appDataEntityId);
      const menuState = contextMenuC.state.buttonsState;
      const menus = calcContextMenuItems(contextMenuC.model.detoolbarItems, nodeData, evt, menuState);
      if (!menus.length) {
        return;
      }
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        customClass: ns.b("context-menu"),
        items: menus
      });
    };
    const renderNoData = () => {
      const {
        isLoaded
      } = c.state;
      const noDataSlots = {};
      if (hasEmptyPanelRenderer(c)) {
        Object.assign(noDataSlots, {
          customRender: () => createVNode(IBizCustomRender, {
            "controller": c
          }, null)
        });
      }
      return isLoaded && createVNode(resolveComponent("iBizNoData"), {
        "text": c.model.emptyText,
        "emptyTextLanguageRes": c.model.emptyTextLanguageRes
      }, _isSlot(noDataSlots) ? noDataSlots : {
        default: () => [noDataSlots]
      });
    };
    const renderColumn = (model, index) => {
      const {
        caption,
        codeName,
        width,
        headerSysCss,
        align
      } = model;
      const columnC = c.columns[codeName];
      const columnState = c.state.columnStates.find((item) => {
        return item.key === codeName;
      });
      let tempWidth = 30;
      if (columnState && columnState.columnWidth) {
        tempWidth = columnState.columnWidth > 30 ? columnState.columnWidth : 30;
      } else if (width && width > 30) {
        tempWidth = width;
      }
      return createVNode(resolveComponent("x-gantt-column"), {
        "label": caption,
        "prop": codeName,
        "width": tempWidth,
        "center": (align == null ? void 0 : align.toLowerCase()) === "center"
      }, {
        title: () => {
          return createVNode("div", {
            "class": headerSysCss == null ? void 0 : headerSysCss.cssName
          }, [caption]);
        },
        default: ({
          row
        }) => {
          const rowState = c.getRowState(row._id);
          if (rowState) {
            const comp = resolveComponent(c.providers[codeName].component);
            return h(comp, {
              controller: columnC,
              row: rowState,
              key: rowState.data._uuid + codeName
            });
          }
          return null;
        }
      });
    };
    const renderNodePanel = (modelData, item) => {
      return h(IBizControlShell, {
        data: item,
        modelData,
        context: c.context,
        params: c.params
      });
    };
    const renderNodeInfo = (item) => {
      return createVNode("div", {
        "class": ns.em("slider", "container")
      }, [createVNode("div", {
        "class": ns.em("slider", "container-title")
      }, [createVNode("div", {
        "class": "number"
      }, [item._icon && createVNode(iBizIcon, {
        "class": "icon",
        "icon": item._icon
      }, null), item._snDataItemValue]), createVNode("div", {
        "class": "caption"
      }, [item._text])])]);
    };
    const openPopover = (row, evt) => {
      if (overlay) {
        return;
      }
      const panel = findNodeLayoutPanel(row._nodeId);
      const component = panel ? renderNodePanel(panel, row._deData) : renderNodeInfo(row);
      overlay = ibiz.overlay.createPopover((modal) => {
        return h(component, {
          modal
        });
      }, void 0, {
        width: "auto",
        height: "auto",
        noArrow: true,
        placement: "bottom",
        modalClass: ns.e("slider-popover")
      });
      overlay == null ? void 0 : overlay.present(evt.target.children[0]);
    };
    const closePopover = () => {
      overlay == null ? void 0 : overlay.dismiss();
      overlay = null;
    };
    const renderSlider = () => {
      return createVNode(resolveComponent("x-gantt-slider"), {
        "allow-link": false,
        "move": c.state.sliderDraggable,
        "resize-left": c.state.sliderDraggable,
        "resize-right": c.state.sliderDraggable
      }, {
        content: ({
          row,
          left
        }) => {
          const {
            sysCss
          } = c.getNodeModel(row._nodeId);
          const sysCssName = (sysCss == null ? void 0 : sysCss.cssName) || "";
          const marginLeft = left < 0 ? "".concat(-left, "px") : "";
          const caption = row == null ? void 0 : row._text;
          return createVNode("div", {
            "class": [ns.e("slider"), sysCssName],
            "onClick": (evt) => onNodeClick(row, evt),
            "onDblclick": () => onNodeDbClick(row),
            "onContextmenu": (evt) => onNodeContextmenu(row, evt),
            "onMouseenter": (evt) => openPopover(row, evt),
            "onMouseleave": closePopover
          }, [createVNode("div", {
            "class": ns.em("slider", "caption"),
            "style": {
              marginLeft
            },
            "title": caption,
            "innerHTML": caption
          }, null)]);
        }
      });
    };
    const renderContent = () => {
      const _columns = columns.value.map((model, index) => {
        return renderColumn(model, index);
      });
      const slider = renderSlider();
      return [..._columns, slider];
    };
    const renderSetting = () => {
      if (!c.controlParams.enablecustomized || c.controlParams.enablecustomized && c.controlParams.enablecustomized === "false") {
        return null;
      }
      return createVNode("div", {
        "class": ns.e("setting"),
        "onClick": () => onSettingClick(),
        "title": showTitle(ibiz.i18n.t("control.gantt.hideControl"))
      }, [createVNode("svg", {
        "class": ns.em("setting", "icon"),
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false"
      }, [createVNode("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [createVNode("path", {
        "d": "M11.405 13.975l3.398-5.889L11.405 2.2H4.607L1.208 8.087l3.399 5.889h6.798zm1.023-12.4l3.43 5.938c.205.356.205.793 0 1.149l-3.43 5.938a1.147 1.147 0 0 1-.993.574H4.577c-.41 0-.789-.218-.994-.573L.153 8.66a1.153 1.153 0 0 1 0-1.147l3.43-5.94c.205-.356.584-.575.994-.575h6.858c.409 0 .788.22.993.576zM8.006 9.879c.988 0 1.792-.804 1.792-1.792s-.804-1.792-1.792-1.792-1.792.804-1.792 1.792.804 1.792 1.792 1.792zm0-4.784a2.993 2.993 0 1 1-.002 5.985 2.993 2.993 0 0 1 .002-5.985z"
      }, null)])])]);
    };
    const onHeaderDragend = (index, width) => {
      const columnState = c.state.columnStates.filter((item) => {
        var _a2;
        const columnModel = (_a2 = c.columns[item.key]) == null ? void 0 : _a2.model;
        return !item.hidden && columnModel;
      });
      if (columnState && columnState[index]) {
        columnState[index].columnWidth = width;
        c.saveColumnState();
      }
    };
    return {
      c,
      ns,
      ganttRef,
      isInited,
      data,
      locale,
      columns,
      onCheck,
      loading,
      ganttStyle,
      onNodeClick,
      onNodeDbClick,
      onNodeExpand,
      onNodeCollapse,
      renderContent,
      renderSetting,
      onSliderMove,
      renderNoData,
      allowDrop,
      allowDrag,
      handleDrop,
      onHeaderDragend
    };
  },
  render() {
    var _a;
    if (!this.isInited) {
      return null;
    }
    return withDirectives(createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), !((_a = this.data) == null ? void 0 : _a.length) ? this.ns.m("empty") : ""]
    }, {
      default: () => [createVNode(resolveComponent("x-gantt"), {
        "ref": "ganttRef",
        "data-id": "_id",
        "data": this.data,
        "row-height": 46,
        "expand-all": false,
        "headerDrag": true,
        "start-key": "_beginDataItemValue",
        "end-key": "_endDataItemValue",
        "children": "_children",
        "leaf": "_leaf",
        "expand-key": "_defaultExpand",
        "locale": this.locale,
        "draggable": {
          level: "all",
          draggable: true
        },
        "allow-drop": this.allowDrop,
        "allow-drag": this.allowDrag,
        "onNodeDrop": this.handleDrop,
        "showCheckbox": !this.c.state.singleSelect,
        "onNodeExpand": this.onNodeExpand,
        "onNodeCollapse": this.onNodeCollapse,
        "onRowClick": this.onNodeClick,
        "onRowDblClick": this.onNodeDbClick,
        "onRowChecked": this.onCheck,
        "onHeaderDragend": this.onHeaderDragend,
        "onMoveSlider": this.onSliderMove,
        "primaryColor": this.ganttStyle.primaryColor,
        "headerStyle": {
          textColor: this.ganttStyle.textColor,
          bgColor: this.ganttStyle.headerBgColor
        },
        "borderColor": this.ganttStyle.borderColor,
        "bodyStyle": {
          todayColor: this.ganttStyle.todayColor,
          weekendColor: this.ganttStyle.headerBgColor,
          bgColor: this.ganttStyle.bgColor,
          selectColor: this.ganttStyle.headerBgColor
        }
      }, {
        default: () => {
          return this.renderContent();
        },
        empty: () => {
          return this.renderNoData();
        },
        setting: () => {
          return this.renderSetting();
        }
      })]
    }), [[resolveDirective("loading"), this.loading]]);
  }
});

export { GanttControl };
