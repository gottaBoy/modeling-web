'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
require('./ibiz-radio.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizRadio = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRadio",
  props: vue3Util.getRadioProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("radio");
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
    } = vue3Util.useAutoFocusBlur(props, emit);
    const onSelectValueChange = (value) => {
      emit("change", value);
      useInValueChange();
    };
    const items = vue.ref([]);
    vue.watch(() => props.data, (newVal) => {
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
    vue3Util.useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    const valueText = vue.computed(() => {
      var _a;
      return ((_a = items.value.find((item) => item.value == props.value)) == null ? void 0 : _a.text) || "";
    });
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      "style": this.controller.rowNumber ? "--ibiz-radio-group-row-number:".concat(this.controller.rowNumber) : "",
      "ref": "editorRef"
    }, [this.readonly ? this.valueText : this.renderMode !== "tab" ? vue.createVNode(vue.resolveComponent("el-radio-group"), vue.mergeProps({
      "class": this.ns.e("group"),
      "model-value": qxUtil.notNilEmpty(this.value) ? String(this.value) : "",
      "onChange": this.onSelectValueChange
    }, this.$attrs), _isSlot(_slot = this.items.map((_item, index) => this.renderMode === "radio" ? vue.createVNode(vue.resolveComponent("el-radio"), {
      "key": index,
      "label": qxUtil.notNilEmpty(_item.value) ? String(_item.value) : "",
      "disabled": this.disabled || _item.disableSelect === true
    }, {
      default: () => [vue.createVNode("span", {
        "class": this.ns.e("text")
      }, [_item.text])]
    }) : vue.createVNode(vue.resolveComponent("el-radio-button"), {
      "key": index,
      "class": [this.ns.e("button"), this.isBtnRoundCorner ? this.ns.em("button", "round-corner") : ""],
      "label": qxUtil.notNilEmpty(_item.value) ? String(_item.value) : "",
      "disabled": this.disabled || _item.disableSelect === true
    }, {
      default: () => [vue.createVNode("span", {
        "class": this.ns.em("button", "text")
      }, [_item.text])]
    }))) ? _slot : {
      default: () => [_slot]
    }) : vue.createVNode("div", {
      "class": this.ns.b("tab")
    }, [this.items.map((_item) => {
      const currentValue = qxUtil.notNilEmpty(this.value) ? String(this.value) : "";
      const value = qxUtil.notNilEmpty(_item.value) ? String(_item.value) : "";
      const disabled = this.disabled || _item.disableSelect === true;
      return vue.createVNode("span", {
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

exports.IBizRadio = IBizRadio;
