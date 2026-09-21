/// <reference types="node" />
import { IControl, IControlLogic, ICtrlMsgItem, IViewLayoutPanel } from '@ibiz/model-core';
import { IBizParams, IPortalMessage } from '@ibiz-template/core';
import { BaseController } from '..';
import { CTX } from '../../ctx';
import { EventBase, IControlController, IControlEvent, IControlState, IViewController, IViewLayoutPanelController } from '../../../interface/controller';
import { ControllerEvent } from '../../utils';
import { IDataAbilityParams, IProvider } from '../../../interface';
import { ControlLogicScheduler } from '../../../logic-scheduler';
export type DEDataChangeType = 'create' | 'update' | 'remove';
/**
 * 部件控制器
 *
 * @author chitanda
 * @date 2022-07-21 15:07:08
 * @export
 * @class ControlController
 */
export declare class ControlController<T extends IControl = IControl, S extends IControlState = IControlState, E extends IControlEvent = IControlEvent> extends BaseController<T, S, E> implements IControlController<T, S, E> {
    protected get _evt(): ControllerEvent<IControlEvent>;
    get view(): IViewController;
    get ctrlId(): string;
    /**
     * 部件逻辑调度器
     * @author lxm
     * @date 2023-06-25 09:09:26
     * @type {ControlLogicScheduler}
     */
    scheduler?: ControlLogicScheduler;
    /**
     * 部件布局面板模型
     * @author lxm
     * @date 2023-07-19 03:45:45
     * @type {IPanel}
     */
    controlPanel?: IViewLayoutPanel;
    layoutPanel?: IViewLayoutPanelController;
    /**
     * 部件参数
     *
     * @author zk
     * @date 2023-09-26 03:09:21
     * @type {IData}
     * @memberof ControlController
     */
    controlParams: IData;
    /**
     * 子适配器
     * @author lxm
     * @date 2023-07-19 04:14:50
     * @type {{ [key: string]: IProvider }}
     */
    providers: {
        [key: string]: IProvider;
    };
    params: IBizParams;
    /**
     * 触发源key
     *
     * @author tony001
     * @date 2024-03-28 17:03:03
     * @type {string}
     */
    triggerKey: string;
    /**
     * 等到激活的回调函数集合
     *
     * @author tony001
     * @date 2024-03-28 17:03:15
     */
    awaitActiveCbs: Map<string, () => void>;
    /**
     * 延迟执行（防抖用）
     *
     * @author tony001
     * @date 2024-03-28 17:03:27
     */
    delayCbs: Map<string, NodeJS.Timeout>;
    /**
     * 运行模式
     *
     * @type {('DESIGN' | 'RUNTIME')} （设计模式 | 运行时）
     * @memberof ControlController
     */
    runMode: 'DESIGN' | 'RUNTIME';
    /**
     * Creates an instance of ControlController.
     *
     * @author chitanda
     * @date 2022-07-24 17:07:58
     * @param {T} model
     * @param {IContext} context
     * @param {IParams} [params={}]
     */
    constructor(model: T, context: IContext, params: IParams, ctx: CTX);
    /**
     * 往ctx里注册控制器
     * @author lxm
     * @date 2023-07-31 08:37:17
     * @protected
     */
    protected registerToCtx(): void;
    /**
     * 获取部件通用的事件参数
     * @author lxm
     * @date 2023-03-26 11:42:21
     * @readonly
     */
    getEventArgs(): Omit<EventBase, 'eventName'>;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    protected onMounted(): Promise<void>;
    protected onDestroyed(): Promise<void>;
    /**
     * 处理上下文和导航参数相关的，如自定义导航参数的处理
     *
     * @author lxm
     * @date 2022-09-08 15:09:47
     * @protected
     */
    updateContextParams(opts: {
        context?: IContext;
        params?: IParams;
    }): void;
    /**
     * 获取部件类型
     * @author lxm
     * @date 2023-03-28 02:23:37
     * @return {*}  {string}
     */
    getControlType(): string;
    /**
     * 获取部件数据，非数据部件没有数据
     * @author lxm
     * @date 2023-03-26 11:41:51
     * @return {*}  {(IData[] | null)}
     */
    getData(): IData[] | null;
    /**
     * 开始加载
     *
     * @author chitanda
     * @date 2022-09-21 15:09:18
     * @return {*}  {Promise<void>}
     */
    startLoading(): Promise<void>;
    /**
     * 加载完毕
     *
     * @author chitanda
     * @date 2022-09-21 15:09:31
     * @return {*}  {Promise<void>}
     */
    endLoading(): Promise<void>;
    /**
     * 部件重新激活
     *
     * @author chitanda
     * @date 2023-07-12 17:07:55
     */
    onActivated(): void;
    /**
     * 部件暂时停用
     *
     * @author chitanda
     * @date 2023-07-12 17:07:06
     */
    onDeactivated(): void;
    /**
     * 处理数据能力方法通用参数，返回能力执行最终使用的参数
     * @author lxm
     * @date 2023-05-23 03:12:47
     * @protected
     * @param {IDataAbilityParams} [args]
     * @return {*}
     */
    protected handlerAbilityParams(args?: IDataAbilityParams): {
        context: IContext;
        params: IParams;
        data: IData[];
    };
    /**
     * 设置布局面板控制器
     * @author lxm
     * @date 2023-08-01 03:28:17
     * @param {IViewLayoutPanelController} panel
     */
    setLayoutPanel(panel: IViewLayoutPanelController): void;
    /**
     * 部件参数解析
     *
     * @author zk
     * @date 2023-09-27 07:09:08
     * @protected
     * @memberof ControlController
     */
    protected handleControlParams(): void;
    /**
     * 初始化部件逻辑调度器
     * @author lxm
     * @date 2023-08-21 11:53:37
     * @param {IControlLogic[]} logics
     * @return {*}  {void}
     */
    protected initControlScheduler(logics?: IControlLogic[]): void;
    /**
     * 获取指定标识部件消息
     *
     * @author tony001
     * @date 2024-05-29 17:05:52
     * @protected
     * @param {string} tag
     * @return {*}  {(ICtrlMsgItem | undefined)}
     */
    protected findCtrlMsgByTag(tag: string): ICtrlMsgItem | undefined;
    /**
     * 执行对应部件行为消息提示
     * @author lxm
     * @date 2023-09-07 04:51:21
     * @param {string} tag
     * @param {({ default?: string; data?: IData | IData[]; error?: Error })} [opts]
     * @return {*}  {void}
     */
    actionNotification(tag: string, opts?: {
        default?: string;
        data?: IData | IData[];
        error?: Error;
    }): void;
    /**
     * 监听实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:33
     * @protected
     * @param {IPortalMessage} msg
     */
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * 触发实体数据变更的通知
     *
     * @author tony001
     * @date 2024-03-28 18:03:44
     * @param {('create' | 'update' | 'remove')} type
     * @param {IData} data
     */
    emitDEDataChange(type: 'create' | 'update' | 'remove', data: IData): void;
    /**
     * 如果当前视图没有激活，则等待激活后执行回调函数
     * - 在执行之前key相同的会替换
     * 如果当前视图已经激活，则立即执行回调函数
     * - delay参数指定延迟执行时间,可以防抖
     *
     * @author tony001
     * @date 2024-03-28 18:03:00
     * @param {() => void} cb
     * @param {{ key: string; delay?: number }} opts
     */
    doNextActive(cb: () => void, opts: {
        key: string;
        delay?: number;
    }): void;
}
//# sourceMappingURL=control.controller.d.ts.map