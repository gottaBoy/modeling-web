'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var icon = require('./icon/icon.cjs');
require('./print-preview-markdown.css');

"use strict";
const PrintPreviewMarkdown = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("print-preview-markdown");
    const printPreview = vue.ref();
    const isFull = vue.ref(false);
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
      return vue.createVNode("div", {
        "class": ns.e("header")
      }, [vue.createVNode("div", {
        "class": ns.em("header", "caption")
      }, [ibiz.i18n.t("util.printPreviewUtil.title")]), vue.createVNode("div", {
        "class": ns.em("header", "action")
      }, [vue.createVNode("div", {
        "class": ns.em("header", "full"),
        "onClick": switchFull,
        "title": ibiz.i18n.t(isFull.value ? "app.cancelFullscreen" : "app.fullscreen")
      }, [isFull.value ? vue.createVNode(icon.CloseFullScreenSvg, null, null) : vue.createVNode(icon.FullScreenSvg, null, null)]), isFull.value && vue.createVNode("div", {
        "class": ns.em("header", "close"),
        "onClick": onClose,
        "title": ibiz.i18n.t("app.close")
      }, [vue.createVNode(icon.CloseSvg, null, null)])])]);
    };
    const renderContent = () => {
      const markdown = vue.resolveComponent("IBizMarkDown");
      return vue.createVNode("div", {
        "class": ns.e("content")
      }, [vue.h(markdown, {
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
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "ref": "printPreview"
    }, [this.renderHeader(), this.renderContent()]);
  }
});

exports.PrintPreviewMarkdown = PrintPreviewMarkdown;
