import { isVNode, defineComponent, renderSlot, createVNode, resolveComponent, mergeProps, h, computed, ref, watchEffect } from 'vue';
import { useControlController, useControlPopoverzIndex, useNamespace, useSemanticNode, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { filterPresetAttrs, ScriptFactory, TreeGridExController } from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';
import { createUUID } from 'qx-util';
import { useRowEditPopover } from './use-row-edit-popover.mjs';
import './tree-grid-ex.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderAttrs(model, params) {
  const attrs = {};
  filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
}
const TreeGridExControl = /* @__PURE__ */ defineComponent({
  name: "IBizTreeGridExControl",
  props: {
    /**
     * @description 树表格增强模型数据
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
    }
  },
  setup() {
    const c = useControlController((...args) => new TreeGridExController(...args));
    useControlPopoverzIndex(c);
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
        "class": semanticClass("empty"),
        "style": semanticStyle("empty"),
        "text": c.model.emptyText,
        "emptyTextLanguageRes": c.model.emptyTextLanguageRes
      }, _isSlot(noDataSlots) ? noDataSlots : {
        default: () => [noDataSlots]
      });
    };
    const renderColumns = computed(() => {
      const columns = [];
      c.state.columnStates.forEach((item) => {
        var _a, _b;
        if (item.hidden) {
          return;
        }
        const columnModel = ((_a = c.fieldColumns[item.key]) == null ? void 0 : _a.model) || ((_b = c.uaColumns[item.key]) == null ? void 0 : _b.model);
        if (columnModel) {
          columns.push(columnModel);
        }
      });
      return columns;
    });
    const toElNodes = (nodes, noChild = false) => {
      return nodes.map((node) => {
        const temp = {
          id: node._id,
          _uuid: node._uuid,
          hasChildren: !node._leaf,
          _deData: node._deData
        };
        if (!noChild && !node._leaf && node._children !== void 0) {
          temp.children = toElNodes(node._children);
        }
        return temp;
      });
    };
    const tableRefreshKey = ref(createUUID());
    const treeRootData = computed(() => {
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
    const elTableData = computed(() => {
      tableRefreshKey.value = createUUID();
      if (treeRootData.value.length === 0) {
        return [];
      }
      return toElNodes(treeRootData.value, true);
    });
    c.evt.on("onAfterRefreshParent", () => {
      tableRefreshKey.value = createUUID();
    });
    const loadData = async (item, treeNode, callback) => {
      let nodes;
      const nodeData = c.getNodeData(item.id);
      if (nodeData._children) {
        nodes = nodeData._children;
      } else {
        nodes = await c.loadNodes(nodeData);
      }
      callback(toElNodes(nodes));
    };
    const tableRef = ref();
    const {
      renderPopover
    } = useRowEditPopover(tableRef, c);
    const onRowClick = async (data, _column, event) => {
      const nodeData = c.getNodeData(data.id);
      if (c.editShowMode === "row" && c.model.enableEdit) {
        const row = c.state.rows[nodeData._uuid];
        if (row && row.showRowEdit !== true) {
          await c.switchRowEdit(row, true);
        } else {
          throw new RuntimeError(ibiz.i18n.t("control.treeGridEx.noFoundMessage", {
            id: data.id
          }));
        }
      } else {
        c.onTreeNodeClick(nodeData, event);
      }
    };
    function handleRowClassName({
      row
    }) {
      const nodeData = c.getNodeData(row.id);
      if (!nodeData) {
        return "";
      }
      let activeClassName = "";
      if (c.state.selectedData.length > 0) {
        c.state.selectedData.forEach((data) => {
          if (data === nodeData) {
            activeClassName = "current-row";
          }
        });
      }
      const rowState = c.getRowState(nodeData._uuid);
      if (rowState == null ? void 0 : rowState.showRowEdit) {
        activeClassName += " editing-row";
      }
      activeClassName += " id-".concat(nodeData._uuid);
      return activeClassName;
    }
    watchEffect(() => {
      if (tableRef.value) {
        const allNodes = tableRef.value.store.states.treeData.value;
        const expandedKeys = c.state.expandedKeys;
        Object.keys(allNodes).forEach((key) => {
          if (expandedKeys.includes(key) !== allNodes[key].expanded) {
            const row = toElNodes([c.getNodeData(key)])[0];
            tableRef.value.store.loadOrToggle(row);
          }
        });
      }
    });
    const onExpandChange = (row, expanded) => {
      const nodeData = c.getNodeData(row._uuid);
      if (!nodeData) {
        throw new RuntimeError(ibiz.i18n.t("control.common.noFoundNode", {
          id: row._uuid
        }));
      }
      c.onExpandChange(nodeData, expanded);
    };
    return {
      c,
      ns,
      tableRef,
      elTableData,
      renderColumns,
      tableRefreshKey,
      semanticClass,
      semanticStyle,
      loadData,
      onRowClick,
      renderNoData,
      renderPopover,
      onExpandChange,
      handleRowClassName
    };
  },
  render() {
    const renderColumn = (model, index) => {
      var _a, _b, _c;
      if (this.$slots[model.id]) {
        return renderSlot(this.$slots, model.id, {
          model,
          data: this.c.state.items
        });
      }
      const {
        codeName: columnName,
        width
      } = model;
      const columnC = this.c.columns[columnName];
      const columnState = this.c.state.columnStates.find((item) => item.key === columnName);
      const widthFlexGrow = columnC.isAdaptiveColumn || !this.c.hasAdaptiveColumn && index === this.renderColumns.length - 1;
      const widthName = widthFlexGrow ? "min-width" : "width";
      let type = "default";
      const expandiconcolumn = (_a = this.c.controlParams.expandiconcolumn) == null ? void 0 : _a.toLowerCase();
      const expandColumnSatate = this.c.state.columnStates.find((item) => expandiconcolumn && item.key.toLowerCase() === expandiconcolumn);
      if (expandColumnSatate && !expandColumnSatate.hidden)
        type = (columnName == null ? void 0 : columnName.toLowerCase()) === expandiconcolumn ? "default" : "";
      return createVNode(resolveComponent("el-table-column"), mergeProps({
        "type": type,
        "prop": columnName,
        "label": model.caption
      }, {
        [widthName]: width
      }, {
        "fixed": columnState.fixed,
        "sortable": model.enableSort ? "custom" : false,
        "align": ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || "center",
        "label-class-name": (_c = columnC.model.headerSysCss) == null ? void 0 : _c.cssName
      }), {
        header: ({
          column
        }) => {
          return createVNode(resolveComponent("iBizGridColumnHeader"), {
            "key": column.property,
            "controller": columnC
          }, null);
        },
        default: ({
          row
        }) => {
          const rowState = this.c.getRowState(row.id);
          if (rowState) {
            const comp = resolveComponent(this.c.providers[columnName].component);
            const nodeData = rowState.data;
            const nodeModel = this.c.getNodeModel(nodeData._nodeId);
            return h(comp, {
              controller: columnC,
              row: rowState,
              key: rowState.data._uuid + columnName,
              attrs: renderAttrs(nodeModel, {
                ...this.c.getEventArgs(),
                data: rowState.data
              })
            });
          }
          return null;
        }
      });
    };
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": [this.ns.b(), this.semanticClass("root")],
        "style": this.semanticStyle("root")
      }, {
        default: () => [this.c.state.isLoaded && createVNode(resolveComponent("el-table"), mergeProps({
          "ref": "tableRef",
          "key": this.tableRefreshKey,
          "class": [this.ns.e("table"), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "border": true,
          "row-key": "id",
          "data": this.elTableData,
          "tree-props": {
            children: "children",
            hasChildren: "hasChildren"
          },
          "lazy": true,
          "onRowClick": this.onRowClick,
          "onExpandChange": this.onExpandChange,
          "row-class-name": (event) => {
            return [this.handleRowClassName(event), this.semanticClass("body.row", {
              event
            })].join(" ");
          },
          "header-row-class-name": (...args) => this.semanticClass("header.row", {
            args
          }),
          "row-style": (...args) => this.semanticStyle("body.row", {
            args
          }),
          "header-row-style": (...args) => this.semanticStyle("header.row", {
            args
          }),
          "cell-class-name": (...args) => this.semanticClass("body.cell", {
            args
          }),
          "header-cell-class-name": (...args) => this.semanticClass("header.cell", {
            args
          }),
          "cell-style": (...args) => this.semanticStyle("body.cell", {
            args
          }),
          "header-cell-style": this.semanticStyle("header.cell"),
          "load": this.loadData
        }, renderAttrs(this.c.model, {
          ...this.c.getEventArgs()
        })), {
          empty: this.renderNoData,
          default: () => {
            return [this.renderColumns.map((model, index) => {
              return renderColumn(model, index);
            })];
          },
          append: () => {
            return this.renderPopover();
          }
        })]
      })]
    });
  }
});

export { TreeGridExControl };
