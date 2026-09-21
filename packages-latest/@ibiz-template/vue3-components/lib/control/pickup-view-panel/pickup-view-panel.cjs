'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./pickup-view-panel.css');

"use strict";
const PickupViewPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPickupViewPanelControl",
  props: {
    /**
     * @description 选择视图面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 是否单选
     * @default true
     */
    singleSelect: {
      type: Boolean,
      default: true
    },
    /**
     * @description 默认不加载数据
     * @default false
     */
    noLoadDefault: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.PickupViewPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const onCreated = (event) => {
      c.setEmbedView(event.view);
    };
    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      onCreated
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, {
      default: () => [this.c.state.isCreated && (this.$slots.default ? this.$slots.default({
        context: this.c.state.context,
        params: this.c.state.params,
        state: {
          singleSelect: this.c.state.singleSelect,
          noLoadDefault: this.noLoadDefault
        },
        onCreated: this.onCreated
      }) : vue.h(vue.resolveComponent("IBizViewShell"), {
        class: [this.ns.e("content"), this.semanticClass("content")],
        style: this.semanticStyle("content"),
        context: this.c.state.context,
        params: this.c.state.params,
        viewId: this.c.model.embeddedAppDEViewId,
        state: {
          singleSelect: this.c.state.singleSelect,
          noLoadDefault: this.noLoadDefault
        },
        onCreated: this.onCreated
      }))]
    });
  }
});

exports.PickupViewPanelControl = PickupViewPanelControl;
