'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
require('../../use/index.cjs');
require('./icon.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizIcon = /* @__PURE__ */ vue.defineComponent({
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
    const ns = namespace.useNamespace("icon");
    const BaseUrl = "".concat(ibiz.env.assetsUrl, "/").concat(props.baseDir, "/");
    function getContent(icon) {
      if (icon) {
        if (icon.htmlStr) {
          return vue.createVNode("span", {
            "class": ns.b(),
            "innerHTML": icon.htmlStr
          }, null);
        }
        if (icon.cssClass) {
          if (icon.cssClass.indexOf("fa-") !== -1) {
            return vue.createVNode("i", {
              "class": [ns.b(), icon.cssClass]
            }, null);
          }
          if (icon.cssClass.indexOf("theme-icon") !== -1) {
            return vue.createVNode("i", {
              "class": [ns.b(), icon.cssClass]
            }, null);
          }
          return vue.createVNode("ion-icon", {
            "class": ns.b(),
            "name": icon.cssClass
          }, null);
        }
        if (icon.imagePath) {
          if (core.isBase64Image(icon.imagePath)) {
            return vue.createVNode("img", {
              "class": ns.b(),
              "src": icon.imagePath
            }, null);
          }
          if (core.isBase64(icon.imagePath)) {
            return vue.createVNode("div", {
              "class": [ns.b(), ns.e("emoji")]
            }, [core.base64ToStr(icon.imagePath)]);
          }
          if (core.isSvg(icon.imagePath)) {
            return vue.createVNode("div", {
              "class": ns.b(),
              "innerHTML": icon.imagePath
            }, null);
          }
          if (icon.imagePath.endsWith("svg")) {
            if (icon.imagePath.startsWith("http")) {
              return vue.createVNode("img", {
                "class": ns.b(),
                "src": icon.imagePath
              }, null);
            }
            return vue.createVNode("ion-icon", {
              "src": BaseUrl + icon.imagePath,
              "class": ns.b()
            }, null);
          }
          if (icon.imagePath.startsWith("http")) {
            return vue.createVNode("img", {
              "class": ns.b(),
              "src": icon.imagePath
            }, null);
          }
          return vue.createVNode("img", {
            "class": ns.b(),
            "src": BaseUrl + icon.imagePath
          }, null);
        }
        if (icon.rawContent) {
          if (core.isSvg(icon.rawContent)) {
            return vue.createVNode("div", {
              "class": ns.b(),
              "innerHTML": icon.rawContent
            }, null);
          }
          return vue.createVNode("img", {
            "class": ns.b(),
            "src": icon.rawContent
          }, null);
        }
      }
      return null;
    }
    const content = vue.computed(() => {
      return getContent(props.icon);
    });
    return () => content.value;
  }
});

exports.IBizIcon = IBizIcon;
