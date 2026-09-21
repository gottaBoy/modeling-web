'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
require('./rawitem.css');
var core = require('@ibiz-template/core');
require('../../util/index.cjs');
var wangEditorUtil = require('../../util/wang-editor-util/wang-editor-util.cjs');

"use strict";
const IBizRawItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRawItem",
  props: {
    type: {
      type: String,
      required: false
    },
    content: {
      type: [String, Object, Number]
    },
    rawItem: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("rawitem");
    let rawItem = null;
    let contentType = "";
    if (props.rawItem) {
      rawItem = props.rawItem.rawItem;
      contentType = rawItem.contentType;
    }
    const rawItemType = vue.ref(props.type || contentType || "");
    const rawItemContent = vue.ref("");
    let sysImage;
    if (contentType === "IMAGE") {
      sysImage = rawItem.sysImage;
    }
    if (contentType === "RAW" || contentType === "HTML") {
      if (contentType === "RAW") {
        rawItemType.value = "TEXT";
        rawItemContent.value = rawItem.caption;
      } else {
        rawItemContent.value = rawItem.content;
      }
    } else if (["VIDEO", "DIVIDER", "INFO", "WARNING", "ERROR"].includes(contentType)) {
    } else if (contentType === "IMAGE" && sysImage) {
      rawItemContent.value = sysImage;
    }
    const isImg = (imgUrl) => {
      const reg = /^https?:|^http?:|(\.png|\.svg|\.jpg|\.png|\.gif|\.psd|\.tif|\.bmp|\.jpeg)/;
      return reg.test(imgUrl);
    };
    const isHtmlStr = (str) => {
      try {
        const fragment = new DOMParser().parseFromString(str, "text/html");
        return fragment.body.children.length > 0;
      } catch (error) {
        return false;
      }
    };
    const playerParams = vue.ref({
      id: qxUtil.createUUID(),
      path: "",
      mute: true,
      autoplay: true,
      replay: false,
      showcontrols: true
    });
    const dividerParams = vue.ref({
      contentPosition: "center",
      html: ""
    });
    const alertParams = vue.ref({
      type: "info",
      title: "",
      closeabled: true,
      showIcon: false
    });
    const rawItemText = vue.ref("");
    const convertValue = () => {
      if (rawItemType.value === "IMAGE") {
        if (props.content && typeof props.content === "string") {
          if (isImg(props.content)) {
            rawItemContent.value = {
              imagePath: props.content
            };
          } else {
            rawItemContent.value = {
              cssClass: props.content
            };
          }
        } else if (sysImage) {
          rawItemContent.value = sysImage;
        }
      }
      if (["TEXT", "HEADING1", "HEADING2", "HEADING3", "HEADING4", "HEADING5", "HEADING6", "PARAGRAPH", "HTML", "RAW"].includes(rawItemType.value)) {
        rawItemText.value = rawItemContent.value;
        if (typeof rawItemText.value === "string") {
          const val = rawItemText.value;
          rawItemText.value = val.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " ").replace(/&nbsp;/g, " ");
        }
      }
      if (rawItemType.value === "HTML" && !isHtmlStr(rawItemText.value)) {
        rawItemText.value = rawItemText.value.replace(/\n/g, "<br>");
      }
      if (rawItemType.value === "HTML") {
        rawItemText.value = wangEditorUtil.parseHtml(rawItemText.value);
      }
      if (["VIDEO", "DIVIDER", "INFO", "WARNING", "ERROR"].includes(rawItemType.value)) {
        if (rawItemContent.value) {
          let rawConfig = {};
          try {
            if (typeof rawItemContent.value === "string") {
              const func = new Function("return (".concat(rawItemContent.value, ");"));
              rawConfig = func();
              switch (rawItemType.value) {
                case "VIDEO":
                  Object.assign(playerParams.value, rawConfig);
                  break;
                case "DIVIDER":
                  Object.assign(dividerParams.value, rawConfig);
                  break;
                case "INFO":
                case "WARNING":
                case "ERROR":
                  alertParams.value.type = rawItemType.value.toLocaleLowerCase();
                  Object.assign(alertParams.value, rawConfig);
                  break;
                default:
                  break;
              }
            }
          } catch (e) {
            ibiz.log.error(ibiz.i18n.t("component.rawItem.errorConfig", {
              type: rawItemType.value
            }));
          }
        }
      }
    };
    convertValue();
    vue.watch(() => props.content, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        rawItemContent.value = newVal;
        convertValue();
      }
    }, {
      immediate: true
    });
    return {
      ns,
      rawItemText,
      playerParams,
      dividerParams,
      alertParams,
      rawItemType,
      rawItemContent
    };
  },
  render() {
    const renderContent = () => {
      if (this.rawItemType === "IMAGE") {
        return vue.createVNode(vue.resolveComponent("i-biz-icon"), {
          "class": [this.ns.e("image")],
          "icon": this.rawItemContent
        }, null);
      }
      if (this.rawItemType === "TEXT" || this.rawItemType === "RAW") {
        return vue.createVNode("span", {
          "class": this.ns.e("text")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING1") {
        return vue.createVNode("h1", {
          "class": this.ns.e("h1")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING2") {
        return vue.createVNode("h2", {
          "class": this.ns.e("h2")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING3") {
        return vue.createVNode("h3", {
          "class": this.ns.e("h3")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING4") {
        return vue.createVNode("h4", {
          "class": this.ns.e("h4")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING5") {
        return vue.createVNode("h5", {
          "class": this.ns.e("h5")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING6") {
        return vue.createVNode("h6", {
          "class": this.ns.e("h6")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "PARAGRAPH") {
        return vue.createVNode("p", {
          "class": this.ns.e("paragraph")
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HTML") {
        return vue.createVNode("div", {
          "class": this.ns.e("paragraph"),
          "innerHTML": this.rawItemText
        }, null);
      }
      if (this.rawItemType === "VIDEO") {
        return vue.createVNode("div", {
          "class": this.ns.e("video")
        }, [vue.createVNode("video", {
          "id": this.playerParams.id,
          "src": this.playerParams.path,
          "autoplay": this.playerParams.autoplay,
          "controls": this.playerParams.showcontrols,
          "loop": this.playerParams.replay,
          "muted": this.playerParams.mute
        }, [vue.createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/mp4"
        }, null), vue.createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/ogg"
        }, null), vue.createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/webm"
        }, null), ibiz.i18n.t("component.rawItem.noSupportVideo")])]);
      }
      if (this.rawItemType === "DIVIDER") {
        return vue.createVNode(vue.resolveComponent("el-divider"), {
          "content-position": this.dividerParams.contentPosition
        }, {
          default: () => [vue.createVNode("span", {
            "innerHTML": this.dividerParams.html
          }, null)]
        });
      }
      if (this.rawItemType === "INFO" || this.rawItemType === "WARNING" || this.rawItemType === "ERROR") {
        return vue.createVNode(vue.resolveComponent("el-alert"), {
          "title": core.showTitle(this.alertParams.title),
          "type": this.alertParams.type,
          "show-icon": this.alertParams.showIcon,
          "closable": this.alertParams.closeabled
        }, null);
      }
      if (this.rawItemType === "MARKDOWN") {
        return vue.createVNode(vue.resolveComponent("iBizMarkDown"), {
          "value": this.content,
          "disabled": true
        }, null);
      }
      if (["PLACEHOLDER"].includes(this.rawItemType)) {
        return null;
      }
      return null;
    };
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [renderContent()]);
  }
});

exports.IBizRawItem = IBizRawItem;
