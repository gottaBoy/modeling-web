import { isVNode, defineComponent, createVNode, resolveComponent, computed, ref, watchEffect, renderSlot, mergeProps, h } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { TreeGridExController } from '@ibiz-template/runtime';
import './tree-grid-ex.css';
import { RuntimeError } from '@ibiz-template/core';
import { createUUID } from 'qx-util';
import { useRowEditPopover } from './use-row-edit-popover.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TreeGridExControl = /* @__PURE__ */ defineComponent({
  name: "IBizTreeGridExControl",
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
    const c = useControlController((...args) => new TreeGridExController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
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
          hasChildren: !node._leaf
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
      renderNoData,
      loadData,
      onRowClick,
      onExpandChange,
      renderPopover,
      handleRowClassName
    };
  },
  render() {
    const renderColumn = (model, index) => {
      var _a, _b;
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
      return createVNode(resolveComponent("el-table-column"), mergeProps({
        "label": model.caption,
        "prop": columnName
      }, {
        [widthName]: width
      }, {
        "fixed": columnState.fixed,
        "sortable": model.enableSort ? "custom" : false,
        "label-class-name": (_a = columnC.model.headerSysCss) == null ? void 0 : _a.cssName,
        "align": ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || "center"
      }), {
        default: ({
          row
        }) => {
          const rowState = this.c.getRowState(row.id);
          if (rowState) {
            const comp = resolveComponent(this.c.providers[columnName].component);
            return h(comp, {
              controller: columnC,
              row: rowState,
              key: rowState.data._uuid + columnName
            });
          }
          return null;
        }
      });
    };
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b()]
    }, {
      default: () => [this.c.state.isLoaded && createVNode(resolveComponent("el-table"), {
        "ref": "tableRef",
        "key": this.tableRefreshKey,
        "class": this.ns.e("table"),
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
        "row-class-name": this.handleRowClassName,
        "load": this.loadData
      }, {
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
    });
  }
});

export { TreeGridExControl };
