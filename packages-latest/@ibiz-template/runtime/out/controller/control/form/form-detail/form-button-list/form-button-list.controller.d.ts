import { IDEFormButton, IDEFormButtonList } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormNotifyState } from '../../../../constant';
import { FormButtonListState } from './form-button-list.state';
import { FormController } from '../../form';
import { IApiFormButtonListController, IFormDetailContainerController } from '../../../../../interface';
/**
 * 表单按钮组控制器
 *
 * @export
 * @class FormButtonListController
 * @extends {FormDetailController<IDEFormButtonList>}
 */
export declare class FormButtonListController extends FormDetailController<IDEFormButtonList> implements IApiFormButtonListController {
    state: FormButtonListState;
    protected createState(): FormButtonListState;
    /**
     * Creates an instance of FormButtonListController.
     * @param {IDEFormButtonList} model
     * @param {FormController} form
     * @param {IFormDetailContainerController} [parent]
     * @memberof FormButtonListController
     */
    constructor(model: IDEFormButtonList, form: FormController, parent?: IFormDetailContainerController);
    protected onInit(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    protected initUIActions(): Promise<void>;
    /**
     * 初始化按钮组状态
     *
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    initButtonsState(): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @param {FormNotifyState} _state
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    formStateNotify(_state: FormNotifyState): Promise<void>;
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     * @return {*}  {void}
     * @memberof FormButtonListController
     */
    calcDetailDisabled(data: IData): void;
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     * @return {*}  {void}
     * @memberof FormButtonListController
     */
    calcDetailVisible(data: IData): void;
    /**
     * 通过项标识获取项模型
     *
     * @private
     * @param {string} id
     * @return {*}  {(IDEFormButton | IUIActionGroupDetail | undefined)}
     * @memberof FormButtonListController
     */
    private getModelById;
    /**
     * 执行界面行为
     *
     * @param {string} actionId
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    doUIAction(actionId: string, appId: string, event?: MouseEvent): Promise<void>;
    /**
     * 处理公共参数
     *
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {{ context: IContext; params: IParams }}
     * @memberof FormButtonListController
     */
    handlePublicParams(model: IDEFormButton, data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 执行表单项更新
     *
     * @param {IDEFormButton} model
     * @param {MouseEvent} [event]
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    doFormItemUpdate(model: IDEFormButton, event?: MouseEvent): Promise<void>;
    /**
     * 处理按钮点击
     *
     * @param {string} id
     * @param {MouseEvent} [event]
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    handleClick(id: string, event?: MouseEvent): Promise<void>;
}
//# sourceMappingURL=form-button-list.controller.d.ts.map