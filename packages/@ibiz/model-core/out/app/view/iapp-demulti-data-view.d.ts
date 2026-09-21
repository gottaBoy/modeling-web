import { IAppDESearchView } from './iapp-desearch-view';
import { IAppDESearchView2 } from './iapp-desearch-view2';
import { IAppDEXDataView } from './iapp-dexdata-view';
import { IControlMDataContainer } from '../../control/icontrol-mdata-container';
/**
 *
 * 继承父接口类型值[DEMDCUSTOMVIEW]
 * @export
 * @interface IAppDEMultiDataView
 */
export interface IAppDEMultiDataView extends IAppDEXDataView, IAppDESearchView, IControlMDataContainer, IAppDESearchView2 {
}
