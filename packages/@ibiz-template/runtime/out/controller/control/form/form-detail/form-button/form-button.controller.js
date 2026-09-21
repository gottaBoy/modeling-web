import { UIActionUtil } from '../../../../../ui-action';
import { FormDetailController } from '../form-detail';
import { FormButtonState } from './form-button.state';
import { UIActionButtonState } from '../../../../utils';
import { calcDeCodeNameById } from '../../../../../model';
import { convertNavData } from '../../../../../utils';
import { OpenAppViewCommand } from '../../../../../command';
/**
 * 表单按钮控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormButtonController
 * @extends {FormDetailController}
 */
export class FormButtonController extends FormDetailController {
    constructor() {
        super(...arguments);
        /**
         *界面行为状态
         *
         * @author zzq
         * @date 2024-03-11 15:09:43
         */
        this.actionState = null;
    }
    createState() {
        var _a;
        return new FormButtonState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    async onInit() {
        super.onInit();
        await this.initActionStates();
    }
    /**
     * 初始化界面行为按钮的状态
     *
     * @author zzq
     * @date 2024-03-11 15:09:43
     */
    async initActionStates() {
        // 界面行为按钮状态控制
        const actionid = this.model.uiactionId;
        if (actionid) {
            this.actionState = new UIActionButtonState(this.model.id, this.form.context.srfappid, actionid);
        }
    }
    /**
     * 表单状态变更通知
     *
     * @author zzq
     * @date 2024-03-11 15:09:43
     */
    async formStateNotify(_state) {
        if (this.actionState) {
            const deCodeName = calcDeCodeNameById(this.form.model.appDataEntityId);
            await this.actionState.update(this.context, this.data, deCodeName);
        }
        await super.formStateNotify(_state);
    }
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     */
    calcDetailDisabled(data) {
        super.calcDetailDisabled(data);
        // 表单项与界面行为都有权限时才有权限
        if (this.actionState) {
            this.state.disabled = !!(this.state.disabled || this.actionState.disabled);
        }
    }
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     */
    calcDetailVisible(data) {
        super.calcDetailVisible(data);
        // 表单项与界面行为都有权限时才有权限
        if (this.actionState) {
            this.state.visible = !!(this.state.visible && this.actionState.visible);
        }
    }
    /**
     * 按钮点击处理回调
     *
     * @author lxm
     * @date 2022-09-28 21:09:33
     * @param {MouseEvent} event
     */
    async onClick(event) {
        this.state.loading = true;
        try {
            if (this.model.actionType === 'UIACTION') {
                await this.doUIAction(event);
            }
            else {
                await this.doFormItemUpdate(event);
            }
        }
        finally {
            this.state.loading = false;
        }
        super.onClick(event);
    }
    /**
     * 执行界面行为
     *
     * @author lxm
     * @date 2022-10-19 22:10:20
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     */
    async doUIAction(event) {
        const actionId = this.model.uiactionId;
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
    /**
     * 处理公共参数
     *
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {{ context: IContext; params: IParams }}
     * @memberof FormButtonController
     */
    handlePublicParams(data, context, params) {
        const { navigateContexts, navigateParams } = this.model;
        let selfContext = {};
        if (navigateContexts && data) {
            selfContext = convertNavData(navigateContexts, data, params, context);
        }
        const _context = Object.assign(context.clone(), selfContext);
        let _params = {};
        if (navigateParams && data) {
            _params = convertNavData(navigateParams, data, params, context);
        }
        return { context: _context, params: _params };
    }
    /**
     * 执行表单项更新
     *
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof FormButtonController
     */
    async doFormItemUpdate(event) {
        const { deformItemUpdateId, paramPickupAppViewId } = this.model;
        if (!deformItemUpdateId) {
            return;
        }
        if (paramPickupAppViewId) {
            const { context, params } = this.handlePublicParams(this.data, this.context, this.params);
            const res = await ibiz.commands.execute(OpenAppViewCommand.TAG, paramPickupAppViewId, context, params, { event, noWaitRoute: true });
            if ((res === null || res === void 0 ? void 0 : res.ok) && res.data) {
                this.data.srfactionparam = res.data;
                await this.form.updateFormItem(deformItemUpdateId);
                this.data.srfactionparam = undefined;
            }
        }
        else {
            await this.form.updateFormItem(deformItemUpdateId);
        }
    }
}
