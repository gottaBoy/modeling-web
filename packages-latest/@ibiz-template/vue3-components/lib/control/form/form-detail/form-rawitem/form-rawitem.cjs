'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./form-rawitem.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormRawItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormRawItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormRawItemController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("form-raw-item");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const content = vue.ref("");
    const showFormDefaultContent = vue.computed(() => {
      if (props.controller.form.controlParams && props.controller.form.controlParams.editmode === "hover") {
        return true;
      }
      return false;
    });
    const isDesignPreview = ((_a = c.context) == null ? void 0 : _a.srfrunmode) === "DESIGN";
    const renderPreviewContent = () => {
      var _a2;
      let _slot;
      const contentType = (_a2 = props.modelData.rawItem) == null ? void 0 : _a2.contentType;
      switch (contentType) {
        case "RAW": {
          const caption = props.modelData.rawItem.caption || "";
          return vue.createVNode("div", {
            "class": ns.be("preview-content", "raw")
          }, [caption]);
        }
        case "HTML": {
          const rawItemContent = props.modelData.rawItem.content || "";
          return vue.createVNode("div", {
            "class": ns.be("preview-content", "html"),
            "innerHTML": rawItemContent
          }, null);
        }
        case "IMAGE":
          return vue.createVNode("div", {
            "class": ns.be("preview-content", "image")
          }, [vue.createVNode("svg", {
            "width": "56px",
            "height": "56px",
            "viewBox": "0 0 56 56",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg"
          }, [vue.createVNode("g", {
            "stroke": "none",
            "stroke-width": "1",
            "fill": "none",
            "fill-rule": "evenodd"
          }, [vue.createVNode("g", {
            "transform": "translate(4.000000, 0.000000)",
            "fill": "#8c8c8c",
            "fill-rule": "nonzero"
          }, [vue.createVNode("rect", {
            "opacity": "0",
            "x": "0",
            "y": "0",
            "width": "48",
            "height": "48"
          }, null), vue.createVNode("path", {
            "d": "M43.5,7.5 L4.5,7.5 C3.6703125,7.5 3,8.1703125 3,9 L3,39 C3,39.8296875 3.6703125,40.5 4.5,40.5 L43.5,40.5 C44.3296875,40.5 45,39.8296875 45,39 L45,9 C45,8.1703125 44.3296875,7.5 43.5,7.5 Z M15.84375,14.25 C17.4984375,14.25 18.84375,15.5953125 18.84375,17.25 C18.84375,18.9046875 17.4984375,20.25 15.84375,20.25 C14.1890625,20.25 12.84375,18.9046875 12.84375,17.25 C12.84375,15.5953125 14.1890625,14.25 15.84375,14.25 Z M39.9328125,34.7390625 C39.8671875,34.7953125 39.778125,34.828125 39.6890625,34.828125 L8.30625,34.828125 C8.1,34.828125 7.93125,34.659375 7.93125,34.453125 C7.93125,34.3640625 7.9640625,34.2796875 8.0203125,34.209375 L16.003125,24.740625 C16.134375,24.58125 16.3734375,24.5625 16.5328125,24.69375 C16.546875,24.7078125 16.565625,24.721875 16.5796875,24.740625 L21.2390625,30.271875 L28.65,21.4828125 C28.78125,21.3234375 29.0203125,21.3046875 29.1796875,21.4359375 C29.19375,21.45 29.2125,21.4640625 29.2265625,21.4828125 L39.9890625,34.2140625 C40.1109375,34.36875 40.0921875,34.6078125 39.9328125,34.7390625 Z"
          }, null)])])])]);
        case "VIDEO":
          return vue.createVNode("div", {
            "class": ns.be("preview-content", "video")
          }, [vue.createVNode("svg", {
            "width": "56px",
            "height": "56px",
            "viewBox": "0 0 56 56",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg"
          }, [vue.createVNode("g", {
            "stroke": "none",
            "stroke-width": "1",
            "fill": "none",
            "fill-rule": "evenodd"
          }, [vue.createVNode("g", {
            "transform": "translate(4.000000, 4.000000)",
            "fill-rule": "nonzero"
          }, [vue.createVNode("rect", {
            "opacity": "0",
            "x": "0",
            "y": "0",
            "width": "48",
            "height": "48"
          }, null), vue.createVNode("rect", {
            "stroke-width": "2",
            "x": "5",
            "y": "5",
            "width": "38",
            "height": "38",
            "rx": "2",
            "stroke": "#1890FF"
          }, null), vue.createVNode("path", {
            "d": "M19.842,16.7706563 L30.3061875,22.4005313 C31.4090625,22.993875 31.822125,24.369 31.2287812,25.4717812 C30.9959833,25.9045408 30.6289074,26.2499678 30.1828125,26.4560625 L19.7187188,31.290375 C18.5818125,31.8156563 17.2343438,31.3198125 16.7090625,30.1828125 C16.571335,29.8846905 16.5,29.560211 16.5,29.2318125 L16.5,18.767625 C16.5,17.5153125 17.5153125,16.5 18.767625,16.5 C19.142625,16.5 19.5118125,16.593 19.842,16.7706563 Z",
            "fill": "#1890FF"
          }, null)])])])]);
        case "PLACEHOLDER":
          return null;
        case "DIVIDER":
          return vue.createVNode(vue.resolveComponent("el-divider"), {
            "class": ns.be("preview-content", "divider")
          }, _isSlot(_slot = ibiz.i18n.t("control.form.formRawItem.dividerText")) ? _slot : {
            default: () => [_slot]
          });
        case "INFO":
          return vue.createVNode(vue.resolveComponent("el-alert"), {
            "class": ns.be("preview-content", "info"),
            "title": ibiz.i18n.t("control.form.formRawItem.infoText"),
            "type": "info",
            "closable": false,
            "show-icon": true
          }, null);
        case "WARNING":
          return vue.createVNode(vue.resolveComponent("el-alert"), {
            "class": ns.be("preview-content", "warning"),
            "title": ibiz.i18n.t("control.form.formRawItem.warningText"),
            "type": "warning",
            "closable": false,
            "show-icon": true
          }, null);
        case "ERROR":
          return vue.createVNode(vue.resolveComponent("el-alert"), {
            "class": ns.be("preview-content", "error"),
            "title": ibiz.i18n.t("control.form.formRawItem.errorText"),
            "type": "error",
            "closable": false,
            "show-icon": true
          }, null);
        default:
          return vue.createVNode("div", {
            "class": ns.be("preview-content", "default")
          }, [ibiz.i18n.t("control.form.formRawItem.defaultText")]);
      }
    };
    vue.watch(() => c.data, async (newVal) => {
      if (newVal) {
        const rawItemModel = c.model.rawItem;
        if (!rawItemModel) {
          return;
        }
        let rawItemContent = "";
        const obj = {
          ...newVal
        };
        if (rawItemModel.contentType === "RAW") {
          rawItemContent = rawItemModel.caption;
        } else if (rawItemModel.contentType === "HTML") {
          rawItemContent = rawItemModel.content;
        }
        if (rawItemContent && rawItemModel.templateMode) {
          rawItemContent = await ibiz.util.hbs.render(rawItemContent.replaceAll("//n", "\n"), Object.assign(obj, {
            data: {
              ...newVal
            },
            context: c.context,
            params: c.params
          }));
        }
        content.value = rawItemContent;
      }
    }, {
      immediate: true
    });
    return {
      ns,
      content,
      showFormDefaultContent,
      isDesignPreview,
      renderPreviewContent,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a;
    if (!this.controller.state.visible) {
      return null;
    }
    if (this.isDesignPreview) {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("rawitem", {
          rawitem: this.controller
        })],
        "style": this.semanticStyle("rawitem", {
          rawitem: this.controller
        })
      }, [vue.createVNode("div", {
        "class": this.ns.b("preview-content")
      }, [this.renderPreviewContent()])]);
    }
    return vue.createVNode(vue.resolveComponent("iBizRawItem"), {
      "class": [
        this.ns.b(),
        this.semanticClass("rawitem", {
          rawitem: this.controller
        }),
        ...this.controller.containerClass,
        this.ns.is("show-default", this.showFormDefaultContent),
        // 表单直接内容文本类型与直接内容类型应具备与标签相同样式
        this.ns.is("form-text", ["TEXT", "RAW"].includes(((_a = this.modelData.rawItem) == null ? void 0 : _a.contentType) || ""))
      ],
      "style": this.semanticStyle("rawitem", {
        rawitem: this.controller
      }),
      "rawItem": this.modelData,
      "content": this.content,
      "onClick": (event) => this.controller.onClick(event)
    }, null);
  }
});

exports.FormRawItem = FormRawItem;
exports.default = FormRawItem;
