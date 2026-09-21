import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './pql-editor-suggestion.css';

"use strict";
const IBizPqlEditorSuggestion = /* @__PURE__ */ defineComponent({
  name: "IBizPqlEditorSuggestion",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    renderItem: {
      type: Function
    }
  },
  emits: {
    select: (_item) => true
  },
  setup(_props, {
    emit
  }) {
    const ns = useNamespace("pql-editor-suggestion");
    const handleClick = (item) => {
      emit("select", item);
    };
    return {
      ns,
      handleClick
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": this.ns.b()
    }, [((_a = this.items[0]) == null ? void 0 : _a._msg) ? createVNode("div", {
      "class": this.ns.bm("item", "empty")
    }, [this.items[0]._msg]) : null, !((_b = this.items[0]) == null ? void 0 : _b._msg) && this.items.map((item) => {
      return createVNode("div", {
        "class": [this.ns.b("item")],
        "onClick": (e) => {
          e.stopPropagation();
          this.handleClick(item);
        }
      }, [this.renderItem ? this.renderItem(item) : createVNode("div", {
        "class": this.ns.be("item", "text")
      }, [item.label || ""])]);
    })]);
  }
});

export { IBizPqlEditorSuggestion };
