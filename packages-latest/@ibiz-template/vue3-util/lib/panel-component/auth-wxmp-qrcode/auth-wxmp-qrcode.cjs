'use strict';

var vue = require('vue');
var vueRouter = require('vue-router');
require('../../use/index.cjs');
require('./auth-wxmp-qrcode.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const AuthWxmpQrcode = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAuthWxmpQrcode",
  props: {
    /**
     * @description 微信二维码模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 微信二维码控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("auth-wxmp-qrcode");
    const {
      state
    } = props.controller;
    const route = vueRouter.useRoute();
    props.controller.setRouter(route);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const loadQrcode = async () => {
      await props.controller.loadQrcode();
    };
    vue.watch(() => state.visible, () => {
      var _a;
      if (state.visible && (state.keepAlive && !((_a = state.qrcode) == null ? void 0 : _a.expirein) || !state.keepAlive)) {
        loadQrcode();
      }
    }, {
      immediate: true
    });
    vue.onUnmounted(() => {
      props.controller.destroy();
    });
    return {
      ns,
      loadQrcode,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [this.controller.state.qrcode && vue.createVNode("img", {
      "class": [this.ns.e("qrcode"), this.semanticClass("content")],
      "style": this.semanticStyle("content"),
      "src": (_a = this.controller.state.qrcode) == null ? void 0 : _a.url
    }, null), !((_b = this.controller.state.qrcode) == null ? void 0 : _b.expirein) && vue.createVNode("div", {
      "class": [this.ns.e("mask"), this.semanticClass("mask")],
      "style": this.semanticStyle("mask")
    }, [vue.createVNode("ion-icon", {
      "title": ibiz.i18n.t("vue3Util.panelComponent.refresh"),
      "name": "reload-outline",
      "onClick": this.loadQrcode,
      "class": this.ns.em("mask", "icon")
    }, null)])]), vue.createVNode("div", {
      "class": [this.ns.e("caption"), this.semanticClass("caption")],
      "style": this.semanticStyle("caption")
    }, [this.controller.state.tips])]);
  }
});

exports.AuthWxmpQrcode = AuthWxmpQrcode;
