import { IControl, IViewLayoutPanel } from '@ibiz/model-core';
import { EventBase, IControlEvent } from '../../event';
import { IControlState } from '../../state';
import { IController } from '../i.controller';
import { ControlLogicScheduler } from '../../../../logic-scheduler';
import { IApiControlController } from '../../../api';
import { IViewController } from '../view';
import { IViewLayoutPanelController } from './i-view-layout-panel.controller';

/**
 * @description 部件控制器
 * @export
 * @interface IControlController
 * @extends {IController<T, S, E>}
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IControlController<
  T extends IControl = IControl,
  S extends IControlState = IControlState,
  E extends IControlEvent = IControlEvent,
> extends IController<T, S, E>,
    IApiControlController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IControlController
   */
  view: IViewController;

  /**
   * @description 部件逻辑调度器
   * @type {ControlLogicScheduler}
   * @memberof IControlController
   */
  scheduler?: ControlLogicScheduler;

  /**
   * @description 部件布局面板模型
   * @type {IViewLayoutPanel}
   * @memberof IControlController
   */
  controlPanel?: IViewLayoutPanel;

  /**
   * @description 触发源key
   * @type {string}
   * @memberof IControlController
   */
  triggerKey: string;

  /**
   * @description 部件激活，主要用于用户可见时设置为激活状态
   * @memberof IControlController
   */
  onActivated(): void;

  /**
   * @description 部件暂停激活，主要用于用户不可见时设置为非激活状态
   * @memberof IControlController
   */
  onDeactivated(): void;

  /**
   * @description 在不改变引用的前提下，更新上下文和导航参数,并处理如自定义导航参数的后续处理
   * @param {{ context?: IContext; params?: IParams }} opts
   * @memberof IControlController
   */
  updateContextParams(opts: { context?: IContext; params?: IParams }): void;

  /**
   * @description 获取部件通用的事件参数
   * @returns {*}  {Omit<EventBase, 'eventName'>}
   * @memberof IControlController
   */
  getEventArgs(): Omit<EventBase, 'eventName'>;

  /**
   * @description 如果当前部件没有激活，则等待激活后执行回调函数，在执行之前key相同的会替换，如果当前视图已经激活，则立即执行回调函数
   * @param {() => void} cb
   * @param {{ key: string; delay?: number }} opts delay参数指定延迟执行时间,可以防抖
   * @memberof IControlController
   */
  doNextActive(cb: () => void, opts: { key: string; delay?: number }): void;

  /**
   * @description 设置布局面板控制器
   * @param {IViewLayoutPanelController} panel
   * @memberof IControlController
   */
  setLayoutPanel(panel: IViewLayoutPanelController): void;
}
