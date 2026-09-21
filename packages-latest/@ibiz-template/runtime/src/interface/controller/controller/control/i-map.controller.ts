import { ISysMap } from '@ibiz/model-core';
import { IMapEvent } from '../../event';
import { IMapState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IViewController } from '../view';
import { IApiMapController } from '../../../api';

/**
 * @description 地图控制器接口
 * @export
 * @interface IMapController
 * @extends {IMDControlController<ISysMap, IMapState, IMapEvent>}
 * @extends {IApiMapController<ISysMap, IMapState>}
 */
export interface IMapController
  extends IMDControlController<ISysMap, IMapState, IMapEvent>,
    IApiMapController<ISysMap, IMapState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IMapController
   */
  view: IViewController;
}
