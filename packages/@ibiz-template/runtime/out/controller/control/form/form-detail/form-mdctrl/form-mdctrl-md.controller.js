import { mergeInLeft, ModelError, RuntimeModelError, } from '@ibiz-template/core';
import { getControlProvider } from '../../../../../register';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * 表单多数据部件(引用实体多数据部件模型)控制器
 * 类型是列表，卡片，表格时
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export class FormMDCtrlMDController extends FormMDCtrlController {
    constructor() {
        super(...arguments);
        /**
         * 忽略下一次自身对应表单项数据变更
         * @author lxm
         * @date 2023-12-19 11:47:21
         */
        this.ignoreNextSelfChange = false;
    }
    /**
     * 表单项名称
     *
     * @author lxm
     * @date 2022-09-04 18:09:32
     * @readonly
     */
    get name() {
        return this.model.id;
    }
    async onInit() {
        await super.onInit();
        const { contentControl } = this.model;
        if (!contentControl) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.form.unconfiguredWidgets'));
        }
        // 把修改表格的模型，把行编辑打开，行新建看多数据部件的新建是否开启
        if (contentControl.controlType === 'GRID') {
            mergeInLeft(contentControl, {
                enableRowEdit: this.enableCreate || this.enableUpdate,
                enableRowNew: this.enableCreate,
            });
        }
        const controlProvider = await getControlProvider(contentControl);
        if (controlProvider) {
            this.mdProvider = controlProvider;
        }
    }
    /**
     * 设置多数据部件控制器
     * @author lxm
     * @date 2023-11-10 03:31:16
     * @param {IMDControlController} controller
     */
    setMDControl(controller) {
        this.mdController = controller;
        // 多数据部件保存，删除之后触发表单项更新
        controller.evt.on('onSaveSuccess', () => {
            this.notifyFormDataChange();
        });
        controller.evt.on('onRemoveSuccess', () => {
            this.notifyFormDataChange();
        });
    }
    updateFormItem() {
        const items = this.mdController.state.items || [];
        this.data[this.name] = items;
        return super.updateFormItem();
    }
    /**
     * 删除多数据选中的数据
     * @author lxm
     * @date 2023-11-10 03:32:30
     */
    remove() {
        this.mdController.remove();
    }
    /**
     * 多数据新建一条数据
     * @author lxm
     * @date 2023-11-10 03:32:30
     */
    create() {
        if (this.model.contentType === 'GRID') {
            this.mdController.newRow();
        }
        else {
            throw new ModelError(this.model, ibiz.i18n.t('runtime.controller.control.form.multiDataAddData', {
                contentType: this.model.contentType,
            }));
        }
    }
    refresh() {
        if (this.mdController) {
            this.mdController.refresh();
        }
        else {
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.form.mdControllerNoExist'));
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
        this.refresh();
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
        // 目前只有表格
        if (this.mdController.saveAll) {
            await this.mdController.saveAll();
        }
    }
}
