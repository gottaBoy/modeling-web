'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var authCaptcha_controller = require('./auth-captcha.controller.cjs');
require('./auth-captcha.css');

"use strict";
const AuthCaptcha = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAuthCaptcha",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: authCaptcha_controller.AuthCaptchaController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("auth-captcha");
    const c = props.controller;
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(c.model.id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("error", !!c.state.error)];
      return result;
    });
    const onClick = () => {
      if (!c.state.loading) {
        c.loadCaptcha();
      }
    };
    const onChange = () => {
      c.onChange();
      c.validate();
    };
    return {
      c,
      ns,
      classArr,
      onClick,
      onChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.classArr
    }, [vue.createVNode(vue.resolveComponent("el-input"), {
      "modelValue": this.c.state.code,
      "onUpdate:modelValue": ($event) => this.c.state.code = $event,
      "class": this.ns.e("captcha"),
      "onInput": this.onChange,
      "onBlur": this.onChange,
      "placeholder": "\u9A8C\u8BC1\u7801"
    }, null), vue.withDirectives(vue.createVNode(vue.resolveComponent("el-image"), {
      "src": this.c.state.image,
      "class": this.ns.e("image"),
      "onClick": this.onClick,
      "title": core.showTitle("\u70B9\u51FB\u56FE\u7247\u5237\u65B0")
    }, {
      error: () => {
        return vue.createVNode("div", {
          "onClick": this.onClick,
          "class": [this.ns.em("image", "hint"), this.ns.is("loading", this.c.state.loading)]
        }, [this.c.state.loading ? "\u52A0\u8F7D\u4E2D..." : "\u52A0\u8F7D\u5931\u8D25"]);
      }
    }), [[vue.resolveDirective("loading"), this.c.state.loading]]), this.c.state.error && vue.createVNode("div", {
      "class": this.ns.e("error")
    }, [this.c.state.error])]);
  }
});

exports.AuthCaptcha = AuthCaptcha;
