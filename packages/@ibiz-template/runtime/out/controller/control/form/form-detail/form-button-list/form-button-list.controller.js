import { UIActionUtil } from '../../../../../ui-action';
import { FormDetailController } from '../form-detail';
import { ButtonContainerState, UIActionButtonState } from '../../../../utils';
import { FormButtonListState } from './form-button-list.state';
/**
 * 表单按钮组控制器
 *
 * @export
 * @class FormButtonListController
 * @extends {FormDetailController<IDEFormButtonList>}
 */
export class FormButtonListController extends FormDetailController {
    createState() {
        var _a;
        return new FormButtonListState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * Creates an instance of FormButtonListController.
     * @param {IDEFormButtonList} model
     * @param {FormController} form
     * @param {IFormDetailContainerController} [parent]
     * @memberof FormButtonListController
     */
    constructor(model, form, parent) {
        super(model, form, parent);
        this.state.buttonsState = new ButtonContainerState();
    }
    async onInit() {
        super.onInit();
        await this.initButtonsState();
    }
    /**
     * 初始化按钮组状态
     *
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    async initButtonsState() {
        var _a;
        const { buttonListType, uiactionGroup, deformButtons } = this.model;
        if (buttonListType === 'UIACTIONGROUP') {
            (_a = uiactionGroup === null || uiactionGroup === void 0 ? void 0 : uiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.forEach(detail => {
                if (detail.uiactionId) {
                    const buttonState = new UIActionButtonState(detail.id, this.model.appId, detail.uiactionId, detail);
                    this.state.buttonsState.addState(detail.id, buttonState);
                }
            });
        }
        else {
            deformButtons === null || deformButtons === void 0 ? void 0 : deformButtons.forEach(button => {
                if (button.uiactionId) {
                    const buttonState = new UIActionButtonState(button.id, this.model.appId, button.uiactionId);
                    this.state.buttonsState.addState(button.id, buttonState);
                }
            });
        }
        await this.state.buttonsState.init();
    }
    /**
     * 表单状态变更通知
     *
     * @param {FormNotifyState} _state
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    async formStateNotify(_state) {
        await this.state.buttonsState.update(this.form.context, this.data, this.form.model.appDataEntityId);
        await super.formStateNotify(_state);
    }
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     * @return {*}  {void}
     * @memberof FormButtonListController
     */
    calcDetailDisabled(data) {
        // 权限禁用时就一定禁用
        if (this.state.buttonsState.disabled) {
            this.state.disabled = true;
            return;
        }
        super.calcDetailDisabled(data);
    }
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     * @return {*}  {void}
     * @memberof FormButtonListController
     */
    calcDetailVisible(data) {
        // 权限不显示时就一定不显示
        if (!this.state.buttonsState.visible) {
            this.state.visible = false;
            return;
        }
        super.calcDetailVisible(data);
    }
    /**
     * 执行界面行为
     *
     * @param {string} actionId
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof FormButtonListController
     */
    async doUIAction(actionId, event) {
        await UIActionUtil.execAndResolved(actionId, {
            context: this.form.context,
            params: this.form.params,
            data: [this.data],
            view: this.form.view,
            ctrl: this.form,
            event,
            noWaitRoute: true,
        }, this.model.appId);
    }
}
