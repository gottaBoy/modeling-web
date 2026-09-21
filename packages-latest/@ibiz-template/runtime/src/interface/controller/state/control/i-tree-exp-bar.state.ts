import { IApiTreeExpBarState } from '../../../api';
import { IExpBarControlState } from './i-exp-bar-control.state';

/**
 * @description  树导航栏状态接口
 * @export
 * @interface ITreeExpBarState
 * @extends {IExpBarControlState}
 * @extends {IApiTreeExpBarState}
 */
export interface ITreeExpBarState
  extends IExpBarControlState,
    IApiTreeExpBarState {
  /**
   * @description 不需要配置导航视图,没有配置导航视图的情况下也正常抛出导航事件，由外部决定导航参数用在哪个导航视图里。
   * @type {boolean}
   * @memberof ITreeExpBarState
   */
  noNeedNavView: boolean;
}
