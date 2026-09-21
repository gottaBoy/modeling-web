'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./data-import2-table.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const DataImport2Table = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("data-import2-table");
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
      return vue.createVNode(vue.resolveComponent("el-select"), {
        "modelValue": props.selectValues[index],
        "filterable": true,
        "placeholder": ibiz.i18n.t("component.dataImport2Table.selectAttribute"),
        "onChange": change,
        "key": index,
        "popper-class": ns.e("dataimport-select"),
        "class": ns.e("select")
      }, _isSlot(_slot = props.dataOption.map((item) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
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
      const rows = arr.map((row, rowIndex) => vue.createVNode("tr", {
        "key": rowIndex
      }, [row.map((cell, cellIndex) => rowIndex === 0 ? vue.createVNode("th", {
        "key": cellIndex,
        "class": ns.e("dataimport2-table-th")
      }, [cell]) : vue.createVNode("td", {
        "key": cellIndex,
        "class": ns.e("dataimport2-table-td")
      }, [cell]))]));
      const newRows = [vue.createVNode("tr", {
        "key": "newRow"
      }, [arr[0].map((item, index) => vue.createVNode("td", {
        "key": index,
        "class": ns.e("dataimpoer2-table-select")
      }, [renderSelect(item, index)]))]), ...rows];
      return vue.createVNode("table", {
        "class": ns.e("dataimport-table")
      }, [vue.createVNode("tbody", null, [newRows])]);
    };
    const renderEmpty = () => {
      return vue.createVNode("div", {
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
    return vue.createVNode("div", {
      "class": [this.ns.e("template-container"), "ibiz-panel-view-content"]
    }, [this.previewinfo[0] && this.previewinfo[0].length ? this.renderTable() : this.renderEmpty()]);
  }
});

exports.DataImport2Table = DataImport2Table;
