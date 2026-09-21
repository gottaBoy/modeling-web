/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  watch,
} from 'vue';
import {
  getHtmlProps,
  getHtmlEmits,
  useNamespace,
  useUIStore,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { MenuItem } from '@imengyu/vue3-context-menu';
import { IChatMessage, listenJSEvent, NOOP } from '@ibiz-template/core';
import { HtmlPreviewEditorController } from '../html-preview-editor.controller';
import { AiIcon, inlineAiIcon } from './ibiz-html-preview-icon';
import {
  getSelectionPosition,
  indentSelection,
  insertText,
  removeIndent,
  TAB,
  unescapeHTML,
} from './ibiz-html-preview-util';
import './ibiz-html-preview.scss';

/**
 * HTML编辑框
 *
 * @description 使用wangEditor组件封装，用于富文本编辑。支持编辑器类型包含：`HTML编辑框`
 * @primary
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {"name":"enablepreview","parameterType":"boolean","defaultvalue":false,"description":"是否默认打开预览框"}
 * @editorparams {"name":"enablefullscreen","parameterType":"boolean","defaultvalue":true,"description":"是否启用全屏功能"}
 * @editorparams {"name":"enablexss","parameterType":"boolean","defaultvalue":false,"description":"是否启用xss过滤功能"}
 * @editorparams {"name":"autoquestion","parameterType":"boolean","defaultvalue":true,"description": "在打开AI功能时历史数据最后一个项是用户消息（USER）时是否自动提问，当打开AI行内聊天时是否自动提问"}
 * @editorparams {"name":"autofill","parameterType":"boolean","defaultvalue":false,"description": "用于AI聊天，AI回答完成之后是否触发回填，默认关闭"}
 * @editorparams {"name":"openmode","parameterType":"'default' | 'minimize' | 'autoexpand'","description": "用于AI聊天，AI窗口的打开模式，minimize：默认最小化窗口；autoexpand：默认最小化窗口，当提问完成后自动展开窗口"}
 * @editorparams {"name":"autoclose","parameterType":"{mode:'minimize' | 'close' | 'closetime',duration?:number}","description": "用于AI聊天，在提问完成后，设置AI窗口的自动关闭模式。其中 mode 设为 minimize 时窗口会最小化，设为 close 时窗口会直接关闭，设为 closetime 时窗口会根据 duration 配置的值延时关闭。duration配置单位为秒（s），默认值为 3 秒"}
 * @editorparams {"name":"inlineaichatheight","parameterType":"number","defaultvalue":300,"description":"用于指定AI行内聊天框高度"}
 * @editorparams {"name":"enableaiminimize","parameterType":"boolean","description":"用于控制ai聊天窗口是否启用最小化，优先级大于全局参数enableAIMinimize"}
 * @editorparams {"name":"inlinecompletionmode","parameterType":"'sync' | 'async'","defaultvalue":"async", "description":"用于AI行内聊天，控制请求方式是同步还是异步"}
 * @editorparams {"name":"enablenoaccess","parameterType":"boolean","defaultvalue":"false", "description":"是否启用无权限模式，若启用无权限模式，上传文件夹需拼接'$'字符，也不需要计算下载凭证"}
 * @editorparams {"name":"globaldownloadprifix","parameterType":"boolean","defaultvalue":"false", "description":"是否使用全局文件下载前缀，若启用，则以global作为前缀"}
 * @editorparams {"name":"srfaiappendresource","parameterType":"string", "description":"AI聊天默认附加资源数据"}
 * @editorparams {"name":"srfmode","parameterType":"string", "description":"指定AI聊天自定义模式"}
 * @editorparams {"name":"srfenableaiagentchange","parameterType":"boolean","defaultvalue":true, "description":"指定AI聊天智能体是否可切换"}
 * @editorparams {"name":"srfaiagent","parameterType":"string", "description":"指定AI聊天默认智能体"}
 * @editorparams {"name":"summarymaxtokens","parameterType":"number","defaultvalue":"30", "description":"AI聊天标题摘要最大字符数,仅话题标题模式为summary时生效"}
 * @editorparams {"name":"srfenableknowledgebaseselect","parameterType":"boolean","defaultvalue":true, "description":"AI聊天是否启用知识库选择，若未启用则不显示知识库图标"}
 * @editorparams {"name":"srfenablerecallconfigsetting","parameterType":"boolean","defaultvalue":true, "description":"AI聊天是否启用自定义召回配置，若未启用则不显示召回配置图标"}
 * @editorparams {"name":"rerankdefaultvalue","parameterType":"0 | 1 | 2","defaultvalue":"2", "description":"AI聊天召回重排默认值，0:禁用;1:启用;2:自动，仅在启用自定义召回配置和当前智能体召回重排无值时生效"}
 * @editorparams {"name":"maxchunksdefaultvalue","parameterType":"number","defaultvalue":"10", "description":"AI聊天最大召回数量默认值，仅在启用自定义召回配置和当前智能体最大召回数量无值时生效"}
 * @editorparams {"name":"chunkthresholddefaultvalue","parameterType":"number","defaultvalue":"0.4", "description":"AI聊天召回相似度阈值默认值，仅在启用自定义召回配置和当前智能体召回相似度阈值无值时生效"}
 * @editorparams {"name":"srfaichunkview","parameterType":"string", "description":"知识切片视图，用于定义AI交谈打开目标知识切片视图"}
 * @editorparams {"name":"srfaichunkentity","parameterType":"string", "description":"知识切片实体，用于定义AI交谈打开知识切片视图数据主键key"}
 * @editorparams {"name":"srfaichatcaption","parameterType":"string", "description":"自定义AI交谈框标题"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits enter | infoTextChange
 */
export const IBizHtmlPreview = defineComponent({
  name: 'IBizHtmlPreview',
  props: getHtmlProps<HtmlPreviewEditorController>(),
  emits: getHtmlEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('html-preview');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    const { zIndex } = useUIStore();

    // 是否预览态
    const isPreview = ref(false);

    // 是否全屏
    const isFullScreen = ref(false);

    // 分割值
    const splitValue = ref(1);

    // 输入框ref
    const editorRef = ref();

    // 预览框ref
    const previewRef = ref();

    // 组件根ref
    const rootRef = ref();

    // hover工具栏ref
    const hoverToolbarRef = ref();

    // 是否显示hover工具栏
    const showHoverToolbar = ref(false);

    // hover工具栏样式
    const hoverToolbarStyle: Ref<Record<string, string | number>> = ref({});

    // 是否复制
    const isCopying = ref(false);

    // 是否只读
    const readonly = computed(() => props.readonly || props.disabled);

    // 预览值
    const previewValue = ref('');

    // 全屏监听
    let fullScreenCleanup = NOOP;

    // 文本选中监听
    let selectChangeCleanup = NOOP;

    // 拷贝定时器ID
    let timerId: NodeJS.Timeout | undefined;
    let copyElement: HTMLTextAreaElement | null = null;
    const handleCopy = (event: MouseEvent): void => {
      event.stopPropagation();
      if (isCopying.value) return;
      if (timerId) clearTimeout(timerId);
      isCopying.value = true;
      const value = editorRef.value.innerText;
      if (!copyElement) {
        copyElement = document.createElement('textarea');
        copyElement.style.position = 'absolute';
        copyElement.style.left = '-9999px';
        document.body.appendChild(copyElement);
      }
      copyElement.value = value;
      copyElement.select();
      document.execCommand('copy');
      timerId = setTimeout(() => {
        isCopying.value = false;
      }, 2000);
    };

    const getValue = (): string => {
      if (!editorRef.value) {
        return '';
      }
      let value = editorRef.value.innerText;
      if (c.enableXss) {
        value = editorRef.value.innerHTML;
      }
      // 替换所有换行符
      value = value.replace(/<br\s*\/?>/gi, '\n');
      return value;
    };

    const getHTML = (): string => {
      if (c.enableXss) {
        return unescapeHTML(props.value || '');
      }
      return props.value || '';
    };

    const handleInput = (): void => {
      if (isPreview.value) {
        previewValue.value = editorRef.value.innerText;
      }
    };

    const handleBlur = (): void => {
      const value = getValue();
      if (value !== props.value) {
        emit('change', value);
      }
    };

    watch(
      () => props.value,
      newVal => {
        const value = getValue();
        if (
          editorRef.value &&
          newVal !== value &&
          (typeof newVal === 'string' || newVal == null)
        ) {
          if (newVal == null) {
            editorRef.value.innerText = '';
          } else {
            editorRef.value.innerText = getHTML();
            if (isPreview.value) {
              previewValue.value = editorRef.value.innerText;
            }
          }
        }
      },
    );

    const onKeyDown = (e: KeyboardEvent) => {
      const dom = editorRef.value;
      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          const selection = window.getSelection();
          // 多行选择
          if (!selection!.isCollapsed) {
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
      fullScreenCleanup = listenJSEvent(window, 'fullscreenchange', () => {
        if (isFullScreen.value) {
          isFullScreen.value = ibiz.fullscreenUtil.isFullScreen;
        }
      });
      if (c.inLineChatCompletion) {
        selectChangeCleanup = listenJSEvent(document, 'selectionchange', () => {
          if (editorRef.value) {
            const selection = document.getSelection();
            // 检查选区的 anchorNode (起始节点) 是否被我们的 pre 元素包含
            if (
              selection &&
              selection.anchorNode &&
              editorRef.value.contains(selection.anchorNode)
            ) {
              c.selectedText = selection.toString();
              if (c.selectedText) {
                c.lastRange = selection.getRangeAt(0);
                showHoverToolbar.value = true;
                const position = getSelectionPosition(rootRef.value);
                if (position) {
                  hoverToolbarStyle.value = {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    zIndex: zIndex.zIndex + 2,
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
        // 输入框缩进功能
        editorRef.value.addEventListener('keydown', onKeyDown);
      }
    });

    // 组件销毁前销毁监听
    onBeforeUnmount(() => {
      if (fullScreenCleanup !== NOOP) {
        fullScreenCleanup();
      }
      if (selectChangeCleanup !== NOOP) {
        selectChangeCleanup();
      }
      if (timerId) clearTimeout(timerId);
      editorRef.value.removeEventListener('keydown', onKeyDown);
    });

    let chatInstance: IData | undefined;

    const onClickAI = async (): Promise<void> => {
      const appDataEntityId = c.model.appDataEntityId;
      if (!appDataEntityId || !c.deACMode) return;
      const containerZIndex = zIndex.increment();
      chatInstance = await ibiz.aiChatUtil.getAIChat();
      const { containerOptions, chatOptions } =
        await ibiz.aiChatUtil.getEditorExAIChatParams(
          c.editorParams,
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
      // 扩展ai聊天框标题
      let chatCaption = c.deACMode.logicName;
      if (c.editorParams.srfaichatcaption) {
        chatCaption = ibiz.appUtil.resolveI18nText(
          c.editorParams.srfaichatcaption,
        );
      }
      chatInstance.create({
        resourceOptions,
        containerOptions: {
          zIndex: containerZIndex,
          ...containerOptions,
        },
        chatOptions: {
          caption: chatCaption,
          context: { ...c.context },
          params: { ...c.params, srfactag: c.deACMode.codeName },
          appDataEntityId,
          ...chatOptions,
          action: ((action: string, message: IChatMessage) => {
            if (action === 'backfill') {
              emit('change', message.realcontent);
            }
          }) as IData,
        },
      });
    };

    const handleInlineAiClick = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();
      const items: MenuItem[] = ibiz.inLineAIUtil.calcContextMenus(
        c.deACMode,
        (tag: string) => {
          c.doInLineAIUIAction(tag, c.model.appId);
        },
      );
      const popoverZIndex = zIndex.increment();
      const { offsetLeft, offsetTop, offsetHeight } =
        hoverToolbarRef.value as HTMLElement;
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
          },
        },
      );
    };

    const changePreview = (): void => {
      isPreview.value = !isPreview.value;
      splitValue.value = isPreview.value ? 0.5 : 1;
      if (isPreview.value) {
        const value = editorRef.value.innerText;
        previewValue.value = value;
      }
    };

    const switchFull = (): void => {
      if (isFullScreen.value) {
        ibiz.fullscreenUtil.closeElementFullscreen();
      } else {
        ibiz.fullscreenUtil.openElementFullscreen(rootRef.value);
        // 全屏时自动打开预览模式
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
      semanticStyle,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('preview', this.isPreview),
          this.ns.is('readonly', this.readonly),
          this.semanticClass('editor.root'),
        ]}
        style={this.semanticStyle('editor.root')}
        ref={'rootRef'}
      >
        <div
          class={[this.ns.e('toolbar'), this.semanticClass('editor.toolbar')]}
          style={this.semanticStyle('editor.toolbar')}
        >
          {this.controller.chatCompletion ? (
            <div
              class={[
                this.ns.e('toolbar-item'),
                this.ns.e('ai-button'),
                this.semanticClass('editor.toolbar.item'),
              ]}
              style={this.semanticStyle('editor.toolbar.item')}
              onClick={this.onClickAI}
            >
              {AiIcon}
            </div>
          ) : null}
          <div
            class={[
              this.ns.e('toolbar-item'),
              this.ns.e('preview-button'),
              this.semanticClass('editor.toolbar.item'),
            ]}
            style={this.semanticStyle('editor.toolbar.item')}
            onClick={this.changePreview}
          >
            {this.isPreview ? (
              <ion-icon name='eye-off-outline'></ion-icon>
            ) : (
              <ion-icon name='eye-outline'></ion-icon>
            )}
          </div>
          <div
            class={[
              this.ns.e('toolbar-item'),
              this.ns.e('full-screen-button'),
              this.semanticClass('editor.toolbar.item'),
            ]}
            style={this.semanticStyle('editor.toolbar.item')}
            onClick={this.switchFull}
          >
            {this.isFullScreen ? (
              <ion-icon name='contract-outline'></ion-icon>
            ) : (
              <ion-icon name='expand-outline'></ion-icon>
            )}
          </div>
        </div>
        <div
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
        >
          <iBizSplit v-model={this.splitValue} mode={'horizontal'}>
            {{
              left: () => {
                return (
                  <div
                    class={[
                      this.ns.e('editor'),
                      this.semanticClass('editor.editor'),
                    ]}
                    style={this.semanticStyle('editor.editor')}
                  >
                    <pre
                      ref={'editorRef'}
                      contenteditable='plaintext-only'
                      placeholder={this.controller.placeHolder}
                      spellcheck='false'
                      onInput={this.handleInput}
                      onBlur={this.handleBlur}
                    ></pre>
                    <el-button
                      class={this.ns.e('copy')}
                      link
                      onClick={this.handleCopy}
                    >
                      <ion-icon
                        name={
                          this.isCopying ? 'checkmark-outline' : 'copy-outline'
                        }
                      ></ion-icon>
                    </el-button>
                  </div>
                );
              },
              right: () => {
                return (
                  <div
                    ref={'previewRef'}
                    class={[
                      this.ns.e('preview'),
                      this.semanticClass('editor.preview'),
                    ]}
                    style={this.semanticStyle('editor.preview')}
                    v-html={this.previewValue}
                  ></div>
                );
              },
            }}
          </iBizSplit>
        </div>
        {this.showHoverToolbar ? (
          <div
            ref={'hoverToolbarRef'}
            style={[
              this.hoverToolbarStyle,
              this.semanticStyle('editor.popup') || '',
            ]}
            class={[
              this.ns.e('hover-toolbar'),
              this.semanticClass('editor.popup'),
            ]}
          >
            <el-button onClick={this.handleInlineAiClick} link>
              {inlineAiIcon}
            </el-button>
          </div>
        ) : null}
      </div>
    );
  },
});
