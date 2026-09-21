import { IExpBar, IDEList, IDEGrid, IDEDataView, INavigatable } from '@ibiz/model-core';
import { LoadEvent, EventBase, INavViewMsg, IToolbarController, IExpBarControlState, IExpBarControlEvent, IMDControlController, IExpBarControlController, IViewLayoutPanelController } from '../../../interface';
import { ControlController } from '../../common';
import { ControllerEvent } from '../../utils';
import { CTX } from '../../ctx';
type XDataControlModel = IDEGrid | IDEList | IDEDataView;
/**
 * 导航部件控制器
 *
 * @author zk
 * @date 2023-05-29 04:05:46
 * @export
 * @class ExpBarControlController
 * @extends {ControlController<T, S, E>}
 * @implements {IExpBarControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export declare class ExpBarControlController<T extends IExpBar = IExpBar, S extends IExpBarControlState = IExpBarControlState, E extends IExpBarControlEvent = IExpBarControlEvent> extends ControlController<T, S, E> implements IExpBarControlController<T, S, E> {
    protected get _evt(): ControllerEvent<IExpBarControlEvent>;
    /**
     * 当前路由视图的层级
     *
     * @author zk
     * @date 2023-07-11 10:07:20
     * @readonly
     * @type {(number | undefined)}
     * @memberof ExpBarControlController
     */
    get routeDepth(): number | undefined;
    /**
     * @description 快速搜索提示分隔符
     * @readonly
     * @type {string}
     * @memberof ExpBarControlController
     */
    get searchPhSeparator(): string;
    /**
     * 多数据部件类型
     *
     * @author zk
     * @date 2023-05-29 08:05:30
     * @type {string}
     * @memberof ExpBarControlController
     */
    xDataType: string;
    /**
     * 导航栏key名称 默认srfkey 多导航视图类 由子类重写
     *
     * @author zk
     * @date 2023-07-10 03:07:53
     * @memberof ExpBarControlController
     */
    navKeyName: string;
    /**
     * 导航栈
     * - 缓存用户操作过程中已激活的导航数据
     * @type {IData[]}
     * @memberof ExpBarControlController
     */
    navStack: IData[];
    constructor(model: T, context: IContext, params: IParams, ctx: CTX);
    protected initState(): void;
    /**
     * 加载
     *
     * @author zk
     * @date 2023-05-29 05:05:17
     * @return {*}  {Promise<IData[]>}
     * @memberof ExpBarControlController
     */
    load(): Promise<IData[]>;
    /**
     * 多数据部件控制器
     *
     * @author zk
     * @date 2023-05-29 03:05:07
     * @readonly
     * @type {IGridController}
     * @memberof ExpBarControlController
     */
    get xDataController(): IMDControlController | undefined;
    /**
     * 工具栏
     * @author lxm
     * @date 2023-07-31 07:01:25
     * @readonly
     * @type {(IToolbarController | undefined)}
     */
    get toolbarController(): IToolbarController | undefined;
    /**
     * 多数据部件模型
     *
     * @author zk
     * @date 2023-05-29 03:05:15
     * @readonly
     * @type {(IDEGrid | null)}
     * @memberof ExpBarControlController
     */
    get XDataModel(): XDataControlModel | undefined;
    /**
     * 是否缓存
     *
     * @author zk
     * @date 2023-09-27 09:09:59
     * @readonly
     * @type {boolean}
     * @memberof ExpBarControlController
     */
    get isCache(): boolean;
    /**
     * 创建完成
     *
     * @author zk
     * @date 2023-05-29 10:05:22
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ExpBarControlController
     */
    protected onCreated(): Promise<void>;
    /**
     * 组件挂载
     *
     * @author zk
     * @date 2023-05-29 09:05:55
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ExpBarControlController
     */
    protected onMounted(): Promise<void>;
    /**
     * 多数据部件加载成功 设置默认选中
     *
     * @author zk
     * @date 2023-05-30 04:05:40
     * @memberof ExpBarControlController
     */
    xDataLoadSuccess(event: LoadEvent): void;
    /**
     * 默认通过路由上的srfnav导航
     * @author lxm
     * @date 2023-08-10 04:04:08
     * @public
     */
    navBySrfnav(): void;
    /**
     * 导航页面首次打开且没有回显时，
     * 默认取第一条数据进行导航
     * 对于不同的导航，第一条可导航的数据可能定义不同，可以重写改方法。
     * @author lxm
     * @date 2023-08-10 03:58:15
     * @public
     */
    navByFirstItem(): void;
    /**
     * @description 清空导航
     * @public
     * @memberof ExpBarControlController
     */
    clearNavigation(): void;
    /**
     * 根据栈数据导航数据
     *
     * @memberof ExpBarControlController
     */
    navDataByStack(): void;
    /**
     * 多数据激活
     *
     * @author zk
     * @date 2023-05-29 03:05:36
     * @param {IData} data
     * @memberof ExpBarControlController
     */
    xDataActive(event: EventBase): void;
    /**
     * 解析参数
     *
     * @author zk
     * @date 2023-05-29 04:05:52
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}
     * @memberof ExpBarControlController
     */
    prepareParams(XDataModel: INavigatable & {
        appDataEntityId?: string;
    }, data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 计算导航视图
     *
     * @author zk
     * @date 2023-05-30 03:05:19
     * @return {*}  {Promise<IAppView>}
     * @memberof ExpBarControlController
     */
    calcViewModelId(): string | undefined;
    /**
     * 获取导航视图
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(data: IData, context: IContext, params: IParams): INavViewMsg;
    /**
     * 是否显示部件头部
     * @author lxm
     * @date 2023-08-02 07:54:18
     * @protected
     * @return {*}  {boolean}
     */
    protected calcControlHeaderVisible(): boolean;
    setLayoutPanel(panel: IViewLayoutPanelController): void;
    /**
     * 路由变更处理回调
     * @author lxm
     * @date 2023-09-14 07:03:39
     * @param {{ srfnav?: string; path: string }} info 当前系统的路由的从一级到最后一级的所有路径。
     */
    onRouterChange(info: {
        srfnav: string;
        path: string;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=exp-bar.controller.d.ts.map