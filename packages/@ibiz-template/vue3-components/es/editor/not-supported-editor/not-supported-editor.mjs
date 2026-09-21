import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './not-supported-editor.css';

"use strict";
const NotSupportedEditor = /* @__PURE__ */ defineComponent({
  name: "NotSupportedEditor",
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("not-supported-editor");
    return {
      ns
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [ibiz.i18n.t("editor.notSupportedEditor.unsupportedType", {
      type: this.modelData.editorType
    })]);
  }
});

export { NotSupportedEditor };
