import { isVNode, defineComponent, computed, ref, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getCheckboxListProps, getEditorEmits, useNamespace, useCodeListListen, useAutoFocusBlur, useFocusAndBlur } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import { useCalcOrMode, useCodeListSelection } from '@ibiz-template/runtime';
import './ibiz-checkbox-list.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizCheckboxList = /* @__PURE__ */ defineComponent({
  name: "IBizCheckboxList",
  props: getCheckboxListProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("checkbox-list");
    const c = props.controller;
    const codeList = c.codeList;
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const items = ref([]);
    watch(() => props.data, (newVal) => {
      c.loadCodeList(newVal).then((_codeList) => {
        items.value = c.handleCodeListAllItems(_codeList);
      });
    }, {
      immediate: true,
      deep: true
    });
    const currentMode = computed(() => {
      if (codeList && codeList.orMode) {
        return codeList.orMode;
      }
      return "STR";
    });
    const calcOrMode = useCalcOrMode(currentMode.value, c.model.valueType);
    const fn = (data) => {
      if (data)
        items.value = c.handleCodeListAllItems(data);
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    let valueSeparator = ",";
    if (codeList && codeList.valueSeparator) {
      valueSeparator = codeList.valueSeparator;
    }
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    const {
      getSelection,
      getSelectionValue
    } = useCodeListSelection(c.allItemsValue);
    const selectArray = computed({
      get() {
        if (!isNil(props.value)) {
          const {
            getSelectArray
          } = calcOrMode;
          const selectsArray = getSelectArray(props.value, codeList, items.value, valueSeparator, codeList == null ? void 0 : codeList.codeItemValueNumber);
          if (selectsArray) {
            if (c.allItems) {
              return getSelection([], selectsArray, items.value, items.value);
            }
            return selectsArray;
          }
        }
        return [];
      },
      set(val) {
        if (c.allItems) {
          const selection = getSelection(selectArray.value, val, items.value, items.value);
          val = getSelectionValue(selection);
        }
        let value = null;
        const {
          setSelectArray
        } = calcOrMode;
        value = setSelectArray(val, items.value, valueSeparator);
        emit("change", value);
        useInValueChange();
      }
    });
    const onSelectArrayChange = (value) => {
      selectArray.value = value;
    };
    const valueText = computed(() => {
      const valueArr = Array.isArray(selectArray.value) ? selectArray.value : [selectArray.value];
      return items.value.filter((item) => {
        let isInclude = false;
        valueArr.forEach((val) => {
          if (val == item.value) {
            isInclude = true;
          }
        });
        return isInclude;
      }).map((item) => item.text).join(",");
    });
    watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      items,
      selectArray,
      valueText,
      editorRef,
      onSelectArrayChange,
      showFormDefaultContent
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "ref": "editorRef",
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      "style": this.controller.rowNumber ? "--ibiz-checkbox-list-group-row-number:".concat(this.controller.rowNumber) : ""
    }, [this.readonly ? this.valueText : createVNode(resolveComponent("el-checkbox-group"), mergeProps({
      "model-value": this.selectArray,
      "onChange": this.onSelectArrayChange
    }, this.$attrs), _isSlot(_slot = this.items.map((item, index) => createVNode(resolveComponent("el-checkbox"), {
      "key": index,
      "label": item.value,
      "disabled": this.disabled || item.disableSelect === true
    }, {
      default: () => [createVNode("span", {
        "class": this.ns.e("text")
      }, [item.text])]
    }))) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

export { IBizCheckboxList };
