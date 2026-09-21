import Schema from 'async-validator';
import { isNilOrEmpty } from 'qx-util';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormItemState } from './form-item.state';
import { FormDetailEventName, } from '../../../../../interface';
import { getEditorProvider } from '../../../../../register';
import { Srfuf } from '../../../../../service';
import { filterValueRules } from '../../../../../utils';
import { generateEditorRules, generateRules } from '../../../../utils';
import { ControlType } from '../../../../../constant';
export class FormItemController extends FormDetailController {
    createState() {
        var _a;
        return new FormItemState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
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
    /**
     * 表单项对应属性的值
     *
     * @author lxm
     * @date 2022-08-24 22:08:25
     * @readonly
     * @type {unknown}
     */
    get value() {
        return this.data[this.name];
    }
    /**
     * 值项
     * @author lxm
     * @date 2023-05-31 02:31:27
     * @readonly
     * @type {(string | undefined)}
     */
    get valueItemName() {
        if (this.model.editor) {
            return this.model.editor.valueItemName;
        }
        return undefined;
    }
    /**
     * 标签标题
     * @author lxm
     * @date 2023-12-12 09:48:21
     * @readonly
     * @type {(string | undefined)}
     */
    get labelCaption() {
        const { captionItemName } = this.model;
        if (captionItemName) {
            return this.data[captionItemName];
        }
        return this.model.caption;
    }
    /**
     * Creates an instance of FormItemController.
     *
     * @author chitanda
     * @date 2023-06-14 10:06:23
     * @param {IDEFormItem} model 表单模型
     * @param {FormController} form 表单控制器
     * @param {IFormDetailContainerController} [parent] 父容器控制器
     */
    constructor(model, form, parent) {
        super(model, form, parent);
        /**
         * 值规则
         *
         * @author lxm
         * @date 2023-10-18 03:39:23
         * @type {IData[]}
         */
        this.rules = [];
        this.state.enableReadonly =
            this.form.getControlType() !== ControlType.SEARCHFORM;
    }
    /**
     * 单位
     * @author lxm
     * @date 2023-05-24 05:46:52
     * @readonly
     * @type {(string | undefined)}
     */
    get unitName() {
        return this.model.unitName;
    }
    /**
     * 值格式化
     * @author lxm
     * @date 2023-05-24 05:46:56
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat() {
        return this.model.valueFormat;
    }
    /**
     * 数据类型
     *
     * @author zhanghengfeng
     * @date 2023-09-01 11:09:00
     * @readonly
     * @type {(number | undefined)}
     */
    get dataType() {
        return this.model.dataType;
    }
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @protected
     * @returns {*}  {Promise<void>}
     */
    async onInit() {
        var _a, _b;
        await super.onInit();
        // 空输入默认值
        this.state.required = !this.model.allowEmpty;
        const { enableCond } = this.model;
        if (!enableCond) {
            // enableCond为0省略为不存在了
            this.state.enableCondDisabled = true;
        }
        if (this.context.srfreadonly !== true &&
            this.context.srfreadonly !== 'true' &&
            ((_a = this.model.editor) === null || _a === void 0 ? void 0 : _a.readOnly)) {
            this.state.readonly = ((_b = this.model.editor) === null || _b === void 0 ? void 0 : _b.readOnly) || false;
        }
        // 初始化编辑器控制器,除了隐藏都会需要适配器
        if (this.model.editor && this.model.editor.editorType !== 'HIDDEN') {
            this.editorProvider = await getEditorProvider(this.model.editor);
            if (this.editorProvider) {
                this.editor = await this.editorProvider.createController(this.model.editor, this);
                await this.initRules();
            }
        }
    }
    /**
     * 初始化值规则
     *
     * @author lxm
     * @date 2022-09-02 09:09:27
     * @protected
     * @returns {*}
     */
    async initRules() {
        this.rules = [];
        const formItemsVRs = filterValueRules(this.form.model.deformItemVRs || [], this.name);
        if (formItemsVRs) {
            this.rules.push(...generateRules(formItemsVRs, this.name, this.valueItemName));
        }
        if (this.model.editor) {
            this.rules.push(...generateEditorRules(this.model.editor));
        }
        if (this.rules.length > 0) {
            // 初始化async-validator实例
            this.validator = new Schema({ [this.name]: this.rules });
        }
    }
    /**
     * 计算启用条件的禁用
     *
     * @author lxm
     * @date 2022-09-20 00:09:57
     * @param {(string | FormNotifyState)} name
     * @returns {*}
     */
    calcEnableCond() {
        const { enableCond } = this.model;
        const isNew = this.data.srfuf === Srfuf.CREATE;
        if ((isNew && enableCond === 2) || (!isNew && enableCond === 1)) {
            this.state.enableCondDisabled = true;
        }
    }
    async dataChangeNotify(name) {
        await super.dataChangeNotify(name);
        const { resetItemNames } = this.model;
        // 重置项，变更时自己的值置空
        let isReset = false;
        if (resetItemNames && resetItemNames.length > 0) {
            resetItemNames.forEach((resetItemName) => {
                if (name.includes(resetItemName)) {
                    isReset = true;
                }
            });
        }
        if (isReset) {
            this.setDataValue(null, this.name);
        }
        // 刚加载初始化时的值不校验,只校验值项和自身值变更
        if (name.includes(this.name) || name.includes(this.valueItemName)) {
            this.validate();
        }
        // 有表单项更新，且是自身变更时，触发表单项更新
        if (name.includes(this.name) && this.model.deformItemUpdateId) {
            await this.form.updateFormItem(this.model.deformItemUpdateId);
        }
    }
    async formStateNotify(state) {
        super.formStateNotify(state);
        // 计算启用条件
        this.calcEnableCond();
    }
    /**
     * 表单项值规则校验
     * 如果表单项不显示则不校验直接返回true
     *
     * @author lxm
     * @date 2022-09-01 22:09:29
     */
    async validate() {
        if (!this.state.visible) {
            this.state.error = null;
            return true;
        }
        // 必填校验
        if (this.state.required &&
            (typeof this.data[this.name] === 'string'
                ? isNilOrEmpty(this.data[this.name].trimEnd())
                : isNilOrEmpty(this.data[this.name]))) {
            this.state.error = ibiz.i18n.t('runtime.controller.control.form.fillIn', {
                caption: this.model.caption || '',
            });
            return false;
        }
        if (this.validator) {
            try {
                await this.validator.validate(this.data);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch ({ errors, _fields }) {
                this.state.error = errors[0].message;
                return false;
            }
        }
        this.state.error = null;
        return true;
    }
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormItemController
     */
    async silentValidate() {
        if (this.state.visible) {
            // 必填校验
            if (this.state.required &&
                (typeof this.data[this.name] === 'string'
                    ? isNilOrEmpty(this.data[this.name].trimEnd())
                    : isNilOrEmpty(this.data[this.name]))) {
                return false;
            }
            if (this.validator) {
                try {
                    await this.validator.validate(this.data);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
                catch ({ errors, _fields }) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * 设置表单数据的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {unknown} value 要设置的值
     * @param {string} name 要设置的表单数据的属性名称
     * @param {boolean} ignore 忽略脏值检查
     */
    async setDataValue(value, name, ignore = false) {
        name = name || this.name;
        await this.form.setDataValue(name, value, ignore);
        this.executeScriptCode('SCRIPTCODE_CHANGE');
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: name || this.model.id,
            formDetailEventName: FormDetailEventName.CHANGE,
        });
    }
    /**
     * 聚焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onFocus(event) {
        this.executeScriptCode('SCRIPTCODE_FOCUS');
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.model.id,
            formDetailEventName: FormDetailEventName.FOCUS,
            event,
        });
    }
    /**
     * 失焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onBlur(event) {
        this.executeScriptCode('SCRIPTCODE_BLUR');
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.model.id,
            formDetailEventName: FormDetailEventName.BLUR,
            event,
        });
    }
    /**
     * 回车事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onEnter(event) {
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.model.id,
            formDetailEventName: FormDetailEventName.ENTER,
            event,
        });
    }
    /**
     * 点击事件
     * @author ljx
     * @date 2024-08-06 10:03:26
     */
    async onClick(event, params = {}) {
        const { data } = params;
        if (event) {
            // 阻止冒泡
            event.stopPropagation();
        }
        this.executeScriptCode('SCRIPTCODE_CLICK');
        const clickEmitData = {
            formDetailName: this.model.id,
            formDetailEventName: FormDetailEventName.CLICK,
            event,
        };
        if (data) {
            Object.assign(clickEmitData, { data: [data] });
        }
        this.form.evt.emit('onFormDetailEvent', clickEmitData);
    }
}
