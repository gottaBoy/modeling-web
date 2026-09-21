import { IPanelController, IPanelDataContainerController, IPanelItemContainerController, IPanelItemController, IPanelItemProvider, IViewController, PanelContainerController, PanelNotifyState } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { SingleDataContainerState } from './single-data-container.state';
/**
 * @description 单项数据容器控制器
 * @export
 * @class SingleDataContainerController
 * @extends {PanelContainerController<IPanelContainer>}
 * @implements {IPanelDataContainerController}
 */
export declare class SingleDataContainerController extends PanelContainerController<IPanelContainer> implements IPanelDataContainerController {
    /**
     * @description 单项数据容器状态
     * @exposedoc
     * @type {SingleDataContainerState}
     * @memberof SingleDataContainerController
     */
    state: SingleDataContainerState;
    /**
     * @description 是否是数据父容器
     * @exposedoc
     * @memberof SingleDataContainerController
     */
    readonly isDataContainer = true;
    /**
     * @description 所有面板成员的控制器
     * @exposedoc
     * @type {{ [key: string]: IPanelItemController }}
     * @memberof SingleDataContainerController
     */
    panelItems: {
        [key: string]: IPanelItemController;
    };
    /**
     * @description 所有面板成员的适配器
     * @type {{ [key: string]: IPanelItemProvider }}
     * @memberof SingleDataContainerController
     */
    providers: {
        [key: string]: IPanelItemProvider;
    };
    /**
     * @description 单项数据容器数据，根据配置的数据模式计算后返回的数据
     * @exposedoc
     * @readonly
     * @type {IData}
     * @memberof SingleDataContainerController
     */
    get data(): IData;
    protected createState(): SingleDataContainerState;
    protected onInit(): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @param {PanelNotifyState} _state
     * @return {*}  {Promise<void>}
     * @memberof SingleDataContainerController
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     * 初始化面板成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initPanelItemControllers(panelItems?: IPanelItem[] | undefined, panel?: IPanelController, parent?: IPanelItemContainerController | undefined): Promise<void>;
    /**
     * 计算导航参数
     *
     * @author tony001
     * @date 2024-07-30 18:07:52
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
     * @description 设置单项数据容器数据
     * @exposedoc
     * @param {IData} data 单项数据容器数据
     * @returns {*}  {Promise<void>}
     * @memberof SingleDataContainerController
     */
    setData(data: IData): Promise<void>;
    /**
     * 设置登录表单数据
     *
     * @protected
     * @memberof SingleDataContainerController
     */
    protected setLoginForm(): void;
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
    /**
     * 通知所有子面板成员面板操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    childDataChangeNotify(names: string[]): void;
    /**
     * @description 设置面板数据的值
     * @exposedoc
     * @param {string} name 要设置的数据的属性名称
     * @param {unknown} value 要设置的值
     * @returns {*}  {Promise<void>}
     * @memberof SingleDataContainerController
     */
    setDataValue(name: string, value: unknown): Promise<void>;
    /**
     * @description 销毁
     * @memberof SingleDataContainerController
     */
    destroy(): void;
}
//# sourceMappingURL=single-data-container.controller.d.ts.map