import { defineComponent, createVNode, withDirectives, resolveComponent, resolveDirective, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { PanelRememberMeController } from './panel-remember-me.controller.mjs';

"use strict";
const PanelRememberMe = /* @__PURE__ */ defineComponent({
  name: "IBizPanelRememberMe",
  props: {
    /**
     * @description 记住我控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 记住我控件控制器
     */
    controller: {
      type: PanelRememberMeController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-remember-me");
    const {
      id
    } = props.modelData;
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const childClass = [{
      class: semanticClass("icon"),
      selector: ".el-checkbox__input"
    }, {
      class: semanticClass("caption"),
      selector: ".el-checkbox__label"
    }];
    const childStyle = [{
      style: semanticStyle("icon"),
      selector: ".el-checkbox__input"
    }, {
      style: semanticStyle("caption"),
      selector: ".el-checkbox__label"
    }];
    const isRemember = computed({
      get: () => c.panel.state.data.isRemember,
      set: (val) => {
        c.panel.state.data.isRemember = val;
      }
    });
    return {
      ns,
      classArr,
      c,
      isRemember,
      semanticClass,
      semanticStyle,
      childClass,
      childStyle
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [withDirectives(createVNode(resolveComponent("el-checkbox"), {
      "modelValue": this.isRemember,
      "onUpdate:modelValue": ($event) => this.isRemember = $event,
      "label": ibiz.i18n.t("app.rememberMe")
    }, null), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
  }
});

export { PanelRememberMe };
