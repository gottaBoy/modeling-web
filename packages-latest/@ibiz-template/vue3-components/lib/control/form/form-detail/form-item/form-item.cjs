'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var compositeFormItem = require('./composite-form-item/composite-form-item.cjs');
require('./form-item.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-item");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const onValueChange = (val, name, ignore = false) => {
      props.controller.setDataValue(val, name, ignore);
    };
    const CustomHtml = vue3Util.computedAsync(async () => {
      const html = await props.controller.getCustomHtml(props.controller.data);
      return html;
    });
    const showTitle = vue.computed(() => {
      const {
        controlRenders = [],
        id
      } = c.model;
      return !controlRenders.some((renderItem) => renderItem.id === "".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip"));
    });
    return {
      ns,
      c,
      showTitle,
      CustomHtml,
      onValueChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b, _c, _d, _e;
    if (!this.c.state.visible || ((_a = this.c.model.editor) == null ? void 0 : _a.editorType) === "HIDDEN")
      return null;
    let editor = null;
    const compositeItem = this.c.model.compositeItem;
    const {
      editorType,
      editorItems = []
    } = this.c.model.editor || {};
    if (compositeItem && editorType && !editorType.includes("DATERANGE") && !editorType.includes("NUMBERRANGE")) {
      editor = editorItems.map((item, index) => {
        const controller = this.c.form.details[item.id];
        return [
          vue.createVNode(compositeFormItem.CompositeFormItem, {
            "modelData": controller.model,
            "controller": controller,
            "attrs": this.attrs
          }, null),
          // feat：复合表单项样式2会在编辑器之间加`-`分隔符
          editorItems.length - 1 > index && this.c.model.detailStyle === "STYLE2" && vue.createVNode("span", {
            "class": this.ns.e("composite-separator")
          }, [vue.createTextVNode("-")])
        ];
      });
    } else {
      const editMode = (_d = (_c = (_b = this.c.editor) == null ? void 0 : _b.model) == null ? void 0 : _c.editorParams) == null ? void 0 : _d.editMode;
      const editorProps = {
        style: (_e = this.c.editor) == null ? void 0 : _e.style,
        class: this.c.state.editorClass,
        value: this.c.value,
        data: this.c.data,
        showTitle: this.showTitle,
        controller: this.c.editor,
        disabled: this.c.state.disabled,
        readonly: this.c.state.readonly,
        onChange: this.onValueChange,
        controlParams: editMode ? {
          ...this.c.form.controlParams,
          editmode: editMode
        } : this.c.form.controlParams,
        onFocus: (event) => this.c.onFocus(event),
        onBlur: (event) => this.c.onBlur(event),
        onEnter: (event) => this.c.onEnter(event),
        onClick: (event, params) => this.c.onClick(event, params),
        onCustomAction: (_value) => this.c.onCustomAction(_value),
        ...this.attrs
      };
      if (this.$slots.default) {
        editor = this.$slots.default(editorProps);
      } else if (this.c.editorProvider) {
        const component = vue.resolveComponent(this.c.editorProvider.formEditor);
        editor = vue.h(component, {
          ...editorProps
        });
      } else {
        editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
          "modelData": this.modelData.editor,
          "context": this.c.context
        }, null);
      }
    }
    if (this.c.isCustomCode)
      return vue.withDirectives(vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.e("script"), this.semanticClass("item", {
          item: this.controller
        }), this.ns.m(this.modelData.id), this.ns.is("compositeItem", compositeItem), ...this.c.containerClass],
        "style": [this.modelData.cssStyle, this.semanticStyle("item", {
          item: this.controller
        })],
        "innerHTML": this.CustomHtml
      }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.c.data, this.c.model, this.c.form)]]);
    return vue.createVNode(vue.resolveComponent("iBizFormItemContainer"), {
      "id": "".concat(this.c.form.view.model.codeName, "_").concat(this.c.form.model.codeName, "_").concat(this.modelData.codeName),
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("item", {
        item: this.controller
      }), this.ns.is("compositeItem", compositeItem), ...this.c.containerClass],
      "style": [this.ns.cssVarBlock({
        "label-width": "".concat(this.c.model.labelWidth || 130, "px")
      }), this.modelData.cssStyle, this.semanticStyle("item", {
        item: this.controller
      })],
      "controller": this.c,
      "onClick": (event) => this.c.onClick(event)
    }, _isSlot(editor) ? editor : {
      default: () => [editor]
    });
  }
});

exports.FormItem = FormItem;
exports.default = FormItem;
