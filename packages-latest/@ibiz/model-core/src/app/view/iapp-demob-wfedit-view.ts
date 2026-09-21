import { IAppDEMobWFActionView } from './iapp-demob-wfaction-view';
import { IAppDEWFEditView } from './iapp-dewfedit-view';
import { IAppMobView } from './iapp-mob-view';

/**
 *
 * 继承父接口类型值[DEMOBWFEDITVIEW,DEMOBWFEDITVIEW3]
 * @export
 * @interface IAppDEMobWFEditView
 */
export interface IAppDEMobWFEditView
  extends IAppDEWFEditView,
    IAppMobView,
    IAppDEMobWFActionView {}
