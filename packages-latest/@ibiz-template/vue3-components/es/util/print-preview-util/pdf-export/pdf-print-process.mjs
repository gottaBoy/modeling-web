import { defineComponent, createVNode, ref, watch, nextTick, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './pdf-print-process.css';

"use strict";
const PdfPrintProcess = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("pdf-print-process");
    const contentRef = ref(null);
    watch(() => props.data, () => {
      if (["success", "failed"].includes(props.data.status)) {
        setTimeout(() => {
          emit("close");
        }, 3e3);
      }
      if (contentRef.value) {
        nextTick(() => {
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
      return createVNode("div", {
        "class": ns.e("header")
      }, [createVNode("div", {
        "class": ns.e("header-caption")
      }, [createVNode("div", {
        "class": [ns.e("status"), ns.is("processing", props.data.status === "processing"), ns.is("success", props.data.status === "success"), ns.is("failed", props.data.status === "failed")]
      }, null), createVNode("div", {
        "class": ns.e("caption")
      }, [props.data.caption])]), createVNode("div", {
        "class": ns.e("toolbar")
      }, [createVNode("ion-icon", {
        "name": "close-outline",
        "onClick": onClose
      }, null)])]);
    };
    const renderContent = () => {
      return createVNode("div", {
        "class": ns.e("content")
      }, [createVNode("div", {
        "class": ns.e("process")
      }, [createVNode(resolveComponent("el-progress"), {
        "percentage": props.data.percentage
      }, null)]), createVNode("div", {
        "class": ns.e("steps"),
        "ref": "contentRef"
      }, [props.data.items.map((item) => {
        return createVNode("div", {
          "class": ns.e("step")
        }, [createVNode("div", {
          "class": ns.e("step-time")
        }, [item.time]), createVNode("div", {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.renderHeader(), this.renderContent()]);
  }
});

export { PdfPrintProcess };
