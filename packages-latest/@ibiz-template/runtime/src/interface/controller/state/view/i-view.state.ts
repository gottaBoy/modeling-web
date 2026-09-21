import { IApiViewState } from '../../../api';
import { IViewSession } from '../../../studio';
import { IViewMessage } from '../../common';
import { IControllerState } from '../common/i-controller.state';

/**
 * @description 视图UI状态对象接口
 * @export
 * @interface IViewState
 * @extends {IControllerState}
 * @extends {IViewSession}
 * @extends {IApiViewState}
 */
export interface IViewState
  extends IControllerState,
    IViewSession,
    IApiViewState {
  /**
   * @description 视图消息数据
   * @type {{ [p: string]: IViewMessage[] }}
   * @memberof IViewState
   */
  viewMessages: { [p: string]: IViewMessage[] };

  /**
   * @description 视图是否最小化
   * @type {boolean}
   * @memberof IViewState
   */
  isShortCut: boolean;

  /**
   * @description 预设class列表
   * @type {string[]}
   * @memberof IViewState
   */
  presetClassList: string[];
}
