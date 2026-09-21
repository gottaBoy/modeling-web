import { IDEFormButton } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormButtonState } from './form-button.state';
import { FormNotifyState } from '../../../../constant';
import { IApiFormButtonController, IButtonState } from '../../../../../interface';
/**
 * 表单按钮控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormButtonController
 * @extends {FormDetailController}
 */
export declare class FormButtonController extends FormDetailController<IDEFormButton> implements IApiFormButtonController {
    state: FormButtonState;
    /**
     *界面行为状态
     *
     * @author zzq
     * @date 2024-03-11 15:09:43
     */
    actionState: IButtonState | null;
    protected createState(): FormButtonState;
    protected onInit(): Promise<void>;
    /**
     * 初始化界面行为按钮的状态
     *
     * @author zzq
     * @date 2024-03-11 15:09:43
     */
    initActionStates(): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @author zzq
     * @date 2024-03-11 15:09:43
     */
    formStateNotify(_state: FormNotifyState): Promise<void>;
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     */
    calcDetailDisabled(data: IData): void;
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     */
    calcDetailVisible(data: IData): void;
    /**
     * 按钮点击处理回调
     *
     * @author lxm
     * @date 2022-09-28 21:09:33
     * @param {MouseEvent} event
     */
    onClick(event: MouseEvent): Promise<void>;
    /**
     * 执行界面行为
     *
     * @author lxm
     * @date 2022-10-19 22:10:20
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     */
    doUIAction(event: MouseEvent): Promise<void>;
    /**
     * 处理公共参数
     *
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {{ context: IContext; params: IParams }}
     * @memberof FormButtonController
     */
    handlePublicParams(data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 执行表单项更新
     *
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof FormButtonController
     */
    doFormItemUpdate(event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=form-button.controller.d.ts.map