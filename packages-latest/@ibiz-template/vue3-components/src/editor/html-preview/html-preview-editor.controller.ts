import { RuntimeError } from '@ibiz-template/core';
import {
  EditorController,
  getDeACMode,
  IAppDEService,
  IInLineAiChatOptions,
  IInLineAIEditor,
  UIActionUtil,
} from '@ibiz-template/runtime';
import { IAppDEACMode, IHtml } from '@ibiz/model-core';
import { clone } from 'ramda';
import { getSelectionPosition } from './ibiz-html-preview/ibiz-html-preview-util';

/**
 * 预览html编辑器控制器
 *
 * @export
 * @class HtmlPreviewEditorController
 * @extends {EditorController}
 */
export class HtmlPreviewEditorController
  extends EditorController<IHtml>
  implements IInLineAIEditor
{
  /**
   * 应用实体服务
   *
   * @type {IAppDEService}
   * @memberof HtmlPreviewEditorController
   */
  deService?: IAppDEService;

  /**
   * @description 自填模式
   * @type {IAppDEACMode}
   * @memberof HtmlPreviewEditorController
   */
  deACMode?: IAppDEACMode;

  /**
   * @description AI 聊天自填模式
   * @type {boolean}
   * @memberof HtmlPreviewEditorController
   */
  chatCompletion: boolean = false;

  /**
   * @description 行内AI 聊天自填模式
   * @type {boolean}
   * @memberof HtmlPreviewEditorController
   */
  inLineChatCompletion: boolean = false;

  /**
   * @description 启用预览模式
   * @type {boolean}
   * @memberof HtmlPreviewEditorController
   */
  public enablePreview: boolean = false;

  /**
   * @description 是否允许全屏
   * @type {boolean}
   * @memberof HtmlPreviewEditorController
   */
  public enableFullscreen: boolean = true;

  /**
   * @description 是否启用xss过滤
   * @type {boolean}
   * @memberof HtmlPreviewEditorController
   */
  public enableXss: boolean = false;

  /**
   * @description 编辑框元素
   * @type {(HTMLElement | null)}
   * @memberof HtmlPreviewEditorController
   */
  public editorContainer: HTMLElement | null = null;

  /**
   * @description 选中文本
   * @type {string}
   * @memberof HtmlPreviewEditorController
   */
  public selectedText: string = '';

  /**
   * @description 最后一次选中区域
   * @type {(Range | null)}
   * @memberof HtmlPreviewEditorController
   */
  public lastRange: Range | null = null;

  /**
   * AI行内聊天框高度
   *
   * @type {number}
   * @memberof HtmlPreviewEditorController
   */
  inlineAiChatHeight?: number;

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof HtmlPreviewEditorController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    const { enablepreview, enablefullscreen, enablexss, inlineaichatheight } =
      this.editorParams;
    if (enablepreview) {
      this.enablePreview = this.toBoolean(enablepreview);
    }
    if (enablefullscreen) {
      this.enableFullscreen = this.toBoolean(enablefullscreen);
    }
    if (enablexss) {
      this.enableXss = this.toBoolean(enablexss);
    }
    if (inlineaichatheight) {
      this.inlineAiChatHeight = Number(inlineaichatheight);
    }
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId!,
        this.context.srfappid,
      );
      if (this.deACMode) {
        if (this.deACMode.actype === 'CHATCOMPLETION') {
          this.deService = await ibiz.hub
            .getApp(model.appId)
            .deService.getService(this.context, model.appDataEntityId!);
          this.chatCompletion = true;
          const { deuiactionGroup } = this.deACMode;
          const uiactionGroupDetails =
            deuiactionGroup?.uiactionGroupDetails || [];
          const items = uiactionGroupDetails.flatMap((item: IModel) => {
            const isInlineAction =
              item.detailType === 'DEUIACTION' &&
              item.uiactionId?.startsWith('inline');

            if (isInlineAction) {
              return [item];
            }
            if (
              item.detailType === 'DEUIACTIONGROUP' &&
              item.refUIActionGroup?.id?.startsWith('inline')
            ) {
              return (
                item.refUIActionGroup.uiactionGroupDetails?.filter(
                  (detail: IModel) =>
                    detail.detailType === 'DEUIACTION' &&
                    detail.uiactionId?.startsWith('inline'),
                ) ?? []
              );
            }
            return [];
          });
          this.inLineChatCompletion = items.length > 0;
        }
      }
    }
  }

  /**
   * 获取选中文本
   * @returns 选中文本
   */
  getSelectionText(): string {
    return this.selectedText;
  }

  /**
   * 插入文本
   * @param text 文本
   */
  insertText(text: string): void {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      return;
    }
    const range = selection.getRangeAt(0);
    // 创建要插入的文本节点
    const textNode = document.createTextNode(text);
    // 在选区起始位置插入文本
    range.setStart(range.startContainer, range.startOffset);
    range.insertNode(textNode);

    // 重新选中原来的文本（扩展选区到插入的文本之后）
    const newRange = document.createRange();
    newRange.setStartAfter(textNode);
    selection.collapse(textNode, textNode.length);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  /**
   * 替换选中文本
   * @param text 文本
   */
  replaceSelectionText(text: string): void {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return;
    }
    const range = selection.getRangeAt(0);
    // 删除选中的内容（如果有）
    range.deleteContents();
    // 创建文本节点并插入
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    // 将光标移动到插入文本的末尾
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * 恢复选区
   */
  restoreSelection(): void {
    if (this.lastRange) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(this.lastRange);
      }
    }
  }

  /**
   * 获取内联AI编辑器元素
   */
  getInLineAiEditorElement(): Element {
    if (!this.editorContainer) {
      throw new RuntimeError(ibiz.i18n.t('editor.html.editorNotInit'));
    }
    return this.editorContainer;
  }

  /**
   * 获取内联AI编辑器主题
   */
  getInLineAiEditorTheme(): 'light' | 'dark' {
    const appTheme = ibiz.util.theme.getTheme();
    if (appTheme.indexOf('dark') !== -1) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * 获取内联AI参数
   */
  getInLineAiChatOptions(): IInLineAiChatOptions {
    if (!this.editorContainer) {
      throw new RuntimeError(ibiz.i18n.t('editor.html.editorNotInit'));
    }
    const selectionPosition = getSelectionPosition(this.editorContainer);
    if (
      !selectionPosition ||
      selectionPosition.left == null ||
      selectionPosition.top == null
    )
      throw new RuntimeError(ibiz.i18n.t('editor.html.getSelectPositionFail'));
    const editorBoundingClientRect =
      this.editorContainer.getBoundingClientRect();
    return {
      // 编辑器的左侧距离 + 默认padding
      left: editorBoundingClientRect.x + 12,
      // 编辑器的上方距离+选区距离编辑器上方距离
      top: editorBoundingClientRect.y + selectionPosition.top,
      // 编辑器的宽度 - 左右padding
      width: editorBoundingClientRect.width - 24,
      editorElement: this.getInLineAiEditorElement(),
      editorTheme: this.getInLineAiEditorTheme(),
      height: this.inlineAiChatHeight,
    };
  }

  /**
   * 执行内联AIUI操作
   * @param uiActionId
   * @param appId
   */
  async doInLineAIUIAction(uiActionId: string, appId: string): Promise<void> {
    const eventArgs = this.ctrl.getEventArgs();
    eventArgs.params = clone(eventArgs.params);
    eventArgs.params.editor = this;
    // 编辑器参数srfaiappendcurdata，是否传入对象参数，用于历史查询传参
    if (
      this.editorParams.srfaiappendcurdata &&
      this.editorParams.srfaiappendcurdata === 'true'
    ) {
      eventArgs.context.srfaiappendcurdata = true;
    }
    await UIActionUtil.exec(
      uiActionId!,
      {
        ...eventArgs,
      },
      appId,
    );
  }
}
