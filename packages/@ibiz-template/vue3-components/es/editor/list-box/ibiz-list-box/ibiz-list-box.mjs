import { isVNode, defineComponent, computed, ref, watch, createVNode, resolveComponent, mergeProps, h } from 'vue';
import { getListBoxProps, getEditorEmits, useNamespace, useAutoFocusBlur, useCodeListListen, useFocusAndBlur } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import { useCalcOrMode, useCodeListSelection } from '@ibiz-template/runtime';
import './ibiz-list-box.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizListBox = /* @__PURE__ */ defineComponent({
  name: "IBizListBox",
  props: getListBoxProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("list-box");
    const c = props.controller;
    const editorModel = c.model;
    let multiple = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.multiple) {
        multiple = c.toBoolean(editorModel.editorParams.multiple);
      }
    }
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const codeList = c.codeList;
    const editorType = editorModel.editorType;
    const items = ref([]);
    const loadListBoxItems = async () => {
      if (Object.is("LISTBOX", editorType)) {
        const controller = c;
        controller.loadCodeList(props.data).then((_codeList) => {
          if (multiple) {
            items.value = controller.handleCodeListAllItems(_codeList);
            return;
          }
          items.value = _codeList;
        });
      } else if (Object.is("LISTBOXPICKUP", editorType)) {
        const controller = c;
        if (controller.model.appDataEntityId) {
          const res = await controller.getServiceData(props.data);
          if (res) {
            items.value = res.data.map((item) => ({
              value: item[controller.keyName],
              text: item[controller.textName]
            }));
          }
        }
      }
    };
    loadListBoxItems();
    const fn = (data) => {
      if (data) {
        if (Object.is("LISTBOX", editorType) && multiple) {
          items.value = c.handleCodeListAllItems(data);
          return;
        }
        items.value = data;
      }
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    const currentMode = computed(() => {
      if (codeList && codeList.orMode) {
        return codeList.orMode;
      }
      return "STR";
    });
    const calcOrMode = useCalcOrMode(currentMode.value, c.model.valueType);
    let valueSeparator = ",";
    if (codeList && codeList.valueSeparator) {
      valueSeparator = codeList.valueSeparator;
    }
    const {
      getSelection,
      getSelectionValue
    } = useCodeListSelection(Object.is("LISTBOX", editorType) ? c.allItemsValue : "");
    const selectArray = ref([]);
    watch(() => props.value, (newVal) => {
      if (!isNil(newVal)) {
        if (multiple) {
          let selectsArray = [];
          if (editorType === "LISTBOX") {
            const {
              getSelectArray
            } = calcOrMode;
            const arr = getSelectArray(newVal, codeList, items.value, valueSeparator, codeList == null ? void 0 : codeList.codeItemValueNumber);
            if (arr) {
              selectsArray = arr;
              if (c.allItems) {
                selectsArray = getSelection([], selectsArray, items.value, items.value);
              }
            }
          } else if (editorType === "LISTBOXPICKUP") {
            if (newVal !== "") {
              selectsArray = c.model.valueType === "SIMPLES" && Array.isArray(newVal) ? newVal : newVal.split(valueSeparator);
            }
          }
          selectArray.value = selectsArray;
        } else {
          selectArray.value = [newVal];
        }
      } else {
        selectArray.value = [];
      }
    }, {
      immediate: true,
      deep: true
    });
    const onSelectArrayChange = (value) => {
      let _value;
      if (multiple) {
        let values = [...value];
        if (Object.is("LISTBOX", editorType)) {
          if (c.allItems) {
            const selection = getSelection(selectArray.value, values, items.value, items.value);
            values = getSelectionValue(selection);
          }
          const {
            setSelectArray
          } = calcOrMode;
          _value = setSelectArray(values, items.value, valueSeparator);
        } else if (Object.is("LISTBOXPICKUP", editorType)) {
          if (c.model.valueType === "SIMPLES") {
            _value = values;
          } else if (c.model.valueType === "SIMPLE") {
            _value = values.join(valueSeparator);
          }
        }
      } else {
        _value = value;
      }
      emit("change", _value);
      useInValueChange();
    };
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      items,
      selectArray,
      onSelectArrayChange,
      multiple,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    let _slot, _slot2;
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [this.multiple ? createVNode(resolveComponent("el-checkbox-group"), mergeProps({
      "class": this.ns.b("checkbox"),
      "modelValue": this.selectArray,
      "onChange": this.onSelectArrayChange
    }, this.$attrs), _isSlot(_slot = this.items.map((item, index) => createVNode(resolveComponent("el-checkbox"), {
      "key": index,
      "label": item.value,
      "disabled": this.disabled || this.readonly || item.disableSelect === true
    }, {
      default: () => {
        const c = this.controller;
        if (c.acItemProvider) {
          const component = resolveComponent(c.acItemProvider.component);
          return h(component, {
            item,
            controller: c
          });
        }
        return createVNode("span", {
          "class": this.ns.e("text")
        }, [item.text]);
      }
    }))) ? _slot : {
      default: () => [_slot]
    }) : createVNode(resolveComponent("el-radio-group"), mergeProps({
      "class": this.ns.b("radio"),
      "modelValue": this.selectArray[0]
    }, this.$attrs), _isSlot(_slot2 = this.items.map((item, index) => createVNode(resolveComponent("el-radio"), {
      "key": index,
      "label": item.value,
      "disabled": this.disabled || this.readonly || item.disableSelect === true,
      "onChange": () => {
        this.onSelectArrayChange(item.value);
      }
    }, {
      default: () => {
        const c = this.controller;
        if (c.acItemProvider) {
          const component = resolveComponent(c.acItemProvider.component);
          return h(component, {
            item,
            controller: c
          });
        }
        return createVNode("span", {
          "class": this.ns.e("text")
        }, [item.text]);
      }
    }))) ? _slot2 : {
      default: () => [_slot2]
    })]);
  }
});

export { IBizListBox };
