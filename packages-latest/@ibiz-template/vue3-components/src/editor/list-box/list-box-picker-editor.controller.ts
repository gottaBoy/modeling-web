import { IHttpResponse, RuntimeModelError } from '@ibiz-template/core';
import {
  EditorController,
  IAcItemProvider,
  getAcItemProvider,
  getDeACMode,
} from '@ibiz-template/runtime';
import { IAppDEACMode, IListBoxPicker } from '@ibiz/model-core';
import { mergeDeepLeft } from 'ramda';

/**
 * 列表框picker编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class ListBoxPickerEditorController extends EditorController<IListBoxPicker> {
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
   * 实体自填模式模型
   *
   * @author zhanghengfeng
   * @date 2024-05-21 17:05:03
   * @type {IAppDEACMode}
   */
  deACMode?: IAppDEACMode;

  /**
   * 自填列表项适配器
   *
   * @author zhanghengfeng
   * @date 2024-05-21 17:05:25
   * @type {IAcItemProvider}
   */
  acItemProvider?: IAcItemProvider;

  /**
   * @description 自动选中第一个
   * @memberof ListBoxPickerEditorController
   */
  public autoSelectFirstOption = false;

  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.editorParams?.autoselectfirstoption) {
      this.autoSelectFirstOption = this.toBoolean(
        this.editorParams.autoselectfirstoption,
      );
    }
    if (this.model.editorType === 'LISTBOXPICKUP') {
      if (this.model.appDEDataSetId) {
        this.interfaceName = this.model.appDEDataSetId;
      }
      if (this.model.appDataEntityId && this.model.appDEACModeId) {
        this.deACMode = await getDeACMode(
          this.model.appDEACModeId,
          this.model.appDataEntityId,
          this.context.srfappid,
        );
        if (this.deACMode) {
          // 自填模式相关
          if (this.deACMode.itemSysPFPluginId) {
            this.acItemProvider = await getAcItemProvider(this.deACMode);
          }
        }
      }
    }
  }

  /**
   * 加载实体数据集数据
   *
   * @param {string} query 模糊匹配字符串
   * @param {IData} data 表单数据
   * @returns {*}  {Promise<IHttpResponse<IData[]>>}
   * @memberof PickerEditorController
   */
  public async getServiceData(data: IData): Promise<IHttpResponse<IData[]>> {
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params,
    );
    const tempParams = mergeDeepLeft(params, { size: 1000 });
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
}
