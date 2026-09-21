'use strict';

var qs = require('qs');
var qxUtil = require('qx-util');
var vue3Util = require('@ibiz-template/vue3-util');
var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var icon = require('./icon.cjs');

"use strict";
const computedInLineAIParams = (props) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { params, context, editorParams } = props;
  const getBooleanValue = (value) => {
    if (value === "false")
      return false;
    if (value === "true")
      return true;
    return null;
  };
  return {
    srfaiappendcurdata: (_c = (_b = (_a = getBooleanValue(context.srfaiappendcurdata)) != null ? _a : getBooleanValue(params.srfaiappendcurdata)) != null ? _b : getBooleanValue(editorParams.srfaiappendcurdata)) != null ? _c : true,
    autoquestion: (_e = (_d = getBooleanValue(params.autoquestion)) != null ? _d : getBooleanValue(editorParams.autoquestion)) != null ? _e : false,
    srfmode: params.srfmode,
    srfaiagent: params.srfaiagent,
    inlinecompletionmode: (_g = (_f = params.inlinecompletionmode) != null ? _f : editorParams.inlinecompletionmode) != null ? _g : "async"
  };
};
const useInLineAIContainerClick = (props, opts) => {
  const { message, isLoading, stopAsk } = opts;
  const handMousedown = async (evt) => {
    const target = evt.target;
    if (!target.closest(".ibiz-inline-ai-textarea-container") && !target.closest(".ibiz-inline-ai-alert")) {
      const isChange = props.content !== message.value.content;
      let isClose = true;
      if (isChange || isLoading.value) {
        isClose = await ibiz.confirm.warning({
          title: ibiz.i18n.t("util.inlineAiUtil.warningTitle"),
          desc: ibiz.i18n.t("util.inlineAiUtil.warningDesc"),
          options: {
            modalClass: "ibiz-inline-ai-alert"
          }
        });
      }
      if (isClose)
        await stopAsk();
    }
  };
  vue.onMounted(() => {
    document.addEventListener("mousedown", handMousedown, true);
  });
  vue.onUnmounted(() => {
    document.removeEventListener("mousedown", handMousedown, true);
  });
};
const useAI = (props, opts) => {
  const { context, data, deACMode } = props;
  const { srfaiappendcurdata, srfmode, srfaiagent } = opts;
  const params = { srfactag: deACMode.codeName };
  const sessionid = ibiz.aiChatUtil.getChatSessionId("INLINE");
  const app = ibiz.hub.getApp(deACMode.appId);
  let history = [];
  let appDataEntity;
  const calcAIPath = (isHistories = false, isAsync = false) => {
    if (!appDataEntity)
      return "";
    const srfkey = context[appDataEntity.codeName.toLowerCase()];
    const curPath = "/".concat(appDataEntity.deapicodeName2, "/").concat(isAsync ? "sse" : "", "chatcompletion").concat(isHistories ? "/histories" : "").concat(srfkey ? "/".concat(srfkey) : "");
    const resPath = runtime.calcResPath(context, appDataEntity);
    return resPath ? "/".concat(resPath).concat(curPath) : "".concat(curPath);
  };
  const loadAiHistory = async () => {
    appDataEntity = await ibiz.hub.getAppDataEntity(
      deACMode.appDataEntityId,
      deACMode.appId
    );
    const path = calcAIPath(true);
    const body = {
      sessionid
    };
    if (srfaiappendcurdata)
      Object.assign(body, data);
    if (srfmode)
      Object.assign(body, { mode: srfmode });
    if (srfaiagent)
      Object.assign(body, { srfaiagent });
    const response = await app.net.post(path, body, params);
    if (response.ok && Array.isArray(response.data)) {
      history = response.data.filter(
        (item) => ["USER", "ASSISTANT"].includes(item.role)
      );
    }
  };
  const attachUrlParam = (url) => {
    {
      const urlSplit = url.split("?");
      urlSplit[0] = urlSplit[0].split("/").map((item) => encodeURIComponent(item)).join("/");
      url = urlSplit.length > 1 ? urlSplit.join("?") : urlSplit[0];
    }
    const strParams = qs.stringify(params);
    if (qxUtil.notNilEmpty(strParams)) {
      if (url.endsWith("?")) {
        url = "".concat(url).concat(strParams);
      } else if (url.indexOf("?") !== -1 && url.endsWith("&")) {
        url = "".concat(url).concat(strParams);
      } else if (url.indexOf("?") !== -1 && !url.endsWith("&")) {
        url = "".concat(url, "&").concat(strParams);
      } else {
        url = "".concat(url, "?").concat(strParams);
      }
    }
    return url;
  };
  const prepareData = (question, isAsync = false) => {
    const body = {
      sessionid,
      messages: [
        ...history,
        {
          role: "USER",
          content: question
        }
      ]
    };
    if (srfmode)
      Object.assign(body, { mode: srfmode });
    if (srfaiagent)
      Object.assign(body, { srfaiagent });
    let url = calcAIPath(false, isAsync);
    if (!isAsync)
      url = attachUrlParam(url);
    return { body, url };
  };
  const parseContent = (text) => {
    let think;
    let content;
    const toolcalls = [];
    if (!text)
      return { think, content, toolcalls };
    const openThinkIndex = text.indexOf("<think>");
    const closeThinkIndex = text.indexOf("</think>");
    if (openThinkIndex !== -1) {
      think = closeThinkIndex === -1 ? text.slice(openThinkIndex + 7) : text.slice(openThinkIndex + 7, closeThinkIndex);
      content = closeThinkIndex === -1 ? void 0 : text.slice(closeThinkIndex + 8);
    } else {
      const toolCallRegex = new RegExp(
        "<tool_call>\\s*({[\\s\\S]*?})\\s*</tool_call>",
        "g"
      );
      const matches = text.matchAll(toolCallRegex);
      for (const match of matches) {
        try {
          const toolCallData = JSON.parse(match[1]);
          const tempToolCall = {
            name: toolCallData.name,
            parameters: toolCallData.parameters,
            error: toolCallData.error || false
          };
          if (toolCallData.result)
            Object.assign(tempToolCall, {
              result: toolCallData.result
            });
          toolcalls.push(tempToolCall);
        } catch (e) {
          console.error("\u89E3\u6790\u5DE5\u5177\u8C03\u7528\u5931\u8D25:", e);
        }
      }
      content = text.replace(new RegExp("\\<tool_call\\>[^]*?\\<\\/tool_call\\>", "gs"), "").trim();
    }
    return { think, content, toolcalls };
  };
  let asyncacitonid;
  const abortController = vue.ref();
  const asyncAskAI = (question, callBack, errorBack) => {
    return new Promise((resolve) => {
      abortController.value = new AbortController();
      const { body, url } = prepareData(question, true);
      app.net.sse(url, params, {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        onmessage: (e) => {
          var _a;
          try {
            if (e.data) {
              const msg = JSON.parse(e.data);
              let content = msg.actionresult || "";
              if (msg.actionstate === 20)
                asyncacitonid = msg.asyncacitonid;
              if (msg.actionstate === 30 && content)
                content = (_a = JSON.parse(content).choices) == null ? void 0 : _a[0].content;
              callBack({ state: msg.actionstate, content });
            }
          } catch (error) {
            ibiz.log.error(error);
          }
        },
        onclose: () => resolve(),
        onerror: (error) => {
          callBack({ state: 40, content: error.message });
          errorBack();
          throw error;
        },
        signal: abortController.value.signal
      });
    });
  };
  const syncAskAI = async (question) => {
    var _a, _b;
    abortController.value = new AbortController();
    const { body, url } = prepareData(question);
    const answer = {
      state: 10,
      content: ""
    };
    try {
      const response = await app.net.request(url, {
        method: "post",
        data: body,
        signal: abortController.value.signal
      });
      if (response.ok)
        Object.assign(answer, {
          state: 30,
          content: (_b = (_a = response.data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.content
        });
      return answer;
    } catch (error) {
      Object.assign(answer, {
        state: 40,
        content: error.message
      });
      return answer;
    }
  };
  const stopAsk = async () => {
    var _a;
    (_a = abortController.value) == null ? void 0 : _a.abort();
    if (asyncacitonid) {
      const deService = await app.deService.getService(
        context,
        deACMode.appDataEntityId
      );
      await deService.aiChatCancel(context, params, {
        asyncacitonid,
        sessionid
      });
      asyncacitonid = void 0;
    }
    props.unMountAIChat();
  };
  return {
    stopAsk,
    syncAskAI,
    asyncAskAI,
    parseContent,
    loadAiHistory
  };
};
const useBase = (props, element, message) => {
  const actions = [
    {
      title: ibiz.i18n.t("util.inlineAiUtil.regenerate"),
      icon: icon.RegenerateIcon,
      itemType: "action",
      actionName: "regenerate"
    },
    {
      title: ibiz.i18n.t("util.inlineAiUtil.insertText"),
      icon: icon.insertTextIcon,
      itemType: "action",
      actionName: "insertText"
    },
    {
      title: ibiz.i18n.t("util.inlineAiUtil.replaceText"),
      icon: icon.ReplaceTextIcon,
      itemType: "action",
      actionName: "replaceText"
    },
    {
      itemType: "divider"
    },
    {
      title: ibiz.i18n.t("util.inlineAiUtil.copyText"),
      icon: icon.CopyTextIcon,
      itemType: "action",
      actionName: "copyText"
    },
    {
      title: ibiz.i18n.t("app.cancel"),
      icon: icon.CancelIcon,
      itemType: "action",
      actionName: "cancel"
    }
  ];
  const { zIndex } = vue3Util.useUIStore();
  const { options } = props;
  const { containerRef, actionsRef, textareaRef } = element;
  const editorRect = options.editorElement.getBoundingClientRect();
  const offsetX = options.left - editorRect.left;
  const offsetY = options.top - editorRect.top;
  const theme = options.editorTheme || "light";
  const actionStyle = vue.ref({});
  const containerStyle = vue.ref({
    width: "".concat(options.width, "px"),
    left: "".concat(options.left, "px"),
    top: "".concat(options.top, "px"),
    zIndex: zIndex.increment()
  });
  const contentStyle = vue.ref({
    height: options.height ? "".concat(options.height, "px") : "auto",
    "max-height": "".concat(options.maxHeight || (options.height && options.height > 300 ? options.height : 300), "px")
  });
  vue.watch(
    () => message.value,
    () => {
      vue.nextTick(() => {
        if (!textareaRef.value)
          return;
        textareaRef.value.style.height = "auto";
        textareaRef.value.style.height = "".concat(textareaRef.value.scrollHeight, "px");
        textareaRef.value.parentElement.scrollTop = textareaRef.value.parentElement.scrollHeight;
      });
    },
    {
      deep: true,
      immediate: true
    }
  );
  const updatePosition = () => {
    if (!containerRef.value || !actionsRef.value)
      return;
    const rect = options.editorElement.getBoundingClientRect();
    let top = rect.top + offsetY;
    let left = rect.left + offsetX;
    const containerWidth = containerRef.value.offsetWidth;
    const containerHeight = containerRef.value.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const margin = 8;
    if (left + containerWidth + margin > windowWidth) {
      left = windowWidth - containerWidth - margin;
    } else if (left < margin) {
      left = margin;
    }
    if (top + containerHeight + margin > windowHeight) {
      top = windowHeight - containerHeight - margin;
    } else if (top < margin) {
      top = margin;
    }
    containerStyle.value.top = "".concat(top, "px");
    containerStyle.value.left = "".concat(left, "px");
    const position = containerHeight + 4;
    const targetHeight = actionsRef.value.offsetHeight;
    if (windowHeight - (top + containerHeight + targetHeight) > margin) {
      actionStyle.value.top = "".concat(position, "px");
      actionStyle.value.bottom = "auto";
    } else {
      actionStyle.value.bottom = "".concat(position, "px");
      actionStyle.value.top = "auto";
    }
  };
  let ticking = false;
  const optimizedUpdatePosition = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updatePosition();
        ticking = false;
      });
      ticking = true;
    }
  };
  let observer;
  vue.onMounted(() => {
    document.addEventListener("scroll", optimizedUpdatePosition, {
      capture: true
    });
    window.addEventListener("resize", optimizedUpdatePosition);
    if (containerRef.value) {
      observer = new ResizeObserver(optimizedUpdatePosition);
      observer.observe(containerRef.value);
    }
  });
  vue.onUnmounted(() => {
    zIndex.decrement();
    document.removeEventListener("scroll", optimizedUpdatePosition, {
      capture: true
    });
    window.removeEventListener("resize", optimizedUpdatePosition);
    observer == null ? void 0 : observer.disconnect();
    observer = null;
  });
  return { theme, actions, actionStyle, containerStyle, contentStyle };
};

exports.computedInLineAIParams = computedInLineAIParams;
exports.useAI = useAI;
exports.useBase = useBase;
exports.useInLineAIContainerClick = useInLineAIContainerClick;
