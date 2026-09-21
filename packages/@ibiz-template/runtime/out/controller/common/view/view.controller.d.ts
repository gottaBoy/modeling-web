import { IPortalMessage } from '@ibiz-template/core';
import { IAppView } from '@ibiz/model-core';
import { LoadingState } from '../../utils/loading/loading.state';
import { IViewController, IViewEvent, IViewLayoutPanelController, IControlProvider, IModal, IModalData, IUIActionResult, IUILogicParams, IViewEngine, IViewMessage, IRedrawData } from '../../../interface';
import { CTX } from '../../ctx';
import { ControllerEvent } from '../../utils';
import { BaseController } from '../base.controller';
import { IViewState } from '../../../interface/controller/state';
import { AppCounter } from '../../../service';
import { ViewLogicScheduler } from '../../../logic-scheduler';
import { ViewMsgController } from '../../utils/view-msg';
/**
 * 视图控制器
 *
 * @author chitanda
 * @date 2022-07-21 15:07:51
 * @export
 * @class ViewController
 */
export declare class ViewController<T extends IAppView = IAppView, S extends IViewState = IViewState, E extends IViewEvent = IViewEvent> extends BaseController<T, S, E> implements IViewController<T, S, E> {
    session: IData;
    modal: IModal;
    protected get _evt(): ControllerEvent<IViewEvent>;
    providers: {
        [key: string]: IControlProvider;
    };
    engines: IViewEngine[];
    error: IData;
    slotProps: {
        [key: string]: IData;
    };
    counters: {
        [key: string]: AppCounter;
    };
    /**
     * 视图loading状态控制器
     *
     * @author lxm
     * @date 2022-09-19 14:09:12
     */
    protected viewLoading: LoadingState;
    /**
     * 视图是否已经关闭
     *
     * @author chitanda
     * @date 2023-07-12 22:07:52
     * @protected
     * @type {boolean}
     */
    protected isCloseView: boolean;
    /**
     * 操作状态
     *
     * @author tony001
     * @date 2025-01-17 17:01:14
     * @protected
     * @type {('DEFAULT' | 'MANUAL')}
     */
    protected operateState: 'DEFAULT' | 'MANUAL';
    /**
     * 设置操作状态
     *
     * @author tony001
     * @date 2025-01-17 17:01:13
     * @param {('DEFAULT' | 'MANUAL')} state
     */
    setOperateState(state: 'DEFAULT' | 'MANUAL'): void;
    /**
     * 上层视图控制器
     * @author lxm
     * @date 2023-07-06 09:48:16
     * @readonly
     * @type {(IViewController | undefined)}
     */
    get parentView(): IViewController | undefined;
    /**
     * 当前是否为激活状态(缓存下的激活状态，一般与框架的生命周期相同)
     *
     * @author chitanda
     * @date 2023-12-13 11:12:48
     * @readonly
     * @type {boolean}
     */
    get isActive(): boolean;
    /**
     * 视图逻辑调度器
     * @author lxm
     * @date 2023-06-25 09:09:26
     * @type {ViewLogicScheduler}
     */
    scheduler?: ViewLogicScheduler;
    layoutPanel?: IViewLayoutPanelController;
    /**
     * 视图消息控制器
     * @author lxm
     * @date 2023-09-20 08:20:23
     * @type {ViewMsgController}
     */
    viewMsgController?: ViewMsgController;
    /**
     * Creates an instance of ViewController.
     * @author lxm
     * @date 2023-04-20 02:05:33
     * @param {T} model 视图模型
     * @param {IContext} context 上下文
     * @param {IParams} [params] 视图参数
     * @param {CTX} [ctx]
     */
    constructor(model: T, context: IContext, params?: IParams, ctx?: CTX);
    /**
     * 视图重新激活
     *
     * @author chitanda
     * @date 2023-07-12 17:07:55
     */
    onActivated(): void;
    /**
     * 视图暂时停用
     *
     * @author chitanda
     * @date 2023-07-12 17:07:06
     */
    onDeactivated(): void;
    /**
     * 初始化引擎
     * @author lxm
     * @date 2023-05-23 06:43:53
     * @protected
     */
    protected initEngines(): void;
    /**
     * 初始化计数器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 14:53:53
     */
    protected initCounters(): Promise<void>;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    protected onMounted(): Promise<void>;
    /**
     * 初始化最小化状态
     *
     * @protected
     * @memberof ViewController
     */
    protected initShortCut(): Promise<void>;
    protected onDestroyed(): Promise<void>;
    /**
     * 处理上下文和导航参数相关的，如自定义导航参数的处理
     *
     * @author lxm
     * @date 2022-09-08 15:09:47
     * @protected
     */
    handleContextParams(): void;
    call<A extends IData>(key: string, args?: A): Promise<any>;
    callUIAction(key: string, args?: Partial<IUILogicParams>): Promise<IUIActionResult | null>;
    closeView(modalData?: IModalData): Promise<void>;
    redrawView(redrawData: IRedrawData): void;
    startLoading(): void;
    endLoading(): void;
    /**
     * 设置布局面板控制器
     * @author lxm
     * @date 2023-08-01 03:28:04
     * @param {IViewLayoutPanelController} panel
     */
    setLayoutPanel(panel: IViewLayoutPanelController): void;
    /**
     * 初始化视图消息
     * @author lxm
     * @date 2023-09-20 09:19:20
     */
    initViewMsg(): Promise<void>;
    /**
     * 弹出视图消息,一个接一个弹
     * @author lxm
     * @date 2023-09-20 10:17:42
     * @param {ViewMessage[]} messages
     * @return {*}  {Promise<void>}
     */
    alertViewMessage(messages: IViewMessage[]): Promise<void>;
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    protected convertMultipleLanguages(): void;
    /**
     * 处理视图错误
     *
     * @author tony001
     * @date 2024-04-28 12:04:27
     * @protected
     * @param {IPortalMessage} msg
     */
    protected handleViewError(msg: IPortalMessage): void;
}
//# sourceMappingURL=view.controller.d.ts.map