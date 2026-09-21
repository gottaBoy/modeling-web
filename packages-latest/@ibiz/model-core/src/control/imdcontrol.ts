import { IControl } from './icontrol';
import { IControlAction } from './icontrol-action';
import { IControlNavContext } from './icontrol-nav-context';
import { IControlNavParam } from './icontrol-nav-param';

/**
 *
 * 多项数据界面部件模型基础对象接口
 * @export
 * @interface IMDControl
 */
export interface IMDControl extends IControl {
  /**
   * 当前数据属性
   * @type {string}
   * 来源  getActiveDataField
   */
  activeDataField?: string;

  /**
   * 建立数据行为
   *
   * @type {IControlAction}
   * 来源  getCreatePSControlAction
   */
  createControlAction?: IControlAction;

  /**
   * 查询数据行为
   *
   * @type {IControlAction}
   * 来源  getFetchPSControlAction
   */
  fetchControlAction?: IControlAction;

  /**
   * 获取草稿数据行为（拷贝）
   *
   * @type {IControlAction}
   * 来源  getGetDraftFromPSControlAction
   */
  getDraftFromControlAction?: IControlAction;

  /**
   * 获取草稿数据行为
   *
   * @type {IControlAction}
   * 来源  getGetDraftPSControlAction
   */
  getDraftControlAction?: IControlAction;

  /**
   * 获取数据行为
   *
   * @type {IControlAction}
   * 来源  getGetPSControlAction
   */
  getControlAction?: IControlAction;

  /**
   * 移动数据行为
   *
   * @type {IControlAction}
   * 来源  getMovePSControlAction
   */
  moveControlAction?: IControlAction;

  /**
   * 部件导航上下文集合
   *
   * @type {IControlNavContext[]}
   * 来源  getPSControlNavContexts
   */
  controlNavContexts?: IControlNavContext[];

  /**
   * 部件导航参数集合
   *
   * @type {IControlNavParam[]}
   * 来源  getPSControlNavParams
   */
  controlNavParams?: IControlNavParam[];

  /**
   * 数据导出对象
   *
   * @type {string}
   * 来源  getPSDEDataExport
   */
  dedataExportId?: string;

  /**
   * 数据导入对象
   *
   * @type {string}
   * 来源  getPSDEDataImport
   */
  dedataImportId?: string;

  /**
   * 删除数据行为
   *
   * @type {IControlAction}
   * 来源  getRemovePSControlAction
   */
  removeControlAction?: IControlAction;

  /**
   * 更新数据行为
   *
   * @type {IControlAction}
   * 来源  getUpdatePSControlAction
   */
  updateControlAction?: IControlAction;

  /**
   * 当前数据模式
   * @type {boolean}
   * @default false
   * 来源  isActiveDataMode
   */
  activeDataMode?: boolean;

  /**
   * 只读模式
   * @type {boolean}
   * @default false
   * 来源  isReadOnly
   */
  readOnly?: boolean;
}
