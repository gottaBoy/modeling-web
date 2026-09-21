'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./pql-editor-suggestion.css');

"use strict";
const IBizPqlEditorSuggestion = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("pql-editor-suggestion");
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [((_a = this.items[0]) == null ? void 0 : _a._msg) ? vue.createVNode("div", {
      "class": this.ns.bm("item", "empty")
    }, [this.items[0]._msg]) : null, !((_b = this.items[0]) == null ? void 0 : _b._msg) && this.items.map((item) => {
      return vue.createVNode("div", {
        "class": [this.ns.b("item")],
        "onClick": (e) => {
          e.stopPropagation();
          this.handleClick(item);
        }
      }, [this.renderItem ? this.renderItem(item) : vue.createVNode("div", {
        "class": this.ns.be("item", "text")
      }, [item.label || ""])]);
    })]);
  }
});

exports.IBizPqlEditorSuggestion = IBizPqlEditorSuggestion;
