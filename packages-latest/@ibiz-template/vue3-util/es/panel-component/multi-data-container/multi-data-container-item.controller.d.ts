import { IPanelController, IPanelDataContainerController, IPanelItemContainerController, IPanelItemController, PanelData, PanelNotifyState } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { MultiDataContainerItemState } from './multi-data-container-itm.state';
import { MultiDataContainerController } from './multi-data-container.controller';
/**
 * 多项数据容器每一个数据项的控制器
 * @author lxm
 * @date 2023-09-05 05:04:01
 * @export
 * @class MultiDataContainerItemController
 * @extends {PanelItemController<IPanelContainer>}
 * @implements {IPanelDataContainerController}
 */
export declare class MultiDataContainerItemController implements IPanelDataContainerController {
    readonly model: IPanelContainer;
    readonly panel: IPanelController;
    readonly parent: MultiDataContainerController;
    state: MultiDataContainerItemState;
    readonly isDataContainer = true;
    get data(): IData;
    /**
     * 所有面板成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemController }}
     */
    panelItems: {
        [key: string]: IPanelItemController;
    };
    /**
     * Creates an instance of PanelItemController.
     * @author lxm
     * @date 2023-04-27 06:37:12
     * @param {T} model 面板成员模型
     * @param {PanelController} panel 面板控制器
     * @param {PanelItemController} [parent] 父容器控制器
     */
    constructor(model: IPanelContainer, panel: IPanelController, parent: MultiDataContainerController, data: PanelData);
    /**
     * 值校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof MultiDataContainerItemController
     */
    validate(): Promise<boolean>;
    /**
     * 初始化方法
     * @author lxm
     * @date 2023-09-05 05:48:53
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 初始化面板成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initChildrenController(panelItems?: IPanelItem[] | undefined, panel?: IPanelController, parent?: IPanelItemContainerController | undefined): Promise<void>;
    dataChangeNotify(_names: string[]): Promise<void>;
    childDataChangeNotify(names: string[]): Promise<void>;
    panelStateNotify(state: PanelNotifyState): Promise<void>;
    setDataValue(name: string, value: unknown): Promise<void>;
    destroy(): void;
}
//# sourceMappingURL=multi-data-container-item.controller.d.ts.map