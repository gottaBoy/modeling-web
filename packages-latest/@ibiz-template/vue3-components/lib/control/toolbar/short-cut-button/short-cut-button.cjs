'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('../../../util/index.cjs');
require('./short-cut-button.css');
var buttonUtil = require('../../../util/button-util/button-util.cjs');

"use strict";
const IBizShortCutButton = /* @__PURE__ */ vue.defineComponent({
  name: "IBizShortCutButton",
  props: {
    mode: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    item: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  emits: ["click"],
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("short-cut-button");
    const ns2 = vue3Util.useNamespace("toolbar-item");
    const onClick = (e) => {
      emit("click", e);
    };
    const buttonType = (_a = props.item.buttonStyle) == null ? void 0 : _a.toLowerCase();
    const buttonState = vue.computed(() => props.controller.state.buttonsState[props.item.id]);
    const isShortCut = vue.computed(() => props.controller.view.state.isShortCut);
    return {
      ns,
      ns2,
      buttonState,
      buttonType,
      isShortCut,
      onClick
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("short-cut", this.isShortCut)]
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "title": core.showTitle(this.isShortCut ? "".concat(ibiz.i18n.t("app.cancel")).concat(this.item.tooltip) : this.item.tooltip),
      "size": this.size,
      "type": buttonUtil.convertBtnType(this.item.buttonStyle),
      "loading": this.buttonState.loading,
      "disabled": this.buttonState.disabled,
      "onClick": this.onClick
    }, {
      default: () => [this.item.showIcon && this.item.sysImage && vue.createVNode("span", {
        "class": [this.ns2.b("icon"), this.ns.e("icon")]
      }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": this.item.sysImage
      }, null)]), this.item.showCaption && vue.createVNode("span", {
        "class": this.ns2.b("text")
      }, [this.isShortCut ? "".concat(ibiz.i18n.t("app.cancel")).concat(this.item.caption) : this.item.caption])]
    })]);
  }
});

exports.IBizShortCutButton = IBizShortCutButton;
