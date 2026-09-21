import { IPanelController, IPanelDataContainerController, IPanelItemContainerController, IPanelItemController, IPanelItemProvider, IViewController, PanelContainerController, PanelNotifyState } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { MultiDataContainerRawState } from './multi-data-container-raw.state';
/**
 * 多项数据容器控制器
 *
 * @export
 * @class MultiDataContainerRawController
 * @extends {PanelContainerController}
 */
export declare class MultiDataContainerRawController extends PanelContainerController<IPanelContainer> implements IPanelDataContainerController {
    /**
     * @description 多项数据容器控制器状态
     * @exposedoc
     * @type {MultiDataContainerRawState}
     * @memberof MultiDataContainerRawController
     */
    state: MultiDataContainerRawState;
    /**
     * @description 是否为数据容器
     * @exposedoc
     * @memberof MultiDataContainerRawController
     */
    readonly isDataContainer = true;
    /**
     * @description 面板子项的控制器
     * @exposedoc
     * @type {{ [key: string]: IPanelItemController }}
     * @memberof MultiDataContainerRawController
     */
    panelItems: {
        [key: string]: IPanelItemController;
    };
    /**
     * @description 所有面板成员的适配器
     * @type {{ [key: string]: IPanelItemProvider }}
     * @memberof MultiDataContainerRawController
     */
    providers: {
        [key: string]: IPanelItemProvider;
    };
    /**
     * @description 多项数据容器，根据数据模式
     * @exposedoc
     * @readonly
     * @type {IData}
     * @memberof MultiDataContainerRawController
     */
    get data(): IData;
    protected createState(): MultiDataContainerRawState;
    protected onInit(): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @param {PanelNotifyState} _state
     * @return {*}  {Promise<void>}
     * @memberof MultiDataContainerRawController
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     *  初始化面板子项控制器
     *
     * @protected
     * @param {(IPanelItem[] | undefined)} [panelItems=this.model.panelItems]
     * @param {IPanelController} [panel=this.panel]
     * @param {(IPanelItemContainerController | undefined)} [parent=this]
     * @return {*}  {Promise<void>}
     * @memberof MultiDataContainerRawController
     */
    protected initPanelItemControllers(panelItems?: IPanelItem[] | undefined, panel?: IPanelController, parent?: IPanelItemContainerController | undefined): Promise<void>;
    /**
     * 计算导航参数
     *
     * @protected
     * @return {*}  {IData}
     * @memberof MultiDataContainerRawController
     */
    protected computeNavParams(): IData;
    /**
     * 根据来源类型初始化容器数据
     *
     * @protected
     * @memberof MultiDataContainerRawController
     */
    protected initContainerData(): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @param {PanelNotifyState} state
     * @memberof MultiDataContainerRawController
     */
    childrenStateNotify(state: PanelNotifyState): void;
    /**
     * @description 设置数据集合
     * @exposedoc
     * @param {IData[]} items
     * @return {*}  {Promise<void>}
     * @memberof MultiDataContainerRawController
     */
    setData(items: IData[]): Promise<void>;
    /**
     * 通过实体设置视图逻辑
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof MultiDataContainerRawController
     */
    protected setDataByDeLogic(): Promise<void>;
    /**
     * 设置全局变量为当前容器数据
     *
     * @protected
     * @memberof MultiDataContainerRawController
     */
    protected setDataByAppGlobalParam(): void;
    /**
     * 请求实体行为并把返回值设置为当前容器的数据
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof MultiDataContainerRawController
     */
    protected setDataByDeMethod(): Promise<void>;
    /**
     * 绑定指定视图会话的变量
     *
     * @protected
     * @param {IViewController} view 绑定视图控制器
     * @param {string} dataName 变量名称
     * @return {*}  {void}
     * @memberof MultiDataContainerRawController
     */
    protected bindViewData(view: IViewController, dataName: string): void;
    setDataValue(_name: string, _value: unknown): Promise<void>;
    /**
     * @description 销毁
     * @memberof MultiDataContainerRawController
     */
    destroy(): void;
}
//# sourceMappingURL=multi-data-container-raw.controller.d.ts.map