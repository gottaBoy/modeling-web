'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
const CompositeFormItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCompositeFormItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormItemController,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    var _a, _b, _c, _d;
    const c = props.controller;
    const onValueChange = (val, name) => {
      props.controller.setDataValue(val, name);
    };
    const extraParams = vue.ref({});
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
        const component = vue.resolveComponent(this.controller.editorProvider.formEditor);
        editor = vue.h(component, {
          ...editorProps
        });
      } else {
        editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
          "modelData": this.modelData.editor
        }, null);
      }
    }
    return editor;
  }
});

exports.CompositeFormItem = CompositeFormItem;
exports.default = CompositeFormItem;
