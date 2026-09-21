import { defineComponent, createVNode, resolveComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { isBase64Image, isBase64, isSvg } from '@ibiz-template/core';
import '../../util/index.mjs';
import './rawitem.css';
import { parseHtml } from '../../util/wang-editor-util/wang-editor-util.mjs';

"use strict";
const IBizRawItem = /* @__PURE__ */ defineComponent({
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
    },
    chunkView: {
      type: String,
      required: false
    },
    chunkEntity: {
      type: String,
      required: false
    },
    ctrl: {
      type: Object,
      required: false
    },
    view: {
      type: Object,
      required: false
    },
    data: {
      type: Object,
      required: false
    },
    context: {
      type: Object,
      required: false
    },
    semantic: {
      type: Object,
      default: () => ({
        root: {
          class: "",
          style: ""
        },
        text: {
          class: "",
          style: ""
        },
        image: {
          class: "",
          style: ""
        },
        heading: {
          class: "",
          style: ""
        },
        paragraph: {
          class: "",
          style: ""
        },
        html: {
          class: "",
          style: ""
        },
        divider: {
          class: "",
          style: ""
        },
        alert: {
          class: "",
          style: ""
        },
        video: {
          class: "",
          style: ""
        },
        markdown: {
          class: "",
          style: ""
        }
      })
    }
  },
  setup(props) {
    var _a, _b;
    const ns = useNamespace("rawitem");
    let rawItem = null;
    let contentType = "";
    if (props.rawItem) {
      rawItem = props.rawItem.rawItem;
      contentType = rawItem.contentType;
    }
    const rawItemType = ref(props.type || contentType || "");
    const rawItemContent = ref("");
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
    } else if (["INFO", "WARNING", "ERROR"].includes(contentType)) {
      rawItemContent.value = rawItem.rawContent;
    } else if (["VIDEO", "DIVIDER"].includes(contentType)) {
    } else if (contentType === "IMAGE" && sysImage) {
      rawItemContent.value = sysImage;
    }
    const isImg = (imgUrl) => {
      const reg = /^https?:|^http?:|(\.png|\.svg|\.jpg|\.png|\.gif|\.psd|\.tif|\.bmp|\.jpeg)/;
      return reg.test(imgUrl);
    };
    const isImagePath = (content) => {
      return isImg(content) || isBase64Image(content) || isBase64(content) || isSvg(content);
    };
    const isHtmlStr = (str) => {
      try {
        const fragment = new DOMParser().parseFromString(str, "text/html");
        return fragment.body.children.length > 0;
      } catch (error) {
        return false;
      }
    };
    const playerParams = ref({
      id: createUUID(),
      path: "",
      mute: true,
      autoplay: true,
      replay: false,
      showcontrols: true
    });
    const dividerParams = ref({
      contentPosition: "center",
      html: ""
    });
    const alertParams = ref({
      type: "info",
      title: "",
      closeabled: true,
      showIcon: false
    });
    const rawItemText = ref("");
    const convertValue = () => {
      if (rawItemType.value === "IMAGE") {
        if (props.content && typeof props.content === "string") {
          if (isImagePath(props.content)) {
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
          rawItemText.value = ibiz.appUtil.resolveI18nText(rawItemText.value);
          const val = rawItemText.value;
          rawItemText.value = val.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " ").replace(/&nbsp;/g, " ");
        }
      }
      if (rawItemType.value === "HTML" && !isHtmlStr(rawItemText.value)) {
        rawItemText.value = rawItemText.value.replace(/\n/g, "<br>");
      }
      if (rawItemType.value === "HTML") {
        rawItemText.value = parseHtml(rawItemText.value);
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
        } else if (rawItemType.value === "VIDEO") {
          if (rawItem && rawItem.rawItemParams && rawItem.rawItemParams.length > 0) {
            const tempParams = {};
            rawItem.rawItemParams.forEach((item) => {
              tempParams[item.key] = item.value;
            });
            Object.assign(playerParams.value, tempParams);
          }
        }
      }
    };
    if (!((_b = (_a = props.rawItem) == null ? void 0 : _a.rawItem) == null ? void 0 : _b.templateMode)) {
      convertValue();
    }
    watch(() => props.content, (newVal, oldVal) => {
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
    var _a, _b;
    const renderContent = () => {
      if (this.rawItemType === "IMAGE") {
        return createVNode(resolveComponent("i-biz-icon"), {
          "class": [this.ns.e("image"), this.semantic.image.class],
          "style": this.semantic.image.style,
          "icon": this.rawItemContent
        }, null);
      }
      if (this.rawItemType === "TEXT" || this.rawItemType === "RAW") {
        return createVNode("span", {
          "class": [this.ns.e("text"), this.semantic.text.class],
          "style": this.semantic.text.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING1") {
        return createVNode("h1", {
          "class": [this.ns.e("h1"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING2") {
        return createVNode("h2", {
          "class": [this.ns.e("h2"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING3") {
        return createVNode("h3", {
          "class": [this.ns.e("h3"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING4") {
        return createVNode("h4", {
          "class": [this.ns.e("h4"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING5") {
        return createVNode("h5", {
          "class": [this.ns.e("h5"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HEADING6") {
        return createVNode("h6", {
          "class": [this.ns.e("h6"), this.semantic.heading.class],
          "style": this.semantic.heading.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "PARAGRAPH") {
        return createVNode("p", {
          "class": [this.ns.e("paragraph"), this.semantic.paragraph.class],
          "style": this.semantic.paragraph.style
        }, [this.rawItemText]);
      }
      if (this.rawItemType === "HTML") {
        return createVNode("div", {
          "class": [this.ns.e("paragraph"), this.semantic.html.class],
          "style": this.semantic.html.style,
          "innerHTML": this.rawItemText
        }, null);
      }
      if (this.rawItemType === "VIDEO") {
        return createVNode("div", {
          "class": [this.ns.e("video"), this.semantic.video.class],
          "style": this.semantic.video.style
        }, [createVNode("video", {
          "id": this.playerParams.id,
          "src": this.playerParams.path,
          "autoplay": this.playerParams.autoplay,
          "controls": this.playerParams.showcontrols,
          "loop": this.playerParams.replay,
          "muted": this.playerParams.mute
        }, [createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/mp4"
        }, null), createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/ogg"
        }, null), createVNode("source", {
          "src": this.playerParams.path,
          "type": "video/webm"
        }, null), ibiz.i18n.t("component.rawItem.noSupportVideo")])]);
      }
      if (this.rawItemType === "DIVIDER") {
        return createVNode(resolveComponent("el-divider"), {
          "class": [this.ns.e("divider"), this.semantic.divider.class],
          "style": this.semantic.divider.style,
          "content-position": this.dividerParams.contentPosition
        }, {
          default: () => [createVNode("span", {
            "innerHTML": this.dividerParams.html
          }, null)]
        });
      }
      if (this.rawItemType === "INFO" || this.rawItemType === "WARNING" || this.rawItemType === "ERROR") {
        return createVNode(resolveComponent("el-alert"), {
          "class": [this.ns.e("alert"), this.semantic.alert.class],
          "style": this.semantic.alert.style,
          "title": this.alertParams.title,
          "type": this.alertParams.type,
          "show-icon": this.alertParams.showIcon,
          "closable": this.alertParams.closeabled
        }, null);
      }
      if (this.rawItemType === "MARKDOWN") {
        return createVNode(resolveComponent("iBizMarkDown"), {
          "class": [this.ns.e("markdown"), this.semantic.markdown.class],
          "style": this.semantic.markdown.style,
          "disabled": true,
          "ctrl": this.ctrl,
          "view": this.view,
          "data": this.data,
          "value": this.content,
          "context": this.context,
          "chunkView": this.chunkView,
          "chunkEntity": this.chunkEntity
        }, null);
      }
      if (["PLACEHOLDER"].includes(this.rawItemType)) {
        return null;
      }
      return null;
    };
    return createVNode("div", {
      "class": [this.ns.b(), this.semantic.root.class],
      "style": this.semantic.root.style,
      "title": (_b = (_a = this.rawItem) == null ? void 0 : _a.rawItem) == null ? void 0 : _b.tooltip
    }, [renderContent()]);
  }
});

export { IBizRawItem };
