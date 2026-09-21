import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { createUUID } from 'qx-util';
import { calcDeCodeNameById } from '../../../../../model';
import { getControlProvider } from '../../../../../register';
import { FormMDCtrlFormState } from './form-mdctrl-form.state';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * 表单多数据部件(引用实体表单部件模型)控制器
 * 类型是表单
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export class FormMDCtrlFormController extends FormMDCtrlController {
    constructor() {
        super(...arguments);
        /**
         * 忽略下一次自身对应表单项数据变更
         * @author lxm
         * @date 2023-12-19 11:47:21
         */
        this.ignoreNextSelfChange = false;
        /**
         * 表单控制器Map
         * @author lxm
         * @date 2023-11-11 08:03:56
         */
        this.formMap = new Map();
        /**
         * 数据集合
         *
         * @type {IData[]}
         * @memberof FormMDCtrlFormController
         */
        this.items = [];
    }
    createState() {
        var _a;
        return new FormMDCtrlFormState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * 初始化
     *
     * @author zk
     * @date 2023-07-25 10:07:11
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    async onInit() {
        super.onInit();
        const { contentControl, appId, ctrlParams } = this.model;
        // 初始化适配器
        if (!contentControl) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.form.unconfiguredWidgets'));
        }
        // 修改自动保存
        contentControl.enableAutoSave =
            this.enableCreate || this.enableUpdate;
        // 修改触发值变更模式为input防止保存异常
        contentControl.controlParam = {
            appId,
            ctrlParams,
        };
        const controlProvider = await getControlProvider(contentControl);
        if (controlProvider) {
            this.formProvider = controlProvider;
        }
        const { appDataEntityId } = this.model.contentControl;
        this.deName = calcDeCodeNameById(appDataEntityId);
    }
    /**
     * 加载实体的数据
     * @author lxm
     * @date 2023-11-10 05:02:40
     * @return {*}  {Promise<void>}
     */
    async fetchData() {
        const { appDataEntityId } = this.model.contentControl;
        const fetchAction = 'fetchdefault';
        const res = await ibiz.hub
            .getApp(this.model.appId)
            .deService.exec(appDataEntityId, fetchAction, this.context, this.params);
        if (res.ok) {
            this.items = res.data;
            this.state.items = this.items.map(item => {
                const context = this.context.clone();
                context[this.deName] = item.srfkey;
                const params = Object.assign({}, this.params);
                return {
                    id: item.srfkey,
                    context,
                    params,
                };
            });
        }
    }
    /**
     * 更新数据
     * - 仅支持更新临时数据
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    async updateData() {
        var _a;
        const { appDataEntityId } = this.model.contentControl;
        const fetchAction = 'update';
        const deService = await ibiz.hub.getAppDEService(this.model.appId, appDataEntityId, this.context);
        const data = (_a = this.state.items) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
            const _item = this.items.find(v => v.srfkey === item.id);
            _item.srfordervalue = index + 1;
            return _item;
        });
        if (deService.isLocalMode && data) {
            await deService.exec(fetchAction, this.context, data);
        }
    }
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    async formStateNotify(state) {
        await super.formStateNotify(state);
        await this.refresh();
    }
    /**
     * 设置表单控制器
     * @author lxm
     * @date 2023-11-11 08:03:06
     * @param {string} id
     * @param {IEditFormController} controller
     */
    setFormController(id, controller) {
        this.formMap.set(id, controller);
        controller.evt.on('onLoadSuccess', event => {
            var _a, _b;
            const formData = (_a = event.data) === null || _a === void 0 ? void 0 : _a[0];
            const item = (_b = this.state.items) === null || _b === void 0 ? void 0 : _b.find(child => child.id === id);
            if (item && formData) {
                item.title = formData.srfmajortext || '';
            }
        });
        controller.evt.on('onSaveSuccess', event => {
            const formData = event.data[0];
            const item = this.state.items.find(x => x.id === id);
            // 创建之后更新上下文的主键
            if (item && formData) {
                item.title = formData.srfmajortext || '';
                if (item.context[this.deName] !== formData.srfkey) {
                    item.context[this.deName] = formData.srfkey;
                }
            }
            this.notifyFormDataChange();
        });
        controller.evt.on('onRemoveSuccess', () => {
            this.notifyFormDataChange();
        });
    }
    /**
     * 校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    async validate() {
        const values = await Promise.all(Array.from(this.formMap.values()).map(form => form.validate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    async silentValidate() {
        const values = await Promise.all(Array.from(this.formMap.values()).map(form => form.silentValidate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 删除数据
     * @author lxm
     * @date 2023-11-11 08:06:12
     * @param {string} id
     * @return {*}  {Promise<void>}
     */
    async remove(id) {
        const controller = this.formMap.get(id);
        if (!controller) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.noFoundFormController', {
                id,
            }));
        }
        await controller.remove({ silent: true });
        this.formMap.delete(id);
        const index = this.state.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.state.items.splice(index, 1);
        }
    }
    /**
     * 新建一条数据
     * @author lxm
     * @date 2023-11-11 08:01:49
     */
    create(index) {
        const context = this.context.clone();
        const params = Object.assign({}, this.params);
        if (!this.state.items) {
            this.state.items = [];
        }
        const item = {
            id: createUUID(),
            context,
            params,
        };
        if (index !== undefined) {
            this.state.items.splice(index, 0, item);
        }
        else {
            this.state.items.push(item);
        }
    }
    refresh() {
        this.fetchData();
    }
    async dataChangeNotify(names) {
        if (names.includes(this.model.id) && this.ignoreNextSelfChange) {
            this.ignoreNextSelfChange = false;
            return;
        }
        await super.dataChangeNotify(names);
        // 表单项更新的时候修改数据的时候需要刷新
        if (names.includes(this.model.id)) {
            this.refresh();
        }
    }
    /**
     * 通知表单多数据部件对应的表单项数据变更
     * @author lxm
     * @date 2023-12-19 11:46:13
     * @protected
     */
    notifyFormDataChange() {
        this.updateFormItem();
        this.ignoreNextSelfChange = true;
        this.form.dataChangeNotify([this.name]);
    }
    /**
     * 保存
     *
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    async save() {
        await Promise.all(Array.from(this.formMap.values()).map(form => form.save({ silent: true })));
    }
}
