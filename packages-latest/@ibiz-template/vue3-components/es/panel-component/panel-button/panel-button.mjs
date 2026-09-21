import { defineComponent, createVNode, resolveComponent, ref, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { PanelButtonController } from './panel-button.controller.mjs';
import '../../util/index.mjs';
import './panel-button.css';
import { convertBtnType } from '../../util/button-util/button-util.mjs';

"use strict";
const PanelButton = /* @__PURE__ */ defineComponent({
  name: "IBizPanelButton",
  props: {
    /**
     * @description 面板项模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板项控制器
     */
    controller: {
      type: PanelButtonController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-button");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      caption,
      captionItemName,
      renderMode,
      showCaption,
      sysImage,
      codeName,
      itemStyle,
      tooltip,
      buttonCssStyle,
      buttonStyle
    } = props.modelData;
    const {
      panel,
      state
    } = props.controller;
    const tempStyle = ref("");
    if (buttonCssStyle) {
      tempStyle.value = buttonCssStyle;
    }
    const captionText = computed(() => {
      if (captionItemName && panel.data) {
        return panel.data[captionItemName.toLowerCase()];
      }
      return caption;
    });
    let isText = false;
    if (Object.is(renderMode, "LINK")) {
      isText = true;
    }
    const buttonType = computed(() => {
      if (Object.is(renderMode, "LINK"))
        return "text";
      return convertBtnType(buttonStyle);
    });
    const handleButtonClick = async (event) => {
      try {
        state.loading = true;
        await props.controller.onActionClick(event);
        props.controller.onClick(event);
      } finally {
        state.loading = false;
      }
    };
    return {
      ns,
      isText,
      captionText,
      buttonType,
      showCaption,
      sysImage,
      codeName,
      state,
      tooltip,
      handleButtonClick,
      buttonCssStyle,
      tempStyle,
      itemStyle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (this.state.visible) {
      return createVNode("div", {
        "class": [this.ns.b(), this.ns.m(this.codeName), this.ns.is("loading", this.state.loading), this.itemStyle && this.ns.m(this.itemStyle.toLowerCase()), this.semanticClass("root"), ...this.controller.containerClass],
        "style": [this.tempStyle, this.semanticStyle("root")]
      }, [createVNode(resolveComponent("el-button"), {
        "type": this.buttonType,
        "text": this.isText,
        "data-id": this.modelData.id,
        "title": showTitle(this.tooltip),
        "disabled": this.state.disabled,
        "loading": this.state.loading,
        "onClick": this.handleButtonClick
      }, {
        default: () => [createVNode("div", {
          "class": this.ns.b("content")
        }, [createVNode(resolveComponent("iBizIcon"), {
          "class": [this.ns.bm("content", "icon"), this.semanticClass("icon")],
          "style": this.semanticStyle("icon"),
          "icon": this.sysImage
        }, null), this.showCaption ? createVNode("span", {
          "class": [this.ns.bm("content", "caption"), this.semanticClass("caption")],
          "style": this.semanticStyle("caption")
        }, [this.captionText]) : ""])]
      })]);
    }
    return null;
  }
});

export { PanelButton, PanelButton as default };
