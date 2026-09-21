import { IDEWizardPanel } from '@ibiz/model-core';
import { IWizardPanelEvent } from '../../event';
import { IWizardPanelState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 向导面板控制器
 * @author lxm
 * @date 2023-05-04 02:58:18
 * @export
 * @interface IWizardPanelController
 * @extends {IControlController}
 */
export interface IWizardPanelController extends IControlController<IDEWizardPanel, IWizardPanelState, IWizardPanelEvent> {
    /**
     * 执行初始化操作
     * @author lxm
     * @date 2023-05-16 11:08:45
     * @return {*}  {Promise<void>}
     */
    initialize(): Promise<void>;
    /**
     * 执行完成操作
     *
     * @author lxm
     * @date 2023-02-16 06:20:18
     * @returns {*}  {Promise<void>}
     */
    finish(): Promise<void>;
    /**
     * 处理上一步按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:04
     */
    onPrevClick(): Promise<void>;
    /**
     * 处理下一步按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:17
     * @memberof WizardPanelController
     */
    onNextClick(): Promise<void>;
    /**
     * 处理完成按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:17
     * @memberof WizardPanelController
     */
    onFinishClick(): Promise<void>;
}
//# sourceMappingURL=i-wizard-panel.controller.d.ts.map