'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var aiToolCallItem = require('../ai-tool-call-item/ai-tool-call-item.cjs');
require('./ai-tool-call.css');

"use strict";
const AIToolCall = /* @__PURE__ */ vue.defineComponent({
  props: {
    toolCalls: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("ai-tool-call");
    const isExpanded = vue.ref(false);
    const showToggle = vue.computed(() => {
      return props.toolCalls.length > 4;
    });
    const items = vue.computed(() => {
      return showToggle.value && !isExpanded.value ? props.toolCalls.slice(0, 4) : props.toolCalls;
    });
    const handleToggle = () => {
      isExpanded.value = !isExpanded.value;
    };
    return {
      ns,
      items,
      showToggle,
      isExpanded,
      handleToggle
    };
  },
  render() {
    if (!this.toolCalls.length)
      return;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.items.map((item) => {
      return vue.createVNode(aiToolCallItem.AIToolCallItem, {
        "toolCall": item
      }, null);
    }), this.showToggle && vue.createVNode("div", {
      "class": this.ns.e("toggle"),
      "onClick": this.handleToggle
    }, [this.isExpanded ? ibiz.i18n.t("util.inlineAiUtil.collapseToolCall") : ibiz.i18n.t("util.inlineAiUtil.expandToolCall", {
      number: this.toolCalls.length
    })])]);
  }
});

exports.AIToolCall = AIToolCall;
