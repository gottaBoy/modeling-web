import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { PanelRememberMeController } from './panel-remember-me.controller.mjs';

"use strict";
const PanelRememberMe = /* @__PURE__ */ defineComponent({
  name: "IBizPanelRememberMe",
  props: {
    modelData: {
      type: Object,
      required: true
    },
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
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
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
      isRemember
    };
  },
  render() {
    return createVNode("div", {
      "class": this.classArr
    }, [createVNode(resolveComponent("el-checkbox"), {
      "modelValue": this.isRemember,
      "onUpdate:modelValue": ($event) => this.isRemember = $event,
      "label": ibiz.i18n.t("app.rememberMe")
    }, null)]);
  }
});

export { PanelRememberMe };
