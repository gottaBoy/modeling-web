import {
  CodeListEditorController,
  IAppDEService,
  getDeACMode,
} from '@ibiz-template/runtime';
import {
  IAppCodeList,
  IAppDEACMode,
  IDEACModeDataItem,
  ITextArea,
  ITextBox,
} from '@ibiz/model-core';
import { toNumber } from 'lodash-es';

/**
 * 输入框编辑器控制器
 *
 * @author lxm
 * @date 2022-08-24 20:08:25
 * @export
 * @class TextBoxEditorController
 * @extends {EditorController}
 */
export class TextBoxEditorController extends CodeListEditorController<ITextBox> {
  /**
   * 精度
   * @author lxm
   * @date 2023-09-26 10:22:47
   * @type {number}
   */
  precision?: number;

  /**
   * 应用实体服务
   *
   * @author chitanda
   * @date 2023-10-12 14:10:41
   * @type {IAppDEService}
   */
  deService?: IAppDEService;

  /**
   * 自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:52
   * @type {IAppDEACMode}
   */
  deACMode?: IAppDEACMode;

  /**
   * 自填模式对应主键属性名称
   *
   * @author chitanda
   * @date 2023-10-12 10:10:58
   * @type {string}
   */
  keyName: string = 'srfkey';

  /**
   * 自填模式对应主文本属性名称
   *
   * @author chitanda
   * @date 2023-10-12 10:10:02
   * @type {string}
   */
  textName: string = 'srfmajortext';

  /**
   * 自填模式排序模式，默认升序
   *
   * @author chitanda
   * @date 2023-10-12 10:10:29
   * @type {string}
   */
  sort: string = 'asc';

  /**
   * 自填数据项集合（已排除了value和text)
   *
   * @author chitanda
   * @date 2023-10-12 10:10:23
   * @type {IDEACModeDataItem[]}
   */
  dataItems: IDEACModeDataItem[] = [];

  /**
   * AI 聊天自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:37
   * @type {boolean}
   */
  chatCompletion: boolean = false;

  /**
   * 代码表模型
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-05-24 10:55:50
   */
  public codeList: IAppCodeList | undefined = undefined;

  /**
   * 无值隐藏单位
   *
   * @type {boolean}
   * @memberof TextBoxEditorController
   */
  public emptyHiddenUnit: boolean = true;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.precision = this.editorParams.precision
      ? toNumber(this.editorParams.precision)
      : this.model.precision;
    if (
      this.model.editorType === 'TEXTAREA' ||
      this.model.editorType === 'TEXTAREA_10' ||
      this.model.editorType === 'MOBTEXTAREA'
    ) {
      const model = this.model as ITextArea;
      if (model.appDEACModeId) {
        this.deACMode = await getDeACMode(
          model.appDEACModeId,
          model.appDataEntityId!,
          this.context.srfappid,
        );
        if (this.deACMode) {
          if (this.deACMode.actype === 'AUTOCOMPLETE') {
            // 自填模式相关
            const { minorSortAppDEFieldId, minorSortDir } = this.deACMode;
            if (minorSortAppDEFieldId && minorSortDir) {
              this.sort = `${minorSortAppDEFieldId.toLowerCase()},${minorSortDir.toLowerCase()}`;
            }
            if (this.deACMode.textAppDEFieldId) {
              this.textName = this.deACMode.textAppDEFieldId;
            }
            if (this.deACMode.valueAppDEFieldId) {
              this.keyName = this.deACMode.valueAppDEFieldId;
            }
            if (this.deACMode.deacmodeDataItems) {
              this.dataItems = [];
              this.deACMode.deacmodeDataItems.forEach(
                (dataItem: IDEACModeDataItem) => {
                  if (dataItem.id !== 'value' && dataItem.id !== 'text') {
                    this.dataItems.push(dataItem);
                  }
                },
              );
            }
          }
          if (this.deACMode.actype === 'CHATCOMPLETION' && ibiz.env.enableAI) {
            this.deService = await ibiz.hub
              .getApp(model.appId)
              .deService.getService(this.context, model.appDataEntityId!);
            this.chatCompletion = true;
          }
        }
      }
    }
    // 预置类型
    if (this.model.predefinedType === 'AUTH_USERID' && !this.placeHolder) {
      this.placeHolder = ibiz.i18n.t('app.pleaseEnterAccount');
    } else if (
      this.model.predefinedType === 'AUTH_PASSWORD' &&
      !this.placeHolder
    ) {
      this.placeHolder = ibiz.i18n.t('app.pleaseEnterPassword');
    }
    // 初始化代码表
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
    if (this.extraParams) {
      this.emptyHiddenUnit = this.extraParams.emptyHiddenUnit;
    }
  }
}
