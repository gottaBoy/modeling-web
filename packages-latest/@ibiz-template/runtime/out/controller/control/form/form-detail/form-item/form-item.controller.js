import Schema from 'async-validator';
import { isNilOrEmpty } from 'qx-util';
import { isObject } from 'lodash-es';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormItemState } from './form-item.state';
import { FormDetailEventName, } from '../../../../../interface';
import { getEditorProvider } from '../../../../../register';
import { Srfuf } from '../../../../../service';
import { calcDeCodeNameById, calcDynaClass } from '../../../../../model';
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
     * 表单项值
     *
     * @author lxm
     * @date 2022-08-24 22:08:25
     * @readonly
     * @type {unknown}
     */
    get value() {
        var _a;
        return (_a = this.data) === null || _a === void 0 ? void 0 : _a[this.name];
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
        var _a, _b;
        super(model, form, parent);
        /**
         * 值规则
         *
         * @author lxm
         * @date 2023-10-18 03:39:23
         * @type {IData[]}
         */
        this.rules = [];
        /**
         * tips缓存标识
         *
         * @private
         * @memberof FormItemController
         */
        this.TIPS_CACHE = `${(_a = calcDeCodeNameById(this.form.model.appDataEntityId || '')) === null || _a === void 0 ? void 0 : _a.toUpperCase()}-${(_b = this.form.model.codeName) === null || _b === void 0 ? void 0 : _b.toUpperCase()}`;
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
     * @description 隐藏无值的单位
     * @readonly
     * @type {boolean}
     * @memberof FormItemController
     */
    get emptyHiddenUnit() {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controlParams) === null || _b === void 0 ? void 0 : _b.emptyhiddenunit) {
            return Object.is((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controlParams) === null || _d === void 0 ? void 0 : _d.emptyhiddenunit, 'true');
        }
        return ibiz.config.form.emptyHiddenUnit;
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
        this.initTips();
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
            this.editorProvider = await getEditorProvider(this.model.editor, this.form.model);
            if (this.editorProvider) {
                this.editor = await this.editorProvider.createController(this.createEditorModel(), this);
                await this.initRules();
            }
        }
    }
    /**
     * @description 获取 enumOptions
     * @returns {*}  {(IParams | undefined)}
     * @memberof FormItemController
     */
    getEnumOptions() {
        var _a;
        const { jsonSchemaProperties } = this.form;
        const deField = this.model.fieldName || this.model.appDEFieldId;
        if (!deField)
            return;
        return (_a = jsonSchemaProperties === null || jsonSchemaProperties === void 0 ? void 0 : jsonSchemaProperties[deField]) === null || _a === void 0 ? void 0 : _a.enumOptions;
    }
    /**
     * @description 创建编辑器模型
     * @returns {*}  {IEditor}
     * @memberof FormItemController
     */
    createEditorModel() {
        const editorModel = Object.assign({}, this.model.editor);
        const enumOptions = this.getEnumOptions();
        if (isObject(enumOptions)) {
            const editorParams = Object.assign({}, editorModel.editorParams);
            Object.assign(editorParams, {
                enumOptions: Object.keys(enumOptions).map(key => ({
                    id: key,
                    value: key,
                    text: enumOptions[key],
                })),
            });
            editorModel.editorParams = editorParams;
        }
        return editorModel;
    }
    /**
     * 初始化tips
     *
     * @protected
     * @memberof FormItemController
     */
    initTips() {
        const { enableInputTip, inputTip, inputTipUrl } = this.model;
        if (!enableInputTip)
            return;
        let _inputTip = inputTip;
        let _inputTipUrl = inputTipUrl;
        const cache = localStorage.getItem(this.TIPS_CACHE);
        if (cache) {
            const data = JSON.parse(cache);
            if (data[this.name]) {
                _inputTip = data[this.name].inputTip;
                _inputTipUrl = data[this.name].inputTipUrl;
            }
        }
        this.state.inputTip = _inputTip;
        this.state.inputTipUrl = _inputTipUrl;
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
            await this.setDataValue(null, this.name);
        }
        // 刚加载初始化时的值不校验,只校验值项和自身值变更
        if (name.includes(this.name) || name.includes(this.valueItemName)) {
            const bol = await this.validate();
            // 值变更且未校验通过时提示错误信息
            if (this.form.validateMode === 'notification' &&
                !bol &&
                this.state.error) {
                ibiz.notification.error({
                    title: ibiz.i18n.t('runtime.controller.control.form.formCompletion'),
                    desc: this.state.error,
                });
            }
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
     * 表单项值规则校验(如果表单项不显示则不校验直接返回true)
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
        const oldValue = this.data[name];
        await this.form.setDataValue(name, value, ignore);
        this.executeScriptCode('SCRIPTCODE_CHANGE', { oldValue });
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: name || this.model.id,
            formDetailEventName: FormDetailEventName.CHANGE,
            args: { oldValue },
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
        event === null || event === void 0 ? void 0 : event.stopPropagation();
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
    /**
     * 自定义行为
     * @param value
     */
    async onCustomAction(value) {
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.name || this.model.id,
            formDetailEventName: FormDetailEventName.CUSTOMACTION,
            args: Object.assign({}, value),
        });
    }
    /**
     * 加载输入提示信息
     *
     * @return {*}  {Promise<void>}
     * @memberof FormItemController
     */
    async loadInputTip() {
        const { appDEFInputTipSetId, appDataEntityId } = this.form.model;
        // 如果已经有提示或未配置输入提示集合就不远程加载
        if (this.state.inputTip || !appDEFInputTipSetId)
            return;
        const { appId, inputTipUniqueTag, appDEFieldId } = this.model;
        const app = ibiz.hub.getApp(appId);
        const inputTipsSet = app.getInputTipsSet(appDEFInputTipSetId);
        // 如果属性提示集合中没有配内容属性和链接属性则不发送请求
        if (!inputTipsSet ||
            (!inputTipsSet.linkAppDEFieldId && !inputTipsSet.contentAppDEFieldId))
            return;
        try {
            const { linkAppDEFieldId, contentAppDEFieldId, uniqueTagAppDEFieldId } = inputTipsSet;
            const res = await app.deService.exec(inputTipsSet.appDataEntityId, inputTipsSet.appDEDataSetId, this.context, {
                [uniqueTagAppDEFieldId
                    ? `n_${uniqueTagAppDEFieldId.toLowerCase()}_eq`
                    : 'srftiptag']: inputTipUniqueTag ||
                    `${calcDeCodeNameById(appDataEntityId).toUpperCase()}__${appDEFieldId.toUpperCase()}`,
            });
            if (res.ok && Array.isArray(res.data)) {
                // 只获取第一条
                const data = res.data[0];
                if (contentAppDEFieldId)
                    this.state.inputTip =
                        data[contentAppDEFieldId] ||
                            ibiz.i18n.t('runtime.common.noExplanation');
                if (linkAppDEFieldId)
                    this.state.inputTipUrl = data[linkAppDEFieldId];
            }
        }
        catch (error) {
            this.state.inputTip = ibiz.i18n.t('runtime.common.noExplanation');
        }
        finally {
            const cache = localStorage.getItem(this.TIPS_CACHE);
            const data = cache ? JSON.parse(cache) : {};
            Object.assign(data, {
                [this.name]: {
                    inputTip: this.state.inputTip,
                    inputTipUrl: this.state.inputTipUrl,
                },
            });
            localStorage.setItem(this.TIPS_CACHE, JSON.stringify(data));
        }
    }
    /**
     * 清除tis缓存
     *
     * @memberof FormItemController
     */
    clearTipsCache() {
        localStorage.removeItem(this.TIPS_CACHE);
    }
    /**
     * @description 计算动态样式表
     * @param {IData} data
     * @memberof FormItemController
     */
    calcDynaClass(data) {
        var _a;
        super.calcDynaClass(data);
        if ((_a = this.model.editor) === null || _a === void 0 ? void 0 : _a.dynaClass) {
            const dynaClass = calcDynaClass(this.model.editor.dynaClass, data);
            this.state.editorClass = dynaClass;
        }
    }
}
