'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./pickup-view-panel.css');

"use strict";
const PickupViewPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPickupViewPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: true
    },
    noLoadDefault: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.PickupViewPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const onCreated = (event) => {
      c.setEmbedView(event.view);
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
        context: this.c.state.context,
        params: this.c.state.params,
        state: {
          singleSelect: this.c.state.singleSelect,
          noLoadDefault: this.noLoadDefault
        },
        onCreated: this.onCreated
      }) : vue.h(vue.resolveComponent("IBizViewShell"), {
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
