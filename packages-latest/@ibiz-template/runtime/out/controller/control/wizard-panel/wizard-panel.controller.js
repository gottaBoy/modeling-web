import { RuntimeError } from '@ibiz-template/core';
import { calcDeCodeNameById } from '../../../model';
import { getControlProvider } from '../../../register';
import { ControlVO } from '../../../service';
import { ScriptFactory } from '../../../utils';
import { ControlController } from '../../common';
import { ButtonContainerState, UIActionButtonState } from '../../utils';
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
export class WizardPanelController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 表单标识历史
         *
         * @author lxm
         * @date 2023-02-16 08:41:35
         * @type {string[]}
         * @memberof WizardPanelController
         */
        this.tagHistory = [];
        /**
         * 所有部件的适配器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IControlProvider }}
         */
        this.providers = {};
        /**
         * 首表单模型
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-06-07 15:03:39
         */
        this.firstForm = undefined;
        /**
         * 所有表单控制器Map
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-06-07 15:13:21
         */
        this.formControllers = new Map();
        /**
         * 等待挂载中的表单控制器
         */
        this.formControllerWaiters = new Map();
        /**
         * 步骤集合
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-06-07 15:13:21
         */
        this.steps = [];
        /**
         * 步骤标识集合
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-06-07 15:13:21
         */
        this.stepTags = {};
        /**
         * 向导表单数据
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-12-12 13:43:07
         */
        this.formData = {};
    }
    /**
     * 获取向导面板数据
     * @returns
     */
    getData() {
        return [this.formData];
    }
    initState() {
        super.initState();
        this.state.buttonsState = new ButtonContainerState();
    }
    async onCreated() {
        var _a, _b;
        await super.onCreated();
        this.model.dewizard.dewizardForms.forEach((wizardForm) => {
            var _a, _b, _c, _d;
            // 首表单
            if (wizardForm.firstForm) {
                this.firstForm = wizardForm;
            }
            // 步骤标识
            const formName = `${this.model.name}_form_${(_a = wizardForm.formTag) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`;
            const wizardStep = (_c = (_b = this.model.dewizard) === null || _b === void 0 ? void 0 : _b.dewizardSteps) === null || _c === void 0 ? void 0 : _c.find(step => {
                return step.id === wizardForm.dewizardStepId;
            });
            const stepTag = wizardStep === null || wizardStep === void 0 ? void 0 : wizardStep.stepTag;
            this.stepTags[formName] = stepTag;
            // 按钮状态如果有脚本代码则默认隐藏
            (_d = wizardForm.stepActions) === null || _d === void 0 ? void 0 : _d.forEach(step => {
                const name = `${wizardForm.formTag}@${step}`;
                const buttonState = new UIActionButtonState(name, this.context.srfappid);
                buttonState.visible = !this.getStepScriptCode(wizardForm, step);
                this.state.buttonsState.addState(name, buttonState);
            });
        });
        // 按钮初始化
        this.state.buttonsState.init();
        // 步骤集合
        (_b = (_a = this.model.dewizard) === null || _a === void 0 ? void 0 : _a.dewizardSteps) === null || _b === void 0 ? void 0 : _b.forEach(step => {
            this.steps.push(step.stepTag);
        });
        // 实例部件服务
        this.service = new WizardPanelService(this.model);
        await this.service.init(this.context);
        // 编辑表单适配器
        const { deeditForms } = this.model;
        if (deeditForms && deeditForms.length > 0) {
            await Promise.all(deeditForms.map(async (editForm) => {
                const { formTag } = editForm.dewizardForm;
                if (formTag) {
                    const provider = await getControlProvider(editForm);
                    if (provider) {
                        this.providers[formTag] = provider;
                    }
                }
            }));
        }
    }
    /**
     * 当前激活的向导表单
     *
     * @author lxm
     * @date 2023-02-17 10:42:06
     * @readonly
     * @memberof WizardPanelController
     */
    get activeWizardForm() {
        const { activeFormTag } = this.state;
        const form = this.model.dewizard.dewizardForms.find((wizardForm) => {
            return wizardForm.formTag === activeFormTag;
        });
        if (!form) {
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.wizardPanel.wizardForm', {
                activeFormTag,
            }));
        }
        return form;
    }
    /**
     * 当前激活向导表单的控制器
     *
     * @author lxm
     * @date 2023-02-17 03:44:46
     * @readonly
     * @memberof WizardPanelController
     */
    get activeFormController() {
        const { activeFormTag } = this.state;
        const controller = this.formControllers.get(activeFormTag);
        if (!controller) {
            throw this.createFormControllerError(activeFormTag);
        }
        return controller;
    }
    /**
     * 创建表单控制器未挂载错误
     */
    createFormControllerError(formTag) {
        return new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.formController', {
            activeFormTag: formTag,
        }));
    }
    /**
     * 等待指定表单完成挂载
     */
    async waitForFormController(formTag = this.state.activeFormTag) {
        const controller = this.formControllers.get(formTag);
        if (controller) {
            return controller;
        }
        const currentWaiter = this.formControllerWaiters.get(formTag);
        if (currentWaiter) {
            return currentWaiter.promise;
        }
        let resolveController;
        let rejectController;
        const promise = new Promise((resolve, reject) => {
            resolveController = resolve;
            rejectController = reject;
        });
        const timer = setTimeout(() => {
            this.formControllerWaiters.delete(formTag);
            rejectController(this.createFormControllerError(formTag));
        }, 5000);
        this.formControllerWaiters.set(formTag, {
            promise,
            resolve: resolveController,
            reject: rejectController,
            timer,
        });
        return promise;
    }
    /**
     * 表单挂载后把控制器抛出来
     * @param {string} activeFormTag
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-07 15:14:05
     */
    async onFormMounted(activeFormTag, event) {
        const formController = event.ctrl;
        this.formControllers.set(activeFormTag, formController);
        const waiter = this.formControllerWaiters.get(activeFormTag);
        if (waiter) {
            clearTimeout(waiter.timer);
            waiter.resolve(formController);
            this.formControllerWaiters.delete(activeFormTag);
        }
        formController.evt.on('onFormDataChange', evt => {
            this.calcButtonState(evt.data[0], formController);
        });
        // 调用表单的load加载一次数据
        const data = await formController.load();
        this.calcButtonState(formController.data, formController);
        Object.assign(this.formData, data);
    }
    /**
     * 表单保存后，如果上下文里没有主键，赋予主键
     * @param {EventBase} event
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-08 14:06:25
     */
    onFormSaved(event) {
        const data = event.data[0];
        Object.assign(this.formData, data);
        const deName = calcDeCodeNameById(this.model.appDataEntityId);
        if (!this.context[deName] && data && data.srfkey) {
            this.context[deName] = data.srfkey;
        }
    }
    /**
     * 根据tag获取应该激活的向导表单
     * @param {string} tag
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-10 18:35:37
     */
    getWizardFormByTag(tag) {
        var _a;
        if (!((_a = this.model.dewizard) === null || _a === void 0 ? void 0 : _a.dewizardForms)) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.noConfiguration'));
        }
        const wizardForm = this.model.dewizard.dewizardForms.find((form) => {
            return form.formTag === tag;
        });
        if (!wizardForm) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.wizardFormIdentifier', { tag }));
        }
        return wizardForm;
    }
    /**
     * 执行初始化操作，存在初始化实体行为的时候加载数据并把主键放入上下文
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    async initialize() {
        var _a;
        const initAction = (_a = this.model.initControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId;
        if (initAction) {
            let res;
            try {
                res = await this.service.initialize(this.context, this.params);
            }
            catch (error) {
                this.actionNotification(`INITIALIZEERROR`, {
                    error: error,
                });
                throw error;
            }
            const deName = calcDeCodeNameById(this.model.appDataEntityId);
            if (res.data && res.data.srfkey) {
                this.formData = res.data;
                this.context[deName] = res.data.srfkey;
            }
            // 初始化时状态向导面板根据状态属性去决定当前激活哪个表单
            if (res.data &&
                this.model.stateAppDEFieldId &&
                res.data[this.model.stateAppDEFieldId]) {
                const activeForm = this.getWizardFormByTag(res.data[this.model.stateAppDEFieldId]);
                if (activeForm) {
                    this.state.activeFormTag = activeForm.formTag;
                    this.tagHistory.push(activeForm.formTag);
                }
            }
        }
        // 没有激活的表单标识就选配置的首表单
        if (!this.state.activeFormTag && this.firstForm) {
            this.state.activeFormTag = this.firstForm.formTag;
            this.tagHistory.push(this.firstForm.formTag);
        }
        this.evt.emit('onInitialized', undefined);
    }
    /**
     * 执行完成操作
     *
     * @author lxm
     * @date 2023-02-16 06:20:18
     * @returns {*}  {Promise<void>}
     * @memberof WizardPanelController
     */
    async finish() {
        try {
            await this.service.finish(this.context, this.formData, this.params);
        }
        catch (error) {
            this.actionNotification('FINISHERROR', {
                error: error,
            });
            throw error;
        }
        this.endLoading();
        this.evt.emit('onFinishSuccess', undefined);
        this.actionNotification('FINISHESUCCESS');
    }
    /**
     * 处理上一步按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:04
     * @memberof WizardPanelController
     */
    async onPrevClick() {
        this.startLoading();
        try {
            const formController = await this.waitForFormController();
            // 状态向导先执行表单返回行为
            let data;
            if (formController.model.goBackControlAction) {
                data = await formController.goBack();
            }
            let prevTag;
            // 返回上一个表单优先级 stateAppDEFieldId > tagHistory
            if (this.model.stateAppDEFieldId &&
                data &&
                data[this.model.stateAppDEFieldId]) {
                const wizardForm = this.getWizardFormByTag(data[this.model.stateAppDEFieldId]);
                if (wizardForm) {
                    prevTag = data[this.model.stateAppDEFieldId];
                }
            }
            else {
                // 先删除在获取最后一个 否则prevTag会异常
                this.tagHistory.pop();
                prevTag = this.tagHistory[this.tagHistory.length - 1];
            }
            if (!prevTag) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.noPreviousForm'));
            }
            this.state.activeFormTag = prevTag;
            // eslint-disable-next-line no-useless-catch
        }
        catch (error) {
            throw error;
        }
        finally {
            this.endLoading();
        }
    }
    /**
     * 处理下一步按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:10:17
     * @memberof WizardPanelController
     */
    async onNextClick() {
        this.startLoading();
        try {
            const formController = await this.waitForFormController();
            // 保存
            const data = await formController.save({ silent: true });
            let nextTag;
            if (data.srfnextform) {
                const wizardForm = this.getWizardFormByTag(data.srfnextform);
                if (wizardForm) {
                    nextTag = data.srfnextform;
                }
            }
            else if (this.model.stateAppDEFieldId &&
                data[this.model.stateAppDEFieldId]) {
                const wizardForm = this.getWizardFormByTag(data[this.model.stateAppDEFieldId]);
                if (wizardForm) {
                    nextTag = data[this.model.stateAppDEFieldId];
                }
            }
            else {
                // 通过步骤找,找到下一个步骤对应的第一个向导表单
                const wizardSteps = this.model.dewizard.dewizardSteps;
                const editForms = this.model.dewizard.dewizardForms;
                if (wizardSteps && editForms) {
                    // 从向导表单列表中找到当前表单对应的向导步骤
                    const index = wizardSteps.findIndex(_step => {
                        return _step.id === this.activeWizardForm.dewizardStepId;
                    });
                    const nextWizardStep = wizardSteps[index + 1];
                    if (!nextWizardStep) {
                        throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.nextStep'));
                    }
                    const nextWizardForm = this.getWizardFormByTag(nextWizardStep.stepTag);
                    if (nextWizardForm && nextWizardForm.formTag) {
                        nextTag = nextWizardForm.formTag;
                    }
                }
            }
            if (!nextTag) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.wizardPanel.nextForm'));
            }
            this.state.activeFormTag = nextTag;
            this.tagHistory.push(nextTag);
            // eslint-disable-next-line no-useless-catch
        }
        catch (error) {
            throw error;
        }
        finally {
            this.endLoading();
        }
    }
    /**
     * 处理完成按钮点击
     *
     * @author lxm
     * @date 2023-02-16 09:09:45
     * @memberof WizardPanelController
     */
    async onFinishClick() {
        this.startLoading();
        try {
            const formController = await this.waitForFormController();
            // 保存
            await formController.save({ silent: true });
            await this.finish();
            // eslint-disable-next-line no-useless-catch
        }
        catch (error) {
            this.endLoading();
            throw error;
        }
    }
    /**
     * 获取向导表单步骤脚本代码
     * @param wizardForm
     * @param step
     */
    getStepScriptCode(wizardForm, step) {
        switch (step) {
            case 'PREV':
                return wizardForm.goPrevEnableScriptCode;
            case 'NEXT':
                return wizardForm.goNextEnableScriptCode;
            case 'FINISH':
                return wizardForm.goFinishEnableScriptCode;
            default:
        }
    }
    /**
     * 计算按钮状态
     *
     * @param item 数据
     * @memberof WizardPanelController
     */
    async calcButtonState(item, _form) {
        var _a;
        const { activeWizardForm } = this;
        if (activeWizardForm) {
            let data = item;
            if (data && data instanceof ControlVO) {
                data = data.getOrigin();
            }
            (_a = activeWizardForm.stepActions) === null || _a === void 0 ? void 0 : _a.forEach(step => {
                const buttonState = this.state.buttonsState[`${activeWizardForm.formTag}@${step}`];
                const scriptCode = this.getStepScriptCode(activeWizardForm, step);
                if (buttonState && scriptCode) {
                    buttonState.visible = !!ScriptFactory.execScriptFn({
                        view: this.view,
                        ctrl: _form,
                        context: this.context,
                        params: this.params,
                        data,
                        env: ibiz.env,
                    }, scriptCode, { isAsync: false, singleRowReturn: true });
                }
            });
        }
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof WizardPanelController
     */
    convertMultipleLanguages() {
        const { dewizard } = this.model;
        if (!dewizard)
            return;
        const { dewizardSteps, prevCapLanResTag, nextCapLanResTag, finishCapLanResTag, } = dewizard;
        if (prevCapLanResTag)
            dewizard.prevCaption = ibiz.i18n.t(prevCapLanResTag, dewizard.prevCaption);
        if (nextCapLanResTag)
            dewizard.nextCaption = ibiz.i18n.t(nextCapLanResTag, dewizard.nextCaption);
        if (finishCapLanResTag)
            dewizard.finishCaption = ibiz.i18n.t(finishCapLanResTag, dewizard.finishCaption);
        dewizardSteps === null || dewizardSteps === void 0 ? void 0 : dewizardSteps.forEach(step => {
            var _a;
            if ((_a = step.titleLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
                step.title = ibiz.i18n.t(step.titleLanguageRes.lanResTag, step.title);
        });
    }
}
