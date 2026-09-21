import { IAppDEMultiDataView } from './iapp-demulti-data-view';
import { IAppDESideBarExplorerView } from './iapp-deside-bar-explorer-view';

/**
 *
 * 继承父接口类型值[DELISTEXPVIEW]
 * @export
 * @interface IAppDEListExplorerView
 */
export interface IAppDEListExplorerView
  extends IAppDESideBarExplorerView,
    IAppDEMultiDataView {}
