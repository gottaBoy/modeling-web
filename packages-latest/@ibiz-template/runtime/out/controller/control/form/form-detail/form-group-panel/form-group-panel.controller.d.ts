import { IDEFormGroupPanel, IUIActionGroupDetail } from '@ibiz/model-core';
import { IApiFormGroupPanelController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { FormGroupPanelState } from './form-group-panel.state';
import { FormContainerController } from '../form-container';
/**
 * 表单分组面板控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormGroupPanelController
 * @extends {FormContainerController}
 */
export declare class FormGroupPanelController<T extends IDEFormGroupPanel = IDEFormGroupPanel> extends FormContainerController<T> implements IApiFormGroupPanelController {
    state: FormGroupPanelState;
    /**
     * 禁用关闭
     *
     * @author chitanda
     * @date 2022-09-14 14:09:51
     * @readonly
     * @type {boolean}
     */
    get disableClose(): boolean;
    /**
     * 是否默认展开分组
     *
     * @author chitanda
     * @date 2022-09-14 14:09:09
     * @readonly
     */
    get defaultExpansion(): boolean;
    protected createState(): FormGroupPanelState;
    protected onInit(): Promise<void>;
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormGroupPanelController
     */
    protected initUIActions(): Promise<void>;
    /**
     * 初始化标题右侧界面行为按钮的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     */
    initActionStates(): Promise<void>;
    /**
     * 触发界面行为
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent, args?: IParams): Promise<void>;
}
//# sourceMappingURL=form-group-panel.controller.d.ts.map