import { defineComponent, createVNode, withDirectives, resolveComponent, resolveDirective, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { AuthCaptchaController } from './auth-captcha.controller.mjs';
import './auth-captcha.css';

"use strict";
const AuthCaptcha = /* @__PURE__ */ defineComponent({
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
      type: AuthCaptchaController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("auth-captcha");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const classArr = computed(() => {
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
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("el-input"), {
      "modelValue": this.c.state.code,
      "onUpdate:modelValue": ($event) => this.c.state.code = $event,
      "class": [this.ns.e("captcha"), this.semanticClass("input")],
      "style": this.semanticStyle("input"),
      "onInput": this.onChange,
      "onBlur": this.onChange,
      "placeholder": ibiz.i18n.t("panelComponent.authCaptcha.captcha")
    }, null), withDirectives(createVNode(resolveComponent("el-image"), {
      "src": this.c.state.image,
      "class": [this.ns.e("image"), this.semanticClass("image")],
      "style": this.semanticStyle("image"),
      "onClick": this.onClick,
      "title": showTitle(ibiz.i18n.t("panelComponent.authCaptcha.refresh"))
    }, {
      error: () => {
        return createVNode("div", {
          "onClick": this.onClick,
          "class": [this.ns.em("image", "hint"), this.ns.is("loading", this.c.state.loading)]
        }, [this.c.state.loading ? ibiz.i18n.t("panelComponent.authCaptcha.loading") : ibiz.i18n.t("panelComponent.authCaptcha.loadFailed")]);
      }
    }), [[resolveDirective("loading"), this.c.state.loading]]), this.c.state.error && createVNode("div", {
      "class": [this.ns.e("error"), this.semanticClass("error")],
      "style": this.semanticStyle("error")
    }, [this.c.state.error])]);
  }
});

export { AuthCaptcha };
