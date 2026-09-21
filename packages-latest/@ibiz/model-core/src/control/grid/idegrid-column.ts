import { IControlItem } from '../icontrol-item';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 实体表格列模型基础对象接口
 * 子接口类型识别属性[columnType]
 * @export
 * @interface IDEGridColumn
 */
export interface IDEGridColumn extends IControlItem {
  /**
   * 聚合值存储属性
   * @type {string}
   * 来源  getAggField
   */
  aggField?: string;

  /**
   * 聚合模式
   * @description 值模式 [表格列聚合模式] {NONE：无聚合、 SUM：合计、 AVG：平均、 MAX：最大值、 MIN：最小值、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'NONE' | 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * @default NONE
   * 来源  getAggMode
   */
  aggMode?:
    | string
    | 'NONE'
    | 'SUM'
    | 'AVG'
    | 'MAX'
    | 'MIN'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 聚合值格式化
   * @type {string}
   * 来源  getAggValueFormat
   */
  aggValueFormat?: string;

  /**
   * 列水平对齐
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
   * 表格列样式
   * @type {string}
   * 来源  getColumnStyle
   */
  columnStyle?: string;

  /**
   * 列类型
   * @description 值模式 [表格列类型] {DEFGRIDCOLUMN：属性列、 UAGRIDCOLUMN：操作列、 GROUPGRIDCOLUMN：属性分组列 }
   * @type {( string | 'DEFGRIDCOLUMN' | 'UAGRIDCOLUMN' | 'GROUPGRIDCOLUMN')}
   * 来源  getColumnType
   */
  columnType?: string | 'DEFGRIDCOLUMN' | 'UAGRIDCOLUMN' | 'GROUPGRIDCOLUMN';

  /**
   * 列数据项名称
   * @type {string}
   * 来源  getDataItemName
   */
  dataItemName?: string;

  /**
   * Excel导出标题
   * @type {string}
   * 来源  getExcelCaption
   */
  excelCaption?: string;

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
   * 无权限显示模式
   * @description 值模式 [无权限内容显示模式] {1：显示空或*内容、 2：隐藏 }
   * @type {( number | 1 | 2)}
   * 来源  getNoPrivDisplayMode
   */
  noPrivDisplayMode?: number | 1 | 2;

  /**
   * 头部图片对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 列前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

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
   * 支持行编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;

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

  /**
   * 默认隐藏
   * @type {boolean}
   * @default false
   * 来源  isHideDefault
   */
  hideDefault?: boolean;
}
