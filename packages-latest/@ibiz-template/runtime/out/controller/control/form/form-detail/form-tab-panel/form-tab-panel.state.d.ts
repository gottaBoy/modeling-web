import { IApiFormTabPanelState } from '../../../../../interface';
import { FormContainerState } from '../form-container';
/**
 * @description 表单分页部件状态
 * @export
 * @class FormTabPanelState
 * @extends {FormContainerState}
 * @implements {IApiFormTabPanelState}
 */
export declare class FormTabPanelState extends FormContainerState implements IApiFormTabPanelState {
    /**
     * @description 当前激活的分页
     * @type {string}
     * @memberof FormTabPanelState
     */
    activeTab: string;
}
//# sourceMappingURL=form-tab-panel.state.d.ts.map