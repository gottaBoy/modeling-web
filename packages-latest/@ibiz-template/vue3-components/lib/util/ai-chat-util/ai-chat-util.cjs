'use strict';

var vue = require('vue');
var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var ramda = require('ramda');
var aiFeedback = require('./ai-feedback/ai-feedback.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AIChatUtil {
  constructor() {
    __publicField(this, "TOPIC_CHAT_PREFIX", "topic");
    __publicField(this, "INLINE_CHAT_SUFFIX", "inline");
    __publicField(this, "TEMP_CHAT_SUFFIX", "temp");
    __publicField(this, "UNKOWN_CHAT_SUFFIX", "unknow");
    __publicField(this, "PRE_ERROR_MESSAGE", "Expected content-type to be text/event-stream, Actual: application/json;charset=UTF-8");
  }
  /**
   * 获取AI聊天对象
   */
  async getAIChat() {
    const module = await import('@ibiz-template-plugin/ai-chat');
    const chatInstance = module.chat || module.default.chat;
    return chatInstance;
  }
  /**
   * 获取编辑器扩展AI聊天参数
   * @param editorParams
   * @param context
   * @param params
   * @param data
   */
  async getEditorExAIChatParams(editorParams, context, params, data, deACMode, args) {
    var _a;
    const containerOptions = {};
    if (editorParams.enableaiminimize) {
      containerOptions.enableAIMinimize = editorParams.enableaiminimize === "true";
    }
    if (editorParams.openmode) {
      containerOptions.openMode = containerOptions.enableAIMinimize ? editorParams.openmode : "default";
    } else {
      containerOptions.enableAIMinimize = ibiz.config.common.enableAIMinimize;
    }
    if (editorParams.autoclose) {
      try {
        const autoClose = JSON.parse(editorParams.autoclose);
        if (!containerOptions.enableAIMinimize && autoClose && autoClose.mode === "minimize") {
          autoClose.mode = "close";
        }
        containerOptions.autoClose = autoClose;
      } catch (error) {
        ibiz.log.error(error);
      }
    }
    const topicOptions = {};
    topicOptions.captionMode = ibiz.config.common.aiChatTopicCaptionMode;
    if (editorParams.topiccaptionmode) {
      topicOptions.captionMode = editorParams.topiccaptionmode;
    }
    topicOptions.hideTopicSidebar = false;
    if (editorParams.hidetopicsidebar) {
      topicOptions.hideTopicSidebar = editorParams.hidetopicsidebar === "true";
    }
    topicOptions.disableStorage = false;
    if (editorParams.disabletopicstorage) {
      topicOptions.disableStorage = editorParams.disabletopicstorage === "true";
    }
    topicOptions.beforeDelete = async (...args2) => {
      const isBatchRemove = args2[4];
      const result = await ibiz.confirm.warning({
        title: ibiz.i18n.t(
          "util.appUtil.".concat(isBatchRemove ? "clearTopic" : "aiTitle")
        ),
        desc: ibiz.i18n.t(
          "util.appUtil.".concat(isBatchRemove ? "clearTopicDesc" : "aiDesc")
        )
      });
      return result;
    };
    topicOptions.action = async (action, context2, params2, data2, event) => {
      if (action === "LINK") {
        await ibiz.openView.push(data2.url);
      }
      return true;
    };
    topicOptions.configService = (appid, storageType, subType) => {
      return new runtime.ConfigService(appid, storageType, subType);
    };
    const chatOptions = {
      locale: ibiz.i18n.getLang()
    };
    if (editorParams.srfaiappendcurdata) {
      chatOptions.appendCurData = editorParams.srfaiappendcurdata === "true" ? data : void 0;
    }
    chatOptions.appendCurContent = editorParams.srfaiappendcurcontent ? core.StringUtil.fill(
      editorParams.srfaiappendcurcontent,
      context,
      params,
      data
    ) : void 0;
    chatOptions.autoQuestion = ibiz.config.common.aiAutoQuestion;
    if (editorParams.autoquestion) {
      chatOptions.autoQuestion = editorParams.autoquestion !== "false";
    }
    chatOptions.autoFill = editorParams.autofill === "true";
    chatOptions.appendCurResource = editorParams.srfaiappendresource ? core.StringUtil.fill(editorParams.srfaiappendresource, context, params, data) : void 0;
    if (editorParams.srfmode) {
      chatOptions.srfMode = editorParams.srfmode;
    }
    let enableAIAgentChange = ibiz.config.common.enableAIAgentChange;
    if (editorParams.srfenableaiagentchange) {
      enableAIAgentChange = editorParams.srfenableaiagentchange === "true";
    }
    chatOptions.enableAIAgentChange = enableAIAgentChange;
    if (editorParams.srfaiagent) {
      chatOptions.activeAIAgentID = editorParams.srfaiagent;
    }
    if (editorParams.srfscope) {
      chatOptions.srfScope = editorParams.srfscope;
    }
    if (editorParams.srfmcpservers) {
      chatOptions.srfMcpservers = editorParams.srfmcpservers;
    }
    if (editorParams.srfaiknowledgebases) {
      chatOptions.selectAIKnowledgeBaseId = editorParams.srfaiknowledgebases;
    }
    let enableKnowledgeBaseSelect = ibiz.config.common.enableKnowledgeBaseSelect;
    if (editorParams.srfenableknowledgebaseselect) {
      enableKnowledgeBaseSelect = editorParams.srfenableknowledgebaseselect === "true";
    }
    chatOptions.enableKnowledgeBaseSelect = enableKnowledgeBaseSelect;
    let enableRecallConfigSetting = ibiz.config.common.enableRecallConfigSetting;
    if (editorParams.srfenablerecallconfigsetting) {
      enableRecallConfigSetting = editorParams.srfenablerecallconfigsetting === "true";
    }
    chatOptions.enableRecallConfigSetting = enableRecallConfigSetting;
    let reRankDefaultValue = ibiz.config.common.reRankDefaultValue;
    if (editorParams.rerankdefaultvalue) {
      reRankDefaultValue = Number(editorParams.rerankdefaultvalue);
    }
    chatOptions.reRankDefaultValue = reRankDefaultValue;
    let maxChunksDefaultValue = ibiz.config.common.maxChunksDefaultValue;
    if (editorParams.maxchunksdefaultvalue) {
      maxChunksDefaultValue = Number(editorParams.maxchunksdefaultvalue);
    }
    chatOptions.maxChunksDefaultValue = maxChunksDefaultValue;
    let chunkThresholdDefaultValue = ibiz.config.common.chunkThresholdDefaultValue;
    if (editorParams.chunkthresholddefaultvalue) {
      chunkThresholdDefaultValue = Number(
        editorParams.chunkthresholddefaultvalue
      );
    }
    chatOptions.chunkThresholdDefaultValue = chunkThresholdDefaultValue;
    let chunkpageindexDefaultValue = ibiz.config.common.chunkPageIndexDefaultValue;
    if (ramda.isNotNil(editorParams.chunkpageindexdefaultvalue)) {
      chunkpageindexDefaultValue = Number(
        editorParams.chunkpageindexdefaultvalue
      );
    }
    chatOptions.chunkPageIndexDefaultValue = chunkpageindexDefaultValue;
    if (editorParams.summarymaxtokens) {
      chatOptions.summaryMaxTokens = Number(editorParams.summarymaxtokens);
    } else {
      chatOptions.summaryMaxTokens = Number(
        ibiz.config.common.aiChatSummaryMaxTokens
      );
    }
    if (editorParams.srfaichunkview) {
      chatOptions.chunkView = editorParams.srfaichunkview;
    } else {
      chatOptions.chunkView = ibiz.config.common.aiChunkView;
    }
    if (editorParams.srfaichunkentity) {
      chatOptions.chunkEntity = editorParams.srfaichunkentity;
    } else {
      chatOptions.chunkEntity = ibiz.config.common.aiChunkEntity;
    }
    chatOptions.fetchAgentList = (query) => {
      return this.getAIAgentList(context, { ...params, query }, editorParams);
    };
    chatOptions.fetchKnowledgeBaseList = (query) => {
      return this.getKnowledgeBaseList(context, params, editorParams, query);
    };
    if (deACMode) {
      const {
        contentToolbarItems,
        footerToolbarItems,
        questionToolbarItems,
        otherToolbarItems
      } = this.calcAiToolbarItemsByAc(deACMode);
      chatOptions.contentToolbarItems = contentToolbarItems;
      chatOptions.footerToolbarItems = footerToolbarItems;
      chatOptions.questionToolbarItems = questionToolbarItems;
      chatOptions.otherToolbarItems = otherToolbarItems;
    }
    const sessionid = this.getChatSessionId("TEMP");
    chatOptions.sessionid = sessionid;
    let id = "";
    let abortController;
    let asyncacitonid = "";
    const { chatInstance, view, ctrl } = args;
    chatOptions.history = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const historyRequestData = {};
      if (other.appendCurData) {
        Object.assign(historyRequestData, {
          ...other.appendCurData
        });
      }
      if (other.sessionid) {
        Object.assign(historyRequestData, {
          sessionid: other.sessionid
        });
      }
      if (other.srfaiagent) {
        Object.assign(historyRequestData, {
          srfaiagent: other.srfaiagent
        });
      }
      if (other.srfmode) {
        Object.assign(historyRequestData, {
          mode: other.srfmode
        });
      }
      if (other.srfscope) {
        Object.assign(historyRequestData, {
          srfscope: other.srfscope
        });
      }
      const result = await deService.aiChatHistory(
        ctx,
        { srfactag: param.srfactag },
        historyRequestData
      );
      if (result.data && Array.isArray(result.data)) {
        let preMsg;
        result.data.forEach((item) => {
          if (item.role === "TOOL") {
            if (preMsg && item.content) {
              chatInstance.aiChat.updateRecommendPrompt(
                preMsg,
                item.content
              );
            }
          } else {
            const msg = {
              messageid: qxUtil.createUUID(),
              state: 30,
              type: "DEFAULT",
              role: item.role,
              content: item.content,
              completed: true
            };
            preMsg = msg;
            chatInstance.aiChat.addMessage(msg);
          }
        });
      }
      return true;
    };
    chatOptions.question = async (aiChat, ctx, param, other, arr, sessionid2, srfaiagent, srfmode, srfscope, srfknowledgebases, srfaiagentconfig, appendcurdata, mcpservers) => {
      id = qxUtil.createUUID();
      abortController = new AbortController();
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      try {
        const questionRequestData = {
          messages: arr,
          sessionid: sessionid2
        };
        if (srfaiagent)
          questionRequestData.srfaiagent = srfaiagent;
        if (srfmode)
          questionRequestData.mode = srfmode;
        if (srfscope)
          questionRequestData.srfscope = srfscope;
        if (srfknowledgebases)
          questionRequestData.knowledgebases = srfknowledgebases;
        if (srfaiagentconfig) {
          Object.assign(questionRequestData, srfaiagentconfig);
        }
        if (mcpservers) {
          Object.assign(questionRequestData, {
            mcpservers
          });
        }
        const extParams = {};
        if (param && Object.keys(param).length > 0) {
          Object.assign(extParams, { ...param });
        }
        if (appendcurdata) {
          Object.assign(extParams, { ...appendcurdata });
        }
        if (extParams && Object.keys(extParams).length > 0) {
          Object.assign(questionRequestData, { srfextparams: extParams });
        }
        await deService.aiChatSse(
          (msg) => {
            if (msg.actionstate === 20 && msg.actionresult) {
              asyncacitonid = msg.asyncacitonid;
              aiChat.addMessage({
                messageid: id,
                state: msg.actionstate,
                type: "DEFAULT",
                role: "ASSISTANT",
                content: msg.actionresult,
                status: "pending"
              });
            } else if (msg.actionstate === 30 && msg.actionresult) {
              const result = JSON.parse(msg.actionresult);
              if (result.usage) {
                aiChat.updateMsgUsage(id, result.usage);
              }
              const choices = result.choices;
              if (choices && choices.length > 0) {
                aiChat.replaceMessage({
                  messageid: id,
                  state: msg.actionstate,
                  type: "DEFAULT",
                  role: "ASSISTANT",
                  content: choices[0].content || "",
                  realmessageid: choices[0].messageid,
                  status: "sent"
                });
              }
            } else if (msg.actionstate === 40) {
              aiChat.replaceMessage({
                messageid: id,
                state: msg.actionstate,
                type: "ERROR",
                role: "ASSISTANT",
                errorText: msg.actionresult,
                status: "failed"
              });
            }
          },
          abortController,
          ctx,
          { srfactag: param.srfactag },
          { ...questionRequestData }
        );
      } catch (error) {
        if (error && error.message !== this.PRE_ERROR_MESSAGE) {
          aiChat.replaceMessage({
            messageid: id,
            state: 40,
            type: "ERROR",
            role: "ASSISTANT",
            errorText: error.message || ibiz.i18n.t("app.aiError"),
            status: "failed"
          });
        } else {
          const lastMessage = arr[arr.length - 1];
          aiChat.replaceMessage(
            {
              ...lastMessage,
              state: 40
            },
            false
          );
        }
        abortController == null ? void 0 : abortController.abort();
      } finally {
        aiChat.completeMessage(id, true);
        return true;
      }
    };
    chatOptions.abortQuestion = async (aiChat, ctx, param, other) => {
      abortController == null ? void 0 : abortController.abort();
      if (asyncacitonid) {
        const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
        const abortRequestData = { asyncacitonid };
        if (other.sessionid) {
          Object.assign(abortRequestData, {
            sessionid: other.sessionid
          });
        }
        const result = await deService.aiChatCancel(
          ctx,
          param,
          abortRequestData
        );
        asyncacitonid = "";
      }
      await aiChat.stopMessage({
        messageid: id,
        state: 30,
        type: "DEFAULT",
        role: "ASSISTANT",
        content: "",
        status: "canceled"
      });
      await aiChat.completeMessage(id, true);
    };
    chatOptions.recommendPrompt = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const tempParams = { ...param };
      if (other.srfaiagent) {
        tempParams.srfaiagent = other.srfaiagent;
      }
      const result = await deService.aiChatRecommendPrompt(
        ctx,
        tempParams,
        other.message
      );
      if (result.ok && result.data) {
        const choices = result.data.choices;
        if (choices && choices.length > 0) {
          return choices[0];
        }
        return null;
      }
      return null;
    };
    chatOptions.chatDigest = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const tempParams = { ...param };
      if (other.srfaiagent) {
        tempParams.srfaiagent = other.srfaiagent;
      }
      const result = await deService.aiChatChatDigest(
        ctx,
        tempParams,
        other.message
      );
      if (result.ok && result.data) {
        const choices = result.data.choices;
        if (choices && choices.length > 0) {
          return choices[0];
        }
        return null;
      }
      return null;
    };
    const app = ibiz.hub.getApp(context.srfappid);
    const folder = ibiz.env.defaultOSSCat || app.model.defaultOSSCat || ((_a = app.model.userParam) == null ? void 0 : _a.DefaultOSSCat);
    let globalDownloadPrifix = false;
    if (editorParams.globaldownloadprifix) {
      globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
    } else {
      globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
    chatOptions.uploader = {
      folder: folder ? "".concat(folder, "$") : void 0,
      globalDownloadPrifix,
      onUpload: async (file, reportProgress, options) => {
        const { uploadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder }
        );
        const headers = ibiz.util.file.getUploadHeaders();
        const formData = new FormData();
        formData.append("file", file);
        const res = await ibiz.net.request(uploadUrl, {
          baseURL: "",
          // 已经有baseURL了，这里无需再写
          method: "post",
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            const percent = progressEvent.loaded / progressEvent.total * 100;
            reportProgress(percent);
          }
        });
        return res.data;
      },
      getDownLoadUrl: (file, options) => {
        const { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder, globalDownloadPrifix }
        );
        const url = downloadUrl.replace("%fileId%", file.fileid);
        return url;
      },
      onDownLoad: async (file, options) => {
        const { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder, globalDownloadPrifix }
        );
        const url = downloadUrl.replace("%fileId%", file.fileid);
        await ibiz.util.file.fileDownload(
          url,
          file.filename,
          {
            context: (options == null ? void 0 : options.context) || context,
            params: (options == null ? void 0 : options.params) || params,
            data: {},
            file: { fileId: file.id, ...file },
            extraParams: {
              enableNoAccess: true,
              osscat: folder,
              globalDownloadPrifix
            }
          },
          void 0,
          true
        );
      }
    };
    let uploadMaxSize = ibiz.config.common.aiUploadMaxSize;
    if (editorParams.srfuploadmaxsize) {
      uploadMaxSize = Number(editorParams.srfuploadmaxsize);
    }
    chatOptions.uploader.maxSize = uploadMaxSize;
    chatOptions.extendToolbarClick = async (event, source, context2, params2, data2) => {
      var _a2, _b, _c;
      const { id: id2, isPluginApp } = source;
      let appId = source.appId;
      const tempContext = core.IBizContext.create(context2);
      if (isPluginApp) {
        const mainApp = ibiz.hub.getApp();
        const targetApp = (_a2 = mainApp.model.subAppRefs) == null ? void 0 : _a2.find(
          (subAppRef) => subAppRef.appId.endsWith("__".concat(appId))
        );
        if (targetApp) {
          const targetAppId = targetApp.appId;
          tempContext.srfappid = targetAppId;
          appId = targetAppId;
        }
      }
      const result = await runtime.UIActionUtil.exec(
        id2,
        {
          view,
          ctrl,
          context: tempContext,
          params: params2,
          data: [data2],
          event
        },
        appId
      );
      if (result.closeView) {
        view.closeView({ ok: true });
      } else if (result.refresh) {
        switch (result.refreshMode) {
          case 1:
            view.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          case 2:
            (_b = view.parentView) == null ? void 0 : _b.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          case 3:
            (_c = view.getTopView()) == null ? void 0 : _c.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          default:
        }
      }
      return result;
    };
    chatOptions.openLinkView = async (url) => {
      if (url.startsWith("view://")) {
        const { viewId, context: context2, params: params2 } = runtime.parseViewProtocol(url);
        context2.srfkeepnull = true;
        ibiz.commands.execute(
          runtime.OpenAppViewCommand.TAG,
          viewId,
          core.IBizContext.create(context2),
          params2
        );
      }
    };
    chatOptions.utils = {
      message: ibiz.message,
      notification: ibiz.notification,
      confirm: ibiz.confirm
    };
    return { containerOptions, topicOptions, chatOptions };
  }
  /**
   * 获取界面行为扩展AI聊天参数
   * @param context
   * @param params
   * @param data
   * @param deACMode
   * @param args
   * @returns
   */
  async getUIActionExAIChatParams(context, params, data, deACMode, args) {
    var _a;
    const containerOptions = {};
    if (params.hasOwnProperty("enableaiminimize")) {
      containerOptions.enableAIMinimize = params.enableaiminimize === "true";
      delete params.disableminimize;
    } else {
      containerOptions.enableAIMinimize = ibiz.config.common.enableAIMinimize;
    }
    if (params.hasOwnProperty("openmode")) {
      containerOptions.openMode = containerOptions.enableAIMinimize ? params.openmode : "default";
      delete params.openmode;
    }
    if (params.hasOwnProperty("autoclose")) {
      try {
        const autoClose = JSON.parse(params.autoclose);
        if (!containerOptions.enableAIMinimize && autoClose && autoClose.mode === "minimize") {
          autoClose.mode = "close";
        }
        containerOptions.autoClose = autoClose;
        delete params.autoclose;
      } catch (error) {
        ibiz.log.error(error);
      }
    }
    const topicOptions = {};
    if (params.hasOwnProperty("topiccaptionmode")) {
      topicOptions.captionMode = params.topiccaptionmode;
      delete params.topiccaptionmode;
    } else {
      topicOptions.captionMode = ibiz.config.common.aiChatTopicCaptionMode;
    }
    topicOptions.hideTopicSidebar = false;
    if (params.hasOwnProperty("hidetopicsidebar")) {
      topicOptions.hideTopicSidebar = params.hidetopicsidebar === "true";
      delete params.hidetopicsidebar;
    }
    topicOptions.disableStorage = false;
    if (params.hasOwnProperty("disabletopicstorage")) {
      topicOptions.disableStorage = params.disabletopicstorage === "true";
      delete params.disabletopicstorage;
    }
    topicOptions.beforeDelete = async (...args2) => {
      const isBatchRemove = args2[4];
      const result = await ibiz.confirm.warning({
        title: ibiz.i18n.t(
          "util.appUtil.".concat(isBatchRemove ? "clearTopic" : "aiTitle")
        ),
        desc: ibiz.i18n.t(
          "util.appUtil.".concat(isBatchRemove ? "clearTopicDesc" : "aiDesc")
        )
      });
      return result;
    };
    topicOptions.action = async (action, context2, params2, data2, event) => {
      if (action === "LINK") {
        await ibiz.openView.push(data2.url);
      }
      return true;
    };
    topicOptions.configService = (appid, storageType, subType) => {
      return new runtime.ConfigService(appid, storageType, subType);
    };
    const chatOptions = {
      locale: ibiz.i18n.getLang()
    };
    if (context.srfaiappendcurdata === "true") {
      chatOptions.appendCurData = data;
    } else if (params.hasOwnProperty("srfaiappendcurdata")) {
      chatOptions.appendCurData = params.srfaiappendcurdata === "true" ? data : void 0;
      delete params.srfaiappendcurdata;
    }
    if (params.hasOwnProperty("srfaiappendcurcontent")) {
      chatOptions.appendCurContent = core.StringUtil.fill(
        params.srfaiappendcurcontent,
        context,
        params,
        data
      );
      delete params.srfaiappendcurcontent;
    }
    let autoQuestion = ibiz.config.common.aiAutoQuestion;
    if (params.hasOwnProperty("autoquestion")) {
      autoQuestion = params.autoquestion !== "false";
      delete params.autoquestion;
    }
    chatOptions.autoQuestion = autoQuestion;
    if (params.hasOwnProperty("srfaiappendresource")) {
      chatOptions.appendCurResource = core.StringUtil.fill(
        params.srfaiappendresource,
        context,
        params,
        data
      );
      delete params.srfaiappendresource;
    }
    if (params.hasOwnProperty("srfmode")) {
      chatOptions.srfMode = params.srfmode;
      delete params.srfmode;
    }
    if (params.hasOwnProperty("srfscope")) {
      chatOptions.srfScope = params.srfscope;
      delete params.srfscope;
    }
    if (params.hasOwnProperty("srfmcpservers")) {
      chatOptions.srfMcpservers = params.srfmcpservers;
      delete params.srfmcpservers;
    }
    if (params.hasOwnProperty("srfaiagent")) {
      chatOptions.activeAIAgentID = params.srfaiagent;
      delete params.srfaiagent;
    }
    if (params.hasOwnProperty("srfaiknowledgebases")) {
      chatOptions.selectAIKnowledgeBaseId = params.srfaiknowledgebases;
      delete params.srfaiknowledgebases;
    }
    let enableAIAgentChange = ibiz.config.common.enableAIAgentChange;
    if (params.hasOwnProperty("srfenableaiagentchange")) {
      enableAIAgentChange = params.srfenableaiagentchange === "true";
      delete params.srfenableaiagentchange;
    }
    chatOptions.enableAIAgentChange = enableAIAgentChange;
    let enableKnowledgeBaseSelect = ibiz.config.common.enableKnowledgeBaseSelect;
    if (params.hasOwnProperty("srfenableknowledgebaseselect")) {
      enableKnowledgeBaseSelect = params.srfenableknowledgebaseselect === "true";
      delete params.srfenableknowledgebaseselect;
    }
    chatOptions.enableKnowledgeBaseSelect = enableKnowledgeBaseSelect;
    let enableRecallConfigSetting = ibiz.config.common.enableRecallConfigSetting;
    if (params.hasOwnProperty("srfenablerecallconfigsetting")) {
      enableRecallConfigSetting = params.srfenablerecallconfigsetting === "true";
      delete params.srfenablerecallconfigsetting;
    }
    chatOptions.enableRecallConfigSetting = enableRecallConfigSetting;
    let reRankDefaultValue = ibiz.config.common.reRankDefaultValue;
    if (params.hasOwnProperty("rerankdefaultvalue")) {
      reRankDefaultValue = Number(params.rerankdefaultvalue);
      delete params.rerankdefaultvalue;
    }
    chatOptions.reRankDefaultValue = reRankDefaultValue;
    let maxChunksDefaultValue = ibiz.config.common.maxChunksDefaultValue;
    if (params.hasOwnProperty("maxchunksdefaultvalue")) {
      maxChunksDefaultValue = Number(params.maxchunksdefaultvalue);
      delete params.maxchunksdefaultvalue;
    }
    chatOptions.maxChunksDefaultValue = maxChunksDefaultValue;
    let chunkThresholdDefaultValue = ibiz.config.common.chunkThresholdDefaultValue;
    if (params.hasOwnProperty("chunkthresholddefaultvalue")) {
      chunkThresholdDefaultValue = Number(params.chunkthresholddefaultvalue);
      delete params.chunkthresholddefaultvalue;
    }
    chatOptions.chunkThresholdDefaultValue = chunkThresholdDefaultValue;
    let chunkpageindexDefaultValue = ibiz.config.common.chunkPageIndexDefaultValue;
    if (ramda.isNotNil(params.chunkpageindexdefaultvalue)) {
      chunkpageindexDefaultValue = Number(params.chunkpageindexdefaultvalue);
      delete params.chunkpageindexdefaultvalue;
    }
    chatOptions.chunkPageIndexDefaultValue = chunkpageindexDefaultValue;
    if (params.hasOwnProperty("summarymaxtokens")) {
      chatOptions.summaryMaxTokens = Number(params.summarymaxtokens);
      delete params.summarymaxtokens;
    } else {
      chatOptions.summaryMaxTokens = Number(
        ibiz.config.common.aiChatSummaryMaxTokens
      );
    }
    if (params.hasOwnProperty("srfaichunkview")) {
      chatOptions.chunkView = params.srfaichunkview;
      delete params.srfaichunkview;
    } else {
      chatOptions.chunkView = ibiz.config.common.aiChunkView;
    }
    if (params.hasOwnProperty("srfaichunkentity")) {
      chatOptions.chunkEntity = params.srfaichunkentity;
      delete params.srfaichunkentity;
    } else {
      chatOptions.chunkEntity = ibiz.config.common.aiChunkEntity;
    }
    chatOptions.fetchAgentList = (query) => {
      return this.getAIAgentList(context, { ...params, query });
    };
    chatOptions.fetchKnowledgeBaseList = (query) => {
      return this.getKnowledgeBaseList(context, params, void 0, query);
    };
    if (deACMode) {
      const {
        contentToolbarItems,
        footerToolbarItems,
        questionToolbarItems,
        otherToolbarItems
      } = this.calcAiToolbarItemsByAc(deACMode);
      chatOptions.contentToolbarItems = contentToolbarItems;
      chatOptions.footerToolbarItems = footerToolbarItems;
      chatOptions.questionToolbarItems = questionToolbarItems;
      chatOptions.otherToolbarItems = otherToolbarItems;
    }
    let id = "";
    let abortController;
    let asyncacitonid = "";
    const { chatInstance, view, ctrl } = args;
    chatOptions.history = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const historyRequestData = {};
      if (other.appendCurData) {
        Object.assign(historyRequestData, {
          ...other.appendCurData
        });
      }
      if (other.sessionid) {
        Object.assign(historyRequestData, {
          sessionid: other.sessionid
        });
      }
      if (other.srfaiagent) {
        Object.assign(historyRequestData, {
          srfaiagent: other.srfaiagent
        });
      }
      if (other.srfmode) {
        Object.assign(historyRequestData, {
          mode: other.srfmode
        });
      }
      if (other.srfscope) {
        Object.assign(historyRequestData, {
          srfscope: other.srfscope
        });
      }
      const result = await deService.aiChatHistory(
        ctx,
        { srfactag: param.srfactag },
        historyRequestData
      );
      if (result.data && Array.isArray(result.data)) {
        let preMsg;
        result.data.forEach((item) => {
          if (item.role === "TOOL") {
            if (preMsg && item.content) {
              chatInstance.aiChat.updateRecommendPrompt(
                preMsg,
                item.content
              );
            }
          } else {
            const msg = {
              messageid: qxUtil.createUUID(),
              state: 30,
              type: "DEFAULT",
              role: item.role,
              content: item.content,
              completed: true
            };
            preMsg = msg;
            chatInstance.aiChat.addMessage(msg);
          }
        });
      }
      return true;
    };
    chatOptions.question = async (aiChat, ctx, param, other, arr, sessionid, srfaiagent, srfmode, srfscope, srfknowledgebases, srfaiagentconfig, appendcurdata, mcpservers) => {
      id = qxUtil.createUUID();
      abortController = new AbortController();
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      try {
        const questionRequestData = {
          messages: arr,
          sessionid
        };
        if (srfaiagent)
          questionRequestData.srfaiagent = srfaiagent;
        if (srfmode)
          questionRequestData.mode = srfmode;
        if (srfscope)
          questionRequestData.srfscope = srfscope;
        if (srfknowledgebases)
          questionRequestData.knowledgebases = srfknowledgebases;
        if (srfaiagentconfig) {
          Object.assign(questionRequestData, srfaiagentconfig);
        }
        if (mcpservers) {
          Object.assign(questionRequestData, { mcpservers });
        }
        const extParams = {};
        if (param && Object.keys(param).length > 0) {
          Object.assign(extParams, { ...param });
        }
        if (appendcurdata) {
          Object.assign(extParams, { ...appendcurdata });
        }
        if (extParams && Object.keys(extParams).length > 0) {
          Object.assign(questionRequestData, { srfextparams: extParams });
        }
        await deService.aiChatSse(
          (msg) => {
            if (msg.actionstate === 20 && msg.actionresult) {
              asyncacitonid = msg.asyncacitonid;
              aiChat.addMessage({
                messageid: id,
                state: msg.actionstate,
                type: "DEFAULT",
                role: "ASSISTANT",
                content: msg.actionresult,
                status: "pending"
              });
            } else if (msg.actionstate === 30 && msg.actionresult) {
              const result = JSON.parse(msg.actionresult);
              if (result.usage) {
                aiChat.updateMsgUsage(id, result.usage);
              }
              const choices = result.choices;
              if (choices && choices.length > 0) {
                aiChat.replaceMessage({
                  messageid: id,
                  state: msg.actionstate,
                  type: "DEFAULT",
                  role: "ASSISTANT",
                  content: choices[0].content || "",
                  realmessageid: choices[0].messageid,
                  status: "sent"
                });
              }
            } else if (msg.actionstate === 40) {
              aiChat.replaceMessage({
                messageid: id,
                state: msg.actionstate,
                type: "ERROR",
                role: "ASSISTANT",
                errorText: msg.actionresult,
                status: "failed"
              });
            }
          },
          abortController,
          ctx,
          { srfactag: param.srfactag },
          { ...questionRequestData }
        );
      } catch (error) {
        if (error && error.message !== this.PRE_ERROR_MESSAGE) {
          aiChat.replaceMessage({
            messageid: id,
            state: 40,
            type: "ERROR",
            role: "ASSISTANT",
            errorText: error.message || ibiz.i18n.t("app.aiError"),
            status: "failed"
          });
        } else {
          const lastMessage = arr[arr.length - 1];
          aiChat.replaceMessage(
            {
              ...lastMessage,
              state: 40
            },
            false
          );
        }
        abortController == null ? void 0 : abortController.abort();
      } finally {
        aiChat.completeMessage(id, true);
        return true;
      }
    };
    chatOptions.abortQuestion = async (aiChat, ctx, param, other) => {
      abortController == null ? void 0 : abortController.abort();
      if (asyncacitonid) {
        const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
        const abortRequestData = { asyncacitonid };
        if (other.sessionid) {
          Object.assign(abortRequestData, {
            sessionid: other.sessionid
          });
        }
        const result = await deService.aiChatCancel(
          ctx,
          param,
          abortRequestData
        );
        asyncacitonid = "";
      }
      await aiChat.stopMessage({
        messageid: id,
        state: 30,
        type: "DEFAULT",
        role: "ASSISTANT",
        content: "",
        status: "canceled"
      });
      await aiChat.completeMessage(id, true);
    };
    chatOptions.recommendPrompt = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const tempParams = { ...param };
      if (other.srfaiagent) {
        tempParams.srfaiagent = other.srfaiagent;
      }
      const result = await deService.aiChatRecommendPrompt(
        ctx,
        tempParams,
        other.message
      );
      if (result.ok && result.data) {
        const choices = result.data.choices;
        if (choices && choices.length > 0) {
          return choices[0];
        }
        return null;
      }
      return null;
    };
    chatOptions.chatDigest = async (ctx, param, other) => {
      const deService = await ibiz.hub.getApp(ctx.srfappid).deService.getService(ctx, other.appDataEntityId);
      const tempParams = { ...param };
      if (other.srfaiagent) {
        tempParams.srfaiagent = other.srfaiagent;
      }
      const result = await deService.aiChatChatDigest(
        ctx,
        tempParams,
        other.message
      );
      if (result.ok && result.data) {
        const choices = result.data.choices;
        if (choices && choices.length > 0) {
          return choices[0];
        }
        return null;
      }
      return null;
    };
    const app = ibiz.hub.getApp(context.srfappid);
    const folder = ibiz.env.defaultOSSCat || app.model.defaultOSSCat || ((_a = app.model.userParam) == null ? void 0 : _a.DefaultOSSCat);
    let globalDownloadPrifix = false;
    if (params.hasOwnProperty("globaldownloadprifix")) {
      globalDownloadPrifix = params.globaldownloadprifix === "true";
      delete params.globaldownloadprifix;
    } else {
      globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
    chatOptions.uploader = {
      folder: folder ? "".concat(folder, "$") : void 0,
      globalDownloadPrifix,
      onUpload: async (file, reportProgress, options) => {
        const { uploadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder }
        );
        const headers = ibiz.util.file.getUploadHeaders();
        const formData = new FormData();
        formData.append("file", file);
        const res = await ibiz.net.request(uploadUrl, {
          baseURL: "",
          // 已经有baseURL了，这里无需再写
          method: "post",
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            const percent = progressEvent.loaded / progressEvent.total * 100;
            reportProgress(percent);
          }
        });
        return res.data;
      },
      getDownLoadUrl: (file, options) => {
        const { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder, globalDownloadPrifix }
        );
        const url = downloadUrl.replace("%fileId%", file.fileid);
        return url;
      },
      onDownLoad: async (file, options) => {
        const { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
          (options == null ? void 0 : options.context) || context,
          (options == null ? void 0 : options.params) || params,
          {},
          { enableNoAccess: true, osscat: folder, globalDownloadPrifix }
        );
        const url = downloadUrl.replace("%fileId%", file.fileid);
        await ibiz.util.file.fileDownload(
          url,
          file.filename,
          {
            context: (options == null ? void 0 : options.context) || context,
            params: (options == null ? void 0 : options.params) || params,
            data: {},
            file: { fileId: file.id, ...file },
            extraParams: {
              enableNoAccess: true,
              osscat: folder,
              globalDownloadPrifix
            }
          },
          void 0,
          true
        );
      }
    };
    let uploadMaxSize = ibiz.config.common.aiUploadMaxSize;
    if (params.hasOwnProperty("srfuploadmaxsize")) {
      uploadMaxSize = Number(params.srfuploadmaxsize);
      delete params.srfuploadmaxsize;
    }
    chatOptions.uploader.maxSize = uploadMaxSize;
    chatOptions.extendToolbarClick = async (event, source, context2, params2, data2) => {
      var _a2, _b, _c;
      const { id: id2, isPluginApp } = source;
      let appId = source.appId;
      const tempContext = core.IBizContext.create(context2);
      if (isPluginApp) {
        const mainApp = ibiz.hub.getApp();
        const targetApp = (_a2 = mainApp.model.subAppRefs) == null ? void 0 : _a2.find(
          (subAppRef) => subAppRef.appId.endsWith("__".concat(appId))
        );
        if (targetApp) {
          const targetAppId = targetApp.appId;
          tempContext.srfappid = targetAppId;
          appId = targetAppId;
        }
      }
      const result = await runtime.UIActionUtil.exec(
        id2,
        {
          view,
          ctrl,
          context: tempContext,
          params: params2,
          data: [data2],
          event
        },
        appId
      );
      if (result.closeView) {
        view.closeView({ ok: true });
      } else if (result.refresh) {
        switch (result.refreshMode) {
          case 1:
            view.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          case 2:
            (_b = view.parentView) == null ? void 0 : _b.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          case 3:
            (_c = view.getTopView()) == null ? void 0 : _c.callUIAction(runtime.SysUIActionTag.REFRESH);
            break;
          default:
        }
      }
      return result;
    };
    chatOptions.openLinkView = async (url) => {
      if (url.startsWith("view://")) {
        const { viewId, context: context2, params: params2 } = runtime.parseViewProtocol(url);
        context2.srfkeepnull = true;
        ibiz.commands.execute(
          runtime.OpenAppViewCommand.TAG,
          viewId,
          core.IBizContext.create(context2),
          params2
        );
      }
    };
    chatOptions.utils = {
      message: ibiz.message,
      notification: ibiz.notification,
      confirm: ibiz.confirm
    };
    return { containerOptions, topicOptions, chatOptions };
  }
  /**
   * 计算界面行为扩展AI聊天工具栏项
   * @param deACMode 自填模式
   */
  calcAiToolbarItemsByAc(deACMode) {
    var _a;
    const contentToolbarItems = [];
    const footerToolbarItems = [];
    const questionToolbarItems = [];
    const functionToolbarItems = [];
    const inlineToolbarItems = [];
    const otherToolbarItems = [];
    if (!deACMode || !deACMode.deuiactionGroup) {
      return {
        contentToolbarItems,
        footerToolbarItems,
        questionToolbarItems,
        otherToolbarItems,
        functionToolbarItems,
        inlineToolbarItems
      };
    }
    (_a = deACMode.deuiactionGroup.uiactionGroupDetails) == null ? void 0 : _a.forEach(
      (item) => {
        var _a2, _b, _c, _d, _e, _f, _g, _h;
        const toolbarItem = {
          appId: item.appId,
          id: item.uiactionId,
          label: item.showCaption ? item.caption : "",
          title: item.tooltip,
          icon: {
            showIcon: item.showIcon,
            cssClass: (_a2 = item.sysImage) == null ? void 0 : _a2.cssClass,
            imagePath: (_b = item.sysImage) == null ? void 0 : _b.imagePath
          }
        };
        if (item.sysImage && item.sysImage.imagePath && !item.sysImage.imagePath.startsWith("http")) {
          toolbarItem.icon.imagePath = "".concat(ibiz.env.assetsUrl, "/images/").concat(item.sysImage.imagePath);
        }
        if ((_c = item.uiactionId) == null ? void 0 : _c.startsWith("msg_content_")) {
          contentToolbarItems.push(toolbarItem);
        } else if ((_d = item.uiactionId) == null ? void 0 : _d.startsWith("msg_footer_")) {
          footerToolbarItems.push(toolbarItem);
        } else if ((_e = item.uiactionId) == null ? void 0 : _e.startsWith("question_")) {
          questionToolbarItems.push(toolbarItem);
        } else if ((_f = item.uiactionId) == null ? void 0 : _f.startsWith("function_")) {
          functionToolbarItems.push(toolbarItem);
        } else if (((_g = item.uiactionId) == null ? void 0 : _g.startsWith("inline")) || item.refUIActionGroup && ((_h = item.refUIActionGroup.id) == null ? void 0 : _h.startsWith("inline"))) {
          inlineToolbarItems.push(toolbarItem);
        } else {
          otherToolbarItems.push(toolbarItem);
        }
      }
    );
    return {
      contentToolbarItems,
      footerToolbarItems,
      questionToolbarItems,
      otherToolbarItems,
      functionToolbarItems,
      inlineToolbarItems
    };
  }
  /**
   * @description 获取知识库列表
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} [editorParams]
   * @param {string} [query]
   * @returns {*}  {Promise<IData[]>}
   * @memberof AIChatUtil
   */
  async getKnowledgeBaseList(context, params, editorParams, query) {
    let items = [];
    const app = ibiz.hub.getApp(context.srfappid || ibiz.env.appId);
    const aiAgentUtil = app.getAppUtil("DYNAMICAIGENT", "CUSTOM");
    if (!aiAgentUtil)
      return items;
    const { utilParams, utilDE2Name } = aiAgentUtil;
    if (!utilDE2Name || !(utilParams == null ? void 0 : utilParams.getKnowledgeBaseId))
      return items;
    const resultParams = { ...params, page: 0, size: 1e3 };
    if (query) {
      Object.assign(resultParams, { query });
    }
    if (editorParams && editorParams.knowledgebases) {
      Object.assign(resultParams, {
        knowledgebases: editorParams.knowledgebases
      });
    }
    const result = await app.deService.exec(
      utilDE2Name,
      utilParams.getKnowledgeBaseId,
      context,
      resultParams
    );
    if (result.ok && Array.isArray(result.data))
      items = result.data;
    return items;
  }
  /**
   * 获取AI代理列表
   * @param context
   * @param params
   */
  async getAIAgentList(context, params, editorParams) {
    const emptyList = [];
    const app = ibiz.hub.getApp(context.srfappid || ibiz.env.appId);
    const aiAgentUtil = app.getAppUtil("DYNAMICAIGENT", "CUSTOM");
    if (!aiAgentUtil)
      return emptyList;
    const utilService = new runtime.UtilService(aiAgentUtil);
    const resultParams = { ...params, page: 0, size: 1e3 };
    if (editorParams && editorParams.srfaiagentscope) {
      Object.assign(resultParams, {
        srfaiagentscope: editorParams.srfaiagentscope
      });
    }
    const data = await utilService.load("", context, resultParams);
    if (!data || data.length === 0) {
      return emptyList;
    }
    return data;
  }
  /**
   * 获取会话标识(TOPIC:适用于多话题场景；INLINE：适用于ai行内会话场景；TEMP：适用于传统ai编辑器会话场景)
   */
  getChatSessionId(type, topicID, attachTimeStamp) {
    let tempSessionID = "";
    switch (type) {
      case "TOPIC":
        tempSessionID += this.TOPIC_CHAT_PREFIX;
        break;
      case "INLINE":
        tempSessionID += this.INLINE_CHAT_SUFFIX;
        break;
      case "TEMP":
        tempSessionID += this.TEMP_CHAT_SUFFIX;
        break;
      default:
        tempSessionID += this.UNKOWN_CHAT_SUFFIX;
        break;
    }
    tempSessionID += "@".concat(topicID || qxUtil.createUUID());
    if (attachTimeStamp !== false) {
      tempSessionID += "@".concat((/* @__PURE__ */ new Date()).getTime());
    } else {
      tempSessionID += "@0";
    }
    return tempSessionID;
  }
  /**
   * 获取AI会话应用功能
   * @returns
   */
  async getAIResourceUtil(context) {
    const app = ibiz.hub.getApp(context.srfappid || ibiz.env.appId);
    const aiSessionUtil = app.getAppUtil("DYNAMICAISESSION", "CUSTOM");
    return aiSessionUtil;
  }
  /**
   * 获取AI资源参数
   * @returns
   */
  async getAIResourceOptions(context, params) {
    const resourceOptions = {};
    if (ibiz.config.common.aiResourceMode) {
      resourceOptions.resourceMode = ibiz.config.common.aiResourceMode;
      return resourceOptions;
    }
    const aiSessionUtil = await this.getAIResourceUtil(context);
    resourceOptions.resourceMode = aiSessionUtil ? "REMOTE" : "LOCAL";
    if (!aiSessionUtil) {
      return resourceOptions;
    }
    const utilService = new runtime.AIUtilService(aiSessionUtil);
    resourceOptions.getSessionList = async (args = {}) => {
      const tempParams = { ...params, page: 0, size: 1e3, ...args };
      const result = await utilService.getSessionList(context, tempParams);
      return result;
    };
    resourceOptions.updateSession = async (realID, data) => {
      const result = await utilService.updateSession(
        context,
        params,
        realID,
        data
      );
      return result;
    };
    resourceOptions.deleteSession = async (realID) => {
      const result = await utilService.deleteSession(context, params, realID);
      return result;
    };
    resourceOptions.getMessages = async (args = {}) => {
      const tempParams = { ...params, page: 0, size: 1e3, ...args };
      const result = await utilService.getMessageList(context, tempParams);
      return result;
    };
    resourceOptions.deleteMessage = async (messageID) => {
      const result = await utilService.deleteMessage(
        context,
        params,
        messageID
      );
      return result;
    };
    resourceOptions.likeMessage = async (messageID) => {
      const result = await utilService.likeMessage(context, params, messageID);
      return result;
    };
    resourceOptions.dislikeMessage = async (messageID, feedbackContent) => {
      var _a, _b;
      const overlay = ibiz.overlay.createModal(
        (modal) => {
          return vue.h(aiFeedback.AIFeedback, {
            modal,
            content: feedbackContent
          });
        },
        void 0,
        { width: "520px", height: "auto", showClose: true }
      );
      overlay.present();
      const result = await overlay.onWillDismiss();
      if (!result.ok)
        return false;
      const content = (_b = (_a = result.data) == null ? void 0 : _a[0]) == null ? void 0 : _b.feedbackContent;
      const _result = await utilService.dislikeMessage(
        context,
        params,
        messageID,
        content
      );
      return _result;
    };
    resourceOptions.cancelFeedback = async (messageID) => {
      const result = await utilService.cancelFeedback(
        context,
        params,
        messageID
      );
      return result;
    };
    resourceOptions.clearAllSession = async (excludeSessionID) => {
      const result = await utilService.clearAllSession(
        context,
        params,
        excludeSessionID
      );
      return result;
    };
    resourceOptions.clearAllMessageBySessionId = async (realID) => {
      const result = await utilService.clearAllMessageBySessionId(
        context,
        params,
        realID
      );
      return result;
    };
    return resourceOptions;
  }
}

exports.AIChatUtil = AIChatUtil;
