import { IApiMapData, IApiMapState } from '../../../api';
import { IMDControlState } from './i-md-control.state';

/**
 * @description 地图部件状态接口
 * @export
 * @interface IMapState
 * @extends {IMDControlState}
 */
export interface IMapState extends IMDControlState, IApiMapState {
  /**
   * @description 地图数据
   * @type {IApiMapData[]}
   * @memberof IMapState
   */
  items: IApiMapData[];
}

/**
 * @description 地图数据格式接口
 * @export
 * @interface IMapData
 */
export interface IMapData extends IApiMapData {}
