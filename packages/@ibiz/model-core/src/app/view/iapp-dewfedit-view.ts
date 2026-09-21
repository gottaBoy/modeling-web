import { IAppDEEditView } from './iapp-deedit-view';
import { IAppDEWFActionView } from './iapp-dewfaction-view';
import { IAppDEWFView } from './iapp-dewfview';

/**
 *
 * 继承父接口类型值[DEWFEDITVIEW]
 * @export
 * @interface IAppDEWFEditView
 */
export interface IAppDEWFEditView
  extends IAppDEEditView,
    IAppDEWFView,
    IAppDEWFActionView {}
