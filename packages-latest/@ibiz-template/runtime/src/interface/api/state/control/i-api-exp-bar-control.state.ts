import { IApiControlState } from './i-api-control.state';

/**
 * @description 导航栏状态接口
 * @primary
 * @export
 * @interface IApiExpBarControlState
 * @extends {IApiControlState}
 */
export interface IApiExpBarControlState extends IApiControlState {
  /**
   * @description 导航数据
   * @type {string}
   * @default ''
   * @memberof IApiExpBarControlState
   */
  srfnav: string;

  /**
   * @description 查询条件
   * @type {string}
   * @default ''
   * @memberof IApiExpBarControlState
   */
  query: string;

  /**
   * @description 占位符
   * @type {string}
   * @default ''
   * @memberof IApiExpBarControlState
   */
  placeHolder: string;
}
