import { IControlItem } from '../icontrol-item';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 列表部件项模型对象接口
 * @export
 * @interface IListItem
 */
export interface IListItem extends IControlItem {
  /**
   * 对齐方式
   * @description 值模式 [表格列水平对齐] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐 }
   * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT')}
   * 来源  getAlign
   */
  align?: string | 'LEFT' | 'CENTER' | 'RIGHT';

  /**
   * 代码表输出模式
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
   * 数据分组项
   * @type {string}
   * 来源  getGroupItem
   */
  groupItem?: string;

  /**
   * 项权限标识
   * @type {string}
   * 来源  getItemPrivId
   */
  itemPrivId?: string;

  /**
   * 项类型
   * @description 值模式 [云平台列表项类型] {TEXTITEM：显示内容项、 ACTIONITEM：操作项、 DATAITEM：数据项 }
   * @type {( string | 'TEXTITEM' | 'ACTIONITEM' | 'DATAITEM')}
   * 来源  getItemType
   */
  itemType?: string | 'TEXTITEM' | 'ACTIONITEM' | 'DATAITEM';

  /**
   * 列前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 宽度串
   * @type {string}
   * 来源  getWidthString
   */
  widthString?: string;

  /**
   * 启用项权限控制
   * @type {boolean}
   * @default false
   * 来源  isEnableItemPriv
   */
  enableItemPriv?: boolean;

  /**
   * 支持排序
   * @type {boolean}
   * 来源  isEnableSort
   */
  enableSort?: boolean;

  /**
   * 隐藏数据项
   * @type {boolean}
   * @default false
   * 来源  isHiddenDataItem
   */
  hiddenDataItem?: boolean;
}
