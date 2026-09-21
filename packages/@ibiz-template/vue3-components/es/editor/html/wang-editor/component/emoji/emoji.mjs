import { defineComponent, createVNode, resolveComponent } from 'vue';
import { strToBase64 } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './emoji.css';

"use strict";
const Emoji = /* @__PURE__ */ defineComponent({
  name: "IBizHtmlEmoji",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("html-emoji");
    const onSelect = (val) => {
      const modalData = {
        ok: true,
        data: [{
          emoji: strToBase64(val.data)
        }]
      };
      props.modal.dismiss(modalData);
    };
    return {
      ns,
      onSelect
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("iBizEmojiSelect"), {
      "dark": true,
      "continuousList": true,
      "onSelect": this.onSelect
    }, null)]);
  }
});

export { Emoji };
