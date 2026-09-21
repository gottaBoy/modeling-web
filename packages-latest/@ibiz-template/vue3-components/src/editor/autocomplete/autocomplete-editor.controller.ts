import { IHttpResponse, RuntimeModelError } from '@ibiz-template/core';
import {
  ButtonContainerState,
  EditorController,
  IAcItemProvider,
  IButtonContainerState,
  UIActionButtonState,
  UIActionUtil,
  getAcItemProvider,
  getDeACMode,
} from '@ibiz-template/runtime';
import {
  IAppDEACMode,
  IAppDEUIActionGroupDetail,
  IAutoComplete,
  IDEACModeDataItem,
  IUIActionGroupDetail,
} from '@ibiz/model-core';
import { mergeDeepLeft } from 'ramda';

/**
 * 自动完成编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class AutoCompleteEditorController extends EditorController<IAutoComplete> {
  /**
   * 主键属性名称
   */
  public keyName: string = 'srfkey';

  /**
   * 主文本属性名称
   */
  public textName: string = 'srfmajortext';

  /**
   * 数据集codeName
   */
  public interfaceName: string = '';

  /**
   * 自填模式sort排序
   */
  public sort: string | undefined = '';

  /**
   * 实体自填模式模型
   */
  public deACMode: IAppDEACMode | undefined = undefined;

  /**
   * 自填数据项集合（已排除了value和text)
   */
  public dataItems: IDEACModeDataItem[] = [];

  /**
   * 自填列表项适配器
   *
   * @author zhanghengfeng
   * @date 2024-05-21 17:05:21
   * @type {IAcItemProvider}
   */
  acItemProvider?: IAcItemProvider;

  /**
   * 分组行为状态
   */
  public groupActionState: IButtonContainerState = new ButtonContainerState();

  /**
   * @description 自填模式行为行为组
   * @type {IAppDEUIActionGroupDetail[]}
   * @memberof AutoCompleteEditorController
   */
  public actionDetails: IAppDEUIActionGroupDetail[] = [];

  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.model.appDataEntityId) {
      if (this.model.appDEDataSetId) {
        this.interfaceName = this.model.appDEDataSetId;
      }
      if (this.model.appDEACModeId) {
        this.deACMode = await getDeACMode(
          this.model.appDEACModeId,
          this.model.appDataEntityId,
          this.context.srfappid,
        );
        if (this.deACMode) {
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
          if (this.deACMode.itemSysPFPluginId) {
            this.acItemProvider = await getAcItemProvider(this.deACMode);
          }
        }
      }
    }
    if (this.model.uiactionGroup) {
      this.actionDetails = this.model.uiactionGroup.uiactionGroupDetails || [];
      if (this.actionDetails.length > 0) {
        this.actionDetails.forEach(detail => {
          const actionid = detail.uiactionId;
          if (actionid) {
            const buttonState = new UIActionButtonState(
              detail.id!,
              this.context.srfappid!,
              actionid,
            );
            this.groupActionState.addState(detail.id!, buttonState);
          }
        });
        await this.groupActionState.init();
        // 转换多语言
        this.actionDetails.forEach(detail => {
          if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
            detail.caption = ibiz.i18n.t(
              detail.capLanguageRes.lanResTag,
              detail.caption,
            );
          }
          if (
            detail.tooltipLanguageRes &&
            detail.tooltipLanguageRes.lanResTag
          ) {
            detail.tooltip = ibiz.i18n.t(
              detail.tooltipLanguageRes.lanResTag,
              detail.tooltip,
            );
          }
        });
      }
    }
  }

  /**
   * 加载实体数据集数据
   *
   * @param {string} query 模糊匹配字符串
   * @param {IData} data 表单数据
   * @returns {*}  {Promise<IHttpResponse<IData[]>>}
   * @memberof AutoCompleteEditorController
   */
  public async getServiceData(
    query: string,
    data: IData,
  ): Promise<IHttpResponse<IData[]>> {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params,
    );
    // 固定参数
    const fixedParams = {};
    if (ibiz.config.pickerdefaultsort) {
      Object.assign(fixedParams, { sort: ibiz.config.pickerdefaultsort });
    }
    if (this.sort && !Object.is(this.sort, '')) {
      Object.assign(fixedParams, { sort: this.sort });
    }
    if (query) {
      Object.assign(fixedParams, { query });
    }
    Object.assign(fixedParams, { size: 1000 });
    // 合并计算出来的参数和固定参数，以计算参数为准
    const tempParams = mergeDeepLeft(params, fixedParams);
    if (this.interfaceName) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const res = await app.deService.exec(
        this.model.appDataEntityId!,
        this.interfaceName,
        context,
        tempParams,
      );
      return res as IHttpResponse<IData[]>;
    }
    throw new RuntimeModelError(
      this.model,
      ibiz.i18n.t('editor.common.entityConfigErr'),
    );
  }

  /**
   * 计算回填数据
   *
   * @author lxm
   * @date 2022-10-24 16:10:24
   * @param {IData} data 选中数据
   * @returns {*}  {Promise<Array<{ id: string; value: any }>>}
   */
  async calcFillDataItems(
    data: IData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Array<{ id: string; value: any }>> {
    if (this.deACMode) {
      if (this.dataItems.length === 0) {
        return [];
      }
      const result = await Promise.all(
        this.dataItems.map(item => {
          const value = data[item.appDEFieldId!];
          if (item.format) {
            // todo 值格式化
          } else if (item.convertToCodeItemText && item.codeListId) {
            // todo 代码表转换为文本值
          } else if (item.customCode) {
            // todo 脚本代码
          }
          return { id: item.id!, value };
        }),
      );
      return result;
    }
    return [];
  }

  /**
   * @description 分组行为项点击
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   * @memberof AutoCompleteEditorController
   */
  async onActionClick(
    detail: IUIActionGroupDetail,
    data: IData,
    event?: MouseEvent,
  ): Promise<void> {
    if (event) {
      event.stopPropagation();
    }
    const actionId = detail.uiactionId;
    await UIActionUtil.execAndResolved(
      actionId!,
      {
        context: this.context,
        params: this.params,
        data: [data],
        view: this.view,
        event,
      },
      detail.appId,
    );
  }
}
