import { IPanelItem } from '@ibiz/model-core';
import { IPanelItemController, IPanelController, IPanelDataContainerController, IPanelItemState } from '../../../../interface';
import { PanelNotifyState } from '../../../constant';
import { PanelItemState } from './panel-item.state';
export declare class PanelItemController<T extends IPanelItem = IPanelItem> implements IPanelItemController {
    readonly model: T;
    readonly panel: IPanelController;
    readonly parent?: IPanelItemController | undefined;
    /**
     * 面板项状态
     *
     * @author chitanda
     * @date 2023-01-04 09:01:04
     * @type {IPanelItemState}
     */
    state: IPanelItemState;
    /**
     * 数据父容器
     * @author lxm
     * @date 2023-07-15 11:35:18
     * @readonly
     * @type {(IPanelController | IPanelDataContainerController)}
     */
    get dataParent(): IPanelController | IPanelDataContainerController;
    /**
     * 父容器数据对象数据
     * @author lxm
     * @date 2023-07-15 01:33:58
     * @readonly
     * @type {IData}
     */
    get data(): IData;
    /**
     * 获取容器类名集合
     * @author lxm
     * @date 2023-08-02 06:06:12
     * @readonly
     * @type {string[]}
     */
    get containerClass(): string[];
    /**
     * 获取标题类名集合
     * @author lxm
     * @date 2023-08-02 06:16:48
     * @readonly
     * @type {string[]}
     */
    get labelClass(): string[];
    /**
     * Creates an instance of PanelItemController.
     * @author lxm
     * @date 2023-04-27 06:37:12
     * @param {T} model 面板成员模型
     * @param {IPanelController} panel 面板控制器
     * @param {IPanelItemController} [parent] 父容器控制器
     */
    constructor(model: T, panel: IPanelController, parent?: IPanelItemController | undefined);
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    init(): Promise<void>;
    protected onInit(): Promise<void>;
    destroy(): void;
    /**
     * 值校验
     * 由子类具体实现
     * @return {*}  {Promise<boolean>}
     * @memberof PanelItemController
     */
    validate(): Promise<boolean>;
    /**
     * 创建面板状态对象
     *
     * @author chitanda
     * @date 2023-01-04 10:01:00
     * @protected
     * @return {*}  {PanelItemState}
     */
    protected createState(): PanelItemState;
    /**
     * 面板数据变更通知(由面板控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     * 计算项的禁用状态
     * @author lxm
     * @date 2023-06-26 06:19:00
     * @param {IData} data
     */
    calcItemDisabled(data: IData): void;
    /**
     * 计算项的显示状态
     * @author lxm
     * @date 2023-06-26 06:19:00
     * @param {IData} data
     */
    calcItemVisible(data: IData): void;
    /**
     * 计算项的必填状态
     * @author lxm
     * @date 2023-06-26 06:19:00
     * @param {IData} data
     */
    calcItemRequired(data: IData): void;
    /**
     * 动态逻辑结果
     * @author lxm
     * @date 2023-09-21 03:36:37
     * @protected
     */
    protected dynaLogicResult: {
        visible?: boolean;
        disabled?: boolean;
        required?: boolean;
    };
    /**
     * 计算动态逻辑
     *
     * @author lxm
     * @date 2023-02-13 09:42:07
     * @protected
     * @param {string[]} names 变更的属性集合
     * @param {boolean} [mustCalc=false] 是否强制计算一遍动态逻辑
     * @returns {*}  {void}
     * @memberof PanelItemController
     */
    protected calcDynamicLogic(names: string[], mustCalc?: boolean): void;
    /**
     * 找到指定成员的数据父容器
     * @author lxm
     * @date 2023-07-15 11:26:49
     * @param {IPanelItemController} panel
     * @return {*}  {(IPanelController | IPanelDataContainerController)}
     */
    findDataParent(panel: IPanelItemController): IPanelController | IPanelDataContainerController;
    /**
     * 计算动态样式表
     * @author lxm
     * @date 2023-08-02 06:15:08
     * @param {IData} data
     */
    protected calcDynaClass(data: IData): void;
    /**
     * 点击事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onClick(event?: MouseEvent): void;
}
//# sourceMappingURL=panel-item.controller.d.ts.map