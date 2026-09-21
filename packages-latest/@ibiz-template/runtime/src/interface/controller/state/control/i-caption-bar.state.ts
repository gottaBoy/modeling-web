import { IApiCaptionBarState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 标题栏状态接口
 * @export
 * @interface ICaptionBarState
 * @extends {IControlState}
 * @extends {IApiCaptionBarState}
 */
export interface ICaptionBarState extends IControlState, IApiCaptionBarState {
  /**
   * @description 总条数
   * @type {number}
   * @memberof ICaptionBarState
   */
  total: number;

  /**
   * @description 全部计数条数
   * @type {number}
   * @memberof ICaptionBarState
   */
  totalx?: number;
}
