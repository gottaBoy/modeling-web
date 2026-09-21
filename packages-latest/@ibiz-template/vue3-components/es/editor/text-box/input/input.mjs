import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, mergeProps, resolveDirective, ref, computed, watch, onUnmounted } from 'vue';
import { debounce } from 'lodash-es';
import { useNamespace, useSemanticNode, useUIStore, useCodeListListen, getEditorEmits, getInputProps } from '@ibiz-template/vue3-util';
import { isEmoji, base64ToStr } from '@ibiz-template/core';
import './input.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizInput = /* @__PURE__ */ defineComponent({
  name: "IBizInput",
  props: getInputProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("input");
    const c = props.controller;
    const editorModel = c.model;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const isEditable = ref(false);
    const editorRef = ref();
    const showLimit = ref(true);
    const isAuto = ref(false);
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-textarea__inner"
    }, {
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.count"),
      selector: ".el-input__count"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.input"),
      selector: ".el-textarea__inner"
    }, {
      style: semanticStyle("editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.count"),
      selector: ".el-input__count"
    }];
    const rows = ref(2);
    if (editorModel.editorType === "TEXTAREA_10") {
      rows.value = 10;
    }
    if (c.editorParams) {
      if (c.editorParams.SHOWLIMIT === "false" || c.editorParams.showlimit === "false") {
        showLimit.value = false;
      }
      if (c.editorParams.ISAUTO === "true" || c.editorParams.isauto === "true") {
        isAuto.value = true;
      }
    }
    const type = computed(() => {
      switch (editorModel.editorType) {
        case "TEXTBOX":
        case "MOBTEXT":
          return "text";
        case "PASSWORD":
        case "MOBPASSWORD":
          return "password";
        case "TEXTAREA":
        case "TEXTAREA_10":
        case "MOBTEXTAREA":
          return "textarea";
        default:
          return "string";
      }
    });
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const currentVal = ref("");
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal == null) {
          currentVal.value = "";
        } else if (isEmoji("".concat(newVal))) {
          currentVal.value = base64ToStr("".concat(newVal));
        } else {
          currentVal.value = newVal.toString();
        }
      }
    }, {
      immediate: true
    });
    const currentFormatVal = computed(() => {
      let text = "";
      const {
        unitName
      } = props.controller.parent;
      if (currentVal.value) {
        text = props.controller.formatValue(currentVal.value);
      }
      if (unitName) {
        if (c.emptyHiddenUnit) {
          if (text) {
            text += unitName;
          }
        } else {
          text += unitName;
        }
      }
      return text;
    });
    const onEmit = (val, eventName = "blur") => {
      if (eventName === c.triggerMode) {
        emit("change", val);
      }
    };
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    let isDebounce = false;
    let awaitSearch;
    let blurCacheValue;
    const handleChange = (val) => {
      if (blurCacheValue !== val) {
        onEmit(val);
      }
      blurCacheValue = void 0;
    };
    const debounceChange = debounce((val) => {
      if (blurCacheValue !== val) {
        onEmit(val, "input");
      }
      blurCacheValue = void 0;
      isDebounce = false;
      if (awaitSearch) {
        awaitSearch();
      }
    }, 300, {
      leading: true
    });
    const handleInput = (val) => {
      isDebounce = true;
      debounceChange(val);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
        if (isDebounce) {
          awaitSearch = () => {
            editorRef.value.$el.dispatchEvent(e);
          };
        }
      }
    };
    const onBlur = (event) => {
      blurCacheValue = event.target.value;
      if (blurCacheValue != props.value) {
        onEmit(blurCacheValue);
      }
      emit("blur", event);
      setEditable(false);
    };
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal) {
        const inputTag = type.value === "textarea" ? "textarea" : "input";
        const input = newVal.$el.getElementsByTagName(inputTag)[0];
        input.focus();
      }
    });
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    let chatInstance;
    const onClick = async () => {
      const appDataEntityId = c.model.appDataEntityId;
      if (!appDataEntityId || !c.deACMode)
        return;
      const {
        zIndex
      } = useUIStore();
      const containerZIndex = zIndex.increment();
      chatInstance = await ibiz.aiChatUtil.getAIChat();
      const {
        containerOptions,
        chatOptions
      } = await ibiz.aiChatUtil.getEditorExAIChatParams(c.editorParams, c.context, c.params, props.data, c.deACMode, {
        chatInstance,
        view: c.view,
        ctrl: c.ctrl
      });
      const resourceOptions = await ibiz.aiChatUtil.getAIResourceOptions(c.context, c.params);
      let chatCaption = c.deACMode.logicName;
      if (c.editorParams.srfaichatcaption) {
        chatCaption = ibiz.appUtil.resolveI18nText(c.editorParams.srfaichatcaption);
      }
      chatInstance.create({
        resourceOptions,
        containerOptions: {
          zIndex: containerZIndex,
          ...containerOptions
        },
        chatOptions: {
          caption: chatCaption,
          context: {
            ...c.context
          },
          params: {
            ...c.params,
            srfactag: c.deACMode.codeName
          },
          appDataEntityId,
          ...chatOptions,
          action: (action, message) => {
            if (action === "backfill")
              emit("change", message.realcontent);
          }
        }
      });
    };
    onUnmounted(() => {
      if (chatInstance) {
        chatInstance.close();
      }
    });
    const readonlyText = computed(() => {
      const {
        unitName
      } = props.controller.parent;
      let text = "".concat(props.controller.formatValue(currentVal.value));
      if (unitName) {
        if (c.emptyHiddenUnit) {
          if (text) {
            text += unitName;
          }
        } else {
          text += unitName;
        }
      }
      return text;
    });
    const shouldAutoComplete = computed(() => {
      return c.model.editorParams && c.model.editorParams.autocomplete && c.toBoolean(c.model.editorParams.autocomplete) ? "on" : "new-password";
    });
    const items = ref([]);
    if (c.codeList) {
      watch(() => props.data, (newVal) => {
        c.loadCodeList(newVal).then((_codeList) => {
          items.value = _codeList;
        });
      }, {
        immediate: true,
        deep: true
      });
    }
    const fn = (data) => {
      if (data) {
        items.value = data;
      }
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    return {
      c,
      ns,
      rows,
      type,
      items,
      isAuto,
      editorRef,
      showLimit,
      childClass,
      childStyle,
      isEditable,
      currentVal,
      readonlyText,
      semanticClass,
      semanticStyle,
      currentFormatVal,
      shouldAutoComplete,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onClick,
      handleInput,
      handleKeyUp,
      setEditable,
      handleChange
    };
  },
  render() {
    const {
      unitName
    } = this.c.parent;
    const {
      editorWidth,
      editorHeight,
      predefinedType
    } = this.c.model;
    let content = null;
    if (this.readonly) {
      if (this.c.codeList) {
        content = createVNode(resolveComponent("iBizCodeList"), {
          "class": this.semanticClass("editor.content"),
          "style": this.semanticStyle("editor.content"),
          "codeListItems": this.items,
          "codeList": this.c.codeList,
          "value": this.currentVal,
          "convertToCodeItemText": this.c.convertToCodeItemText
        }, null);
      } else {
        content = this.readonlyText;
      }
    } else {
      const slots = {};
      if (unitName) {
        slots.suffix = () => {
          let unitText = "";
          if (this.c.emptyHiddenUnit) {
            if (this.currentVal) {
              unitText = unitName;
            }
          } else {
            unitText = unitName;
          }
          return createVNode("i", {
            "class": this.ns.e("unit")
          }, [unitText]);
        };
      }
      if (predefinedType === "AUTH_USERID") {
        slots.prefix = () => createVNode("ion-icon", {
          "name": "person"
        }, null);
      } else if (predefinedType === "AUTH_PASSWORD") {
        slots.prefix = () => createVNode("ion-icon", {
          "name": "unlock-alt"
        }, null);
      }
      content = withDirectives(createVNode(resolveComponent("el-input"), mergeProps({
        "ref": "editorRef",
        "clearable": true,
        "modelValue": this.currentVal,
        "onUpdate:modelValue": ($event) => this.currentVal = $event,
        "placeholder": this.c.placeHolder,
        "type": this.type,
        "rows": this.rows,
        "resize": "none",
        "autosize": this.isAuto,
        "maxlength": this.c.model.maxLength,
        "minlength": this.c.model.minLength,
        "show-word-limit": this.showLimit && this.c.model.showMaxLength,
        "onChange": this.handleChange,
        "onInput": this.handleInput,
        "onKeyup": this.handleKeyUp,
        "onBlur": this.onBlur,
        "onFocus": this.onFocus,
        "class": [this.ns.b("input"), this.semanticClass("editor.content")],
        "disabled": this.disabled,
        "style": this.semanticStyle("editor.content"),
        "show-password": this.type === "password",
        "autocomplete": this.shouldAutoComplete
      }, this.$attrs), _isSlot(slots) ? slots : {
        default: () => [slots]
      }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
    }
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.currentVal ? this.type === "password" ? this.currentVal.split("").map((_item) => "\u2022") : this.currentFormatVal : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("textarea", Object.is(this.type, "textarea")), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": {
        width: editorWidth ? "".concat(editorWidth, "px") : "",
        height: editorHeight ? "".concat(editorHeight, "px") : "",
        ...this.semanticStyle("editor.root")
      }
    }, [this.showFormDefaultContent && formDefaultContent, this.type === "password" && this.shouldAutoComplete === "new-password" ? createVNode("input", {
      "type": "text",
      "style": "opacity: 0;position:absolute;width:0;height:0;"
    }, null) : null, content, this.c.chatCompletion ? createVNode("div", {
      "class": [this.ns.e("ai-chat"), this.semanticClass("editor.ai")],
      "style": this.semanticStyle("editor.ai"),
      "title": ibiz.i18n.t("editor.textBox.openAiChat"),
      "onClick": this.onClick
    }, [createVNode("ion-icon", {
      "src": "./assets/images/svg/chat.svg"
    }, null)]) : null]);
  }
});

export { IBizInput };
