import { defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { FormButtonController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../../../../util/index.mjs';
import './form-button.css';
import { convertBtnType } from '../../../../util/button-util/button-util.mjs';

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
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.form);
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
      captionText,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return null;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.ns.is("loading", this.controller.state.loading), this.ns.is("readonly", this.controller.state.readonly), this.semanticClass("button", {
        button: this.controller
      }), this.modelData.detailStyle && this.ns.m(this.modelData.detailStyle.toLowerCase()), ...ibiz.config.common.enhancedUI === false ? this.controller.containerClass : []],
      "style": this.semanticStyle("button", {
        button: this.controller
      })
    }, [createVNode(resolveComponent("el-button"), {
      "sime": "small",
      "onClick": this.controller.onClick.bind(this.controller),
      "type": convertBtnType(this.modelData.buttonStyle),
      "loading": this.controller.state.loading,
      "disabled": this.controller.state.disabled,
      "title": showTitle(this.modelData.tooltip),
      "class": [...ibiz.config.common.enhancedUI === true ? this.controller.containerClass : []]
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.b("content")
      }, [createVNode(resolveComponent("iBizIcon"), {
        "class": [this.ns.bm("content", "icon"), this.semanticClass("button.icon", {
          button: this.controller
        })],
        "style": this.semanticStyle("button.icon", {
          button: this.controller
        }),
        "icon": this.modelData.sysImage
      }, null), this.modelData.showCaption ? createVNode("span", {
        "class": [this.ns.bm("content", "caption"), this.semanticClass("button.caption", {
          button: this.controller
        })],
        "style": this.semanticStyle("button.caption", {
          button: this.controller
        })
      }, [this.captionText]) : null])]
    })]);
  }
});

export { FormButton, FormButton as default };
