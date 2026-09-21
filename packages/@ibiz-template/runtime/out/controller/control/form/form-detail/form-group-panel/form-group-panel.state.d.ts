import { IButtonContainerState } from '../../../../../interface';
import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * 表单分组状态
 *
 * @author chitanda
 * @date 2023-01-04 10:01:28
 * @export
 * @class FormGroupPanelState
 * @extends {FormContainerState}
 */
export declare class FormGroupPanelState extends FormDetailState {
    /**
     *  是否显示更多内容
     * @author lxm
     * @date 2023-03-17 02:14:30
     * @type {boolean}
     */
    isShowMore: boolean;
    /**
     * 界面行为组状态
     *
     * @type {(IButtonContainerState | null)}
     * @memberof PortletPartState
     */
    actionGroupState: IButtonContainerState | null;
    /**
     * @description 是否折叠
     * @type {boolean}
     * @memberof FormGroupPanelState
     */
    collapse: boolean;
}
//# sourceMappingURL=form-group-panel.state.d.ts.map