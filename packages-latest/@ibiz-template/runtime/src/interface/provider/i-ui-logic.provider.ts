import { IUILogicParams } from '../ui-logic';

/**
 * @description 界面逻辑适配器接口
 * @export
 * @interface IUILogicProvider
 */
export interface IUILogicProvider {
  /**
   * @description 初始化
   * @returns {*}  {Promise<void>}
   * @memberof IUILogicProvider
   */
  init(): Promise<void>;
  /**
   * @description 执行界面逻辑
   * @param {IUILogicParams} parameters 界面逻辑执行参数
   * @returns {*}  {Promise<unknown>}
   * @memberof IUILogicProvider
   */
  exec(parameters: IUILogicParams): Promise<unknown>;
}
