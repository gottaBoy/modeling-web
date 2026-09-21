'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var splitContainer_controller = require('./split-container.controller.cjs');
require('./split-container.css');

"use strict";
const SplitContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSplitContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: splitContainer_controller.SplitContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("split-container");
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("hidden-trigger", props.controller.state.isHiddenTrigger)];
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    var _a, _b;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return vue.createVNode("div", {
      "class": this.classArr
    }, [vue.createVNode(vue.resolveComponent("iBizSplit"), {
      "modelValue": this.controller.state.splitValue,
      "onUpdate:modelValue": ($event) => this.controller.state.splitValue = $event,
      "mode": this.controller.splitMode
    }, {
      left: () => defaultSlots[0],
      right: () => defaultSlots[1],
      top: () => defaultSlots[0],
      bottom: () => defaultSlots[1]
    })]);
  }
});

exports.SplitContainer = SplitContainer;
