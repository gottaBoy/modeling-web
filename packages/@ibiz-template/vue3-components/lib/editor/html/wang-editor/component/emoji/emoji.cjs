'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
require('./emoji.css');

"use strict";
const Emoji = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHtmlEmoji",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("html-emoji");
    const onSelect = (val) => {
      const modalData = {
        ok: true,
        data: [{
          emoji: core.strToBase64(val.data)
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("iBizEmojiSelect"), {
      "dark": true,
      "continuousList": true,
      "onSelect": this.onSelect
    }, null)]);
  }
});

exports.Emoji = Emoji;
