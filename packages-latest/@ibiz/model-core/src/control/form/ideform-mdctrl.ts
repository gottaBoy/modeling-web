import { IControl } from '../icontrol';
import { IDEFormDetail } from './ideform-detail';
import { IDEFormGroupBase } from './ideform-group-base';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 继承父接口类型值[MDCTRL]
 * @export
 * @interface IDEFormMDCtrl
 */
export interface IDEFormMDCtrl extends IDEFormDetail, IDEFormGroupBase {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
   * 来源  getActionGroupExtractMode
   */
  actionGroupExtractMode?: string | 'ITEM' | 'ITEMS' | 'ITEMX';

  /**
   * 内建操作
   * @description 值模式 [表单多数据成员操作] {1：新建、 2：更新、 4：删除 }
   * @type {( number | 1 | 2 | 4)}
   * @default 0
   * 来源  getBuildInActions
   */
  buildInActions?: number | 1 | 2 | 4;

  /**
   * 内容部件
   *
   * @type {IControl}
   * 来源  getContentPSControl
   */
  contentControl?: IControl;

  /**
   * 内容类型
   * @description 值模式 [表单多数据部件成员类型] {LIST：列表、 FORM：表单、 GRID：表格、 DATAVIEW：卡片视图、 REPEATER：重复器 }
   * @type {( string | 'LIST' | 'FORM' | 'GRID' | 'DATAVIEW' | 'REPEATER')}
   * 来源  getContentType
   */
  contentType?: string | 'LIST' | 'FORM' | 'GRID' | 'DATAVIEW' | 'REPEATER';

  /**
   * 部件参数集合
   * @type {IModel}
   * 来源  getCtrlParams
   */
  ctrlParams?: IModel;

  /**
   * 绑定属性
   * @type {string}
   * 来源  getFieldName
   */
  fieldName?: string;

  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 调用表单项更新
   *
   * @type {string}
   * 来源  getPSDEFormItemUpdate
   */
  deformItemUpdateId?: string;

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;

  /**
   * 重置项名称集合
   *
   * 来源 getResetItemNames
   */
  resetItemNames?: string[];

  /**
   * 1:1数据表单
   * @type {boolean}
   * @default false
   * 来源  isOne2OneForm
   */
  one2OneForm?: boolean;
}
