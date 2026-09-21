import { IAppDEMobWFDynaActionView } from './iapp-demob-wfdyna-action-view';
import { IAppDEMobWFEditView } from './iapp-demob-wfedit-view';
import { IAppDEWFDynaEditView } from './iapp-dewfdyna-edit-view';

/**
 *
 * 继承父接口类型值[DEMOBWFDYNAEDITVIEW,DEMOBWFDYNAEDITVIEW3]
 * @export
 * @interface IAppDEMobWFDynaEditView
 */
export interface IAppDEMobWFDynaEditView
  extends IAppDEMobWFEditView,
    IAppDEMobWFDynaActionView,
    IAppDEWFDynaEditView {}
