import { defineComponent, createVNode, ref, watch, onMounted, onUnmounted } from 'vue';
import { createUUID } from 'qx-util';
import { convertNavData, calcDeCodeNameById, FormDetailEventName } from '@ibiz-template/runtime';
import { useNamespace, getEditorEmits, getInputProps } from '@ibiz-template/vue3-util';
import './embed-ai-chat.css';

"use strict";
const IBizEmbedAIChat = /* @__PURE__ */ defineComponent({
  name: "IBizEmbedAIChat",
  props: getInputProps(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace("embed-ai-chat");
    const c = props.controller;
    const ctrl = c.ctrl;
    const aiChatElementRef = ref(null);
    let mountedFlag = false;
    const mountedAIChat = async () => {
      var _a, _b;
      if (mountedFlag)
        return;
      mountedFlag = true;
      const editorParams = {
        ...c.editorParams
      };
      if (editorParams && Object.keys(editorParams).length > 0) {
        const addParams = convertNavData(editorParams, (ctrl == null ? void 0 : ctrl.data) || {}, c.context, c.params);
        Object.assign(editorParams, addParams);
      }
      const appDataEntityId = c.model.appDataEntityId;
      const chatInstance = c.chatInstance;
      if (!appDataEntityId || !c.deACMode || !chatInstance) {
        mountedFlag = false;
        return;
      }
      let topicId = "";
      let sessionid = "";
      if (editorParams.srfsessionid) {
        const srfsessionid = editorParams.srfsessionid;
        const firstAtIndex = srfsessionid.indexOf("@");
        const lastAtIndex = srfsessionid.lastIndexOf("@");
        if (firstAtIndex !== -1 && lastAtIndex > firstAtIndex) {
          topicId = srfsessionid.substring(firstAtIndex + 1, lastAtIndex);
        }
        sessionid = editorParams.srfsessionid;
      } else {
        const appDataEntityName = calcDeCodeNameById(appDataEntityId);
        topicId = "".concat(appDataEntityId, "@").concat(c.model.appDEACModeId, "@");
        topicId += c.context[appDataEntityName] ? c.context[appDataEntityName] : editorParams.srfainewtopic === "true" ? createUUID() : "default";
        if (editorParams.srfattachsessiontag) {
          topicId += "__".concat(editorParams.srfattachsessiontag);
          delete editorParams.srfattachsessiontag;
        }
        sessionid = ibiz.aiChatUtil.getChatSessionId("TOPIC", topicId, editorParams.srfattachtimestamp !== "false");
      }
      const tempParams = {
        ...c.params,
        ...{
          srfactag: c.deACMode.codeName
        }
      };
      const {
        topicOptions,
        chatOptions
      } = await ibiz.aiChatUtil.getEditorExAIChatParams(editorParams, c.context, c.params, props.data, c.deACMode, {
        chatInstance,
        view: c.view,
        ctrl: c.ctrl
      });
      const resourceOptions = await ibiz.aiChatUtil.getAIResourceOptions(c.context, c.params);
      let topicCaption = "[".concat(c.deACMode.logicName, "]").concat(((_a = props.data) == null ? void 0 : _a.srfmajortext) || "");
      if (editorParams.srfaitopiccaption) {
        topicCaption = "[".concat(ibiz.appUtil.resolveI18nText(editorParams.srfaitopiccaption), "]").concat(((_b = props.data) == null ? void 0 : _b.srfmajortext) || "");
      }
      let chatCaption = c.deACMode.logicName;
      if (editorParams.srfaichatcaption) {
        chatCaption = ibiz.appUtil.resolveI18nText(editorParams.srfaichatcaption);
      }
      const chatInstanceOptions = {
        mode: editorParams.srfaimode || "TOPIC",
        placeholder: c.placeHolder,
        resourceOptions,
        containerOptions: {
          container: aiChatElementRef.value
        },
        topicOptions: {
          appid: ibiz.env.appId,
          id: topicId,
          caption: topicCaption,
          url: window.location.hash.substring(1),
          type: c.context.srftopicpath || "default",
          ...topicOptions,
          ingnoreAsyncTopic: editorParams.ingnoreasynctopic === "true"
        },
        chatOptions: {
          caption: chatCaption,
          context: {
            ...c.context
          },
          params: tempParams,
          appDataEntityId,
          // 扩展参数
          ...chatOptions,
          sessionid,
          isSimple: c.isSimple,
          action: (action, message) => {
            if (action === "send")
              ctrl.evt.emit("onFormDetailEvent", {
                data: [message],
                formDetailName: c.model.name || c.model.id,
                formDetailEventName: FormDetailEventName.CUSTOMACTION
              });
          }
        }
      };
      if (editorParams.srfaimode && editorParams.srfaimode === "TEMP") {
        delete chatInstanceOptions.mode;
        delete chatInstanceOptions.topicOptions;
        chatInstanceOptions.chatOptions.sessionid = ibiz.aiChatUtil.getChatSessionId("TEMP");
      }
      chatInstance.create(chatInstanceOptions);
    };
    watch(() => c.UUID.value, () => {
      const chatInstance = c.chatInstance;
      if (chatInstance)
        chatInstance.close();
      mountedFlag = false;
      mountedAIChat();
    });
    const onLoadSuccess = () => {
      mountedAIChat();
    };
    const onLoadDraftSuccess = () => {
      mountedAIChat();
    };
    onMounted(() => {
      if (ctrl) {
        ctrl.evt.on("onLoadSuccess", onLoadSuccess);
        ctrl.evt.on("onLoadDraftSuccess", onLoadDraftSuccess);
      } else {
        mountedAIChat();
      }
    });
    onUnmounted(() => {
      if (ctrl) {
        ctrl.evt.off("onLoadSuccess", onLoadSuccess);
        ctrl.evt.off("onLoadDraftSuccess", onLoadDraftSuccess);
      }
      const chatInstance = c.chatInstance;
      if (chatInstance) {
        chatInstance.close();
      }
      mountedFlag = false;
    });
    return {
      c,
      ns,
      aiChatElementRef
    };
  },
  render() {
    return createVNode("div", {
      "key": this.c.UUID.value,
      "class": [this.ns.b(), this.ns.is("simple", this.c.isSimple)]
    }, [createVNode("div", {
      "class": this.ns.e("container"),
      "ref": "aiChatElementRef"
    }, null)]);
  }
});

export { IBizEmbedAIChat };
