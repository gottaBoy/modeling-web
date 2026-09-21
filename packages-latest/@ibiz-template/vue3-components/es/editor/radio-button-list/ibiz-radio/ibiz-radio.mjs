import { isVNode, defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, ref, watch, computed } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useCodeListListen, useFocusAndBlur, getEditorEmits, getRadioProps } from '@ibiz-template/vue3-util';
import { notNilEmpty } from 'qx-util';
import { showTitle } from '@ibiz-template/core';
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    const getItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.item.input", params),
        selector: ".el-radio__input"
      }, {
        class: semanticClass("editor.item.icon", params),
        selector: ".".concat(ns.em("item", "icon"))
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
        style: semanticStyle("editor.item.icon", params),
        selector: ".".concat(ns.em("item", "icon"))
      }, {
        style: semanticStyle("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }];
    };
    let renderMode = "radio";
    let isBtnRoundCorner = false;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.renderMode) {
        renderMode = editorModel.editorParams.renderMode;
      }
      if (editorModel.editorParams.rendermode) {
        renderMode = editorModel.editorParams.rendermode;
      }
      if (editorModel.editorParams.isBtnRoundCorner) {
        isBtnRoundCorner = c.toBoolean(editorModel.editorParams.isBtnRoundCorner);
      }
      if (editorModel.editorParams.isbtnroundcorner) {
        isBtnRoundCorner = c.toBoolean(editorModel.editorParams.isbtnroundcorner);
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
    const autoSelectFirstOption = () => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item)
        return;
      emit("change", item.value, void 0, true);
    };
    watch(() => props.data, (newVal) => {
      c.loadCodeList(newVal).then((_codeList) => {
        items.value = _codeList;
        autoSelectFirstOption();
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
      items,
      valueText,
      editorRef,
      renderMode,
      editorModel,
      semanticClass,
      semanticStyle,
      isBtnRoundCorner,
      showFormDefaultContent,
      getItemChildClass,
      getItemChildStyle,
      onSelectValueChange
    };
  },
  render() {
    var _a;
    let _slot;
    const itemWidth = (_a = this.controller.editorParams) == null ? void 0 : _a.itemwidth;
    const width = itemWidth ? "".concat(itemWidth, "px") : "";
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      "style": [this.controller.rowNumber ? "".concat(this.ns.cssVarBlockName("row-number"), ":").concat(this.controller.rowNumber) : "", this.semanticStyle("editor.root")],
      "ref": "editorRef"
    }, [this.readonly ? this.valueText : this.renderMode !== "tab" ? createVNode(resolveComponent("el-radio-group"), mergeProps({
      "class": [this.ns.e("group"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "model-value": notNilEmpty(this.value) ? String(this.value) : "",
      "onChange": this.onSelectValueChange
    }, this.$attrs), _isSlot(_slot = this.items.map((_item, index) => {
      if (this.renderMode === "radio")
        return withDirectives(createVNode(resolveComponent("el-radio"), {
          "key": index,
          "class": [this.ns.e("item"), this.semanticClass("editor.item", {
            item: _item,
            index
          })],
          "style": {
            width,
            ...this.semanticStyle("editor.item", {
              item: _item,
              index
            })
          },
          "title": showTitle(_item.text),
          "label": notNilEmpty(_item.value) ? String(_item.value) : "",
          "disabled": this.disabled || _item.disableSelect === true
        }, {
          default: () => [_item.sysImage && createVNode(resolveComponent("iBizIcon"), {
            "class": this.ns.em("item", "icon"),
            "icon": _item.sysImage
          }, null), createVNode("span", {
            "class": [this.ns.e("text"), this.ns.em("item", "label")]
          }, [_item.text])]
        }), [[resolveDirective("child-class"), this.getItemChildClass({
          item: _item,
          index
        })], [resolveDirective("child-style"), this.getItemChildStyle({
          item: _item,
          index
        })]]);
      return withDirectives(createVNode(resolveComponent("el-radio-button"), {
        "key": index,
        "class": [this.ns.e("item"), this.ns.e("button"), this.isBtnRoundCorner ? this.ns.em("button", "round-corner") : "", this.semanticClass("editor.item", {
          item: _item,
          index
        })],
        "style": {
          width,
          ...this.semanticStyle("editor.item", {
            item: _item,
            index
          })
        },
        "title": showTitle(_item.text),
        "label": notNilEmpty(_item.value) ? String(_item.value) : "",
        "disabled": this.disabled || _item.disableSelect === true
      }, {
        default: () => [_item.sysImage && createVNode(resolveComponent("iBizIcon"), {
          "class": this.ns.em("item", "icon"),
          "icon": _item.sysImage
        }, null), createVNode("span", {
          "class": [this.ns.em("button", "text"), this.ns.em("item", "label")]
        }, [_item.text])]
      }), [[resolveDirective("child-class"), this.getItemChildClass({
        item: _item,
        index
      })], [resolveDirective("child-style"), this.getItemChildStyle({
        item: _item,
        index
      })]]);
    })) ? _slot : {
      default: () => [_slot]
    }) : createVNode("div", {
      "class": [this.ns.b("tab"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.items.map((_item, index) => {
      const currentValue = notNilEmpty(this.value) ? String(this.value) : "";
      const value = notNilEmpty(_item.value) ? String(_item.value) : "";
      const disabled = this.disabled || _item.disableSelect === true;
      return withDirectives(createVNode("span", {
        "class": [this.ns.e("item"), this.ns.b("tab-item"), this.ns.is("selected", currentValue === value), this.ns.is("disabled", disabled), this.semanticClass("editor.item", {
          item: _item,
          index
        })],
        "style": {
          width,
          ...this.semanticStyle("editor.item", {
            item: _item,
            index
          })
        },
        "title": showTitle(_item.text),
        "onClick": () => {
          if (disabled) {
            return;
          }
          this.onSelectValueChange(value);
        }
      }, [_item.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "class": this.ns.em("item", "icon"),
        "icon": _item.sysImage
      }, null), createVNode("span", {
        "class": [this.ns.be("tab-item", "text"), this.ns.em("item", "label")]
      }, [_item.text || ""])]), [[resolveDirective("child-class"), this.getItemChildClass({
        item: _item,
        index
      })], [resolveDirective("child-style"), this.getItemChildStyle({
        item: _item,
        index
      })]]);
    })])]);
  }
});

export { IBizRadio };
