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
    },
    context: {
      type: Object
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("not-supported-editor");
    const isDesignPreview = ((_a = props.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    return {
      ns,
      isDesignPreview
    };
  },
  render() {
    if (this.isDesignPreview) {
      return createVNode("div", {
        "class": this.ns.b()
      }, [createVNode("div", {
        "class": this.ns.b("preview-content")
      }, null)]);
    }
    return createVNode("div", {
      "class": this.ns.b()
    }, [ibiz.i18n.t("editor.notSupportedEditor.unsupportedType", {
      type: this.modelData.editorType
    })]);
  }
});

export { NotSupportedEditor };
