import { defineComponent, createVNode, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './emoji-item.css';

"use strict";
const EmojiItem = /* @__PURE__ */ defineComponent({
  name: "IBizEmojiItem",
  props: {
    emoji: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    size: {
      type: Number,
      required: true
    },
    withBorder: {
      type: Boolean,
      required: true
    }
  },
  emits: ["click"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("emoji-item");
    const styleSize = computed(() => {
      return {
        fontSize: "".concat(props.size - 5, "px"),
        lineHeight: "".concat(props.size, "px"),
        height: "".concat(props.size, "px"),
        width: "".concat(props.size, "px")
      };
    });
    const onClick = () => {
      emit("click", props.emoji);
    };
    return {
      ns,
      styleSize,
      onClick
    };
  },
  render() {
    return createVNode("span", {
      "class": [this.ns.b(), this.ns.is("border", this.withBorder)],
      "style": this.styleSize,
      "onClick": this.onClick,
      "innerHTML": this.emoji.data
    }, null);
  }
});

export { EmojiItem };
