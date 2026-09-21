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
    },
    context: {
      type: Object
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("not-supported-editor");
    const isDesignPreview = ((_a = props.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    return {
      ns,
      isDesignPreview
    };
  },
  render() {
    if (this.isDesignPreview) {
      return vue.createVNode("div", {
        "class": this.ns.b()
      }, [vue.createVNode("div", {
        "class": this.ns.b("preview-content")
      }, null)]);
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [ibiz.i18n.t("editor.notSupportedEditor.unsupportedType", {
      type: this.modelData.editorType
    })]);
  }
});

exports.NotSupportedEditor = NotSupportedEditor;
