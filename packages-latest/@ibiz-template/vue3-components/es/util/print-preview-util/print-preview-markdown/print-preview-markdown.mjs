import { defineComponent, createVNode, ref, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { CloseFullScreenSvg, FullScreenSvg, CloseSvg } from './icon/icon.mjs';
import './print-preview-markdown.css';

"use strict";
const PrintPreviewMarkdown = /* @__PURE__ */ defineComponent({
  name: "PrintPreviewMarkdown",
  props: {
    modal: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const ns = useNamespace("print-preview-markdown");
    const printPreview = ref();
    const isFull = ref(false);
    const switchFull = () => {
      if (isFull.value) {
        ibiz.fullscreenUtil.closeElementFullscreen();
      } else {
        ibiz.fullscreenUtil.openElementFullscreen(printPreview.value);
      }
      isFull.value = !isFull.value;
    };
    const onClose = () => {
      props.modal.dismiss();
    };
    const renderHeader = () => {
      return createVNode("div", {
        "class": ns.e("header")
      }, [createVNode("div", {
        "class": ns.em("header", "caption")
      }, [ibiz.i18n.t("util.printPreviewUtil.title")]), createVNode("div", {
        "class": ns.em("header", "action")
      }, [createVNode("div", {
        "class": ns.em("header", "full"),
        "onClick": switchFull,
        "title": ibiz.i18n.t(isFull.value ? "app.cancelFullscreen" : "app.fullscreen")
      }, [isFull.value ? createVNode(CloseFullScreenSvg, null, null) : createVNode(FullScreenSvg, null, null)]), isFull.value && createVNode("div", {
        "class": ns.em("header", "close"),
        "onClick": onClose,
        "title": ibiz.i18n.t("app.close")
      }, [createVNode(CloseSvg, null, null)])])]);
    };
    const renderContent = () => {
      const markdown = resolveComponent("IBizMarkDown");
      return createVNode("div", {
        "class": ns.e("content")
      }, [h(markdown, {
        value: props.value,
        readonly: true
      })]);
    };
    return {
      ns,
      printPreview,
      renderHeader,
      renderContent
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b(),
      "ref": "printPreview"
    }, [this.renderHeader(), this.renderContent()]);
  }
});

export { PrintPreviewMarkdown };
