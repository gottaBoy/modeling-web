import { IAppCodeList, ICodeListEditor } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
import { EditorController } from './editor.controller';

/**
 * 代码表类编辑器控制器基类
 *
 * @author lxm
 * @date 2022-09-02 13:09:16
 * @export
 * @class CodeListEditorController
 * @extends {EditorController}
 */
export class CodeListEditorController<
  T extends ICodeListEditor = ICodeListEditor,
> extends EditorController<T> {
  /**
   * 是否转化为代码项文本
   *
   * @readonly
   * @type {boolean}
   * @memberof CodeListEditorController
   */
  get convertToCodeItemText(): boolean {
    return !!(this.parent as IData).model.convertToCodeItemText;
  }

  /**
   * 代码表
   *
   * @author zhanghengfeng
   * @date 2024-08-16 18:08:46
   * @type {IAppCodeList}
   */
  appCodeList?: IAppCodeList;

  /**
   * 是否展示全部项
   *
   * @author zhanghengfeng
   * @date 2024-08-16 18:08:24
   * @type {boolean}
   */
  allItems: boolean = false;

  /**
   * 全部项文本
   *
   * @author zhanghengfeng
   * @date 2024-08-16 18:08:06
   * @type {string}
   */
  itemsText: string = '';

  /**
   * 全部项的值
   *
   * @author zhanghengfeng
   * @date 2024-08-16 18:08:02
   * @type {string}
   */
  allItemsValue: string = '$all';

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.itemsText = ibiz.i18n.t('runtime.controller.common.editor.itemsText');
    if (this.model.appCodeListId) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      this.appCodeList = app.codeList.getCodeList(this.model.appCodeListId);
      if (this.appCodeList?.allText) {
        this.itemsText = this.appCodeList.allText;
      }
      if (this.appCodeList?.allTextLanguageRes?.lanResTag) {
        this.itemsText = ibiz.i18n.t(
          this.appCodeList.allTextLanguageRes.lanResTag,
          this.itemsText,
        );
      }
    }
    if (this.editorParams) {
      if (this.editorParams.allItems) {
        this.allItems = this.toBoolean(this.editorParams.allItems);
      }
      if (this.editorParams.allitems) {
        this.allItems = this.toBoolean(this.editorParams.allitems);
      }
      if (this.editorParams.itemsText) {
        this.itemsText = ibiz.appUtil.resolveI18nText(
          this.editorParams.itemsText,
        );
      }
      if (this.editorParams.itemstext) {
        this.itemsText = ibiz.appUtil.resolveI18nText(
          this.editorParams.itemstext,
        );
      }
    }
  }

  /**
   * 处理代码表全部项
   *
   * @author zhanghengfeng
   * @date 2024-08-16 19:08:11
   * @param {readonly} items
   * @param {*} CodeListItem
   * @param {*} []
   * @return {*}  {readonly}
   */
  handleCodeListAllItems(
    items: readonly CodeListItem[],
  ): readonly CodeListItem[] {
    if (!this.allItems) {
      return items;
    }
    const item: CodeListItem = {
      id: this.allItemsValue,
      text: this.itemsText,
      value: this.allItemsValue,
    };
    return [item, ...items];
  }

  /**
   * 加载代码表数据
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 15:46:27
   */
  public async loadCodeList(data: IData): Promise<readonly CodeListItem[]> {
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params,
    );
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      let dataItems: readonly CodeListItem[] = [];
      dataItems = await app.codeList.get(
        this.model.appCodeListId,
        context,
        params,
      );
      return dataItems;
    }
    if (this.editorParams.enumOptions) return this.editorParams.enumOptions;
    // 未配置代码表，控制台输出错误异常
    ibiz.log.error(
      ibiz.i18n.t('runtime.controller.common.editor.editorNoConfigured', {
        editorType: this.model.editorType,
      }),
    );
    return [];
  }
}
