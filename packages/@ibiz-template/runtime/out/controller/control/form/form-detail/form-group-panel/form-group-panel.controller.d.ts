import { IDEFormGroupPanel, IUIActionGroupDetail } from '@ibiz/model-core';
import { IFormDetailContainerController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormGroupPanelState } from './form-group-panel.state';
/**
 * 表单分组面板控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormGroupPanelController
 * @extends {FormContainerController}
 */
export declare class FormGroupPanelController<T extends IDEFormGroupPanel = IDEFormGroupPanel> extends FormDetailController<T> implements IFormDetailContainerController {
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
     * 初始化标题右侧界面行为按钮的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     */
    initActionStates(): Promise<void>;
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent, args?: IParams): Promise<void>;
}
//# sourceMappingURL=form-group-panel.controller.d.ts.map