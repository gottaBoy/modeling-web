'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./pdf-print-process.css');

"use strict";
const PdfPrintProcess = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPdfPrintProcess",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("pdf-print-process");
    const contentRef = vue.ref(null);
    vue.watch(() => props.data, () => {
      if (["success", "failed"].includes(props.data.status)) {
        setTimeout(() => {
          emit("close");
        }, 3e3);
      }
      if (contentRef.value) {
        vue.nextTick(() => {
          var _a;
          (_a = contentRef.value) == null ? void 0 : _a.scrollTo({
            top: contentRef.value.scrollHeight,
            behavior: "smooth"
          });
        });
      }
    }, {
      deep: true
    });
    const onClose = () => {
      emit("close");
    };
    const renderHeader = () => {
      return vue.createVNode("div", {
        "class": ns.e("header")
      }, [vue.createVNode("div", {
        "class": ns.e("header-caption")
      }, [vue.createVNode("div", {
        "class": [ns.e("status"), ns.is("processing", props.data.status === "processing"), ns.is("success", props.data.status === "success"), ns.is("failed", props.data.status === "failed")]
      }, null), vue.createVNode("div", {
        "class": ns.e("caption")
      }, [props.data.caption])]), vue.createVNode("div", {
        "class": ns.e("toolbar")
      }, [vue.createVNode("ion-icon", {
        "name": "close-outline",
        "onClick": onClose
      }, null)])]);
    };
    const renderContent = () => {
      return vue.createVNode("div", {
        "class": ns.e("content")
      }, [vue.createVNode("div", {
        "class": ns.e("process")
      }, [vue.createVNode(vue.resolveComponent("el-progress"), {
        "percentage": props.data.percentage
      }, null)]), vue.createVNode("div", {
        "class": ns.e("steps"),
        "ref": "contentRef"
      }, [props.data.items.map((item) => {
        return vue.createVNode("div", {
          "class": ns.e("step")
        }, [vue.createVNode("div", {
          "class": ns.e("step-time")
        }, [item.time]), vue.createVNode("div", {
          "class": ns.e("step-title")
        }, [item.title])]);
      })])]);
    };
    return {
      ns,
      contentRef,
      renderHeader,
      renderContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.renderHeader(), this.renderContent()]);
  }
});

exports.PdfPrintProcess = PdfPrintProcess;
