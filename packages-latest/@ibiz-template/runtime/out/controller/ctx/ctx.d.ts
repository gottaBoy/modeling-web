import { QXEvent } from 'qx-util';
import { IController, IViewController } from '../../interface/controller';
import { CTXState } from './ctx.state';
import { IApiCtx } from '../../interface';
type CTXEvent = {
    /**
     * 预报有一个控制器将注册进来
     * @author lxm
     * @date 2023-04-26 08:53:33
     */
    onForecast: (name: string) => void;
    /**
     * 控制器实际注册进上下文。
     * @author lxm
     * @date 2023-04-26 08:54:05
     */
    onRegister: (name: string, c: IController) => void;
};
/**
 * 上下文环境对象
 * @author lxm
 * @date 2023-03-27 01:43:36
 * @export
 * @class CTX
 * @implements {IApiCtx}
 */
export declare class CTX<V extends IViewController = IViewController> implements IApiCtx {
    parent?: CTX<IViewController<import("@ibiz/model-core").IAppView, import("../../interface").IViewState, import("../../interface").IViewEvent>> | undefined;
    /**
     * 上下文环境状态
     * @author lxm
     * @date 2023-03-27 01:43:31
     * @type {CTXState}
     */
    state: CTXState;
    /**
     * 当前视图的控制器
     * @author lxm
     * @date 2023-03-27 01:54:28
     * @type {V}
     */
    view: V;
    /**
     * 是否已经销毁
     *
     * @author chitanda
     * @date 2023-09-11 11:09:57
     * @public
     */
    isDestroyed: boolean;
    /**
     * CTX事件
     * @author lxm
     * @date 2023-04-26 07:54:46
     * @protected
     */
    readonly evt: QXEvent<CTXEvent>;
    /**
     * 当前视图控制器集合（包含自身视图控制器，部件控制器，和下一层级的视图的控制器）
     * @author lxm
     * @date 2023-03-28 02:25:59
     * @protected
     */
    protected controllersMap: Map<string, IController<import("@ibiz/model-core").IModelObject, object, import("../../interface").IComponentEvent>>;
    /**
     * Creates an instance of CTX.
     * @author lxm
     * @date 2023-07-06 09:43:47
     * @param {CTX} [parent] 父级上下文环境对象
     */
    constructor(parent?: CTX<IViewController<import("@ibiz/model-core").IAppView, import("../../interface").IViewState, import("../../interface").IViewEvent>> | undefined);
    /**
     * 初始化上下文环境对象
     * @author lxm
     * @date 2023-03-27 01:54:18
     * @param {V} controller 当前视图的控制器
     * @return {*}  {Promise<void>}
     */
    init(controller: V): Promise<void>;
    /**
     * 销毁ctx
     * @author lxm
     * @date 2023-03-28 02:29:45
     */
    destroy(): void;
    /**
     * 修改上下文环境状态
     * @author lxm
     * @date 2023-03-27 01:50:38
     * @param {Required<CTXState>} nextState
     * @return {*}  {Promise<void>}
     */
    setState(nextState: Required<CTXState>): Promise<void>;
    /**
     * 开启视图加载
     * @author lxm
     * @date 2023-03-27 01:59:22
     */
    startLoading(loadingText?: string): void;
    /**
     * 关闭视图加载
     * @author lxm
     * @date 2023-03-27 01:59:35
     */
    endLoading(): void;
    /**
     * 注册控制器到上下文里
     * @author lxm
     * @date 2023-03-28 02:26:46
     * @param {string} name
     * @param {IController} c
     */
    registerController(name: string, c: IController): void;
    /**
     * 获取指定名称的控制器
     * @author lxm
     * @date 2023-04-25 10:14:42
     * @param {string} name
     * @param {boolean} [traceRoot=false] 是否跨越视图作用域，一路向根上找。
     * @return {*}  {(IController | undefined)}
     */
    getController(name: string, traceRoot?: boolean): IController | undefined;
    /**
     * 获取顶级视图，
     * - 模态等打开方式是根ctx的视图
     * - 路由模式是首页下一级的视图，即第二级路由的视图
     * @author lxm
     * @date 2023-07-14 11:59:30
     * @return {*}  {IViewController}
     */
    getTopView(): IViewController;
}
export {};
//# sourceMappingURL=ctx.d.ts.map