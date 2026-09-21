import { BitMask } from '@ibiz-template/core';
import { FormDetailController } from '../form-detail';
import { FormMDCtrlState } from './form-mdctrl.state';
import { ButtonContainerState, UIActionButtonState } from '../../../../utils';
import { UIActionUtil } from '../../../../../ui-action';
/**
 * 表单多数据部件控制器
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export class FormMDCtrlController extends FormDetailController {
    createState() {
        var _a;
        return new FormMDCtrlState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * 名称
     * @author lxm
     * @date 2023-11-22 03:31:02
     * @readonly
     * @type {string}
     */
    get name() {
        return this.model.id;
    }
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-08-24 20:08:55
     * @type {IContext}
     */
    get context() {
        return this.form.context;
    }
    /**
     * 视图参数
     *
     * @author lxm
     * @date 2022-08-24 20:08:52
     * @type {IParams}
     */
    get params() {
        return this.form.params;
    }
    /**
     * 是否允许新建
     *
     * @author lxm
     * @date 2023-11-09 06:14:13
     * @readonly
     * @type {boolean}
     */
    get enableCreate() {
        return (!this.state.readonly &&
            BitMask.checkPermission(this.model.buildInActions, 1));
    }
    /**
     * 是否允许更新
     *
     * @author lxm
     * @date 2023-11-09 06:14:13
     * @readonly
     * @type {boolean}
     */
    get enableUpdate() {
        return (!this.state.readonly &&
            BitMask.checkPermission(this.model.buildInActions, 2));
    }
    /**
     * 是否允许删除
     * @author lxm
     * @date 2023-11-09 06:14:17
     * @readonly
     * @type {boolean}
     */
    get enableDelete() {
        return (!this.state.readonly &&
            BitMask.checkPermission(this.model.buildInActions, 4));
    }
    /**
     * 如果配置了表单项更新，则执行表单项更新
     * @author lxm
     * @date 2023-11-10 04:55:40
     * @return {*}  {Promise<void>}
     */
    async updateFormItem() {
        if (this.model.deformItemUpdateId) {
            await this.form.updateFormItem(this.model.deformItemUpdateId);
        }
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
     * 初始化
     *
     * @author zk
     * @date 2023-07-25 10:07:11
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    async onInit() {
        super.onInit();
        await this.initActionStates();
        this.form.evt.on('onBeforeSave', async () => {
            await this.save();
        });
    }
    async initActionStates() {
        var _a;
        // 操作列按钮状态控制
        const { uiactionGroup } = this.model;
        if (!((_a = uiactionGroup === null || uiactionGroup === void 0 ? void 0 : uiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const containerState = new ButtonContainerState();
        uiactionGroup.uiactionGroupDetails.forEach(detail => {
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
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    async onActionClick(detail, event) {
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params: this.params,
            data: [this.data],
            view: this.form.view,
            ctrl: this.form,
            event,
        }, detail.appId);
    }
    /**
     * 刷新
     * @author lxm
     * @date 2023-11-13 11:21:06
     */
    refresh() {
        // 子类实现
    }
    /**
     * 校验内部数据
     * @author lxm
     * @date 2023-11-13 05:55:20
     * @return {*}  {Promise<boolean>}
     */
    async validate() {
        // todo 子类校验实现
        return true;
    }
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlController
     */
    async silentValidate() {
        // todo 子类校验实现
        return true;
    }
    /**
     * 保存
     * - 子类实现
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    async save() { }
}
