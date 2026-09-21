import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { FormButtonController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-button.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const FormButton = /* @__PURE__ */ defineComponent({
  name: "IBizFormButton",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormButtonController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-button");
    const captionText = computed(() => {
      const {
        caption,
        captionItemName
      } = props.modelData;
      if (captionItemName && props.controller.data[captionItemName]) {
        return props.controller.data[captionItemName];
      }
      return caption;
    });
    return {
      ns,
      captionText
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return null;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.ns.is("loading", this.controller.state.loading), this.modelData.detailStyle && this.ns.m(this.modelData.detailStyle.toLowerCase()), ...this.controller.containerClass]
    }, [createVNode(resolveComponent("el-button"), {
      "sime": "small",
      "onClick": this.controller.onClick.bind(this.controller),
      "loading": this.controller.state.loading,
      "disabled": this.controller.state.disabled,
      "title": showTitle(this.modelData.tooltip)
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.b("content")
      }, [createVNode(resolveComponent("iBizIcon"), {
        "class": this.ns.bm("content", "icon"),
        "icon": this.modelData.sysImage
      }, null), this.modelData.showCaption ? createVNode("span", {
        "class": this.ns.bm("content", "caption")
      }, [this.captionText]) : null])]
    })]);
  }
});

export { FormButton, FormButton as default };
