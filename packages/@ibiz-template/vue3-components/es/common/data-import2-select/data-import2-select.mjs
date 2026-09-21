import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './data-import2-select.css';
import { updateImportSchema, deleteImportSchema } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataImport2Select = /* @__PURE__ */ defineComponent({
  name: "DataImport2Select",
  props: {
    previewinfo: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    columnMappingListMap: {
      type: Object,
      required: true
    },
    listValue: {
      type: String,
      required: true
    }
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("data-import2-select");
    const inputClick = (e) => {
      e.stopPropagation();
    };
    const editLabel = (e, item) => {
      e.stopPropagation();
      emit("optionsChange", item.label, {
        edit: false,
        checkmark: true,
        close: true
      });
    };
    const saveLabel = async (e, item) => {
      e.stopPropagation();
      emit("optionsChange", item.label, {
        edit: true,
        checkmark: false,
        close: false,
        value: item.label,
        label: item.label
      });
      const data = props.columnMappingListMap.get(item.oldLabel);
      if (data) {
        data.name = item.label;
        const result = await updateImportSchema({
          data
        });
        if (result.status === 200 && result.ok) {
          emit("columnMappingListMapChange", item.label, result.data);
        }
      }
      if (props.listValue === item.oldLabel) {
        emit("listValueChange", item.label);
      }
      emit("optionsChange", item.label, {
        oldLabel: item.label
      });
    };
    const notSaveLabel = (e, item) => {
      e.stopPropagation();
      emit("optionsChange", item.label, {
        edit: true,
        checkmark: false,
        close: false,
        label: item.oldLabel
      });
    };
    const handleDeleteOption = async (e, str) => {
      e.stopPropagation();
      const columnData = props.columnMappingListMap.get(str);
      if (columnData) {
        const res = await deleteImportSchema(columnData.id);
        if (res.status === 200 && res.ok) {
          emit("optionsChange", str);
          emit("columnMappingListMapChange", str);
          if (props.listValue === str) {
            emit("listValueChange", "");
          }
        }
      }
    };
    const valueChange = (data) => {
      emit("listValueChange", data);
    };
    return {
      ns,
      inputClick,
      editLabel,
      saveLabel,
      notSaveLabel,
      handleDeleteOption,
      valueChange
    };
  },
  render() {
    let _slot2;
    return createVNode("div", {
      "class": "ibiz-control-toolbar__item"
    }, [createVNode(resolveComponent("el-select"), {
      "ref": "select",
      "model-value": this.listValue,
      "onChange": this.valueChange,
      "clearable": true,
      "placeholder": ibiz.i18n.t("component.dataImport2Select.selectMode"),
      "disabled": !(this.previewinfo[0] && this.previewinfo[0].length),
      "popper-class": this.ns.e("dataimport-select")
    }, _isSlot(_slot2 = this.options.map((item) => {
      return createVNode(resolveComponent("el-option"), {
        "label": item.label,
        "value": item.value,
        "class": [this.ns.e("select-option")]
      }, {
        default: () => {
          let _slot;
          return createVNode("div", {
            "class": [this.ns.e("select-option-item")]
          }, [item.edit ? createVNode("span", null, [item.label]) : "", item.edit ? "" : createVNode(resolveComponent("el-input"), {
            "model-value": item.label,
            "onClick": (e) => this.inputClick(e),
            "class": [this.ns.e("select-option-item-input")],
            "onInput": (args) => {
              item.label = args;
            }
          }, null), item.edit ? createVNode(resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "onClick": (e) => this.editLabel(e, item)
          }, _isSlot(_slot = ibiz.i18n.t("component.dataImport2Select.edit")) ? _slot : {
            default: () => [_slot]
          }) : "", item.checkmark ? createVNode(resolveComponent("el-button"), {
            "size": "small",
            "onClick": (e) => this.saveLabel(e, item)
          }, {
            default: () => [createVNode("ion-icon", {
              "name": "checkmark-outline"
            }, null)]
          }) : "", item.close ? createVNode(resolveComponent("el-button"), {
            "size": "small",
            "onClick": (e) => this.notSaveLabel(e, item)
          }, {
            default: () => [createVNode("ion-icon", {
              "name": "close-outline"
            }, null)]
          }) : "", createVNode(resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "onClick": (e) => this.handleDeleteOption(e, item.value),
            "class": this.ns.e("select-option-item-button-delete")
          }, {
            default: () => [createVNode("ion-icon", {
              "name": "trash-outline",
              "class": this.ns.e("select-option-item-button-delete-icon")
            }, null)]
          })]);
        }
      });
    })) ? _slot2 : {
      default: () => [_slot2]
    })]);
  }
});

export { DataImport2Select };
