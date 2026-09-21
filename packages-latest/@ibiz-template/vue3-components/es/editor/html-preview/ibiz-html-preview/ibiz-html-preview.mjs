import { isVNode, defineComponent, createVNode, resolveComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useNamespace, useSemanticNode, useUIStore, getHtmlEmits, getHtmlProps } from '@ibiz-template/vue3-util';
import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { AiIcon, inlineAiIcon } from './ibiz-html-preview-icon.mjs';
import { unescapeHTML, indentSelection, removeIndent, insertText, TAB, getSelectionPosition } from './ibiz-html-preview-util.mjs';
import './ibiz-html-preview.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizHtmlPreview = /* @__PURE__ */ defineComponent({
  name: "IBizHtmlPreview",
  props: getHtmlProps(),
  emits: getHtmlEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("html-preview");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const {
      zIndex
    } = useUIStore();
    const isPreview = ref(false);
    const isFullScreen = ref(false);
    const splitValue = ref(1);
    const editorRef = ref();
    const previewRef = ref();
    const rootRef = ref();
    const hoverToolbarRef = ref();
    const showHoverToolbar = ref(false);
    const hoverToolbarStyle = ref({});
    const isCopying = ref(false);
    const readonly = computed(() => props.readonly || props.disabled);
    const previewValue = ref("");
    let fullScreenCleanup = NOOP;
    let selectChangeCleanup = NOOP;
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
        return unescapeHTML(props.value || "");
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
    watch(() => props.value, (newVal) => {
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
            indentSelection(dom, e.shiftKey);
          } else if (e.shiftKey) {
            removeIndent(dom);
          } else {
            insertText(TAB);
          }
          break;
      }
    };
    onMounted(() => {
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
      fullScreenCleanup = listenJSEvent(window, "fullscreenchange", () => {
        if (isFullScreen.value) {
          isFullScreen.value = ibiz.fullscreenUtil.isFullScreen;
        }
      });
      if (c.inLineChatCompletion) {
        selectChangeCleanup = listenJSEvent(document, "selectionchange", () => {
          if (editorRef.value) {
            const selection = document.getSelection();
            if (selection && selection.anchorNode && editorRef.value.contains(selection.anchorNode)) {
              c.selectedText = selection.toString();
              if (c.selectedText) {
                c.lastRange = selection.getRangeAt(0);
                showHoverToolbar.value = true;
                const position = getSelectionPosition(rootRef.value);
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
    onBeforeUnmount(() => {
      if (fullScreenCleanup !== NOOP) {
        fullScreenCleanup();
      }
      if (selectChangeCleanup !== NOOP) {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("preview", this.isPreview), this.ns.is("readonly", this.readonly), this.semanticClass("editor.root")],
      "style": this.semanticStyle("editor.root"),
      "ref": "rootRef"
    }, [createVNode("div", {
      "class": [this.ns.e("toolbar"), this.semanticClass("editor.toolbar")],
      "style": this.semanticStyle("editor.toolbar")
    }, [this.controller.chatCompletion ? createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("ai-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.onClickAI
    }, [AiIcon]) : null, createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("preview-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.changePreview
    }, [this.isPreview ? createVNode("ion-icon", {
      "name": "eye-off-outline"
    }, null) : createVNode("ion-icon", {
      "name": "eye-outline"
    }, null)]), createVNode("div", {
      "class": [this.ns.e("toolbar-item"), this.ns.e("full-screen-button"), this.semanticClass("editor.toolbar.item")],
      "style": this.semanticStyle("editor.toolbar.item"),
      "onClick": this.switchFull
    }, [this.isFullScreen ? createVNode("ion-icon", {
      "name": "contract-outline"
    }, null) : createVNode("ion-icon", {
      "name": "expand-outline"
    }, null)])]), createVNode("div", {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [createVNode(resolveComponent("iBizSplit"), {
      "modelValue": this.splitValue,
      "onUpdate:modelValue": ($event) => this.splitValue = $event,
      "mode": "horizontal"
    }, {
      left: () => {
        return createVNode("div", {
          "class": [this.ns.e("editor"), this.semanticClass("editor.editor")],
          "style": this.semanticStyle("editor.editor")
        }, [createVNode("pre", {
          "ref": "editorRef",
          "contenteditable": "plaintext-only",
          "placeholder": this.controller.placeHolder,
          "spellcheck": "false",
          "onInput": this.handleInput,
          "onBlur": this.handleBlur
        }, null), createVNode(resolveComponent("el-button"), {
          "class": this.ns.e("copy"),
          "link": true,
          "onClick": this.handleCopy
        }, {
          default: () => [createVNode("ion-icon", {
            "name": this.isCopying ? "checkmark-outline" : "copy-outline"
          }, null)]
        })]);
      },
      right: () => {
        return createVNode("div", {
          "ref": "previewRef",
          "class": [this.ns.e("preview"), this.semanticClass("editor.preview")],
          "style": this.semanticStyle("editor.preview"),
          "innerHTML": this.previewValue
        }, null);
      }
    })]), this.showHoverToolbar ? createVNode("div", {
      "ref": "hoverToolbarRef",
      "style": [this.hoverToolbarStyle, this.semanticStyle("editor.popup") || ""],
      "class": [this.ns.e("hover-toolbar"), this.semanticClass("editor.popup")]
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.handleInlineAiClick,
      "link": true
    }, _isSlot(inlineAiIcon) ? inlineAiIcon : {
      default: () => [inlineAiIcon]
    })]) : null]);
  }
});

export { IBizHtmlPreview };
