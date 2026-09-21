import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ActionBarPortletController } from '@ibiz-template/runtime';

"use strict";
const ActionBarPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizActionBarPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ActionBarPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.dashboard);
    const zIndex = props.controller.dashboard.state.zIndex;
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, event);
    };
    return {
      ns,
      zIndex,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [this.modelData.uiactionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
        "class": this.semanticClass("portlet.actionbar", {
          actionbar: this.controller
        }),
        "style": this.semanticStyle("portlet.actionbar", {
          actionbar: this.controller
        }),
        "zIndex": this.zIndex,
        "action-details": this.modelData.uiactionGroup.uiactionGroupDetails,
        "actions-state": this.controller.state.actionGroupState,
        "onActionClick": this.onActionClick
      }, null)]
    });
  }
});

export { ActionBarPortlet };
