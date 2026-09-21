import { IDEWizardForm, IDEWizardPanel } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiWizardPanelState } from '../../state';
import { IApiControlController } from './i-api-control.controller';
import { IApiEditFormController } from './i-api-edit-form.controller';
/**
 * 向导面板
 * @description 通过清晰的指引文字、进度提示和下一步按钮，引导用户按步骤完成复杂操作的交互式界面。
 * @primary
 * @export
 * @interface IApiWizardPanelController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiWizardPanelController<T extends IDEWizardPanel = IDEWizardPanel, S extends IApiWizardPanelState = IApiWizardPanelState> extends IApiControlController<T, S> {
    /**
     * @description 向导步骤标识集合
     * @type {string[]}
     * @memberof IApiWizardPanelController
     */
    steps: string[];
    /**
     * @description 当前激活向导表单模型，基于state对象activeFormTag属性获取
     * @type {(IDEWizardForm | undefined)}
     * @memberof IApiWizardPanelController
     */
    activeWizardForm: IDEWizardForm | undefined;
    /**
     * @description 当前激活向导表单控制器，基于state对象activeFormTag属性获取
     * @type {(IApiEditFormController | undefined)}
     * @memberof IApiWizardPanelController
     */
    activeFormController: IApiEditFormController | undefined;
    /**
     * @description 获取向导面板数据
     * @returns {*}  {IApiData[]}
     * @memberof IApiWizardPanelController
     */
    getData(): IApiData[];
    /**
     * @description 获取向导表单模型
     * @param {string} tag
     * @returns {*}  {(IDEWizardForm | undefined)}
     * @memberof IApiWizardPanelController
     */
    getWizardFormByTag(tag: string): IDEWizardForm | undefined;
    /**
     * @description 上一步
     * @returns {*}  {Promise<void>}
     * @memberof IApiWizardPanelController
     */
    onPrevClick(): Promise<void>;
    /**
     * @description 下一步
     * @returns {*}  {Promise<void>}
     * @memberof IApiWizardPanelController
     */
    onNextClick(): Promise<void>;
    /**
     * @description 完成
     * @returns {*}  {Promise<void>}
     * @memberof IApiWizardPanelController
     */
    onFinishClick(): Promise<void>;
}
//# sourceMappingURL=i-api-wizard-panel.controller.d.ts.map