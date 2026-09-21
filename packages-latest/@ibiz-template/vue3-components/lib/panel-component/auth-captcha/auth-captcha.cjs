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
    /**
     * @description 人机识别控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 人机识别控件控制器
     */
    controller: {
      type: authCaptcha_controller.AuthCaptchaController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("auth-captcha");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
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
      onChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("el-input"), {
      "modelValue": this.c.state.code,
      "onUpdate:modelValue": ($event) => this.c.state.code = $event,
      "class": [this.ns.e("captcha"), this.semanticClass("input")],
      "style": this.semanticStyle("input"),
      "onInput": this.onChange,
      "onBlur": this.onChange,
      "placeholder": ibiz.i18n.t("panelComponent.authCaptcha.captcha")
    }, null), vue.withDirectives(vue.createVNode(vue.resolveComponent("el-image"), {
      "src": this.c.state.image,
      "class": [this.ns.e("image"), this.semanticClass("image")],
      "style": this.semanticStyle("image"),
      "onClick": this.onClick,
      "title": core.showTitle(ibiz.i18n.t("panelComponent.authCaptcha.refresh"))
    }, {
      error: () => {
        return vue.createVNode("div", {
          "onClick": this.onClick,
          "class": [this.ns.em("image", "hint"), this.ns.is("loading", this.c.state.loading)]
        }, [this.c.state.loading ? ibiz.i18n.t("panelComponent.authCaptcha.loading") : ibiz.i18n.t("panelComponent.authCaptcha.loadFailed")]);
      }
    }), [[vue.resolveDirective("loading"), this.c.state.loading]]), this.c.state.error && vue.createVNode("div", {
      "class": [this.ns.e("error"), this.semanticClass("error")],
      "style": this.semanticStyle("error")
    }, [this.c.state.error])]);
  }
});

exports.AuthCaptcha = AuthCaptcha;
