import { IAppDEMobWFView } from './iapp-demob-wfview';
import { IAppDEWFActionView } from './iapp-dewfaction-view';
import { IAppMobView } from './iapp-mob-view';

/**
 *
 * 继承父接口类型值[DEMOBWFACTIONVIEW]
 * @export
 * @interface IAppDEMobWFActionView
 */
export interface IAppDEMobWFActionView
  extends IAppDEWFActionView,
    IAppDEMobWFView,
    IAppMobView {}
