import { IDEWizardForm, IDEWizardPanel } from '@ibiz/model-core';
import { IWizardPanelState, IWizardPanelEvent, IWizardPanelController, IControlProvider, EventBase } from '../../../interface';
import { ControlController } from '../../common';
import { EditFormController } from '../form';
import { WizardPanelService } from './wizard-panel.service';
/**
 * 向导面板控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class WizardPanelController
 * @extends {ControlController}
 */
export declare class WizardPanelController extends ControlController<IDEWizardPanel, IWizardPanelState, IWizardPanelEvent> implements IWizardPanelController {
    /**
     * 编辑表单服务
     * @author lxm
     * @date 2023-05-15 11:03:34
     * @type {WizardPanelService}
     */
    service: WizardPanelService;
    /**
     * 表单标识历史
     *
     * @author lxm
     * @date 2023-02-16 08:41:35
     * @type {string[]}
     * @memberof WizardPanelController
     */
    tagHistory: string[];
    /**
     * 所有部件的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IControlProvider }}
     */
    providers: {
        [key: string]: IControlProvider;
    };
    /**
     * 首表单模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:03:39
     */
    firstForm: IDEWizardForm | undefined;
    /**
     * 所有表单控制器Map
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:13:21
     */
    formControllers: Map<string, EditFormController>;
    /**
     * 步骤集合
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:13:21
     */
    steps: string[];
    /**
     * 步骤标识集合
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:13:21
     */
    stepTags: IData;
    /**
     * 向导表单数据
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-12 13:43:07
     */
    formData: IData;
    /**
     * 获取向导面板数据
     * @returns
     */
    getData(): IData[];
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 当前激活的向导表单
     *
     * @author lxm
     * @date 2023-02-17 10:42:06
     * @readonly
     * @memberof WizardPanelController
     */
    get activeWizardForm(): IDEWizardForm | undefined;
    /**
     * 当前激活向导表单的控制器
     *
     * @author lxm
     * @date 2023-02-17 03:44:46
     * @readonly
     * @memberof WizardPanelController
     */
    get activeFormController(): EditFormController;
    /**
     * 表单挂载后把控制器抛出来
     * @param {string} activeFormTag
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:14:05
     */
    onFormMounted(activeFormTag: string, event: EventBase): Promise<void>;
    /**
     * 表单保存后，如果上下文里没有主键，赋予主键
     * @param {EventBase} event
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-08 14:06:25
     */
    onFormSaved(event: EventBase): void;
    /**
     * 根据tag获取应该激活的向导表单
     * @param {string} tag
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-10 18:35:37
     */
    getWizardFormByTag(tag: string): IDEWizardForm | undefined;
    /**
     * 执行初始化操作，存在初始化实体行为的时候加载数据并把主键放入上下文
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    initialize(): Promise<void>;
    /**
     * 执行完成操作
     *
     * @author lxm
     * @date 2023-02-16 06:20:18
     * @returns {*}  {Promise<void>}
     * @memberof WizardPanelController
     */
    finish(): Promise<void>;
    /**
     * 处理上一步按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:04
     * @memberof WizardPanelController
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
     * @date 2023-02-16 09:09:45
     * @memberof WizardPanelController
     */
    onFinishClick(): Promise<void>;
    /**
     * 获取向导表单步骤脚本代码
     * @param wizardForm
     * @param step
     */
    private getStepScriptCode;
    /**
     * 计算按钮状态
     *
     * @param item 数据
     * @memberof WizardPanelController
     */
    calcButtonState(item?: IData): Promise<void>;
}
//# sourceMappingURL=wizard-panel.controller.d.ts.map