import { IControlItem } from '../icontrol-item';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 实体树表格列模型对象接口
 * @export
 * @interface IDETreeColumn
 */
export interface IDETreeColumn extends IControlItem {
  /**
   * 列对齐
   * @description 值模式 [表格列水平对齐] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐 }
   * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT')}
   * 来源  getAlign
   */
  align?: string | 'LEFT' | 'CENTER' | 'RIGHT';

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
   * 单元格样式对象
   *
   * @type {ISysCss}
   * 来源  getCellPSSysCss
   */
  cellSysCss?: ISysCss;

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 树视图列样式
   * @description 值模式 [实体表格列样式] {USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'USER' | 'USER2')}
   * 来源  getColumnStyle
   */
  columnStyle?: string | 'USER' | 'USER2';

  /**
   * 列类型
   * @description 值模式 [表格列类型] {DEFGRIDCOLUMN：属性列、 UAGRIDCOLUMN：操作列、 GROUPGRIDCOLUMN：属性分组列 }
   * @type {( string | 'DEFGRIDCOLUMN' | 'UAGRIDCOLUMN' | 'GROUPGRIDCOLUMN')}
   * 来源  getColumnType
   */
  columnType?: string | 'DEFGRIDCOLUMN' | 'UAGRIDCOLUMN' | 'GROUPGRIDCOLUMN';

  /**
   * 数据项名称
   * @type {string}
   * 来源  getDataItemName
   */
  dataItemName?: string;

  /**
   * 头部样式对象
   *
   * @type {ISysCss}
   * 来源  getHeaderPSSysCss
   */
  headerSysCss?: ISysCss;

  /**
   * 隐藏模式
   * @type {number}
   * @default 0
   * 来源  getHideMode
   */
  hideMode?: number;

  /**
   * 头部图片对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 列绘制应用插件
   *
   * @type {string}
   * 来源  getRenderPSSysPFPlugin
   */
  renderSysPFPluginId?: string;

  /**
   * 列宽
   * @type {number}
   * 来源  getWidth
   */
  width?: number;

  /**
   * 列宽单位
   * @description 值模式 [表格列宽度单位] {PX：px、 STAR：* }
   * @type {( string | 'PX' | 'STAR')}
   * 来源  getWidthUnit
   */
  widthUnit?: string | 'PX' | 'STAR';

  /**
   * 支持展开（树节点）
   * @type {boolean}
   * 来源  isEnableExpand
   */
  enableExpand?: boolean;

  /**
   * 支持排序
   * @type {boolean}
   * 来源  isEnableSort
   */
  enableSort?: boolean;

  /**
   * 默认隐藏
   * @type {boolean}
   * @default false
   * 来源  isHideDefault
   */
  hideDefault?: boolean;
}
