'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./split-trigger.css');

"use strict";
const IBizSplitTrigger = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSplitTrigger",
  props: {
    mode: String
  },
  setup(prop) {
    const ns = vue3Util.useNamespace("split-trigger");
    const isVertical = vue.computed(() => prop.mode === "vertical");
    const classes = vue.computed(() => [ns.b(), isVertical.value ? ns.m("vertical") : ns.m("horizontal")]);
    const barConClasses = vue.computed(() => [ns.b("bar-con"), isVertical.value ? ns.bm("bar-con", "vertical") : ns.bm("bar-con", "horizontal")]);
    const items = Array(8).fill(0);
    return {
      ns,
      classes,
      barConClasses,
      items
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.classes
    }, [vue.createVNode("div", {
      "class": this.barConClasses
    }, [this.items.map((_item, i) => vue.createVNode("i", {
      "class": this.ns.b("bar"),
      "key": "trigger-".concat(i)
    }, null))])]);
  }
});

exports.IBizSplitTrigger = IBizSplitTrigger;
