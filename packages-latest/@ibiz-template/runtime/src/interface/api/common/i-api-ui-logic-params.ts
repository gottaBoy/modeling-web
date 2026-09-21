import { IApiControlController, IApiViewController } from '../controller';
import { IApiLogicParams } from './i-api-logic-params';

/**
 * @description 界面逻辑通用参数接口
 * @export
 * @interface IApiUILogicParams
 */
export interface IApiUILogicParams extends IApiLogicParams {
  /**
   * @description 当前上下文对应的视图控制器
   * @type {IApiViewController}
   * @memberof IApiUILogicParams
   */
  view: IApiViewController;

  /**
   * @description 当前部件控制器
   * @type {IApiControlController}
   * @memberof IApiUILogicParams
   */
  ctrl?: IApiControlController;

  /**
   * @description 鼠标事件
   * @type {MouseEvent}
   * @memberof IApiUILogicParams
   */
  event?: MouseEvent;

  /**
   * @description 是否不等待路由打开
   * @type {boolean}
   * @memberof IApiUILogicParams
   */
  noWaitRoute?: boolean;
}
