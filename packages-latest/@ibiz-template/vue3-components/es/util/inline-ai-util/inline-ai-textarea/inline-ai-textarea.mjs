import { defineComponent, createVNode, withDirectives, vModelText, ref, computed, onMounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { computedInLineAIParams, useBase, useAI, useInLineAIContainerClick } from './inline-ai-textarea.hook.mjs';
import { AIIcon, StopIcon, SendIcon } from './icon.mjs';
import './common/index.mjs';
import './inline-ai-textarea.css';
import { AIToolCall } from './common/ai-tool-call/ai-tool-call.mjs';
import { AIThink } from './common/ai-think/ai-think.mjs';

"use strict";
const InlineAITextArea = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("inline-ai-textarea-container");
    const containerRef = ref();
    const actionsRef = ref();
    const textareaRef = ref();
    const message = ref({
      role: "USER",
      toolcalls: [],
      error: void 0,
      think: void 0,
      content: props.content
    });
    let question;
    let answerContent;
    const isLoading = ref(false);
    const isCollapse = ref(false);
    const disabled = computed(() => {
      return message.value.role === "ASSISTANT" || isLoading.value;
    });
    const isShow = computed(() => {
      return message.value.role === "ASSISTANT" && !isLoading.value;
    });
    const {
      srfmode,
      srfaiagent,
      autoquestion,
      srfaiappendcurdata,
      inlinecompletionmode
    } = computedInLineAIParams(props);
    const {
      theme,
      actions,
      actionStyle,
      containerStyle,
      contentStyle
    } = useBase(props, {
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
    } = useAI(props, {
      srfmode,
      srfaiagent,
      srfaiappendcurdata
    });
    useInLineAIContainerClick(props, {
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
    onMounted(async () => {
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
      return createVNode("div", {
        "class": ns.e("loading")
      }, [createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null), createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null), createVNode("div", {
        "class": ns.em("loading", "dot")
      }, null)]);
    };
    const renderError = () => {
      if (message.value.error)
        return createVNode("div", {
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
    return createVNode("div", {
      "ref": "containerRef",
      "style": this.containerStyle,
      "class": [this.ns.b(), this.ns.m(this.theme), this.ns.is("show-ai", this.isShow)]
    }, [createVNode("div", {
      "class": this.ns.e("content"),
      "style": this.contentStyle
    }, [!this.disabled && createVNode("div", {
      "class": this.ns.em("content", "prefix")
    }, [createVNode("div", {
      "class": this.ns.em("content", "ai-icon")
    }, [AIIcon])]), createVNode("div", {
      "class": this.ns.em("content", "textarea")
    }, [this.renderLoading(), createVNode(AIToolCall, {
      "class": this.ns.e("tool-call"),
      "toolCalls": this.message.toolcalls
    }, null), createVNode(AIThink, {
      "class": this.ns.e("think"),
      "think": this.message.think,
      "isLoading": this.isLoading,
      "isCollapse": this.isCollapse,
      "onCollapseChange": (val) => {
        this.isCollapse = val;
      }
    }, null), this.renderError(), withDirectives(createVNode("textarea", {
      "ref": "textareaRef",
      "disabled": this.disabled,
      "onKeydown": this.onKeydown,
      "onUpdate:modelValue": ($event) => this.message.content = $event,
      "class": this.ns.is("hidden", !!this.message.error)
    }, null), [[vModelText, this.message.content]])]), createVNode("div", {
      "class": this.ns.em("content", "suffix")
    }, [this.isLoading && createVNode("div", {
      "class": this.ns.em("content", "stop-icon"),
      "onClick": () => this.stopAsk()
    }, [StopIcon, createVNode("span", null, [ibiz.i18n.t("util.inlineAiUtil.stopEdit")])]), !this.disabled && createVNode("div", {
      "class": this.ns.em("content", "sand-icon"),
      "onClick": () => this.sendQuestion(this.message.content)
    }, [SendIcon])])]), this.isShow && createVNode("div", {
      "class": this.ns.e("footer")
    }, [ibiz.i18n.t("util.inlineAiUtil.info")]), this.isShow && createVNode("div", {
      "ref": "actionsRef",
      "style": this.actionStyle,
      "class": this.ns.e("actions")
    }, [this.actions.map((action) => {
      if (action.itemType === "divider")
        return createVNode("div", {
          "class": this.ns.em("actions", action.itemType)
        }, null);
      return createVNode("div", {
        "class": [this.ns.em("actions", action.itemType), this.ns.is("danger", action.actionName === "cancel")],
        "onClick": (e) => this.handleAction(e, action.actionName)
      }, [action.icon, createVNode("span", null, [action.title])]);
    })])]);
  }
});

export { InlineAITextArea };
