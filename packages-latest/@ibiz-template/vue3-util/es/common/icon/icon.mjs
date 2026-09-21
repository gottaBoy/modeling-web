import { defineComponent, createVNode, computed } from 'vue';
import { isBase64Image, isBase64, base64ToStr, isSvg } from '@ibiz-template/core';
import '../../use/index.mjs';
import './icon.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const IBizIcon = /* @__PURE__ */ defineComponent({
  name: "IBizIcon",
  props: {
    icon: {
      type: Object
    },
    size: {
      type: String
    },
    baseDir: {
      type: String,
      default: "images"
    }
  },
  setup(props) {
    const ns = useNamespace("icon");
    const BaseUrl = "".concat(ibiz.env.assetsUrl, "/").concat(props.baseDir, "/");
    function getContent(icon) {
      if (icon) {
        if (icon.htmlStr) {
          return createVNode("span", {
            "class": ns.b(),
            "innerHTML": icon.htmlStr
          }, null);
        }
        if (icon.cssClass) {
          if (icon.cssClass.indexOf("fa-") !== -1) {
            return createVNode("i", {
              "class": [ns.b(), icon.cssClass]
            }, null);
          }
          if (icon.cssClass.indexOf("theme-icon") !== -1) {
            return createVNode("i", {
              "class": [ns.b(), icon.cssClass]
            }, null);
          }
          return createVNode("ion-icon", {
            "class": ns.b(),
            "name": icon.cssClass
          }, null);
        }
        if (icon.imagePath) {
          if (isBase64Image(icon.imagePath)) {
            return createVNode("img", {
              "class": ns.b(),
              "src": icon.imagePath
            }, null);
          }
          if (isBase64(icon.imagePath)) {
            return createVNode("div", {
              "class": [ns.b(), ns.e("emoji")]
            }, [base64ToStr(icon.imagePath)]);
          }
          if (isSvg(icon.imagePath)) {
            return createVNode("div", {
              "class": ns.b(),
              "innerHTML": icon.imagePath
            }, null);
          }
          if (icon.imagePath.endsWith("svg")) {
            if (icon.imagePath.startsWith("http")) {
              return createVNode("img", {
                "class": ns.b(),
                "src": icon.imagePath
              }, null);
            }
            return createVNode("ion-icon", {
              "src": BaseUrl + icon.imagePath,
              "class": ns.b()
            }, null);
          }
          if (icon.imagePath.startsWith("http")) {
            return createVNode("img", {
              "class": ns.b(),
              "src": icon.imagePath
            }, null);
          }
          return createVNode("img", {
            "class": ns.b(),
            "src": BaseUrl + icon.imagePath
          }, null);
        }
        if (icon.rawContent) {
          if (isSvg(icon.rawContent)) {
            return createVNode("div", {
              "class": ns.b(),
              "innerHTML": icon.rawContent
            }, null);
          }
          return createVNode("img", {
            "class": ns.b(),
            "src": icon.rawContent
          }, null);
        }
      }
      return null;
    }
    const content = computed(() => {
      return getContent(props.icon);
    });
    return () => content.value;
  }
});

export { IBizIcon };
