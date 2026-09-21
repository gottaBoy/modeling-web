import { ModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { FormDetailEventName, } from '../../../../../interface';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * 表单多数据部件(重复器)控制器
 * 类型是重复器
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export class FormMDCtrlRepeaterController extends FormMDCtrlController {
    constructor() {
        super(...arguments);
        /**
         * 重复器样式
         * @author lxm
         * @date 2023-11-09 05:03:20
         * @type {('Grid' | 'MultiForm' | 'SingleForm')}
         */
        this.repeaterStyle = 'MultiForm';
        /**
         * 重复器的值是否是单项数据类型，true为数组格式，反之为对象格式
         * @author lxm
         * @date 2023-11-09 05:09:19
         * @type {boolean}
         */
        this.isSingleData = false;
        /**
         * 重复器map
         *
         * @memberof FormMDCtrlRepeaterController
         */
        this.repeaterMap = new Map();
    }
    /**
     * 多数据重复器对应的表单里的值
     *
     * @author lxm
     * @date 2022-08-24 22:08:25
     * @readonly
     * @type {unknown}
     */
    get value() {
        return this.data[this.model.id];
    }
    /**
     * 是否允许排序
     *
     * @author ljx
     * @date 2024-11-19 11:13:13
     * @readonly
     * @type {boolean}
     */
    get enableSort() {
        return !!(this.model.ctrlParams && this.model.ctrlParams.ENABLESORT === 'true');
    }
    async onInit() {
        await super.onInit();
        // 初始化样式类型和数据类型
        switch (this.model.detailStyle) {
            // 表单
            case 'DEFAULT':
                this.repeaterStyle = 'MultiForm';
                this.isSingleData = false;
                break;
            // 表格
            case 'STYLE2':
                this.repeaterStyle = 'Grid';
                this.isSingleData = false;
                break;
            // 1：1表单
            case 'STYLE3':
                this.repeaterStyle = 'SingleForm';
                this.isSingleData = true;
                break;
            default:
                throw new ModelError(this.model, ibiz.i18n.t('runtime.controller.control.form.repeaterNoSupported', {
                    detailStyle: this.model.detailStyle,
                }));
        }
        this.prepareRepeatedForm();
    }
    /**
     * 准备重复器表单模型
     * @author lxm
     * @date 2023-11-22 02:56:00
     */
    prepareRepeatedForm() {
        const id = `${this.model.id}repeatedform`;
        const tempForm = {
            appId: this.model.appId,
            id,
            codeName: id,
            name: id,
            deformPages: [
                {
                    appId: this.model.appId,
                    id: 'formpage1',
                    deformDetails: this.model.deformDetails,
                    detailType: 'FORMPAGE',
                    detailStyle: 'DEFAULT',
                    layout: this.model.layout,
                },
            ],
        };
        const copyFields = [
            'appId',
            'controlType',
            'deformItemVRs',
        ];
        copyFields.forEach(key => {
            tempForm[key] = this.form.model[key];
        });
        this.repeatedForm = clone(tempForm);
    }
    /**
     * 设置重复器控制器
     *
     * @param {string} id
     * @param {IEditFormController} controller
     * @memberof FormMDCtrlRepeaterController
     */
    setRepeaterController(id, controller) {
        this.repeaterMap.set(id, controller);
        if (this.value && this.repeaterMap.size === this.value.length) {
            this.form.evt.emit('onMDCtrlChange', {
                name: this.name,
                args: this,
            });
        }
    }
    /**
     * 校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    async validate() {
        const values = await Promise.all(Array.from(this.repeaterMap.values()).map(form => form.validate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlRepeaterController
     */
    async silentValidate() {
        const values = await Promise.all(Array.from(this.repeaterMap.values()).map(form => form.silentValidate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 设置重复器数据（修改主表单里重复器对应属性）
     * @author lxm
     * @date 2023-11-22 06:07:04
     * @param {(IData[] | IData | null)} value
     */
    setValue(value) {
        this.form.setDataValue(this.name, value);
        this.executeScriptCode('SCRIPTCODE_CHANGE');
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.name || this.model.id,
            formDetailEventName: FormDetailEventName.CHANGE,
        });
    }
    /**
     * 添加或创建一条数据
     * @author lxm
     * @date 2023-11-22 04:50:19
     */
    create(index) {
        const item = {};
        if (this.isSingleData) {
            this.setValue(item);
        }
        else {
            // 多数据，拷贝数组再添加新对象
            let tempValue = this.value;
            tempValue = tempValue ? [...tempValue] : [];
            if (index !== undefined) {
                tempValue.splice(index, 0, item);
            }
            else {
                tempValue.push(item);
            }
            this.setValue(tempValue);
        }
        this.form.evt.emit('onMDCtrlNew', {
            args: item,
        });
    }
    /**
     * 删除数据
     * @author lxm
     * @date 2023-11-22 08:53:42
     * @param {number} index
     */
    remove(index) {
        if (this.isSingleData) {
            // 单项数据的时候删除就是清空
            this.setValue(null);
            return;
        }
        const newArr = this.value.filter((_, i) => {
            return index !== i;
        });
        this.setValue(newArr);
        this.form.evt.emit('onMDCtrlRemove', {
            args: newArr,
        });
    }
    /**
     * 表单数据变更通知
     *
     * @author lxm
     * @date 2023-11-24 04:37:03
     * @param {string[]} names
     * @return {*}  {Promise<void>}
     */
    async dataChangeNotify(names) {
        await super.dataChangeNotify(names);
        const { resetItemNames } = this.model;
        // 重置项，变更时自己的值置空
        let isReset = false;
        if (resetItemNames && resetItemNames.length > 0) {
            resetItemNames.forEach((resetItemName) => {
                if (names.includes(resetItemName)) {
                    isReset = true;
                }
            });
        }
        if (isReset) {
            this.setValue(null);
        }
        // 自身对应属性变更时，触发表单项更新
        if (names.includes(this.name)) {
            await this.updateFormItem();
        }
    }
}
