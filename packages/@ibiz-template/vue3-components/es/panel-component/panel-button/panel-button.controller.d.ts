import { PanelController, PanelItemController, PanelNotifyState, UIActionButtonState, ViewLayoutPanelController } from '@ibiz-template/runtime';
import { IPanelButton } from '@ibiz/model-core';
import { PanelButtonState } from './panel-button.state';
/**
 * 面板按钮控制器
 *
 * @export
 * @class PanelButtonController
 * @extends {PanelItemController<IPanelButton>}
 */
export declare class PanelButtonController extends PanelItemController<IPanelButton> {
    state: PanelButtonState;
    protected createState(): PanelButtonState;
    /**
     * 面板控制器
     *
     * @type {ViewLayoutPanelController}
     * @memberof PanelButtonController
     */
    panel: ViewLayoutPanelController;
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
     * @param {IPanelButton} model
     * @param {PanelController} panel
     * @param {PanelItemController} [parent]
     * @memberof PanelButtonController
     */
    constructor(model: IPanelButton, panel: PanelController, parent?: PanelItemController);
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof PanelButtonController
     */
    onInit(): Promise<void>;
    /**
     * 创建界面行为状态对象
     *
     * @protected
     * @return {*}  {PanelButtonState}
     * @memberof PanelButtonController
     */
    protected createUIActionState(): UIActionButtonState;
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
     * 更新按钮权限状态
     *
     * @memberof PanelButtonController
     */
    updateButtonState(): Promise<void>;
    /**
     * 行为点击
     * - 在行为参数中传递panelDataParent(面板项数据父容器标识)
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof PanelButtonController
     */
    onActionClick(event: MouseEvent): Promise<void>;
    calcItemVisible(data: IData): void;
    calcItemDisabled(data: IData): void;
}
