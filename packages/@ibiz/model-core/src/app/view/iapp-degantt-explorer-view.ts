import { IAppDEMultiDataView } from './iapp-demulti-data-view';
import { IAppDESideBarExplorerView } from './iapp-deside-bar-explorer-view';

/**
 *
 * 继承父接口类型值[DEGANTTEXPVIEW]
 * @export
 * @interface IAppDEGanttExplorerView
 */
export interface IAppDEGanttExplorerView
  extends IAppDESideBarExplorerView,
    IAppDEMultiDataView {}
