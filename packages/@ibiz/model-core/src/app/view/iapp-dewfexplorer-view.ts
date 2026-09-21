import { IAppDEExplorerView } from './iapp-deexplorer-view';
import { IAppDEWFView } from './iapp-dewfview';

/**
 *
 * 继承父接口类型值[DEWFEXPVIEW]
 * @export
 * @interface IAppDEWFExplorerView
 */
export interface IAppDEWFExplorerView
  extends IAppDEExplorerView,
    IAppDEWFView {}
