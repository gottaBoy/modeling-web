import { IAppDEMultiDataView } from './iapp-demulti-data-view';

/**
 *
 * 继承父接口类型值[DETREEGRIDVIEW,DETREEGRIDVIEW9]
 * @export
 * @interface IAppDETreeGridView
 */
export interface IAppDETreeGridView extends IAppDEMultiDataView {
  /**
   * 表格行激活模式
   * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
   * @type {( number | 0 | 1 | 2)}
   * @default 2
   * 来源  getGridRowActiveMode
   */
  gridRowActiveMode?: number | 0 | 1 | 2;

  /**
   * 支持行编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;

  /**
   * 视图默认进入行编辑
   * @type {boolean}
   * @default false
   * 来源  isRowEditDefault
   */
  rowEditDefault?: boolean;
}
