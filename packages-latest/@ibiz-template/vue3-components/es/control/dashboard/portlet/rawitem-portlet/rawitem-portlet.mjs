import { isVNode, defineComponent, createVNode, resolveComponent, h, ref, onMounted } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RawItemPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizRawItemPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a;
    const c = props.controller;
    const ns = useNamespace("portlet-".concat((_a = c.model.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.dashboard);
    const content = ref();
    const onInit = async () => {
      const rawItemModel = c.model.rawItem;
      if (!rawItemModel)
        return;
      let rawItemContent;
      if (rawItemModel.contentType === "RAW") {
        rawItemContent = rawItemModel.caption;
      } else if (rawItemModel.contentType === "HTML") {
        rawItemContent = rawItemModel.content;
      }
      const data = c.dashboard.view.srfactiveviewdata || {};
      if (rawItemContent && rawItemModel.templateMode)
        rawItemContent = await ibiz.util.hbs.render(rawItemContent.replaceAll("//n", "\n"), {
          data: {
            ...data
          },
          context: props.controller.context,
          params: props.controller.params
        });
      content.value = rawItemContent;
    };
    onMounted(() => {
      onInit();
    });
    return {
      ns,
      content,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(_slot = h(resolveComponent("iBizRawItem"), {
      class: this.semanticClass("portlet.rawitem", {
        rawitem: this.controller
      }),
      style: this.semanticStyle("portlet.rawitem", {
        rawitem: this.controller
      }),
      rawItem: this.modelData,
      content: this.content
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { RawItemPortlet };
