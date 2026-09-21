import { IControlItem } from '../icontrol-item';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 实体卡片视图部件项模型对象接口
 * @export
 * @interface IDEDataViewItem
 */
export interface IDEDataViewItem extends IControlItem {
  /**
   * 代码表转换模式
   * @description 值模式 [列表项代码表转换模式] {NONE：直接值、 FRONT：绘制时转换（前台）、 BACKEND：控制器转换（后台） }
   * @type {( string | 'NONE' | 'FRONT' | 'BACKEND')}
   * 来源  getCLConvertMode
   */
  clconvertMode?: string | 'NONE' | 'FRONT' | 'BACKEND';

  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 数据项名称
   * @type {string}
   * 来源  getDataItemName
   */
  dataItemName?: string;

  /**
   * 项类型
   * @description 值模式 [云平台列表项类型] {TEXTITEM：显示内容项、 ACTIONITEM：操作项、 DATAITEM：数据项 }
   * @type {( string | 'TEXTITEM' | 'ACTIONITEM' | 'DATAITEM')}
   * 来源  getItemType
   */
  itemType?: string | 'TEXTITEM' | 'ACTIONITEM' | 'DATAITEM';

  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 代码表
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;

  /**
   * 值格式化
   * @type {string}
   * 来源  getValueFormat
   */
  valueFormat?: string;

  /**
   * 支持排序
   * @type {boolean}
   * 来源  isEnableSort
   */
  enableSort?: boolean;
}
