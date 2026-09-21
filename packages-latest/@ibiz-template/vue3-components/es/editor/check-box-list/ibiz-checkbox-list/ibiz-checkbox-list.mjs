import { defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, computed, ref, watch } from 'vue';
import { useNamespace, useSemanticNode, useCodeListListen, useAutoFocusBlur, useFocusAndBlur, getEditorEmits, getCheckboxListProps } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import { useCalcOrMode, useCodeListSelection } from '@ibiz-template/runtime';
import './ibiz-checkbox-list.css';

"use strict";
const IBizCheckboxList = /* @__PURE__ */ defineComponent({
  name: "IBizCheckboxList",
  props: getCheckboxListProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("checkbox-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const codeList = c.codeList;
    const getItemChildClass = (params) => {
      return [{
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
        selector: ".el-checkbox__input"
      }, {
        style: semanticStyle("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }];
    };
    let renderMode = "default";
    let isBtnRoundCorner = false;
    const editorModel = c.model;
    if (editorModel.editorParams) {
      const rendermode = editorModel.editorParams.rendermode;
      if (rendermode === "button" || rendermode === "default") {
        renderMode = rendermode;
      }
      if (editorModel.editorParams.isbtnroundcorner) {
        isBtnRoundCorner = c.toBoolean(editorModel.editorParams.isbtnroundcorner);
      }
    }
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const valueSeparator = (codeList == null ? void 0 : codeList.valueSeparator) || ",";
    const items = ref([]);
    const autoSelectFirstOption = () => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item)
        return;
      const selections = c.allItems ? items.value.filter((_item) => _item.value !== c.allItemsValue).map((_item) => _item.value) : [item.value];
      emit("change", c.model.valueType === "SIMPLES" ? selections : selections.join(valueSeparator), void 0, true);
    };
    watch(() => props.data, (newVal) => {
      c.loadCodeList(newVal).then((_codeList) => {
        items.value = c.handleCodeListAllItems(_codeList);
        autoSelectFirstOption();
      });
    }, {
      immediate: true,
      deep: true
    });
    const getCodeListItem = (value) => {
      var _a;
      return (_a = items.value) == null ? void 0 : _a.find((item) => item.value === value);
    };
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
      valueText,
      editorRef,
      renderMode,
      selectArray,
      semanticClass,
      semanticStyle,
      isBtnRoundCorner,
      showFormDefaultContent,
      getCodeListItem,
      getItemChildClass,
      getItemChildStyle,
      onSelectArrayChange
    };
  },
  render() {
    return createVNode("div", {
      "ref": "editorRef",
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      "style": [this.controller.rowNumber ? "".concat(this.ns.cssVarBlockName("row-number"), ":").concat(this.controller.rowNumber) : "", this.semanticStyle("editor.root")]
    }, [this.readonly ? this.valueText : createVNode(resolveComponent("el-checkbox-group"), mergeProps({
      "class": [this.ns.e("content"), this.semanticClass("editor.content"), this.renderMode === "button" ? this.ns.e("button-group") : "", this.ns.is("round-btn", this.isBtnRoundCorner)],
      "style": this.semanticStyle("editor.content"),
      "model-value": this.selectArray,
      "onChange": this.onSelectArrayChange
    }, this.$attrs), {
      default: () => [this.renderMode === "button" ? this.items.map((item, index) => {
        const codeListItem = this.getCodeListItem(item.value);
        return withDirectives(createVNode(resolveComponent("el-checkbox-button"), {
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
          "disabled": this.disabled || item.disableSelect === true
        }, {
          default: () => [createVNode("span", {
            "class": [this.ns.e("text"), this.ns.em("item", "label")],
            "style": {
              color: (codeListItem == null ? void 0 : codeListItem.color) || void 0,
              backgroundColor: (codeListItem == null ? void 0 : codeListItem.bkcolor) || void 0,
              borderColor: (codeListItem == null ? void 0 : codeListItem.bkcolor) || void 0
            }
          }, [item.text])]
        }), [[resolveDirective("child-class"), [{
          class: codeListItem == null ? void 0 : codeListItem.textCls,
          selector: ".el-checkbox-button__inner"
        }, ...this.getItemChildClass({
          item,
          index
        })]], [resolveDirective("child-style"), this.getItemChildStyle({
          item,
          index
        })]]);
      }) : this.items.map((item, index) => {
        return withDirectives(createVNode(resolveComponent("el-checkbox"), {
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
          "disabled": this.disabled || item.disableSelect === true
        }, {
          default: () => [createVNode("span", {
            "class": [this.ns.e("text"), this.ns.em("item", "label")]
          }, [item.text])]
        }), [[resolveDirective("child-class"), this.getItemChildClass({
          item,
          index
        })], [resolveDirective("child-style"), this.getItemChildStyle({
          item,
          index
        })]]);
      })]
    })]);
  }
});

export { IBizCheckboxList };
