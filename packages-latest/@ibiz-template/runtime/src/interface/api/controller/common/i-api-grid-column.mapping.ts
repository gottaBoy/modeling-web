import {
  IApiGridFieldColumnController,
  IApiGridFieldEditColumnController,
  IApiGridGroupColumnController,
  IApiGridUAColumnController,
} from '../control';

/**
 * @description 表格成员映射
 * @export
 * @interface IApiGridColumnMapping
 */
export interface IApiGridColumnMapping {
  /**
   * @description 表格属性列
   * @type {IApiGridFieldColumnController}
   * @memberof IApiGridColumnMapping
   */
  DEFGRIDCOLUMN: IApiGridFieldColumnController;

  /**
   * @description 表格编辑列
   * @type {IApiGridFieldEditColumnController}
   * @memberof IApiGridColumnMapping
   */
  DEFGRIDCOLUMN_EDIT: IApiGridFieldEditColumnController;

  /**
   * @description 表格分组列
   * @type {IApiGridGroupColumnController}
   * @memberof IApiGridColumnMapping
   */
  GROUPGRIDCOLUMN: IApiGridGroupColumnController;

  /**
   * @description 表格操作列
   * @type {IApiGridUAColumnController}
   * @memberof IApiGridColumnMapping
   */
  UAGRIDCOLUMN: IApiGridUAColumnController;
}
