'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var inlineAiTextarea_hook = require('./inline-ai-textarea.hook.cjs');
var icon = require('./icon.cjs');
require('./common/index.cjs');
require('./inline-ai-textarea.css');
var aiToolCall = require('./common/ai-tool-call/ai-tool-call.cjs');
var aiThink = require('./common/ai-think/ai-think.cjs');

"use strict";
const InlineAITextArea = /* @__PURE__ */ vue.defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    editorParams: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    deACMode: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    insertText: {
      type: Function,
      required: true
    },
    replaceSelectionText: {
      type: Function,
      required: true
    },
    restoreSelection: {
      type: Function,
      required: true
    },
    unMountAIChat: {
      type: Function,
      required: true
    }
  },
  setup(props, ctx) {
    const ns = vue3Util.useNamespace("inline-ai-textarea-container");
    const containerRef = vue.ref();
    const actionsRef = vue.ref();
    const textareaRef = vue.ref();
    const message = vue.ref({
      role: "USER",
      toolcalls: [],
      error: void 0,
      think: void 0,
      content: props.content
    });
    let question;
    let answerContent;
    const isLoading = vue.ref(false);
    const isCollapse = vue.ref(false);
    const disabled = vue.computed(() => {
      return message.value.role === "ASSISTANT" || isLoading.value;
    });
    const isShow = vue.computed(() => {
      return message.value.role === "ASSISTANT" && !isLoading.value;
    });
    const {
      srfmode,
      srfaiagent,
      autoquestion,
      srfaiappendcurdata,
      inlinecompletionmode
    } = inlineAiTextarea_hook.computedInLineAIParams(props);
    const {
      theme,
      actions,
      actionStyle,
      containerStyle,
      contentStyle
    } = inlineAiTextarea_hook.useBase(props, {
      containerRef,
      actionsRef,
      textareaRef
    }, message);
    const {
      stopAsk,
      syncAskAI,
      asyncAskAI,
      parseContent,
      loadAiHistory
    } = inlineAiTextarea_hook.useAI(props, {
      srfmode,
      srfaiagent,
      srfaiappendcurdata
    });
    inlineAiTextarea_hook.useInLineAIContainerClick(props, {
      message,
      isLoading,
      stopAsk
    });
    const handleAnswer = (answer) => {
      switch (answer.state) {
        case 20:
          if (!answerContent) {
            answerContent = "";
          }
          answerContent += answer.content;
          Object.assign(message.value, parseContent(answerContent));
          break;
        case 30:
          answerContent = answer.content;
          const {
            think,
            content
          } = parseContent(answerContent);
          Object.assign(message.value, {
            think,
            content
          });
          break;
        case 40:
          isCollapse.value = true;
          Object.assign(message.value, {
            toolcalls: [],
            think: void 0,
            content: void 0,
            error: answer.content
          });
          break;
        default:
          break;
      }
      message.value.role = "ASSISTANT";
    };
    const sendQuestion = async (content) => {
      var _a;
      if (!content || isLoading.value)
        return;
      isLoading.value = true;
      try {
        (_a = textareaRef.value) == null ? void 0 : _a.blur();
        props.restoreSelection();
        question = content;
        answerContent = void 0;
        Object.assign(message.value, {
          toolcalls: [],
          error: void 0,
          think: void 0,
          content: void 0
        });
        isCollapse.value = false;
        if (inlinecompletionmode === "async") {
          await asyncAskAI(question, handleAnswer, () => {
            isLoading.value = false;
          });
        } else {
          const answer = await syncAskAI(question);
          handleAnswer(answer);
        }
      } catch (error) {
        ibiz.log.error(error);
      } finally {
        isLoading.value = false;
      }
    };
    const onKeydown = (e) => {
      if (e.code === "Enter" && !e.isComposing) {
        e.stopPropagation();
        if (e.shiftKey === false)
          sendQuestion(message.value.content);
      }
    };
    const handleAction = (_e, actionName) => {
      const content = message.value.content;
      switch (actionName) {
        case "regenerate":
          sendQuestion(question);
          break;
        case "insertText":
          props.insertText(content);
          props.unMountAIChat();
          break;
        case "replaceText":
          props.replaceSelectionText(content);
          props.unMountAIChat();
          break;
        case "copyText":
          ibiz.util.text.copy(content);
          props.unMountAIChat();
          break;
        case "cancel":
          props.unMountAIChat();
          break;
        default:
          break;
      }
    };
    vue.onMounted(async () => {
      var _a;
      await loadAiHistory();
      if (autoquestion) {
        await sendQuestion(message.value.content);
      } else {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
    });
    const renderLoading = () => {
      const value = message.value.error || message.value.content || message.value.think;
      if (!isLoading.value || value)
        return;
      return vue.createVNode("div", {
        "class": ns.e("loading")
      }, [vue.createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null), vue.createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null), vue.createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null)]);
    };
    const renderError = () => {
      if (message.value.error)
        return vue.createVNode("div", {
          "class": ns.e("error")
        }, [message.value.error]);
    };
    return {
      ns,
      theme,
      isShow,
      actions,
      message,
      disabled,
      isLoading,
      isCollapse,
      actionsRef,
      textareaRef,
      actionStyle,
      containerRef,
      contentStyle,
      containerStyle,
      stopAsk,
      onKeydown,
      renderError,
      sendQuestion,
      handleAction,
      renderLoading
    };
  },
  render() {
    return vue.createVNode("div", {
      "ref": "containerRef",
      "style": this.containerStyle,
      "class": [this.ns.b(), this.ns.m(this.theme), this.ns.is("show-ai", this.isShow)]
    }, [vue.createVNode("div", {
      "class": this.ns.e("content"),
      "style": this.contentStyle
    }, [!this.disabled && vue.createVNode("div", {
      "class": this.ns.em("content", "prefix")
    }, [vue.createVNode("div", {
      "class": this.ns.em("content", "ai-icon")
    }, [icon.AIIcon])]), vue.createVNode("div", {
      "class": this.ns.em("content", "textarea")
    }, [this.renderLoading(), vue.createVNode(aiToolCall.AIToolCall, {
      "class": this.ns.e("tool-call"),
      "toolCalls": this.message.toolcalls
    }, null), vue.createVNode(aiThink.AIThink, {
      "class": this.ns.e("think"),
      "think": this.message.think,
      "isLoading": this.isLoading,
      "isCollapse": this.isCollapse,
      "onCollapseChange": (val) => {
        this.isCollapse = val;
      }
    }, null), this.renderError(), vue.withDirectives(vue.createVNode("textarea", {
      "ref": "textareaRef",
      "disabled": this.disabled,
      "onKeydown": this.onKeydown,
      "onUpdate:modelValue": ($event) => this.message.content = $event,
      "class": this.ns.is("hidden", !!this.message.error)
    }, null), [[vue.vModelText, this.message.content]])]), vue.createVNode("div", {
      "class": this.ns.em("content", "suffix")
    }, [this.isLoading && vue.createVNode("div", {
      "class": this.ns.em("content", "stop-icon"),
      "onClick": () => this.stopAsk()
    }, [icon.StopIcon, vue.createVNode("span", null, [ibiz.i18n.t("util.inlineAiUtil.stopEdit")])]), !this.disabled && vue.createVNode("div", {
      "class": this.ns.em("content", "sand-icon"),
      "onClick": () => this.sendQuestion(this.message.content)
    }, [icon.SendIcon])])]), this.isShow && vue.createVNode("div", {
      "class": this.ns.e("footer")
    }, [ibiz.i18n.t("util.inlineAiUtil.info")]), this.isShow && vue.createVNode("div", {
      "ref": "actionsRef",
      "style": this.actionStyle,
      "class": this.ns.e("actions")
    }, [this.actions.map((action) => {
      if (action.itemType === "divider")
        return vue.createVNode("div", {
          "class": this.ns.em("actions", action.itemType)
        }, null);
      return vue.createVNode("div", {
        "class": [this.ns.em("actions", action.itemType), this.ns.is("danger", action.actionName === "cancel")],
        "onClick": (e) => this.handleAction(e, action.actionName)
      }, [action.icon, vue.createVNode("span", null, [action.title])]);
    })])]);
  }
});

exports.InlineAITextArea = InlineAITextArea;
