import { PanelController, PanelItemController, PanelNotifyState } from '@ibiz-template/runtime';
import { IPanelButtonList } from '@ibiz/model-core';
import { PanelButtonListState } from './panel-button-list.state';
/**
 * 面板按钮组控制器
 *
 * @export
 * @class PanelButtonListController
 * @extends {PanelItemController<IPanelButtonList>}
 */
export declare class PanelButtonListController extends PanelItemController<IPanelButtonList> {
    state: PanelButtonListState;
    protected createState(): PanelButtonListState;
    /**
     * 父容器数据对象数据
     * @author lxm
     * @date 2023-07-15 01:33:58
     * @readonly
     * @type {IData}
     */
    get data(): IData;
    /**
     * Creates an instance of PanelButtonController.
     * @param {IPanelButtonList} model
     * @param {PanelController} panel
     * @param {PanelItemController} [parent]
     * @memberof PanelButtonController
     */
    constructor(model: IPanelButtonList, panel: PanelController, parent?: PanelItemController);
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof PanelButtonController
     */
    onInit(): Promise<void>;
    /**
     * 初始化按钮组状态
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PanelButtonListController
     */
    protected initButtonsState(): Promise<void>;
    /**
     * 面板数据变更通知(由面板控制器调用)
     *
     * @param {string[]} names
     * @memberof PanelButtonController
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @param {PanelNotifyState} _state
     * @memberof PanelButtonController
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     * 执行界面行为
     *
     * @param {string} actionId
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof PanelButtonListController
     */
    doUIAction(actionId: string, event: MouseEvent): Promise<void>;
    calcItemVisible(data: IData): void;
    calcItemDisabled(data: IData): void;
}
