'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('./ibiz-emoji-picker.css');

"use strict";
const IBizEmojiPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizEmojiPicker",
  props: vue3Util.getDropdownProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("emoji-picker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.emoji.anchor"),
      selector: ".ibiz-emoji-categories"
    }, {
      class: semanticClass("editor.emoji.anchor.item"),
      selector: ".ibiz-emoji-categories__category"
    }, {
      class: semanticClass("editor.emoji.search"),
      selector: ".ibiz-emoji-input-search__container--input"
    }, {
      class: semanticClass("editor.emoji.search.suffix"),
      selector: ".ibiz-emoji-input-search__container--search"
    }, {
      class: semanticClass("editor.emoji.list"),
      selector: ".ibiz-emoji-list__container"
    }, {
      class: semanticClass("editor.emoji.category"),
      selector: ".ibiz-emoji-category-label"
    }, {
      class: semanticClass("editor.emoji.item"),
      selector: ".ibiz-emoji-item"
    }];
    const childStyle = [{
      style: semanticStyle("editor.emoji.anchor"),
      selector: ".ibiz-emoji-categories"
    }, {
      style: semanticStyle("editor.emoji.anchor.item"),
      selector: ".ibiz-emoji-categories__category"
    }, {
      style: semanticStyle("editor.emoji.search"),
      selector: ".ibiz-emoji-input-search__container--input"
    }, {
      style: semanticStyle("editor.emoji.search.suffix"),
      selector: ".ibiz-emoji-input-search__container--search"
    }, {
      style: semanticStyle("editor.emoji.list"),
      selector: ".ibiz-emoji-list__container"
    }, {
      style: semanticStyle("editor.emoji.category"),
      selector: ".ibiz-emoji-category-label"
    }, {
      style: semanticStyle("editor.emoji.item"),
      selector: ".ibiz-emoji-item"
    }];
    const emojiRef = vue.ref();
    const emoji = vue.ref("");
    const visible = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
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
      emit("change", core.strToBase64(val.data));
    };
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emoji.value = newVal && core.isEmoji("".concat(newVal)) ? core.base64ToStr(newVal) : newVal;
      }
    }, {
      immediate: true
    });
    const renderButtonContent = () => {
      let content = vue.createVNode("span", {
        "class": [ns.e("button-content")],
        "onClick": onAddEmoji
      }, [vue.createVNode("svg", {
        "class": ns.em("button-content", "icon"),
        "viewBox": "0 0 1040 1024",
        "version": "1.1",
        "xmlns": "http://www.w3.org/2000/svg",
        "p-id": "1490",
        "width": "1em",
        "height": "1em"
      }, [vue.createVNode("path", {
        "d": "M512.075261 1024A511.774217 511.774217 0 1 1 730.482434 48.769072a37.630457 37.630457 0 1 1-32.061149 68.035867 436.513303 436.513303 0 1 0 250.468323 395.270322 37.630457 37.630457 0 0 1 75.260914 0 512.526826 512.526826 0 0 1-512.075261 511.924739z",
        "p-id": "1491"
      }, null), vue.createVNode("path", {
        "d": "M333.857416 344.0929a57.348817 57.348817 0 1 0 57.348817 57.348817 57.499339 57.499339 0 0 0-57.348817-57.348817zM686.53006 344.0929a57.348817 57.348817 0 1 0 57.348817 57.348817 57.348817 57.348817 0 0 0-57.348817-57.348817zM515.236219 783.165074c-162.864619 0-262.359547-141.942084-262.359547-219.159782a30.104366 30.104366 0 0 1 60.208731 0c0 48.618551 76.314567 158.951051 202.150816 158.951051s193.571072-134.114949 193.571072-158.951051a30.104366 30.104366 0 0 1 60.208731 0c0 54.488902-90.012054 219.159782-253.779803 219.159782zM1009.549904 207.720123h-67.132735V139.985301a30.104366 30.104366 0 1 0-60.208732 0v67.734822h-67.734822a30.104366 30.104366 0 0 0-30.104366 30.104366 30.104366 30.104366 0 0 0 30.104366 30.104366h67.734822v67.734823a30.104366 30.104366 0 0 0 60.208732 0v-67.734823h67.734823a30.104366 30.104366 0 0 0 30.104365-30.104366 30.104366 30.104366 0 0 0-30.706453-30.104366z",
        "p-id": "1492"
      }, null)]), ibiz.i18n.t("editor.emojiPicker.addEmoji")]);
      if (emoji.value) {
        content = vue.createVNode("span", {
          "class": [ns.e("button-content")]
        }, [vue.createVNode("svg", {
          "class": ns.em("button-content", "icon"),
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 1024 1024",
          "width": "1em",
          "height": "1em",
          "onClick": onClearEmoji
        }, [vue.createVNode("path", {
          "d": "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
        }, null)]), vue.createVNode("span", {
          "innerHTML": emoji.value
        }, null)]);
      }
      return content;
    };
    const renderFormDefaultContent = () => {
      return vue.createVNode("div", {
        "class": [ns.b("form-default-content"), ns.is("clear", !!emoji.value)]
      }, [emoji.value ? emoji.value : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
        "showPlaceholder": c.emptyShowPlaceholder,
        "placeHolder": c.placeHolder
      }, null)]);
    };
    const renderReference = () => {
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [ns.e("button"), ns.is("clear", !!emoji.value), semanticClass("editor.content")],
        "style": semanticStyle("editor.content")
      }, {
        default: () => [showFormDefaultContent.value && renderFormDefaultContent(), renderButtonContent()]
      });
    };
    return {
      c,
      ns,
      emoji,
      visible,
      emojiRef,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onSelect,
      onAddEmoji,
      onClearEmoji,
      renderReference
    };
  },
  render() {
    return vue.createVNode("div", {
      "ref": "emojiRef",
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("active", this.visible), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "width": "auto",
      "hide-after": 0,
      "trigger": "click",
      "placement": "bottom-start",
      "visible": this.visible,
      "onUpdate:visible": ($event) => this.visible = $event,
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup")
    }, {
      reference: () => this.renderReference(),
      default: () => {
        return vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizEmojiSelect"), {
          "dark": true,
          "continuousList": true,
          "onSelect": this.onSelect
        }, null), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
      }
    })]);
  }
});

exports.IBizEmojiPicker = IBizEmojiPicker;
