import { defineComponent, ref, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { PanelButtonController } from './panel-button.controller.mjs';
import './panel-button.css';

"use strict";
const PanelButton = /* @__PURE__ */ defineComponent({
  name: "IBizPanelButton",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelButtonController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-button");
    const {
      caption,
      captionItemName,
      renderMode,
      showCaption,
      sysImage,
      codeName,
      itemStyle,
      tooltip,
      buttonCssStyle
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
      if (Object.is(renderMode, "LINK")) {
        return null;
      }
      switch (itemStyle) {
        case "PRIMARY":
          return "primary";
        case "SUCCESS":
          return "success";
        case "INFO":
          return "info";
        case "WARNING":
          return "warning";
        case "DANGER":
          return "danger";
        case "INVERSE":
          return "info";
        default:
          return null;
      }
    });
    const handleButtonClick = async (event) => {
      try {
        state.loading = true;
        await props.controller.onActionClick(event);
        props.controller.onClick();
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
      itemStyle
    };
  },
  render() {
    if (this.state.visible) {
      return createVNode("div", {
        "class": [this.ns.b(), this.ns.m(this.codeName), this.ns.is("loading", this.state.loading), this.itemStyle && this.ns.m(this.itemStyle.toLowerCase()), ...this.controller.containerClass],
        "style": this.tempStyle
      }, [createVNode(resolveComponent("el-button"), {
        "type": this.buttonType,
        "text": this.isText,
        "title": showTitle(this.tooltip),
        "disabled": this.state.disabled,
        "loading": this.state.loading,
        "onClick": this.handleButtonClick
      }, {
        default: () => [createVNode("div", {
          "class": this.ns.b("content")
        }, [createVNode(resolveComponent("iBizIcon"), {
          "class": this.ns.bm("content", "icon"),
          "icon": this.sysImage
        }, null), this.showCaption ? createVNode("span", {
          "class": this.ns.bm("content", "caption")
        }, [this.captionText]) : ""])]
      })]);
    }
    return null;
  }
});

export { PanelButton, PanelButton as default };
