import { clone } from 'ramda';
import { UIActionUtil } from '../../../../../ui-action';
import { ButtonContainerState, UIActionButtonState } from '../../../../utils';
import { FormGroupPanelState } from './form-group-panel.state';
import { calcUIActionGroup, getAllUIActionItems } from '../../../../../model';
import { FormContainerController } from '../form-container';
/**
 * 表单分组面板控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormGroupPanelController
 * @extends {FormContainerController}
 */
export class FormGroupPanelController extends FormContainerController {
    /**
     * 禁用关闭
     *
     * @author chitanda
     * @date 2022-09-14 14:09:51
     * @readonly
     * @type {boolean}
     */
    get disableClose() {
        const { titleBarCloseMode: mode } = this.model;
        return mode === 0 || mode === undefined;
    }
    /**
     * 是否默认展开分组
     *
     * @author chitanda
     * @date 2022-09-14 14:09:09
     * @readonly
     */
    get defaultExpansion() {
        const { titleBarCloseMode: mode } = this.model;
        return this.disableClose || mode === 1;
    }
    createState() {
        var _a;
        return new FormGroupPanelState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    async onInit() {
        await super.onInit();
        this.state.collapse = !this.defaultExpansion;
        await this.initActionStates();
    }
    async formStateNotify(state) {
        super.formStateNotify(state);
        // 只在加载后台数据之后，更新界面行为组状态
        if (this.state.actionGroupState) {
            const deData = this.data.getOrigin ? this.data.getOrigin() : this.data;
            this.state.actionGroupState.update(this.form.context, deData);
        }
    }
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormGroupPanelController
     */
    async initUIActions() {
        if (this.model.uiactionGroup) {
            await calcUIActionGroup(this.model.uiactionGroup, this.form.context, this.form.params);
        }
    }
    /**
     * 初始化标题右侧界面行为按钮的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     */
    async initActionStates() {
        var _a;
        // 操作列按钮状态控制
        const { uiactionGroup } = this.model;
        if (!((_a = uiactionGroup === null || uiactionGroup === void 0 ? void 0 : uiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length))
            return;
        const containerState = new ButtonContainerState();
        const actions = getAllUIActionItems(uiactionGroup.uiactionGroupDetails);
        actions.forEach(detail => {
            const actionid = detail.uiactionId;
            if (actionid) {
                const buttonState = new UIActionButtonState(detail.id, this.form.context.srfappid, actionid, detail);
                containerState.addState(detail.id, buttonState);
            }
        });
        await containerState.update(this.form.context);
        this.state.actionGroupState = containerState;
    }
    /**
     * 触发界面行为
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    async onActionClick(detail, event, args) {
        const actionId = detail.uiactionId;
        const tempParams = clone(this.form.params);
        if (args) {
            Object.assign(tempParams, args);
        }
        await UIActionUtil.execAndResolved(actionId, {
            context: this.form.context,
            params: tempParams,
            data: [this.data],
            view: this.form.view,
            ctrl: this.form,
            event,
        }, detail.appId);
    }
}
