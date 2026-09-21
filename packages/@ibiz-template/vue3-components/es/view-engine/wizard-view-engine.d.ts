import { ViewEngineBase, ViewController, IWizardViewState, IWizardViewEvent, IWizardPanelController } from '@ibiz-template/runtime';
import { IAppDEWizardView } from '@ibiz/model-core';
export declare class WizardViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEWizardView, IWizardViewState, IWizardViewEvent>}
     * @memberof WizardViewEngine
     */
    protected view: ViewController<IAppDEWizardView, IWizardViewState, IWizardViewEvent>;
    /**
     * 数据视图（卡片）部件
     *
     * @readonly
     * @memberof WizardViewEngine
     */
    get wizardPanel(): IWizardPanelController;
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @memberof WizardViewEngine
     */
    onMounted(): Promise<void>;
}
