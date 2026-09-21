import { defineComponent, ref, computed, watch, createVNode, resolveComponent } from 'vue';
import { getDropdownProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import { strToBase64, isEmoji, base64ToStr } from '@ibiz-template/core';
import './ibiz-emoji-picker.css';

"use strict";
const IBizEmojiPicker = /* @__PURE__ */ defineComponent({
  name: "IBizEmojiPicker",
  props: getDropdownProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("emoji-picker");
    const c = props.controller;
    const emojiRef = ref();
    const emoji = ref("");
    const visible = ref(false);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const onAddEmoji = (e) => {
      e.stopPropagation();
      e.preventDefault();
      visible.value = true;
    };
    const onClearEmoji = (e) => {
      e.stopPropagation();
      e.preventDefault();
      emoji.value = "";
      visible.value = false;
      emit("change", "");
      emojiRef.value.click();
    };
    const onSelect = (val) => {
      visible.value = false;
      emoji.value = val.data;
      emit("change", strToBase64(val.data));
    };
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emoji.value = newVal && isEmoji("".concat(newVal)) ? base64ToStr(newVal) : newVal;
      }
    }, {
      immediate: true
    });
    const renderButtonContent = () => {
      let content = createVNode("span", {
        "class": [ns.e("button-content")],
        "onClick": onAddEmoji
      }, [createVNode("svg", {
        "class": ns.em("button-content", "icon"),
        "viewBox": "0 0 1040 1024",
        "version": "1.1",
        "xmlns": "http://www.w3.org/2000/svg",
        "p-id": "1490",
        "width": "1em",
        "height": "1em"
      }, [createVNode("path", {
        "d": "M512.075261 1024A511.774217 511.774217 0 1 1 730.482434 48.769072a37.630457 37.630457 0 1 1-32.061149 68.035867 436.513303 436.513303 0 1 0 250.468323 395.270322 37.630457 37.630457 0 0 1 75.260914 0 512.526826 512.526826 0 0 1-512.075261 511.924739z",
        "p-id": "1491"
      }, null), createVNode("path", {
        "d": "M333.857416 344.0929a57.348817 57.348817 0 1 0 57.348817 57.348817 57.499339 57.499339 0 0 0-57.348817-57.348817zM686.53006 344.0929a57.348817 57.348817 0 1 0 57.348817 57.348817 57.348817 57.348817 0 0 0-57.348817-57.348817zM515.236219 783.165074c-162.864619 0-262.359547-141.942084-262.359547-219.159782a30.104366 30.104366 0 0 1 60.208731 0c0 48.618551 76.314567 158.951051 202.150816 158.951051s193.571072-134.114949 193.571072-158.951051a30.104366 30.104366 0 0 1 60.208731 0c0 54.488902-90.012054 219.159782-253.779803 219.159782zM1009.549904 207.720123h-67.132735V139.985301a30.104366 30.104366 0 1 0-60.208732 0v67.734822h-67.734822a30.104366 30.104366 0 0 0-30.104366 30.104366 30.104366 30.104366 0 0 0 30.104366 30.104366h67.734822v67.734823a30.104366 30.104366 0 0 0 60.208732 0v-67.734823h67.734823a30.104366 30.104366 0 0 0 30.104365-30.104366 30.104366 30.104366 0 0 0-30.706453-30.104366z",
        "p-id": "1492"
      }, null)]), ibiz.i18n.t("editor.emojiPicker.addEmoji")]);
      if (emoji.value) {
        content = createVNode("span", {
          "class": [ns.e("button-content")]
        }, [createVNode("svg", {
          "class": ns.em("button-content", "icon"),
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 1024 1024",
          "width": "1em",
          "height": "1em",
          "onClick": onClearEmoji
        }, [createVNode("path", {
          "d": "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
        }, null)]), createVNode("span", {
          "innerHTML": emoji.value
        }, null)]);
      }
      return content;
    };
    const renderFormDefaultContent = () => {
      return createVNode("div", {
        "class": [ns.b("form-default-content"), ns.is("clear", !!emoji.value)]
      }, [emoji.value ? emoji.value : ibiz.config.common.emptyText]);
    };
    const renderReference = () => {
      return createVNode(resolveComponent("el-button"), {
        "class": [ns.e("button"), ns.is("clear", !!emoji.value)]
      }, {
        default: () => [showFormDefaultContent.value && renderFormDefaultContent(), renderButtonContent()]
      });
    };
    return {
      ns,
      c,
      emoji,
      visible,
      emojiRef,
      showFormDefaultContent,
      onSelect,
      onAddEmoji,
      onClearEmoji,
      renderReference
    };
  },
  render() {
    return createVNode("div", {
      "ref": "emojiRef",
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("active", this.visible), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [createVNode(resolveComponent("el-popover"), {
      "trigger": "click",
      "placement": "bottom-start",
      "width": "auto",
      "visible": this.visible,
      "onUpdate:visible": ($event) => this.visible = $event,
      "hide-after": 0,
      "popper-class": [this.ns.b("popper")]
    }, {
      reference: () => this.renderReference(),
      default: () => {
        return createVNode(resolveComponent("iBizEmojiSelect"), {
          "continuousList": true,
          "dark": true,
          "onSelect": this.onSelect
        }, null);
      }
    })]);
  }
});

export { IBizEmojiPicker };
