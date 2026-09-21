import { IPanelDataContainerController, IPanelItemProvider, IViewController, PanelContainerController, PanelNotifyState } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { MultiDataContainerItemController } from './multi-data-container-item.controller';
import { MultiDataContainerState } from './multi-data-container.state';
/**
 * 多项数据容器控制器
 *
 * @export
 * @class MultiDataContainerController
 * @extends {PanelContainerController}
 */
export declare class MultiDataContainerController extends PanelContainerController<IPanelContainer> implements IPanelDataContainerController {
    /**
     * @description 数据容器控制器状态
     * @exposedoc
     * @type {MultiDataContainerState}
     * @memberof MultiDataContainerController
     */
    state: MultiDataContainerState;
    /**
     * @description 是否为数据容器
     * @exposedoc
     * @memberof MultiDataContainerController
     */
    readonly isDataContainer = true;
    /**
     * @description 数据项的控制器
     * @exposedoc
     * @type {MultiDataContainerItemController[]}
     */
    dataItems: MultiDataContainerItemController[];
    /**
     * @description 所有面板成员的适配器
     * @type {{ [key: string]: IPanelItemProvider }}
     */
    providers: {
        [key: string]: IPanelItemProvider;
    };
    /**
     * @description 多项数据容器，根据数据模式
     * @exposedoc
     * @readonly
     * @type {IData}
     */
    get data(): IData[];
    protected createState(): MultiDataContainerState;
    protected onInit(): Promise<void>;
    /**
     * 面板状态变更通知
     * @param {PanelNotifyState} _state
     * @return {*}  {Promise<void>}
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     * 初始化面板成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initPanelItemProviders(panelItems?: IPanelItem[] | undefined): Promise<void>;
    /**
     * 计算导航参数
     *
     * @author tony001
     * @date 2024-07-30 18:07:36
     * @protected
     * @return {*}  {IData}
     */
    protected computeNavParams(): IData;
    /**
     * 根据来源类型初始化容器数据
     * @author lxm
     * @date 2023-08-04 03:05:59
     * @protected
     */
    protected initContainerData(): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    childrenStateNotify(state: PanelNotifyState): void;
    /**
     * 值校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof MultiDataContainerController
     */
    validate(): Promise<boolean>;
    /**
     * @description 设置数据集合
     * @exposedoc
     * @author lxm
     * @date 2023-09-05 05:42:09
     * @param {IData[]} items
     */
    setData(items: IData[]): Promise<void>;
    /**
     * 通过实体设置视图逻辑
     * @author lxm
     * @date 2023-08-04 03:00:31
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected setDataByDeLogic(): Promise<void>;
    /**
     * 设置全局变量为当前容器数据
     * @author lxm
     * @date 2023-08-04 01:55:07
     * @protected
     */
    protected setDataByAppGlobalParam(): void;
    /**
     * 请求实体行为并把返回值设置为当前容器的数据
     * @author lxm
     * @date 2023-08-04 11:47:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected setDataByDeMethod(): Promise<void>;
    /**
     * 绑定指定视图会话的变量
     * @author lxm
     * @date 2023-07-14 02:03:56
     * @protected
     * @param {IViewController} view 绑定视图控制器
     * @param {string} dataName 变量名称
     */
    protected bindViewData(view: IViewController, dataName: string): void;
    setDataValue(_name: string, _value: unknown): Promise<void>;
    /**
     * @description 销毁
     * @memberof MultiDataContainerController
     */
    destroy(): void;
}
//# sourceMappingURL=multi-data-container.controller.d.ts.map