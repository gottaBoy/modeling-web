import { defineComponent, createVNode, ref, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { AIToolCallItem } from '../ai-tool-call-item/ai-tool-call-item.mjs';
import './ai-tool-call.css';

"use strict";
const AIToolCall = /* @__PURE__ */ defineComponent({
  props: {
    toolCalls: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("ai-tool-call");
    const isExpanded = ref(false);
    const showToggle = computed(() => {
      return props.toolCalls.length > 4;
    });
    const items = computed(() => {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.items.map((item) => {
      return createVNode(AIToolCallItem, {
        "toolCall": item
      }, null);
    }), this.showToggle && createVNode("div", {
      "class": this.ns.e("toggle"),
      "onClick": this.handleToggle
    }, [this.isExpanded ? ibiz.i18n.t("util.inlineAiUtil.collapseToolCall") : ibiz.i18n.t("util.inlineAiUtil.expandToolCall", {
      number: this.toolCalls.length
    })])]);
  }
});

export { AIToolCall };
