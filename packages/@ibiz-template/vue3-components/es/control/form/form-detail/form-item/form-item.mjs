import { isVNode, defineComponent, ref, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-item.css';
import { FormItemController } from '@ibiz-template/runtime';
import { CompositeFormItem } from './composite-form-item/composite-form-item.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormItem = /* @__PURE__ */ defineComponent({
  name: "IBizFormItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormItemController,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    var _a, _b, _c, _d;
    const ns = useNamespace("form-item");
    const c = props.controller;
    const onValueChange = (val, name, ignore = false) => {
      props.controller.setDataValue(val, name, ignore);
    };
    const extraParams = ref({});
    let emptyHiddenUnit = ibiz.config.form.emptyHiddenUnit;
    const emptyhiddenunit = (_b = (_a = props.controller.form) == null ? void 0 : _a.controlParams) == null ? void 0 : _b.emptyhiddenunit;
    if (emptyhiddenunit) {
      emptyHiddenUnit = Object.is(emptyhiddenunit, "true");
    }
    const editorParams = ((_d = (_c = props.controller.editor) == null ? void 0 : _c.model) == null ? void 0 : _d.editorParams) || {};
    const {
      EMPTYHIDDENUNIT
    } = editorParams;
    if (EMPTYHIDDENUNIT) {
      emptyHiddenUnit = Object.is(EMPTYHIDDENUNIT, "true");
    }
    Object.assign(extraParams.value, {
      emptyHiddenUnit
    });
    return {
      ns,
      c,
      extraParams,
      onValueChange
    };
  },
  render() {
    var _a, _b, _c, _d, _e;
    if (!this.c.state.visible || ((_a = this.controller.model.editor) == null ? void 0 : _a.editorType) === "HIDDEN") {
      return null;
    }
    let editor = null;
    const compositeItem = this.controller.model.compositeItem;
    if (compositeItem) {
      const {
        editorItems = []
      } = this.controller.model.editor || {};
      editor = editorItems.map((item) => {
        const controller = this.controller.form.details[item.id];
        return createVNode(CompositeFormItem, {
          "modelData": controller.model,
          "controller": controller,
          "attrs": this.attrs
        }, null);
      });
    } else {
      const editMode = (_d = (_c = (_b = this.controller.editor) == null ? void 0 : _b.model) == null ? void 0 : _c.editorParams) == null ? void 0 : _d.editMode;
      const editorProps = {
        style: (_e = this.controller.editor) == null ? void 0 : _e.style,
        value: this.controller.value,
        data: this.controller.data,
        controller: this.controller.editor,
        disabled: this.controller.state.disabled,
        readonly: this.controller.state.readonly,
        onChange: this.onValueChange,
        extraParams: this.extraParams,
        controlParams: editMode ? {
          ...this.controller.form.controlParams,
          editmode: editMode
        } : this.controller.form.controlParams,
        onFocus: (event) => this.c.onFocus(event),
        onBlur: (event) => this.c.onBlur(event),
        onEnter: (event) => this.controller.onEnter(event),
        onClick: (event, params) => this.controller.onClick(event, params),
        ...this.attrs
      };
      if (this.c.form.state.isLoaded) {
        if (this.$slots.default) {
          editor = this.$slots.default(editorProps);
        } else if (this.controller.editorProvider) {
          const component = resolveComponent(this.controller.editorProvider.formEditor);
          editor = h(component, {
            ...editorProps
          });
        } else {
          editor = createVNode(resolveComponent("not-supported-editor"), {
            "modelData": this.modelData.editor
          }, null);
        }
      }
    }
    return createVNode(resolveComponent("iBizFormItemContainer"), {
      "id": "".concat(this.controller.form.view.model.codeName, "_").concat(this.controller.form.model.codeName, "_").concat(this.modelData.codeName),
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.ns.is("compositeItem", compositeItem), ...this.controller.containerClass],
      "style": this.modelData.cssStyle,
      "required": this.c.state.required,
      "error": this.c.state.error,
      "label": this.c.labelCaption,
      "labelSysImg": this.modelData.sysImage,
      "labelClass": this.controller.labelClass,
      "label-pos": this.c.model.labelPos,
      "label-width": this.c.model.labelWidth,
      "enableInputTip": this.modelData.enableInputTip,
      "inputTip": this.modelData.inputTip,
      "inputTipUrl": this.modelData.inputTipUrl,
      "inputTipClosable": this.modelData.inputTipClosable,
      "onClick": (event) => this.c.onClick(event)
    }, _isSlot(editor) ? editor : {
      default: () => [editor]
    });
  }
});

export { FormItem, FormItem as default };
