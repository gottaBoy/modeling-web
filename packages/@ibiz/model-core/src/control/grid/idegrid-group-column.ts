import { IDEGridColumn } from './idegrid-column';

/**
 *
 * 继承父接口类型值[GROUPGRIDCOLUMN]
 * @export
 * @interface IDEGridGroupColumn
 */
export interface IDEGridGroupColumn extends IDEGridColumn {
  /**
   * 成员列集合
   *
   * @type {IDEGridColumn[]}
   * 来源  getPSDEGridColumns
   */
  degridColumns?: IDEGridColumn[];
}
