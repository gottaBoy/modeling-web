import { IControl } from '@ibiz/model-core';
import { EventBase, IControlEvent } from '../../event';
import { IControlState } from '../../state';
import { IController } from '../i.controller';
import { IViewController } from '../view/i-view.controller';
import { IViewLayoutPanelController } from './i-view-layout-panel.controller';
import { ControlLogicScheduler } from '../../../../logic-scheduler';
/**
 * 部件控制器
 * @author lxm
 * @date 2023-05-04 01:44:18
 * @export
 * @interface IControlController
 * @extends {IController}
 */
export interface IControlController<T extends IControl = IControl, S extends IControlState = IControlState, E extends IControlEvent = IControlEvent> extends IController<T, S, E> {
    /**
     * 当前上下文环境的视图控制器
     * @author lxm
     * @date 2023-05-09 11:14:53
     * @type {IViewController}
     */
    view: IViewController;
    /**
     * 部件标识
     *
     * @author tony001
     * @date 2024-07-15 13:07:49
     * @type {string}
     */
    ctrlId: string;
    /**
     * 部件参数
     *
     * @author tony001
     * @date 2024-07-23 22:07:34
     * @type {IParams}
     */
    controlParams: IParams;
    /**
     * 部件布局面板控制器
     * @author lxm
     * @date 2023-07-31 08:54:08
     * @type {IViewLayoutPanelController}
     */
    layoutPanel?: IViewLayoutPanelController;
    /**
     * 部件逻辑调度器
     *
     * @author chitanda
     * @date 2023-11-11 10:11:16
     * @type {ControlLogicScheduler}
     */
    scheduler?: ControlLogicScheduler;
    /**
     * 运行模式
     *
     * @type {('DESIGN' | 'RUNTIME')} （设计模式 | 运行时）
     * @memberof IControlController
     */
    runMode: 'DESIGN' | 'RUNTIME';
    /**
     * 开始加载
     *
     * @author lxm
     * @date 2022-09-19 14:09:00
     */
    startLoading(): Promise<void>;
    /**
     * 加载完毕
     *
     * @author lxm
     * @date 2022-09-19 14:09:09
     */
    endLoading(): Promise<void>;
    /**
     * 部件激活，主要用于用户可见时设置为激活状态
     *
     * @author chitanda
     * @date 2023-12-13 11:12:04
     */
    onActivated(): void;
    /**
     * 部件暂停激活，主要用于用户不可见时设置为非激活状态
     *
     * @author chitanda
     * @date 2023-12-13 11:12:06
     */
    onDeactivated(): void;
    /**
     * 在不改变引用的前提下，更新上下文和导航参数
     * 并处理如自定义导航参数的后续处理
     * @author lxm
     * @date 2023-10-27 01:47:59
     * @param {{ context?: IContext; params?: IParams }} opts
     */
    updateContextParams(opts: {
        context?: IContext;
        params?: IParams;
    }): void;
    /**
     *  获取部件通用的事件参数
     * @author lxm
     * @date 2024-03-20 01:58:32
     * @return {*}  {Omit<EventBase, 'eventName'>}
     */
    getEventArgs(): Omit<EventBase, 'eventName'>;
    /**
     * 如果当前部件没有激活，则等待激活后执行回调函数
     * - 在执行之前key相同的会替换
     * 如果当前视图已经激活，则立即执行回调函数
     * - delay参数指定延迟执行时间,可以防抖
     *
     * @author tony001
     * @date 2024-03-29 17:03:28
     * @param {() => void} cb
     * @param {{ key: string; delay?: number }} opts
     */
    doNextActive(cb: () => void, opts: {
        key: string;
        delay?: number;
    }): void;
}
//# sourceMappingURL=i-control.controller.d.ts.map