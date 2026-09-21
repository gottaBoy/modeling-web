import { IAppDEMultiDataView } from './iapp-demulti-data-view';
import { IAppDEWFView } from './iapp-dewfview';

/**
 *
 * 继承父接口类型值[DEGRIDVIEW,DEGRIDVIEW2,DEGRIDVIEW4]
 * @export
 * @interface IAppDEGridView
 */
export interface IAppDEGridView extends IAppDEMultiDataView, IAppDEWFView {
  /**
   * 表格行激活模式
   * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getGridRowActiveMode
   */
  gridRowActiveMode?: number | 0 | 1 | 2;

  /**
   * 支持行编辑
   * @type {boolean}
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;

  /**
   * 视图默认进入行编辑
   * @type {boolean}
   * 来源  isRowEditDefault
   */
  rowEditDefault?: boolean;
}
