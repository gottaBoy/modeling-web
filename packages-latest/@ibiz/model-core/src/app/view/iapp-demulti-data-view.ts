import { IAppDESearchView } from './iapp-desearch-view';
import { IAppDESearchView2 } from './iapp-desearch-view2';
import { IAppDEXDataView } from './iapp-dexdata-view';
import { IControlMDataContainer } from '../../control/icontrol-mdata-container';

/**
 *
 * 应用实体多项数据视图模型基础对象接口
 * @export
 * @interface IAppDEMultiDataView
 */
export interface IAppDEMultiDataView
  extends IAppDEXDataView,
    IAppDESearchView,
    IControlMDataContainer,
    IAppDESearchView2 {}
