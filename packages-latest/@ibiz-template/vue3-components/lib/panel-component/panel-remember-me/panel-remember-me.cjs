'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var panelRememberMe_controller = require('./panel-remember-me.controller.cjs');

"use strict";
const PanelRememberMe = /* @__PURE__ */ vue.defineComponent({
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
      type: panelRememberMe_controller.PanelRememberMeController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-remember-me");
    const {
      id
    } = props.modelData;
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const classArr = vue.computed(() => {
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
    const isRemember = vue.computed({
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
    return vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-checkbox"), {
      "modelValue": this.isRemember,
      "onUpdate:modelValue": ($event) => this.isRemember = $event,
      "label": ibiz.i18n.t("app.rememberMe")
    }, null), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])]);
  }
});

exports.PanelRememberMe = PanelRememberMe;
