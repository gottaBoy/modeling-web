import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './editor-empty-text.css';

"use strict";
const IBizEditorEmptyText = /* @__PURE__ */ defineComponent({
  name: "IBizEditorEmptyText",
  props: {
    showPlaceholder: {
      type: Boolean,
      default: false
    },
    placeHolder: {
      type: String,
      default: ""
    }
  },
  setup() {
    const ns = useNamespace("editor-empty-text");
    return {
      ns
    };
  },
  render() {
    return createVNode("span", {
      "class": [this.ns.b(), this.ns.is("placeholder", this.showPlaceholder)]
    }, [this.showPlaceholder && this.placeHolder ? this.placeHolder : ibiz.config.common.emptyText]);
  }
});

export { IBizEditorEmptyText };
