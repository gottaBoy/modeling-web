import { defineComponent, watch, onUnmounted, createVNode } from 'vue';
import { useRoute } from 'vue-router';
import '../../use/index.mjs';
import './auth-wxmp-qrcode.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const AuthWxmpQrcode = /* @__PURE__ */ defineComponent({
  name: "IBizAuthWxmpQrcode",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("auth-wxmp-qrcode");
    const {
      state
    } = props.controller;
    const route = useRoute();
    props.controller.setRouter(route);
    const loadQrcode = async () => {
      await props.controller.loadQrcode();
    };
    watch(() => state.visible, () => {
      var _a;
      if (state.visible && (state.keepAlive && !((_a = state.qrcode) == null ? void 0 : _a.expirein) || !state.keepAlive)) {
        loadQrcode();
      }
    }, {
      immediate: true
    });
    onUnmounted(() => {
      props.controller.destroy();
    });
    return {
      ns,
      loadQrcode
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("content")
    }, [this.controller.state.qrcode && createVNode("img", {
      "class": this.ns.e("qrcode"),
      "src": (_a = this.controller.state.qrcode) == null ? void 0 : _a.url
    }, null), !((_b = this.controller.state.qrcode) == null ? void 0 : _b.expirein) && createVNode("div", {
      "class": this.ns.e("mask")
    }, [createVNode("ion-icon", {
      "title": ibiz.i18n.t("vue3Util.panelComponent.refresh"),
      "name": "reload-outline",
      "onClick": this.loadQrcode,
      "class": this.ns.em("mask", "icon")
    }, null)])]), createVNode("div", {
      "class": this.ns.e("caption")
    }, [this.controller.state.tips])]);
  }
});

export { AuthWxmpQrcode };
