'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-switch-tristate.css');

"use strict";
const IBizSwitchTriState = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSwitchTriState",
  props: vue3Util.getSwitchProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("switch-tristate");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const lastVal = vue.ref(null);
    const currentVal = vue.ref(null);
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal === 0) {
          currentVal.value = 0;
        } else if (newVal === 1) {
          currentVal.value = 1;
        } else {
          currentVal.value = null;
        }
      }
    }, {
      immediate: true
    });
    const onSwitchClick = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (currentVal.value === null) {
        if (lastVal.value === null || lastVal.value === 0) {
          lastVal.value = null;
          emit("change", 1);
        }
        if (lastVal.value === 1) {
          lastVal.value = null;
          emit("change", 0);
        }
      }
      if (currentVal.value === 1) {
        lastVal.value = 1;
        emit("change", null);
      }
      if (currentVal.value === 0) {
        lastVal.value = 0;
        emit("change", null);
      }
    };
    return {
      c,
      ns,
      currentVal,
      semanticClass,
      semanticStyle,
      onSwitchClick
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root")],
      "style": this.semanticStyle("editor.root")
    }, [vue.createVNode("div", {
      "class": [this.ns.e("switch-wrapper"), this.semanticClass("editor.content"), this.ns.is("left", this.currentVal === 0), this.ns.is("center", this.currentVal === null), this.ns.is("right", this.currentVal === 1), this.ns.is("disabled", this.disabled || this.readonly)],
      "style": this.semanticStyle("editor.content"),
      "onClick": this.onSwitchClick
    }, null)]);
  }
});

exports.IBizSwitchTriState = IBizSwitchTriState;
