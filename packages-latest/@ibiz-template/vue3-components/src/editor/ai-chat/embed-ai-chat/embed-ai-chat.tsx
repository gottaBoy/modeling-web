/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { createUUID } from 'qx-util';
import { ITextArea } from '@ibiz/model-core';
import {
  convertNavData,
  calcDeCodeNameById,
  EditFormController,
  FormDetailEventName,
} from '@ibiz-template/runtime';
import {
  getEditorEmits,
  getInputProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { EmbedAIChatEditorController } from '../embed-ai-chat-editor.controller';
import './embed-ai-chat.scss';

export const IBizEmbedAIChat = defineComponent({
  name: 'IBizEmbedAIChat',
  props: getInputProps<EmbedAIChatEditorController>(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace('embed-ai-chat');
    const c = props.controller;
    const ctrl = c.ctrl as EditFormController;

    // AI聊天框挂载元素
    const aiChatElementRef: Ref<HTMLElement | null> = ref(null);
    let mountedFlag: boolean = false;
    // 挂载AI聊天框
    const mountedAIChat = async () => {
      if (mountedFlag) return;
      mountedFlag = true;
      const editorParams = { ...c.editorParams };
      if (editorParams && Object.keys(editorParams).length > 0) {
        const addParams = convertNavData(
          editorParams,
          ctrl?.data || {},
          c.context,
          c.params,
        );
        Object.assign(editorParams, addParams);
      }
      const appDataEntityId = (c.model as ITextArea).appDataEntityId;
      const chatInstance = c.chatInstance;
      if (!appDataEntityId || !c.deACMode || !chatInstance) {
        // 条件未就绪时重置标记，允许后续事件触发时重试
        mountedFlag = false;
        return;
      }
      let topicId = '';
      let sessionid = '';
      if (editorParams.srfsessionid) {
        // 去除第一个@前面的内容和最后一个@后面的内容，剩余部分作为 topicId
        const srfsessionid = editorParams.srfsessionid;
        const firstAtIndex = srfsessionid.indexOf('@');
        const lastAtIndex = srfsessionid.lastIndexOf('@');
        if (firstAtIndex !== -1 && lastAtIndex > firstAtIndex) {
          topicId = srfsessionid.substring(firstAtIndex + 1, lastAtIndex);
        }
        sessionid = editorParams.srfsessionid;
      } else {
        const appDataEntityName = calcDeCodeNameById(appDataEntityId!);
        topicId = `${appDataEntityId}@${(c.model as ITextArea).appDEACModeId}@`;
        // srfainewtopic 打开即新建会话，不去寻找历史会话
        topicId += c.context[appDataEntityName]
          ? c.context[appDataEntityName]
          : editorParams.srfainewtopic === 'true'
            ? createUUID()
            : 'default';
        // 附加会话标记附加至数据主键段，主要解决同一数据多个智能体会话历史数据混乱问题
        if (editorParams.srfattachsessiontag) {
          topicId += `__${editorParams.srfattachsessiontag}`;
          delete editorParams.srfattachsessiontag;
        }
        sessionid = ibiz.aiChatUtil.getChatSessionId(
          'TOPIC',
          topicId,
          editorParams.srfattachtimestamp !== 'false',
        );
      }

      const tempParams = { ...c.params, ...{ srfactag: c.deACMode.codeName } };
      const { topicOptions, chatOptions } =
        await ibiz.aiChatUtil.getEditorExAIChatParams(
          editorParams,
          c.context,
          c.params,
          props.data,
          c.deACMode,
          { chatInstance, view: c.view, ctrl: c.ctrl },
        );
      const resourceOptions = await ibiz.aiChatUtil.getAIResourceOptions(
        c.context,
        c.params,
      );
      // 编辑器参数srfaitopiccaption参数用于自定义ai聊天会话标题（含国际化）
      let topicCaption = `[${c.deACMode.logicName}]${props.data?.srfmajortext || ''}`;
      if (editorParams.srfaitopiccaption) {
        topicCaption = `[${ibiz.appUtil.resolveI18nText(
          editorParams.srfaitopiccaption,
        )}]${props.data?.srfmajortext || ''}`;
      }
      // 编辑器参数srfaichatcaption参数用于自定义定义ai聊天标题（含国际化）
      let chatCaption = c.deACMode.logicName;
      if (editorParams.srfaichatcaption) {
        chatCaption = ibiz.appUtil.resolveI18nText(
          editorParams.srfaichatcaption,
        );
      }
      const chatInstanceOptions: IData = {
        mode: editorParams.srfaimode || 'TOPIC',
        placeholder: c.placeHolder,
        resourceOptions,
        containerOptions: {
          container: aiChatElementRef.value,
        },
        topicOptions: {
          appid: ibiz.env.appId,
          id: topicId,
          caption: topicCaption,
          url: window.location.hash.substring(1),
          type: c.context.srftopicpath || 'default',
          ...topicOptions,
          ingnoreAsyncTopic: editorParams.ingnoreasynctopic === 'true',
        },
        chatOptions: {
          caption: chatCaption,
          context: { ...c.context },
          params: tempParams,
          appDataEntityId,
          // 扩展参数
          ...chatOptions,
          sessionid,
          isSimple: c.isSimple,
          action: (action: string, message: IData) => {
            if (action === 'send')
              ctrl.evt.emit('onFormDetailEvent', {
                data: [message],
                formDetailName: c.model.name || c.model.id!,
                formDetailEventName: FormDetailEventName.CUSTOMACTION,
              });
          },
        },
      };
      if (editorParams.srfaimode && editorParams.srfaimode === 'TEMP') {
        delete chatInstanceOptions.mode;
        delete chatInstanceOptions.topicOptions;
        chatInstanceOptions.chatOptions.sessionid =
          ibiz.aiChatUtil.getChatSessionId('TEMP');
      }
      chatInstance.create(chatInstanceOptions);
    };

    watch(
      () => c.UUID.value,
      () => {
        const chatInstance = c.chatInstance;
        if (chatInstance) chatInstance.close();
        mountedFlag = false;
        mountedAIChat();
      },
    );

    const onLoadSuccess = () => {
      mountedAIChat();
    };
    const onLoadDraftSuccess = () => {
      mountedAIChat();
    };

    onMounted(() => {
      if (ctrl) {
        ctrl.evt.on('onLoadSuccess', onLoadSuccess);
        ctrl.evt.on('onLoadDraftSuccess', onLoadDraftSuccess);
      } else {
        mountedAIChat();
      }
    });

    onUnmounted(() => {
      if (ctrl) {
        ctrl.evt.off('onLoadSuccess', onLoadSuccess);
        ctrl.evt.off('onLoadDraftSuccess', onLoadDraftSuccess);
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
      aiChatElementRef,
    };
  },
  render() {
    return (
      <div
        key={this.c.UUID.value}
        class={[this.ns.b(), this.ns.is('simple', this.c.isSimple)]}
      >
        <div class={this.ns.e('container')} ref='aiChatElementRef'></div>
      </div>
    );
  },
});
