'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./doing-notice.css');

"use strict";
const DoingNotice = /* @__PURE__ */ vue.defineComponent({
  name: "DoingNotice",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("doing-notice");
    return {
      ns
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("span", {
      "class": this.ns.e("text"),
      "innerHTML": ibiz.i18n.t("component.doingNotice.jobInProgress", {
        class: this.ns.e("num"),
        num: this.info.num
      })
    }, null), vue.createVNode("svg", {
      "class": this.ns.e("loading-icon"),
      "viewBox": "-10, -10, 50, 50"
    }, [vue.createVNode("path", {
      "class": "path",
      "d": "M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15",
      "style": "stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
    }, null)])]);
  }
});

exports.DoingNotice = DoingNotice;
