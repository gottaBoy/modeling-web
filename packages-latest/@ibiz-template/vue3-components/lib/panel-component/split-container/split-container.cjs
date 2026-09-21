'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var splitContainer_controller = require('./split-container.controller.cjs');
require('./split-container.css');

"use strict";
const SplitContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSplitContainer",
  props: {
    /**
     * @description 分割容器容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分割容器控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("hidden-trigger", props.controller.state.isHiddenTrigger)];
      return result;
    });
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [vue.createVNode(vue.resolveComponent("iBizSplit"), {
      "modelValue": this.controller.state.splitValue,
      "onUpdate:modelValue": ($event) => this.controller.state.splitValue = $event,
      "mode": this.controller.splitMode,
      "semantic": {
        left: {
          class: this.semanticClass("left"),
          style: this.semanticStyle("left")
        },
        right: {
          class: this.semanticClass("right"),
          style: this.semanticStyle("right")
        },
        top: {
          class: this.semanticClass("top"),
          style: this.semanticStyle("top")
        },
        bottom: {
          class: this.semanticClass("bottom"),
          style: this.semanticStyle("bottom")
        },
        divider: {
          class: this.semanticClass("divider"),
          style: this.semanticStyle("divider")
        }
      }
    }, {
      left: () => defaultSlots[0],
      right: () => defaultSlots[1],
      top: () => defaultSlots[0],
      bottom: () => defaultSlots[1]
    })]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
  }
});

exports.SplitContainer = SplitContainer;
