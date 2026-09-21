import { ISysMap } from '@ibiz/model-core';
import { IMapEvent } from '../../event';
import { IMapState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 地图控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IChartController
 * @extends {IMDControlController}
 */
export interface IMapController extends IMDControlController<ISysMap, IMapState, IMapEvent> {
}
//# sourceMappingURL=i-map.controller.d.ts.map