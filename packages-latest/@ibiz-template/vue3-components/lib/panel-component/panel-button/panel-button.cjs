'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var panelButton_controller = require('./panel-button.controller.cjs');
require('../../util/index.cjs');
require('./panel-button.css');
var buttonUtil = require('../../util/button-util/button-util.cjs');

"use strict";
const PanelButton = /* @__PURE__ */ vue.defineComponent({
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
      type: panelButton_controller.PanelButtonController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-button");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
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
    const tempStyle = vue.ref("");
    if (buttonCssStyle) {
      tempStyle.value = buttonCssStyle;
    }
    const captionText = vue.computed(() => {
      if (captionItemName && panel.data) {
        return panel.data[captionItemName.toLowerCase()];
      }
      return caption;
    });
    let isText = false;
    if (Object.is(renderMode, "LINK")) {
      isText = true;
    }
    const buttonType = vue.computed(() => {
      if (Object.is(renderMode, "LINK"))
        return "text";
      return buttonUtil.convertBtnType(buttonStyle);
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
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.m(this.codeName), this.ns.is("loading", this.state.loading), this.itemStyle && this.ns.m(this.itemStyle.toLowerCase()), this.semanticClass("root"), ...this.controller.containerClass],
        "style": [this.tempStyle, this.semanticStyle("root")]
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "type": this.buttonType,
        "text": this.isText,
        "data-id": this.modelData.id,
        "title": core.showTitle(this.tooltip),
        "disabled": this.state.disabled,
        "loading": this.state.loading,
        "onClick": this.handleButtonClick
      }, {
        default: () => [vue.createVNode("div", {
          "class": this.ns.b("content")
        }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": [this.ns.bm("content", "icon"), this.semanticClass("icon")],
          "style": this.semanticStyle("icon"),
          "icon": this.sysImage
        }, null), this.showCaption ? vue.createVNode("span", {
          "class": [this.ns.bm("content", "caption"), this.semanticClass("caption")],
          "style": this.semanticStyle("caption")
        }, [this.captionText]) : ""])]
      })]);
    }
    return null;
  }
});

exports.PanelButton = PanelButton;
exports.default = PanelButton;
