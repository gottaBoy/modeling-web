import { isVNode, defineComponent, ref, watch, computed, createVNode, resolveComponent, mergeProps } from 'vue';
import { getRadioProps, getEditorEmits, useNamespace, useAutoFocusBlur, useCodeListListen, useFocusAndBlur } from '@ibiz-template/vue3-util';
import { notNilEmpty } from 'qx-util';
import './ibiz-radio.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizRadio = /* @__PURE__ */ defineComponent({
  name: "IBizRadio",
  props: getRadioProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("radio");
    const c = props.controller;
    const editorModel = c.model;
    let renderMode = "radio";
    let isBtnRoundCorner = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.renderMode) {
        renderMode = editorModel.editorParams.renderMode;
      }
      if (editorModel.editorParams.isBtnRoundCorner) {
        isBtnRoundCorner = c.toBoolean(editorModel.editorParams.isBtnRoundCorner);
      }
    }
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    const onSelectValueChange = (value) => {
      emit("change", value);
      useInValueChange();
    };
    const items = ref([]);
    watch(() => props.data, (newVal) => {
      c.loadCodeList(newVal).then((_codeList) => {
        items.value = _codeList;
      });
    }, {
      immediate: true,
      deep: true
    });
    const fn = (data) => {
      if (data)
        items.value = data;
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    const valueText = computed(() => {
      var _a;
      return ((_a = items.value.find((item) => item.value == props.value)) == null ? void 0 : _a.text) || "";
    });
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
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
      editorModel,
      items,
      valueText,
      onSelectValueChange,
      editorRef,
      renderMode,
      isBtnRoundCorner,
      showFormDefaultContent
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      "style": this.controller.rowNumber ? "--ibiz-radio-group-row-number:".concat(this.controller.rowNumber) : "",
      "ref": "editorRef"
    }, [this.readonly ? this.valueText : this.renderMode !== "tab" ? createVNode(resolveComponent("el-radio-group"), mergeProps({
      "class": this.ns.e("group"),
      "model-value": notNilEmpty(this.value) ? String(this.value) : "",
      "onChange": this.onSelectValueChange
    }, this.$attrs), _isSlot(_slot = this.items.map((_item, index) => this.renderMode === "radio" ? createVNode(resolveComponent("el-radio"), {
      "key": index,
      "label": notNilEmpty(_item.value) ? String(_item.value) : "",
      "disabled": this.disabled || _item.disableSelect === true
    }, {
      default: () => [createVNode("span", {
        "class": this.ns.e("text")
      }, [_item.text])]
    }) : createVNode(resolveComponent("el-radio-button"), {
      "key": index,
      "class": [this.ns.e("button"), this.isBtnRoundCorner ? this.ns.em("button", "round-corner") : ""],
      "label": notNilEmpty(_item.value) ? String(_item.value) : "",
      "disabled": this.disabled || _item.disableSelect === true
    }, {
      default: () => [createVNode("span", {
        "class": this.ns.em("button", "text")
      }, [_item.text])]
    }))) ? _slot : {
      default: () => [_slot]
    }) : createVNode("div", {
      "class": this.ns.b("tab")
    }, [this.items.map((_item) => {
      const currentValue = notNilEmpty(this.value) ? String(this.value) : "";
      const value = notNilEmpty(_item.value) ? String(_item.value) : "";
      const disabled = this.disabled || _item.disableSelect === true;
      return createVNode("span", {
        "class": [this.ns.b("tab-item"), this.ns.is("selected", currentValue === value), this.ns.is("disabled", disabled)],
        "onClick": () => {
          if (disabled) {
            return;
          }
          this.onSelectValueChange(value);
        }
      }, [_item.text || ""]);
    })])]);
  }
});

export { IBizRadio };
