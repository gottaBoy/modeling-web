'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var ibizHtmlPreviewIcon = require('./ibiz-html-preview-icon.cjs');
var ibizHtmlPreviewUtil = require('./ibiz-html-preview-util.cjs');
require('./ibiz-html-preview.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizHtmlPreview = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHtmlPreview",
  props: vue3Util.getHtmlProps(),
  emits: vue3Util.getHtmlEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("html-preview");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      zIndex
    } = vue3Util.useUIStore();
    const isPreview = vue.ref(false);
    const isFullScreen = vue.ref(false);
    const splitValue = vue.ref(1);
    const editorRef = vue.ref();
    const previewRef = vue.ref();
    const rootRef = vue.ref();
    const hoverToolbarRef = vue.ref();
    const showHoverToolbar = vue.ref(false);
    const hoverToolbarStyle = vue.ref({});
    const isCopying = vue.ref(false);
    const readonly = vue.computed(() => props.readonly || props.disabled);
    const previewValue = vue.ref("");
    let fullScreenCleanup = core.NOOP;
    let selectChangeCleanup = core.NOOP;
    let timerId;
    let copyElement = null;
    const handleCopy = (event) => {
      event.stopPropagation();
      if (isCopying.value)
        return;
      if (timerId)
        clearTimeout(timerId);
      isCopying.value = true;
      const value = editorRef.value.innerText;
      if (!copyElement) {
        copyElement = document.createElement("textarea");
        copyElement.style.position = "absolute";
        copyElement.style.left = "-9999px";
        document.body.appendChild(copyElement);
      }
      copyElement.value = value;
      copyElement.select();
      document.execCommand("copy");
      timerId = setTimeout(() => {
        isCopying.value = false;
      }, 2e3);
    };
    const getValue = () => {
      if (!editorRef.value) {
        return "";
      }
      let value = editorRef.value.innerText;
      if (c.enableXss) {
        value = editorRef.value.innerHTML;
      }
      value = value.replace(/<br\s*\/?>/gi, "\n");
      return value;
    };
    const getHTML = () => {
      if (c.enableXss) {
        return ibizHtmlPreviewUtil.unescapeHTML(props.value || "");
      }
      return props.value || "";
    };
    const handleInput = () => {
      if (isPreview.value) {
        previewValue.value = editorRef.value.innerText;
      }
    };
    const handleBlur = () => {
      const value = getValue();
      if (value !== props.value) {
        emit("change", value);
      }
    };
    vue.watch(() => props.value, (newVal) => {
      const value = getValue();
      if (editorRef.value && newVal !== value && (typeof newVal === "string" || newVal == null)) {
        if (newVal == null) {
          editorRef.value.innerText = "";
        } else {
          editorRef.value.innerText = getHTML();
          if (isPreview.value) {
            previewValue.value = editorRef.value.innerText;
          }
        }
      }
    });
    const onKeyDown = (e) => {
      const dom = editorRef.value;
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          const selection = window.getSelection();
          if (!selection.isCollapsed) {
            ibizHtmlPreviewUtil.indentSelection(dom, e.shiftKey);
          } else if (e.shiftKey) {
            ibizHtmlPreviewUtil.removeIndent(dom);
          } else {
            ibizHtmlPreviewUtil.insertText(ibizHtmlPreviewUtil.TAB);
          }
          break;
      }
    };
    vue.onMounted(() => {
      if (c.enablePreview && !readonly.value) {
        isPreview.value = true;
        splitValue.value = 0.5;
      }
      if (editorRef.value && props.value) {
        editorRef.value.innerText = getHTML();
        if (isPreview.value) {
          previewValue.value = editorRef.value.innerText;
        }
      }
      fullScreenCleanup = core.listenJSEvent(window, "fullscreenchange", () => {
        if (isFullScreen.value) {
          isFullScreen.value = ibiz.fullscreenUtil.isFullScreen;
        }
      });
      if (c.inLineChatCompletion) {
        selectChangeCleanup = core.listenJSEvent(document, "selectionchange", () => {
          if (editorRef.value) {
            const selection = document.getSelection();
            if (selection && selection.anchorNode && editorRef.value.contains(selection.anchorNode)) {
              c.selectedText = selection.toString();
              if (c.selectedText) {
                c.lastRange = selection.getRangeAt(0);
                showHoverToolbar.value = true;
                const position = ibizHtmlPreviewUtil.getSelectionPosition(rootRef.value);
                if (position) {
                  hoverToolbarStyle.value = {
                    top: "".concat(position.top, "px"),
                    left: "".concat(position.left, "px"),
                    zIndex: zIndex.zIndex + 2
                  };
                }
              } else {
                showHoverToolbar.value = false;
              }
            }
          }
        });
      }
      if (editorRef.value) {
        c.editorContainer = editorRef.value;
        editorRef.value.addEventListener("keydown", onKeyDown);
      }
    });
    vue.onBeforeUnmount(() => {
      if (fullScreenCleanup !== core.NOOP) {
        fullScreenCleanup();
      }
      if (selectChangeCleanup !== core.NOOP) {
        selectChangeCleanup();
      }
      if (timerId)
        clearTimeout(timerId);
      editorRef.value.removeEventListener("keydown", onKeyDown);
    });
    let chatInstance;
    const onClickAI = async () => {
      const appDataEntityId = c.model.appDataEntityId;
      if (!appDataEntityId || !c.deACMode)
        return;
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
            if (action === "backfill") {
              emit("change", message.realcontent);
            }
          }
        }
      });
    };
    const handleInlineAiClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const items = ibiz.inLineAIUtil.calcContextMenus(c.deACMode, (tag) => {
        c.doInLineAIUIAction(tag, c.model.appId);
      });
      const popoverZIndex = zIndex.increment();
      const {
        offsetLeft,
        offsetTop,
        offsetHeight
      } = hoverToolbarRef.value;
      const editorBoundingClientRect = rootRef.value.getBoundingClientRect();
      ibiz.inLineAIUtil.showContextMenus(
        // 编辑器的左侧距离+选区距离编辑器左侧距离
        editorBoundingClientRect.x + offsetLeft,
        // 编辑器的上方距离+选区距离编辑器上方距离+悬浮工具栏高度
        editorBoundingClientRect.y + offsetTop + offsetHeight,
        items,
        {
          zIndex: popoverZIndex,
          onClose: () => {
            zIndex.decrement();
          }
        }
      );
    };
    const changePreview = () => {
      isPreview.value = !isPreview.value;
      splitValue.value = isPreview.value ? 0.5 : 1;
      if (isPreview.value) {
        const value = editorRef.value.innerText;
        previewValue.value = value;
      }
    };
    const switchFull = () => {
      if (isFullScreen.value) {
        ibiz.fullscreenUtil.closeElementFullscreen();
      } else {
        ibiz.fullscreenUtil.openElementFullscreen(rootRef.value);
        if (!isPreview.value) {
          changePreview();
        }
      }
      isFullScreen.value = !isFullScreen.value;
      showHoverToolbar.value = false;
    };
    return {
      ns,
      splitValue,
      isPreview,
      isFullScreen,
      rootRef,
      editorRef,
      previewRef,
      hoverToolbarRef,
      showHoverToolbar,
      hoverToolbarStyle,
      isCopying,
      readonly,
      previewValue,
      handleInput,
      handleBlur,
      changePreview,
      switchFull,
      onClickAI,
      handleInlineAiClick,
      handleCopy,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("preview", this.isPreview), this.ns.is("readonly", this.readonly), this.semanticClass("editor.root")],
      "style": this.semanticStyle("editor.root"),
      "ref": "rootRef"
    }, [vue.createVNode("div", {
      "class": [this.ns.e("toolbar"), this.semanticClass("editor.toolbar")],
      "style": this.semanticStyle("editor.toolbar")
    }, [this.controller.chatCompletion ? vue.createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("ai-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.onClickAI
    }, [ibizHtmlPreviewIcon.AiIcon]) : null, vue.createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("preview-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.changePreview
    }, [this.isPreview ? vue.createVNode("ion-icon", {
      "name": "eye-off-outline"
    }, null) : vue.createVNode("ion-icon", {
      "name": "eye-outline"
    }, null)]), vue.createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("full-screen-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.switchFull
    }, [this.isFullScreen ? vue.createVNode("ion-icon", {
      "name": "contract-outline"
    }, null) : vue.createVNode("ion-icon", {
      "name": "expand-outline"
    }, null)])]), vue.createVNode("div", {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [vue.createVNode(vue.resolveComponent("iBizSplit"), {
      "modelValue": this.splitValue,
      "onUpdate:modelValue": ($event) => this.splitValue = $event,
      "mode": "horizontal"
    }, {
      left: () => {
        return vue.createVNode("div", {
          "class": [this.ns.e("editor"), this.semanticClass("editor.editor")],
          "style": this.semanticStyle("editor.editor")
        }, [vue.createVNode("pre", {
          "ref": "editorRef",
          "contenteditable": "plaintext-only",
          "placeholder": this.controller.placeHolder,
          "spellcheck": "false",
          "onInput": this.handleInput,
          "onBlur": this.handleBlur
        }, null), vue.createVNode(vue.resolveComponent("el-button"), {
          "class": this.ns.e("copy"),
          "link": true,
          "onClick": this.handleCopy
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": this.isCopying ? "checkmark-outline" : "copy-outline"
          }, null)]
        })]);
      },
      right: () => {
        return vue.createVNode("div", {
          "ref": "previewRef",
          "class": [this.ns.e("preview"), this.semanticClass("editor.preview")],
          "style": this.semanticStyle("editor.preview"),
          "innerHTML": this.previewValue
        }, null);
      }
    })]), this.showHoverToolbar ? vue.createVNode("div", {
      "ref": "hoverToolbarRef",
      "style": [this.hoverToolbarStyle, this.semanticStyle("editor.popup") || ""],
      "class": [this.ns.e("hover-toolbar"), this.semanticClass("editor.popup")]
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handleInlineAiClick,
      "link": true
    }, _isSlot(ibizHtmlPreviewIcon.inlineAiIcon) ? ibizHtmlPreviewIcon.inlineAiIcon : {
      default: () => [ibizHtmlPreviewIcon.inlineAiIcon]
    })]) : null]);
  }
});

exports.IBizHtmlPreview = IBizHtmlPreview;
