'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./coop-alert.css');

"use strict";
const IBizCoopAlert = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCoopAlert",
  props: {
    title: {
      type: String
    },
    type: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("coop-alert");
    return {
      ns
    };
  },
  render() {
    if (!this.title) {
      return;
    }
    return vue.createVNode(vue.resolveComponent("el-alert"), vue.mergeProps({
      "class": this.ns.b()
    }, this.$props), null);
  }
});

exports.IBizCoopAlert = IBizCoopAlert;
