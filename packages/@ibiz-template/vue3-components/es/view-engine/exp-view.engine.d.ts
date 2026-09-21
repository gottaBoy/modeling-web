import { ViewController, IExpBarControlController, IExpViewState, IExpViewEvent, MDViewEngine, IMDControlController, EventBase, MDCtrlLoadParams, IViewController } from '@ibiz-template/runtime';
import { IAppDEExplorerView, IAppDEMultiDataView } from '@ibiz/model-core';
type IAppDEMultiDataExpView = IAppDEExplorerView & IAppDEMultiDataView;
/**
 * 导航视图引擎基类
 *
 * @author zk
 * @date 2023-05-30 06:05:44
 * @export
 * @class ExpViewEngine
 * @extends {ViewEngineBase}
 */
export declare class ExpViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEMultiDataExpView, IExpViewState, IExpViewEvent>;
    /**
     * 导航栏部件名称
     *
     * @author zk
     * @date 2023-05-30 06:05:34
     * @readonly
     * @type {string}
     * @memberof ExpViewEngine
     */
    get expBarName(): string;
    /**
     * 表格导航栏部件控制器
     *
     * @author zk
     * @date 2023-05-29 04:05:32
     * @readonly
     * @memberof GridExpViewEngine
     */
    get expBar(): IExpBarControlController;
    /**
     * 数据部件控制器（多数据）
     * @author lxm
     * @date 2023-05-22 01:56:35
     * @readonly
     * @type {IMDControlController}
     */
    protected get xdataControl(): IMDControlController;
    constructor(view: IViewController);
    /**
     * 组件创建
     *
     * @author zk
     * @date 2023-05-29 04:05:56
     * @memberof GridExpViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 修改导航容器的模型（适配导航栏上配置的高宽）
     * @author lxm
     * @date 2023-08-31 03:35:44
     * @protected
     */
    protected modifySplitContainer(): void;
    protected onXDataActive(_event: EventBase): Promise<void>;
    protected getSearchParams(): IParams;
    protected load(_args?: MDCtrlLoadParams): Promise<void>;
}
export {};
