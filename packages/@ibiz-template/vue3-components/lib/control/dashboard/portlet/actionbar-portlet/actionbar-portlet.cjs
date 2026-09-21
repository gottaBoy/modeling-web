'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
const ActionBarPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizActionBarPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.ActionBarPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, event);
    };
    return {
      ns,
      onActionClick
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return vue.createVNode(vue.resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [this.modelData.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "action-details": this.modelData.uiactionGroup.uiactionGroupDetails,
        "actions-state": this.controller.state.actionGroupState,
        "onActionClick": this.onActionClick
      }, null)]
    });
  }
});

exports.ActionBarPortlet = ActionBarPortlet;
