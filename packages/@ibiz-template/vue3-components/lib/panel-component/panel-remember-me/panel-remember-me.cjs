'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var panelRememberMe_controller = require('./panel-remember-me.controller.cjs');

"use strict";
const PanelRememberMe = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelRememberMe",
  props: {
    modelData: {
      type: Object,
      required: true
    },
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
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
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
      isRemember
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.classArr
    }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
      "modelValue": this.isRemember,
      "onUpdate:modelValue": ($event) => this.isRemember = $event,
      "label": ibiz.i18n.t("app.rememberMe")
    }, null)]);
  }
});

exports.PanelRememberMe = PanelRememberMe;
