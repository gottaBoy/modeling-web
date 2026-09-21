import { IApiControlState } from './i-api-control.state';

/**
 * @description 标题栏状态接口
 * @primary
 * @export
 * @interface IApiCaptionBarState
 * @extends {IApiControlState}
 */
export interface IApiCaptionBarState extends IApiControlState {
  /**
   * @description 标题
   * @type {string}
   * @default ''
   * @memberof IApiCaptionBarState
   */
  caption: string;
}
