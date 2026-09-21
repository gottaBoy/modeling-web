import { IAppView } from '@ibiz/model-core';
import {
  IApiViewController,
  IControlProvider,
  IModal,
  IUIActionResult,
  IUILogicParams,
  IViewEngine,
  IViewEvent,
} from '../../..';
import {
  ControllerEvent,
  ViewMsgController,
} from '../../../../controller/utils';
import { AppCounter } from '../../../../service';
import { IViewState } from '../../state';
import { IController } from '../i.controller';

/**
 * @description 视图控制器接口
 * @export
 * @interface IViewController
 * @extends {IController<T, S, E>}
 * @extends {IApiViewController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IViewController<
  T extends IAppView = IAppView,
  S extends IViewState = IViewState,
  E extends IViewEvent = IViewEvent,
> extends IController<T, S, E>,
    IApiViewController<T, S> {
  evt: ControllerEvent<E>;

  /**
   * @description 视图呈现模式
   * @type {IModal}
   * @memberof IViewController
   */
  modal: IModal;

  /**
   * @description 插槽额外的输入props,用来给对应插槽绘制补充额外的输入参数
   * @type {{ [key: string]: IData }}
   * @memberof IViewController
   */
  slotProps: { [key: string]: IData };

  /**
   * @description 所有部件的适配器
   * @type {{ [key: string]: IControlProvider }}
   * @memberof IViewController
   */
  providers: { [key: string]: IControlProvider };

  /**
   * @description 视图引擎集合
   * @type {IViewEngine[]}
   * @memberof IViewController
   */
  engines: IViewEngine[];

  /**
   * @description 计数器集合
   * @type {{ [key: string]: AppCounter }}
   * @memberof IViewController
   */
  counters: { [key: string]: AppCounter };

  /**
   * @description 视图消息控制器
   * @type {ViewMsgController}
   * @memberof IViewController
   */
  viewMsgController?: ViewMsgController;

  /**
   * @description 执行视图预置界面行为能力
   * @param {string} key 预置界面行为标识
   * @param {Partial<IUILogicParams>} [args] 预置界面行为需要的参数
   * @returns {*}  {(Promise<IUIActionResult | null>)}
   * @memberof IViewController
   */
  callUIAction(
    key: string,
    args?: Partial<IUILogicParams>,
  ): Promise<IUIActionResult | null>;

  /**
   * @description 计算并处理视图上下文和视图参数,已经渲染的视图会额外的触发视图刷新
   * @memberof IViewController
   */
  handleContextParams(): void;

  /**
   * @description 视图激活，主要用于用户可见时设置为激活状态
   * @memberof IViewController
   */
  onActivated(): void;

  /**
   * @description 视图暂停激活，主要用于用户不可见时设置为非激活状态
   * @memberof IViewController
   */
  onDeactivated(): void;

  /**
   * @description 初始化定时器监听用户活动
   * @memberof IViewController
   */
  initTimeoutTimer(): void;
}
