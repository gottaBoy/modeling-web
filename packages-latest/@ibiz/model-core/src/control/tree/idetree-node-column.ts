import { IControlItem } from '../icontrol-item';
import { ISysCss } from '../../res/isys-css';

/**
 *
 * 实体树节点表格列模型基础对象接口
 * 子接口类型识别属性[columnType]
 * @export
 * @interface IDETreeNodeColumn
 */
export interface IDETreeNodeColumn extends IControlItem {
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
   * 无权限显示模式
   * @description 值模式 [无权限内容显示模式] {1：显示空或*内容、 2：隐藏 }
   * @type {( number | 1 | 2)}
   * @default 1
   * 来源  getNoPrivDisplayMode
   */
  noPrivDisplayMode?: number | 1 | 2;

  /**
   * 树视图列
   *
   * @type {string}
   * 来源  getPSDETreeColumn
   */
  detreeColumnId?: string;

  /**
   * 列前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 支持行编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;
}
