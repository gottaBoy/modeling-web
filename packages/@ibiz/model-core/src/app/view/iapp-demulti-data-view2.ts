import { IAppDEMultiDataView } from './iapp-demulti-data-view';

/**
 *
 * @export
 * @interface IAppDEMultiDataView2
 */
export interface IAppDEMultiDataView2 extends IAppDEMultiDataView {
  /**
   * 多数据部件激活模式
   * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getMDCtrlActiveMode
   */
  mdctrlActiveMode?: number | 0 | 1 | 2;
}
