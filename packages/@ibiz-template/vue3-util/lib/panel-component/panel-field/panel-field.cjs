'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelField_controller = require('./panel-field.controller.cjs');
require('./panel-field.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelField = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelField",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelField_controller.PanelFieldController,
      required: true
    },
    attrs: {
      type: Object,
      require: false
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-field");
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id), ns.is("error", !!props.controller.state.error)];
      result.push(...props.controller.containerClass);
      return result;
    });
    const onValueChange = (val, name) => {
      props.controller.setDataValue(val, name);
    };
    return {
      ns,
      classArr,
      onValueChange
    };
  },
  render() {
    let editor = null;
    if (this.controller.data) {
      const editorProps = {
        value: this.controller.value,
        data: this.controller.data,
        controller: this.controller.editor,
        disabled: this.controller.state.disabled,
        class: this.ns.b("content"),
        readonly: this.controller.state.readonly,
        onChange: this.onValueChange,
        onFocus: (event) => this.controller.onFocus(event),
        onBlur: (event) => this.controller.onBlur(event),
        onEnter: (event) => this.controller.onEnter(event),
        ...this.attrs
      };
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
    return vue.createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [editor, this.controller.state.error && vue.createVNode("div", {
      "class": this.ns.e("error")
    }, [this.controller.state.error])]);
  }
});

exports.PanelField = PanelField;
