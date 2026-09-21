import { ICenterControllerState } from './i-center-controller-state';

/**
 * 接口
 *
 * @export
 * @interface IDevToolController
 */
export interface IDevToolController {
  /**
   * UI响应式状态对象
   *
   * @type {ICenterControllerState}
   * @memberof IDevToolController
   */
  state: ICenterControllerState;

  /**
   * 初始化
   *
   * @memberof IDevToolController
   */
  init(): void;

  /**
   * 更新用户配置
   *
   * @author tony001
   * @date 2025-03-17 18:03:26
   * @param {IContext} context
   */
  updateConfig(context: IContext): void;

  /**
   * 切换显示状态
   *
   * @param {boolean} [visible]
   * @return {*}  {Promise<void>}
   * @memberof IDevToolController
   */
  triggerVisible(visible?: boolean): Promise<void>;
}
