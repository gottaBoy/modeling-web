'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./view-panel.css');

"use strict";
const ViewPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizViewPanelControl",
  props: {
    /**
     * @description 视图面板模型数据
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
    }
  },
  setup() {
    var _a;
    const c = vue3Util.useControlController((...args) => new runtime.ViewPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat((_a = c.model.controlType) == null ? void 0 : _a.toLowerCase()));
    const onCreated = (event) => {
      if (event && event.view) {
        c.setEmbedView(event.view);
      }
    };
    return {
      c,
      ns,
      onCreated
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [this.c.state.isCreated && (this.$slots.default ? this.$slots.default({
        context: this.c.context,
        params: this.c.params,
        onCreated: this.onCreated
      }) : vue.h(vue.resolveComponent("IBizViewShell"), {
        context: this.c.context,
        params: this.c.params,
        viewId: this.c.model.embeddedAppDEViewId,
        onCreated: this.onCreated
      }))]
    });
  }
});

exports.ViewPanelControl = ViewPanelControl;
