import { IDBPortletPart, IUIActionGroupDetail } from '@ibiz/model-core';
import { IController, DataChangeEvent, IPortletController, IDashboardController, IPortletContainerController } from '../../../../../interface';
import { PortletPartState } from './portlet-part.state';
/**
 * 门户部件控制器基类
 *
 * @author lxm
 * @date 2022-10-20 20:10:25
 * @export
 * @class PortletPartController
 * @template T
 */
export declare class PortletPartController<T extends IDBPortletPart = IDBPortletPart> implements IPortletController {
    readonly model: T;
    /**
     * 门户部件状态
     *
     * @type {PortletPartState}
     * @memberof PortletPartController
     */
    state: PortletPartState;
    /**
     * 数据看板控制器
     *
     * @author lxm
     * @date 2022-10-21 03:10:04
     * @type {IDashboardController}
     */
    readonly dashboard: IDashboardController;
    /**
     * 父容器控制器，最上级的没有
     *
     * @author lxm
     * @date 2022-10-21 03:10:05
     * @type {ContainerPortletController}
     */
    readonly parent?: IPortletContainerController;
    /**
     * 门户部件的上下文参数
     *
     * @author lxm
     * @date 2022-10-23 16:10:50
     * @readonly
     * @type {IContext}
     */
    get context(): IContext;
    /**
     * 门户部件的视图参数
     *
     * @author lxm
     * @date 2022-10-23 16:10:21
     * @type {IParams}
     */
    params: IParams;
    /**
     * 门户配置
     *
     * @type {IData}
     * @memberof PortletPartController
     */
    config: IData;
    /**
     * 获取容器类名集合
     * @author lxm
     * @date 2023-08-02 06:06:12
     * @readonly
     * @type {string[]}
     */
    get containerClass(): string[];
    /**
     * 内容控制器
     * @author zzq
     * @readonly
     * @type {IController | undefined}
     * @memberof PortletPartController
     */
    get contentController(): IController | undefined;
    /**
     * @description 内容元素
     * @readonly
     * @type {(HTMLDivElement | null)}
     * @memberof PortletPartController
     */
    get contentElement(): HTMLDivElement | null;
    /**
     * Creates an instance of PortletPartController.
     * @author lxm
     * @date 2022-10-21 10:10:44
     * @param {T} model
     * @param {DashboardController} dashboard 数据看板控制器
     * @param {IPortletContainerController} [parent] 父容器控制器，最上级不存在
     */
    constructor(model: T, dashboard: IDashboardController, parent?: IPortletContainerController);
    /**
     * 计算视图参数
     *
     * @author tony001
     * @date 2024-07-28 11:07:16
     * @return {*}  {IBizParams}
     */
    getExtendParams(): IParams | undefined;
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-07-26 21:07:05
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * 创建门户控件的状态对象
     *
     * @protected
     * @returns {*}  {PortletPartState}
     * @memberof PortletPartController
     */
    protected createState(): PortletPartState;
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:02
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 高亮
     *
     * @author zzq
     * @date 2024-07-29 18:07:02
     * @return {*}  {void}
     */
    hightLight(): void;
    /**
     * 设置配置数据
     *
     * @param {IData} config
     * @memberof PortletPartController
     */
    setConfig(config: IData): Promise<void>;
    /**
     * 重置自定义配置
     *
     * @memberof PortletPartController
     */
    resetConfig(): void;
    /**
     * 数据改变方法
     * @param {DataChangeEvent} event
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-22 17:39:44
     */
    onDataChange(event: DataChangeEvent): void;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof PortletPartController
     */
    protected initUIActions(): Promise<void>;
    /**
     * 初始化标题右侧界面行为按钮的状态
     *
     * @author chitanda
     * @date 2023-08-02 17:08:04
     * @return {*}  {Promise<void>}
     */
    initActionStates(): Promise<void>;
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent, data?: IData[]): Promise<void>;
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    dataChangeNotify(data: IData): Promise<void>;
    /**
     * 计算动态样式表
     * @author lxm
     * @date 2023-08-02 06:15:08
     * @param {IData} data
     */
    protected calcDynaClass(data: IData): void;
    /**
     * 销毁
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    destroyed(): Promise<void>;
}
//# sourceMappingURL=portlet-part.controller.d.ts.map