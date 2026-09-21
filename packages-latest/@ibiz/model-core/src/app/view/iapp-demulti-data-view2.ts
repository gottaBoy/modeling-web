import { IAppDEMultiDataView } from './iapp-demulti-data-view';

/**
 *
 * 应用实体多项数据视图模型基础对象接口2，支持配置多数据视图的数据激活模式
 * 继承父接口类型值[DEMDCUSTOMVIEW]
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
