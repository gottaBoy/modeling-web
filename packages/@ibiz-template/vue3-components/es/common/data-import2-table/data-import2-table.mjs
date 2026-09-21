import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './data-import2-table.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataImport2Table = /* @__PURE__ */ defineComponent({
  name: "DataImport2Table",
  props: {
    previewinfo: {
      type: Object,
      required: true
    },
    dataOption: {
      type: Object,
      required: true
    },
    selectValues: {
      type: Object,
      required: true
    },
    columnMappingSave: {
      type: Boolean,
      required: true
    },
    columnMap: {
      type: Object,
      required: true
    }
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("data-import2-table");
    const renderSelect = (itemx, index) => {
      let _slot;
      const change = (item) => {
        emit("selectValuesChange", index, item);
        const data = props.columnMap.get("".concat(itemx, "-").concat(index));
        if (data) {
          data.name = item;
        }
        emit("columnMapChange", "".concat(itemx, "-").concat(index), data);
        emit("columnMappingSaveChange", false);
      };
      return createVNode(resolveComponent("el-select"), {
        "modelValue": props.selectValues[index],
        "filterable": true,
        "placeholder": ibiz.i18n.t("component.dataImport2Table.selectAttribute"),
        "onChange": change,
        "key": index,
        "popper-class": ns.e("dataimport-select"),
        "class": ns.e("select")
      }, _isSlot(_slot = props.dataOption.map((item) => {
        return createVNode(resolveComponent("el-option"), {
          "key": item.name,
          "value": item.id,
          "label": item.caption ? item.caption : item.logicName
        }, null);
      })) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderTable = () => {
      const arr = props.previewinfo;
      const rows = arr.map((row, rowIndex) => createVNode("tr", {
        "key": rowIndex
      }, [row.map((cell, cellIndex) => rowIndex === 0 ? createVNode("th", {
        "key": cellIndex,
        "class": ns.e("dataimport2-table-th")
      }, [cell]) : createVNode("td", {
        "key": cellIndex,
        "class": ns.e("dataimport2-table-td")
      }, [cell]))]));
      const newRows = [createVNode("tr", {
        "key": "newRow"
      }, [arr[0].map((item, index) => createVNode("td", {
        "key": index,
        "class": ns.e("dataimpoer2-table-select")
      }, [renderSelect(item, index)]))]), ...rows];
      return createVNode("table", {
        "class": ns.e("dataimport-table")
      }, [createVNode("tbody", null, [newRows])]);
    };
    const renderEmpty = () => {
      return createVNode("div", {
        "class": ns.e("empty")
      }, [ibiz.i18n.t("app.noData")]);
    };
    return {
      ns,
      renderEmpty,
      renderTable
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.e("template-container"), "ibiz-panel-view-content"]
    }, [this.previewinfo[0] && this.previewinfo[0].length ? this.renderTable() : this.renderEmpty()]);
  }
});

export { DataImport2Table };
