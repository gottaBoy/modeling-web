import { IButtonContainerState } from '../../common';
import { IControlState } from './i-control.state';
/**
 * 向导面板状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-06-07 13:49:19
 */
export interface IWizardPanelState extends IControlState {
    /**
     * 当前激活的向导表单的表单标识
     *
     * @author lxm
     * @date 2023-02-16 03:22:20
     * @type {string}
     * @memberof WizardPanelState
     */
    activeFormTag: string;
    /**
     * 向导面板按钮状态
     * @type {(IButtonContainerState | null)}
     * @memberof WizardPanelState
     */
    buttonsState: IButtonContainerState;
}
//# sourceMappingURL=i-wizard-panel.state.d.ts.map