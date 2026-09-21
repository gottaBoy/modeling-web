'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./editor-empty-text.css');

"use strict";
const IBizEditorEmptyText = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("editor-empty-text");
    return {
      ns
    };
  },
  render() {
    return vue.createVNode("span", {
      "class": [this.ns.b(), this.ns.is("placeholder", this.showPlaceholder)]
    }, [this.showPlaceholder && this.placeHolder ? this.placeHolder : ibiz.config.common.emptyText]);
  }
});

exports.IBizEditorEmptyText = IBizEditorEmptyText;
