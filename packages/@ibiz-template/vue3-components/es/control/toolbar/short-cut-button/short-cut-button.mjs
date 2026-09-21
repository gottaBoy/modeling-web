import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './short-cut-button.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const IBizShortCutButton = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("short-cut-button");
    const ns2 = useNamespace("toolbar-item");
    const onClick = (e) => {
      emit("click", e);
    };
    const buttonType = (_a = props.item.buttonStyle) == null ? void 0 : _a.toLowerCase();
    const buttonState = computed(() => props.controller.state.buttonsState[props.item.id]);
    const isShortCut = computed(() => props.controller.view.state.isShortCut);
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("short-cut", this.isShortCut)]
    }, [createVNode(resolveComponent("el-button"), {
      "title": showTitle(this.isShortCut ? "".concat(ibiz.i18n.t("app.cancel")).concat(this.item.tooltip) : this.item.tooltip),
      "size": this.size,
      "text": Object.is(this.buttonType, "inverse"),
      "type": this.buttonType,
      "loading": this.buttonState.loading,
      "disabled": this.buttonState.disabled,
      "onClick": this.onClick
    }, {
      default: () => [this.item.showIcon && this.item.sysImage && createVNode("span", {
        "class": [this.ns2.b("icon"), this.ns.e("icon")]
      }, [createVNode(resolveComponent("iBizIcon"), {
        "icon": this.item.sysImage
      }, null)]), this.item.showCaption && createVNode("span", {
        "class": this.ns2.b("text")
      }, [this.isShortCut ? "".concat(ibiz.i18n.t("app.cancel")).concat(this.item.caption) : this.item.caption])]
    })]);
  }
});

export { IBizShortCutButton };
