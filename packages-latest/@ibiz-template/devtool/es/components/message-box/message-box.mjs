import { Transition, createVNode, createTextVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './message-box.css';

"use strict";
const MessageBox = /* @__PURE__ */ defineComponent({
  name: "MessageBox",
  component: [Transition],
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    isShowFoot: {
      type: Boolean,
      default: true
    }
  },
  emits: ["hasClosed", "changeDialog"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("devtool-dialog");
    const closeDialog = (type = "") => {
      emit("changeDialog", false);
      emit("hasClosed", type);
    };
    const renderSvg = () => {
      return createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }, [createVNode("path", {
        "fill": "currentColor",
        "d": "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      }, null)]);
    };
    const clickMaskCloseFn = () => {
      closeDialog();
    };
    const clickButton = (type) => {
      closeDialog(type);
    };
    return {
      ns,
      clickMaskCloseFn,
      closeDialog,
      renderSvg,
      clickButton
    };
  },
  render() {
    return createVNode(Transition, {
      "name": "animation"
    }, {
      default: () => {
        var _a, _b;
        return [this.isShowDialog && createVNode("div", {
          "class": [this.ns.b(), this.mask ? "isShowMask" : ""],
          "onClick": this.clickMaskCloseFn
        }, [createVNode("div", {
          "class": this.ns.e("wrapper"),
          "onClick": (e) => e.stopPropagation()
        }, [createVNode("div", {
          "class": this.ns.e("header")
        }, [createVNode("span", null, [this.title]), this.showCloseIcon && createVNode("div", {
          "class": this.ns.e("icon"),
          "onClick": () => this.closeDialog("")
        }, [this.renderSvg()])]), createVNode("div", {
          "class": this.ns.e("content")
        }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]), createVNode("div", {
          "class": this.ns.e("footer")
        }, [createVNode("button", {
          "class": this.ns.e("footer-button"),
          "onClick": () => this.clickButton("cancel")
        }, [createTextVNode("\u53D6\u6D88")]), createVNode("button", {
          "class": this.ns.e("footer-button"),
          "onClick": () => this.clickButton("confirm")
        }, [createTextVNode("\u4FDD\u5B58")])])])])];
      }
    });
  }
});

export { MessageBox, MessageBox as default };
