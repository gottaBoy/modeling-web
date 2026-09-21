/* eslint-disable no-param-reassign */
import { RuntimeModelError, debounceAndAsyncMerge, recursiveIterate, EntityError, RuntimeError, } from '@ibiz-template/core';
import { isBoolean } from 'qx-util';
import { clone } from 'ramda';
import { calcDeCodeNameById, findChildFormDetails, isFormDataContainer, } from '../../../../model';
import { getFormDetailProvider } from '../../../../register';
import { ControlVO, CounterService, Srfuf, } from '../../../../service';
import { handleAllSettled } from '../../../../utils';
import { ControlController } from '../../../common';
import { isValueChange } from '../../../utils';
/**
 * 表单控制器
 *
 * @author chitanda
 * @date 2022-08-03 11:08:29
 * @export
 * @class FormController
 * @extends {ControlController<T>}
 * @template T
 */
export class FormController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 所有表单项成员的控制器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IFormDetailController }}
         */
        this.details = {};
        /**
         * 所有表单项成员的适配器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IFormDetailProvider }}
         */
        this.providers = {};
        /**
         * 表单项控制器的集合
         *
         * @author lxm
         * @date 2022-09-05 00:09:52
         * @type {FormItemController[]}
         */
        this.formItems = [];
        /**
         * 表单多数据部件控制器的集合
         *
         * @author lxm
         * @date 2022-09-05 00:09:52
         * @type {FormMDCtrlController[]}
         */
        this.formMDCtrls = [];
        /**
         * @description 表单关系界面
         * @type {FormDRUIPartController[]}
         * @memberof FormController
         */
        this.formDruipart = [];
        /**
         * 计数器对象
         * @author lxm
         * @date 2024-01-18 05:12:35
         * @type {AppCounter}
         */
        this.counters = {};
    }
    get _evt() {
        return this.evt;
    }
    /**
     * 表单数据
     *
     * @author chitanda
     * @date 2023-01-04 10:01:46
     * @readonly
     * @type {IData}
     */
    get data() {
        return this.state.data;
    }
    initState() {
        var _a, _b;
        super.initState();
        this.state.activeTab = ((_b = (_a = this.model.deformPages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id) || '';
        this.state.data = new ControlVO();
        this.state.isLoaded = false;
        this.state.processing = false;
        this.state.modified = false;
        this.state.formIsDestroyed = false;
    }
    /**
     * 设置激活分页
     *
     * @param {string} name
     * @memberof FormController
     */
    setActiveTab(name) {
        this.state.activeTab = name;
    }
    /**
     * 更新表单分页面板
     *
     * @author zhanghengfeng
     * @date 2025-02-05 20:02:12
     */
    updateFormTabPanel() {
        Object.values(this.details).forEach(detail => {
            var _a, _b;
            if (detail.model.detailType === 'TABPANEL') {
                (_b = (_a = detail).updateActiveTab) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
        });
    }
    /**
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    async dataChangeNotify(names) {
        // 通知所有成员项去处理成员项相关逻辑
        await handleAllSettled(Object.values(this.details).map(async (detail) => {
            return detail.dataChangeNotify(names);
        }));
        this.updateFormTabPanel();
    }
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(state) {
        Object.values(this.details).forEach(detail => {
            detail.formStateNotify(state);
        });
        this.updateFormTabPanel();
    }
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:59
     * @protected
     * @returns {*}  {Promise<void>}
     */
    async onCreated() {
        await super.onCreated();
        await this.initDetailControllers();
        // 初始化计数器
        await this.initCounter();
        // 数据变更通知防抖，且合并参数
        this.dataChangeNotify = debounceAndAsyncMerge(this.dataChangeNotify.bind(this), (arr1, arr2) => {
            return [Array.from(new Set([...arr1[0], ...arr2[0]]))];
        }, 200);
        // 监听表单成员事件，触发对应部件逻辑
        this._evt.on('onFormDetailEvent', event => {
            var _a;
            if (this.state.formIsDestroyed)
                return;
            (_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.triggerControlEvent(event.formDetailName, event.formDetailEventName, event);
        });
    }
    /**
     * 初始化表单成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    async initDetailControllers(details = this.model.deformPages, form = this, parent = undefined) {
        await Promise.all(details.map(async (detail) => {
            // 生成表单成员控制器
            const detailProvider = await getFormDetailProvider(detail, this.model);
            if (!detailProvider) {
                return;
            }
            if (form.details[detail.id]) {
                throw new RuntimeModelError(detail, ibiz.i18n.t('runtime.controller.control.form.initializationException', {
                    id: detail.id,
                    detailType: detail.detailType,
                }));
            }
            form.providers[detail.id] = detailProvider;
            const detailController = await detailProvider.createController(detail, form, parent);
            form.details[detail.id] = detailController;
            if (detail.detailType === 'FORMITEM') {
                if (detail.compositeItem) {
                    const { editorItems = [] } = detail.editor || {};
                    await Promise.all(editorItems.map(async (editorItem) => {
                        const childrenController = await detailProvider.createController(Object.assign(Object.assign({}, detail), { id: editorItem.id }), form, parent);
                        form.details[editorItem.id] = childrenController;
                        form.formItems.push(childrenController);
                    }));
                }
                else {
                    form.formItems.push(detailController);
                }
            }
            if (detail.detailType === 'MDCTRL') {
                form.formMDCtrls.push(detailController);
            }
            if (detail.detailType === 'DRUIPART') {
                form.formDruipart.push(detailController);
            }
            // 数据容器的子不递归了
            if (isFormDataContainer(detail)) {
                return;
            }
            // 有子成员的生成子控制器
            const childDetails = findChildFormDetails(detail);
            if (childDetails.length) {
                await this.initDetailControllers(childDetails, form, detailController);
            }
        }));
    }
    /**
     * 获取表单数据
     *
     * @author lxm
     * @date 2022-08-30 19:08:11
     * @returns {*}
     */
    getData() {
        return [this.state.data];
    }
    /**
     * 设置表单数据的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {string} name 要设置的表单数据的属性名称
     * @param {unknown} value 要设置的值
     * @param {boolean} ignore 忽略脏值检查
     */
    async setDataValue(name, value, ignore = false) {
        if (Object.prototype.hasOwnProperty.call(this.state.data, name) &&
            !isValueChange(this.state.data[name], value)) {
            // *`表单里没有属性${name}或者${name}的值未发生改变`
            return;
        }
        const oldValue = this.state.data[name];
        // 改变值
        this.state.data[name] = value;
        // 设置正在处理状态
        this.state.processing = true;
        if (!ignore) {
            this.state.modified = true;
        }
        await this._evt.emit('onFormDataChange', { name, value, oldValue });
        if (this.state.formIsDestroyed)
            return;
        try {
            await this.dataChangeNotify([name]);
        }
        finally {
            this.state.processing = false;
        }
    }
    async updateFormItem(_formItemUpdateId) {
        // 子类实现
    }
    /**
     * 检查忽略输入值(解除表单项和实体属性之间的联系，方便表单服务过滤)
     *
     * @author tony001
     * @date 2025-01-09 16:01:29
     * @param {IData} data
     * @return {*}  {Promise<void>}
     */
    async checkIgnoreInput(data) {
        const formData = clone(data);
        const formDataUIMap = formData.$dataUIMap;
        const isCreate = formData.srfuf === Srfuf.CREATE;
        this.formItems.forEach((formItem) => {
            const { ignoreInput } = formItem.model;
            switch (ignoreInput) {
                // 建立（数据建立时忽略）
                case 1:
                    if (isCreate)
                        formDataUIMap.delete(formItem.name);
                    break;
                // 更新（数据更新时忽略）
                case 2:
                    if (!isCreate)
                        formDataUIMap.delete(formItem.name);
                    break;
                // 建立及更新（数据建立及更新时都忽略）
                case 3:
                    formDataUIMap.delete(formItem.name);
                    break;
                // 表单项禁用（表单项处于禁用状态时忽略）
                case 4:
                    if (formItem.state.disabled)
                        formDataUIMap.delete(formItem.name);
                    break;
                default:
                    ibiz.log.debug(`[${ignoreInput}]类型忽略输入值暂未支持`);
                    break;
            }
        });
    }
    /**
     * 校验表单的全部表单项
     *
     * @author lxm
     * @date 2022-09-05 00:09:53
     * @returns {*}  {Promise<boolean>}
     */
    async validate() {
        const values = await Promise.all([...this.formItems, ...this.formMDCtrls, ...this.formDruipart].map(formItem => formItem.validate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 静默校验
     * - 只校验无提示信息
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormController
     */
    async silentValidate() {
        const values = await Promise.all([...this.formItems, ...this.formMDCtrls, ...this.formDruipart].map(formItem => formItem.silentValidate()));
        // 找不到value为false即全部是true
        return values.findIndex(value => !value) === -1;
    }
    /**
     * 执行对应部件行为消息提示
     * @author zzq
     * @date 2024-04-03 15:51:21
     * @param {string} tag
     * @param {({ default?: string; data?: IData | IData[]; error?: Error })} [opts]
     * @return {*}  {void}
     */
    actionNotification(tag, opts) {
        if ((opts === null || opts === void 0 ? void 0 : opts.error) && opts.error instanceof EntityError) {
            const { details } = opts.error;
            details.forEach(detail => {
                this.setDetailError(detail.name, detail.errorInfo);
            });
        }
        super.actionNotification(tag, Object.assign({ data: this.data }, (opts || {})));
    }
    /**
     * 初始化部件逻辑调度器
     * @author lxm
     * @date 2023-08-21 11:53:37
     * @param {IControlLogic[]} logics
     * @return {*}  {void}
     */
    initControlScheduler(logics = []) {
        const actualLogics = [...logics];
        // 遍历所有的项，如果有逻辑的话加入
        recursiveIterate(this.model, (item) => {
            if (item.controlLogics) {
                actualLogics.push(...item.controlLogics);
            }
        }, {
            childrenFields: ['deformPages', 'deformTabPages', 'deformDetails'],
        });
        super.initControlScheduler(actualLogics);
    }
    async onDestroyed() {
        this.state.formIsDestroyed = true;
        await super.onDestroyed();
        // 销毁视图计数器
        Object.values(this.counters).forEach(counter => counter.destroy());
    }
    /**
     * 初始化计数器
     * @author lxm
     * @date 2024-01-18 05:12:02
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initCounter() {
        this.counters = {};
        const { appCounterRefs } = this.model;
        if (appCounterRefs && appCounterRefs.length > 0) {
            const dataKey = this.context[calcDeCodeNameById(this.model.appDataEntityId)];
            try {
                await Promise.all(appCounterRefs.map(async (counterRef) => {
                    const counter = await CounterService.getCounterByRef(counterRef, this.context, dataKey
                        ? Object.assign({ srfcustomtag: dataKey }, this.params) : Object.assign({}, this.params));
                    this.counters[counterRef.id] = counter;
                }));
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    /**
     * 设置表单项错误信息
     * @author zzq
     * @date 2024-04-03 18:12:02
     * @protected
     * @return {*}  {void}
     */
    setDetailError(name, message) {
        const detail = this.details[name];
        const state = detail === null || detail === void 0 ? void 0 : detail.state;
        if (state) {
            state.error = message;
        }
    }
    /**
     * 刷新
     * - 表单刷新时刷新所有数据（表单数据，计数器数据）
     * @return {*}  {Promise<void>}
     * @memberof FormController
     */
    async refresh() {
        this.doNextActive(async () => {
            await Promise.all(Object.values(this.counters).map(counter => counter.refresh(this.context, this.params)));
            await this.load();
        }, {
            key: 'refresh',
        });
    }
    /**
     * @description 切换分组折叠
     * @memberof FormController
     */
    changeCollapse(params = {}) {
        const { tag, expand } = params;
        // 存在分组id则展开/收缩分组
        if (tag) {
            const group = this.details[tag];
            if (!group) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.noFoundFormGroup'));
            }
            group.state.collapse = isBoolean(expand)
                ? !expand
                : !group.state.collapse;
            // 表单分组收缩与展开默认操作子分组
            const { deformDetails } = group.model;
            if (deformDetails && deformDetails.length > 0) {
                deformDetails.forEach(item => {
                    if (item.detailType === 'GROUPPANEL') {
                        this.changeCollapse({ tag: item.codeName, expand });
                    }
                });
            }
        }
        else {
            // 不存在分组id时全展开/全收缩
            Object.values(this.details).forEach(group => {
                if (group.model.detailType === 'GROUPPANEL') {
                    group.state.collapse = isBoolean(expand)
                        ? !expand
                        : group.state.collapse;
                }
            });
        }
    }
}
