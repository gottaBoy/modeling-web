'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./not-supported-editor.css');

"use strict";
const NotSupportedEditor = /* @__PURE__ */ vue.defineComponent({
  name: "NotSupportedEditor",
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("not-supported-editor");
    return {
      ns
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [ibiz.i18n.t("editor.notSupportedEditor.unsupportedType", {
      type: this.modelData.editorType
    })]);
  }
});

exports.NotSupportedEditor = NotSupportedEditor;
