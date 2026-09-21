import { defineComponent, computed, resolveComponent, h, createVNode } from 'vue';
import '../../use/index.mjs';
import { PanelFieldController } from './panel-field.controller.mjs';
import './panel-field.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelField = /* @__PURE__ */ defineComponent({
  name: "IBizPanelField",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelFieldController,
      required: true
    },
    attrs: {
      type: Object,
      require: false
    }
  },
  setup(props) {
    const ns = useNamespace("panel-field");
    const classArr = computed(() => {
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
    return createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [editor, this.controller.state.error && createVNode("div", {
      "class": this.ns.e("error")
    }, [this.controller.state.error])]);
  }
});

export { PanelField };
