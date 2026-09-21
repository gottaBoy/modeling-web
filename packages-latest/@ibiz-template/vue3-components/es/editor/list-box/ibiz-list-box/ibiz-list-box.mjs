import { isVNode, defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, h, resolveDirective, computed, ref, watch } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useCodeListListen, useFocusAndBlur, getEditorEmits, getListBoxProps } from '@ibiz-template/vue3-util';
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    let multiple = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.multiple) {
        multiple = c.toBoolean(editorModel.editorParams.multiple);
      }
    }
    const getItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.item.input", params),
        selector: ".el-radio__input"
      }, {
        class: semanticClass("editor.item.input", params),
        selector: ".el-checkbox__input"
      }, {
        class: semanticClass("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }];
    };
    const getItemChildStyle = (params) => {
      return [{
        style: semanticStyle("editor.item.input", params),
        selector: ".el-radio__input"
      }, {
        style: semanticStyle("editor.item.input", params),
        selector: ".el-checkbox__input"
      }, {
        style: semanticStyle("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }];
    };
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
    const valueSeparator = (codeList == null ? void 0 : codeList.valueSeparator) || ",";
    const items = ref([]);
    const autoSelectFirstOption = () => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item)
        return;
      let value;
      if (multiple) {
        const selections = c.allItems ? items.value.filter((_item) => _item.value !== c.allItemsValue).map((_item) => _item.value) : [item.value];
        value = c.model.valueType === "SIMPLES" ? selections : selections.join(valueSeparator);
      } else {
        value = item.value;
      }
      emit("change", value, void 0, true);
    };
    const loadListBoxItems = async () => {
      if (Object.is("LISTBOX", editorType)) {
        const controller = c;
        controller.loadCodeList(props.data).then((_codeList) => {
          if (multiple) {
            items.value = controller.handleCodeListAllItems(_codeList);
          } else {
            items.value = _codeList;
          }
          autoSelectFirstOption();
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
            autoSelectFirstOption();
          }
        }
      }
    };
    watch(() => props.data, () => {
      loadListBoxItems();
    }, {
      immediate: true,
      deep: true
    });
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
      multiple,
      editorRef,
      selectArray,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      getItemChildClass,
      getItemChildStyle,
      onSelectArrayChange
    };
  },
  render() {
    let _slot, _slot2;
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [this.multiple ? createVNode(resolveComponent("el-checkbox-group"), mergeProps({
      "class": [this.ns.b("checkbox"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.selectArray,
      "onChange": this.onSelectArrayChange
    }, this.$attrs), _isSlot(_slot = this.items.map((item, index) => withDirectives(createVNode(resolveComponent("el-checkbox"), {
      "key": index,
      "label": item.value,
      "class": [this.ns.e("item"), this.semanticClass("editor.item", {
        item,
        index
      })],
      "style": this.semanticStyle("editor.item", {
        item,
        index
      }),
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
          "class": [this.ns.e("text"), this.ns.em("item", "label")]
        }, [item.text]);
      }
    }), [[resolveDirective("child-class"), this.getItemChildClass({
      item,
      index
    })], [resolveDirective("child-style"), this.getItemChildStyle({
      item,
      index
    })]]))) ? _slot : {
      default: () => [_slot]
    }) : createVNode(resolveComponent("el-radio-group"), mergeProps({
      "class": [this.ns.b("radio"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.selectArray[0]
    }, this.$attrs), _isSlot(_slot2 = this.items.map((item, index) => withDirectives(createVNode(resolveComponent("el-radio"), {
      "key": index,
      "label": item.value,
      "disabled": this.disabled || this.readonly || item.disableSelect === true,
      "class": [this.ns.e("item"), this.semanticClass("editor.item", {
        item,
        index
      })],
      "style": this.semanticStyle("editor.item", {
        item,
        index
      }),
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
          "class": [this.ns.e("text"), this.ns.em("item", "label")]
        }, [item.text]);
      }
    }), [[resolveDirective("child-class"), this.getItemChildClass({
      item,
      index
    })], [resolveDirective("child-style"), this.getItemChildStyle({
      item,
      index
    })]]))) ? _slot2 : {
      default: () => [_slot2]
    })]);
  }
});

export { IBizListBox };
