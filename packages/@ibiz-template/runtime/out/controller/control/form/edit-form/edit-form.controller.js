import { awaitTimeout, IBizContext, isElementSame, mergeInLeft, RuntimeError, } from '@ibiz-template/core';
import { debounce } from 'lodash-es';
import { createUUID } from 'qx-util';
import { clone, isNil } from 'ramda';
import { calcDeCodeNameById, hasDeCodeName } from '../../../../model';
import { Srfuf, ControlVO } from '../../../../service';
import { ScriptFactory } from '../../../../utils';
import { FormNotifyState } from '../../../constant';
import { FormController } from '../form';
import { EditFormService } from './edit-form.service';
/**
 * 编辑表单控制器
 *
 * @author chitanda
 * @date 2022-08-03 11:08:20
 * @export
 * @class EditFormController
 * @extends {FormController<EditFormModel>}
 */
export class EditFormController extends FormController {
    constructor() {
        super(...arguments);
        /**
         * 表单旧数据
         *
         * @author zk
         * @date 2023-12-20 11:12:43
         * @protected
         * @type {IData}
         * @memberof FormController
         */
        this.oldData = new ControlVO();
        /**
         * 锚点数据
         *
         * @type {IData[]}
         * @memberof EditFormController
         */
        this.anchorData = [];
    }
    get view() {
        return this.ctx.view;
    }
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-08-22 22:08:16
     * @protected
     * @returns {*}  {Promise<void>}
     */
    async onCreated() {
        await super.onCreated();
        this.initAnchorData();
        // 实例部件服务
        this.service = new EditFormService(this.model);
        await this.service.init(this.context);
        // 自动保存防抖，只有最后一次执行
        this.autoSave = debounce(this.autoSave.bind(this), 500, {
            trailing: true,
        });
    }
    /**
     * 初始化锚点栏数据
     *
     * @memberof EditFormController
     */
    initAnchorData() {
        var _a;
        if (this.model.showFormNavBar) {
            this.anchorData = [];
            (_a = this.model.deformPages) === null || _a === void 0 ? void 0 : _a.forEach((page) => {
                if (page.deformDetails) {
                    this.parseAnchorModel(page, page.deformDetails);
                }
            });
        }
    }
    /**
     * 解析锚点模型
     *
     * @param {IData[]} [details=[]]
     * @memberof EditFormController
     */
    parseAnchorModel(page, details = []) {
        details.forEach((detail) => {
            if (detail.enableAnchor) {
                this.anchorData.push({
                    pageId: page.id,
                    id: `${this.view.model.codeName}_${this.model.codeName}_${detail.codeName}`,
                    title: detail.caption,
                });
                if (detail.deformDetails) {
                    this.parseAnchorModel(page, detail.deformDetails);
                }
            }
        });
    }
    async onMounted() {
        await super.onMounted();
        // 如果外面没有配置默认不加载的话，默认部件自己加载,simple模式不加载
        if (!this.state.isSimple && this.state.loadDefault) {
            this.load();
        }
    }
    /**
     * 加载草稿行为
     * @author lxm
     * @date 2023-08-25 02:45:11
     * @return {*}  {Promise<IData>}
     */
    async loadDraft(args) {
        const { context, params: queryParams } = this.handlerAbilityParams(args);
        let res;
        const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
        try {
            if (!silent) {
                await this.startLoading();
            }
            await this.evt.emit('onBeforeLoadDraft', { params: queryParams });
            res = await this.service.getDraft(context, queryParams);
        }
        catch (error) {
            await this.evt.emit('onLoadDraftError', undefined);
            this.actionNotification('GETDRAFTERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            if (!silent) {
                await this.endLoading();
            }
        }
        this.state.data = res.data;
        this.formStateNotify(FormNotifyState.DRAFT);
        await this.evt.emit('onLoadDraftSuccess', undefined);
        this.actionNotification('GETDRAFTSUCCESS');
        this.state.isLoaded = true;
        return this.data;
    }
    /**
     * 拷贝模式加载数据
     *
     * @author chitanda
     * @date 2023-09-26 19:09:21
     * @return {*}  {Promise<IData>}
     */
    async copy() {
        const context = clone(this.context);
        const queryParams = clone(this.params);
        const appDataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.model.appId);
        const key = appDataEntity.keyAppDEFieldId;
        if (key && this.params[key]) {
            const deCodeName = calcDeCodeNameById(this.model.appDataEntityId);
            context[deCodeName] = this.params[key];
            delete queryParams[key];
            delete this.params[key];
            delete queryParams.srfcopymode;
            delete this.params.srfcopymode;
        }
        let res;
        try {
            await this.startLoading();
            await this.evt.emit('onBeforeLoad', { args: queryParams });
            res = await this.service.get(context, queryParams);
        }
        catch (error) {
            await this.evt.emit('onLoadError', { args: error });
            this.actionNotification('GETERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            await this.endLoading();
        }
        // 清空主键，重置临时主键
        res.data.srfkey = undefined;
        res.data.tempsrfkey = createUUID();
        this.state.modified = false;
        this.state.data = res.data;
        this.formStateNotify(FormNotifyState.LOAD);
        await this.evt.emit('onLoadSuccess', { args: res.data });
        this.actionNotification('GETSUCCESS');
        this.state.isLoaded = true;
        return this.data;
    }
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    async load(args) {
        // 复制模式独立处理
        const copyMode = this.params.srfcopymode;
        if (copyMode) {
            return this.copy();
        }
        const isLoadDraft = !hasDeCodeName(this.context, calcDeCodeNameById(this.model.appDataEntityId));
        // 加载草稿单独走一个方法
        if (isLoadDraft) {
            return this.loadDraft();
        }
        const { context, params } = this.handlerAbilityParams(args);
        const queryParams = clone(params);
        const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
        let res;
        try {
            if (!silent) {
                await this.startLoading();
            }
            await this.evt.emit('onBeforeLoad', { args: queryParams });
            res = await this.service.get(context, queryParams);
        }
        catch (error) {
            await this.evt.emit('onLoadError', { args: error });
            this.actionNotification('GETERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            if (!silent) {
                await this.endLoading();
            }
        }
        this.state.modified = false;
        this.state.data = res.data;
        // 缓存旧数据
        this.oldData = this.data.clone();
        this.formStateNotify(FormNotifyState.LOAD);
        await this.evt.emit('onLoadSuccess', { args: res.data });
        this.actionNotification('GETSUCCESS');
        this.state.isLoaded = true;
        return this.data;
    }
    /**
     * 保存表单数据
     *
     * @author lxm
     * @date 2022-08-31 22:08:40
     */
    async save(args) {
        // 编辑器默认为blur抛值模式，在销毁弹窗后会触发编辑器blur走值变更和自动保存逻辑
        // 表单保存之前先校验界面域是否存在
        const srfSessionid = this.context.srfsessionid;
        if (!ibiz.uiDomainManager.has(srfSessionid)) {
            return this.data;
        }
        const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
        // 如果数据正在处理中，则延迟保存
        if (this.state.processing) {
            const data = await awaitTimeout(500, this.save.bind(this), [args]);
            return data;
        }
        const isValid = (args === null || args === void 0 ? void 0 : args.silentVerify) === true
            ? await this.silentValidate()
            : await this.validate();
        if (!isValid) {
            if ((args === null || args === void 0 ? void 0 : args.silentVerify) === true) {
                return this.data;
            }
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.formCompletion'));
        }
        if (!silent) {
            await this.startLoading();
        }
        const { context, data } = this.handlerAbilityParams(args);
        const saveData = data[0];
        await this.checkIgnoreInput(saveData);
        const isCreate = saveData.srfuf === Srfuf.CREATE;
        let res;
        try {
            await this.evt.emit('onBeforeSave', { args: saveData });
            res = isCreate
                ? await this.service.create(context, saveData)
                : await this.service.update(context, saveData);
        }
        catch (error) {
            await this.evt.emit('onSaveError', { args: error });
            this.actionNotification(`${isCreate ? 'CREATE' : 'UPDATE'}ERROR`, {
                error: error,
            });
            throw error;
        }
        finally {
            if (!silent) {
                await this.endLoading();
            }
        }
        const noFillBack = (args === null || args === void 0 ? void 0 : args.noFillBack) === true;
        // 保存结束后合并修改临时主键
        if (res.data) {
            // 回填数据的合并后台数据
            if (noFillBack) {
                // 自动保存不回填数据的时候只更新更新时间
                this.data.updatedate = res.data.updatedate;
                this.data.srfkey = res.data.srfkey;
            }
            else {
                mergeInLeft(this.data, res.data);
            }
            // 保存结束后更新旧数据
            this.oldData = this.data.clone();
            this.data.tempsrfkey = this.data.srfkey;
        }
        this.state.modified = false;
        await this.evt.emit('onSaveSuccess', { args: res.data });
        if (!this.view.state.isClosing) {
            this.formStateNotify(FormNotifyState.SAVE);
        }
        if (!silent) {
            this.actionNotification(`${isCreate ? 'CREATE' : 'UPDATE'}SUCCESS`, {
                default: ibiz.i18n.t('runtime.controller.control.form.savedSuccessfully', { srfmajortext: this.data.srfmajortext || '' }),
            });
        }
        // 发送数据变更事件
        this.emitDEDataChange(isCreate ? 'create' : 'update', res.data);
        return this.data;
    }
    /**
     * 删除表单数据
     *
     * @author lxm
     * @date 2022-09-01 09:09:36
     * @returns {*}
     */
    async remove(args) {
        const { context, params } = this.handlerAbilityParams(args);
        // 新建数据清空数据
        let res;
        let ok = false;
        await this.evt.emit('onBeforeRemove', { args: this.data });
        // 新建的数据不用进行后台删除
        if (this.data.srfuf === Srfuf.UPDATE) {
            if ((args === null || args === void 0 ? void 0 : args.silent) !== true) {
                const hiddenSsgItem = this.findCtrlMsgByTag('BEFOREREMOVE_HIDDEN');
                if (hiddenSsgItem) {
                    ok = true;
                }
                else {
                    ok = await ibiz.modal.confirm({
                        title: ibiz.i18n.t('runtime.controller.control.form.prompt'),
                        desc: ibiz.i18n.t('runtime.controller.control.form.deletion'),
                    });
                }
                if (!ok) {
                    // 取消不抛事件
                    return false;
                }
            }
            const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
            if (!silent) {
                await this.startLoading();
            }
            try {
                res = await this.service.remove(context, params);
            }
            catch (error) {
                await this.evt.emit('onRemoveError', { args: error });
                if ((args === null || args === void 0 ? void 0 : args.silent) !== true) {
                    this.actionNotification('REMOVEERROR', {
                        error: error,
                    });
                }
                throw error;
            }
            finally {
                if (!silent) {
                    await this.endLoading();
                }
            }
            ok = res.ok;
        }
        this.emitDEDataChange('remove', this.data);
        // 删除完成后都要置空当前表单数据
        this.state.data = new ControlVO();
        this.state.modified = false;
        await this.evt.emit('onRemoveSuccess', { args: this.data });
        this.actionNotification('REMOVESUCCESS');
        return ok;
    }
    /**
     * 执行返回行为
     *
     * @author lxm
     * @date 2022-09-01 09:09:36
     * @returns {*}
     */
    async goBack() {
        await this.startLoading();
        let res;
        try {
            res = await this.service.goBack(this.context, this.data);
        }
        finally {
            await this.endLoading();
        }
        // 合并后台返回数据
        if (res.data) {
            mergeInLeft(this.data, res.data);
        }
        return this.data;
    }
    /**
     * 表单项更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:13
     * @param {string} methodName 更新实体方法
     * @param {string[]} updateItems 更新项名称集合
     */
    async updateFormItem(formItemUpdateId) {
        var _a;
        const formItemUpdate = (_a = this.model.deformItemUpdates) === null || _a === void 0 ? void 0 : _a.find(item => item.id === formItemUpdateId);
        if (!formItemUpdate) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.itemUpdate', {
                formItemUpdateId,
            }));
        }
        const { appDEMethodId, defiupdateDetails, customCode, scriptCode, showBusyIndicator, } = formItemUpdate;
        const updateItems = defiupdateDetails === null || defiupdateDetails === void 0 ? void 0 : defiupdateDetails.map(item => item.id);
        try {
            if (showBusyIndicator) {
                this.startLoading();
            }
            let updateData; // 要修改的数据
            if (customCode && scriptCode) {
                // 脚本模式获取修改数据
                updateData = ScriptFactory.execScriptFn(Object.assign(Object.assign({}, this.getEventArgs()), { data: this.data }), scriptCode, {
                    isAsync: false,
                });
            }
            else {
                // 后台服务获取修改数据
                const params = Object.assign(Object.assign({}, this.params), this.data.getOrigin());
                const res = await this.service.updateFormItem(appDEMethodId, this.context, params);
                updateData = res.data;
            }
            // 修改表单项更新的值
            if (updateData && (updateItems === null || updateItems === void 0 ? void 0 : updateItems.length)) {
                await Promise.all(updateItems.map(itemName => this.setDataValue(itemName, updateData[itemName])));
            }
        }
        finally {
            if (showBusyIndicator) {
                this.endLoading();
            }
        }
    }
    /**
     * 工作流启动(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:41
     * @param {IParams} [extraParams={}] 不走工作流启动视图时使用
     * @returns {*}  {Promise<void>}
     */
    async wfStart(args) {
        const isValid = await this.validate();
        if (!isValid) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.formCompletion'));
        }
        const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
        if (!silent) {
            await this.startLoading();
        }
        const { context, params } = this.handlerAbilityParams(args);
        try {
            await this.service.wfStart(context, params, this.data);
            this.emitDEDataChange('update', this.data);
            // 刷新预定义todo实体数据
            this.emitDEDataChange('update', { srfdecodename: 'SysTodo' });
        }
        catch (error) {
            this.actionNotification('WFSTARTERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            if (!silent) {
                await this.endLoading();
            }
        }
        this.actionNotification('WFSTARTSUCCESS', {
            default: ibiz.i18n.t('runtime.controller.control.form.processStarted'),
        });
    }
    /**
     * 工作流提交(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:56
     * @param {IParams} [extraParams={}] 不走工作流操作视图时使用
     * @returns {*}  {Promise<void>}
     */
    async wfSubmit(args) {
        const isValid = await this.validate();
        if (!isValid) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.form.formCompletion'));
        }
        const silent = (args === null || args === void 0 ? void 0 : args.silent) === true;
        if (!silent) {
            await this.startLoading();
        }
        const { context, params } = this.handlerAbilityParams(args);
        try {
            await this.service.wfSubmit(context, params, this.data);
            this.emitDEDataChange('update', this.data);
            // 刷新预定义todo实体数据
            this.emitDEDataChange('update', { srfdecodename: 'SysTodo' });
        }
        catch (error) {
            this.actionNotification('WFSUBMITERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            if (!silent) {
                await this.endLoading();
            }
        }
        this.actionNotification('WFSUBMITSUCCESS', {
            default: ibiz.i18n.t('runtime.controller.control.form.processSubmitted'),
        });
    }
    async dataChangeNotify(names) {
        await super.dataChangeNotify(names);
        this.autoSave();
    }
    /**
     * 自动保存
     * @author lxm
     * @date 2023-08-23 05:44:48
     * @return {*}  {Promise<void>}
     */
    async autoSave() {
        if (!this.model.enableAutoSave) {
            return;
        }
        // todo 临时模型数据 节流保存
        const { autoSaveMode } = this.model;
        // 自动保存静默，报错直接控制台输出
        const saveParam = {
            silent: true,
            noFillBack: false,
            silentVerify: true,
        };
        switch (autoSaveMode) {
            case 3:
                saveParam.data = this.getDiffData();
                saveParam.context = IBizContext.create({ srfsimple: true });
                break;
            default:
        }
        try {
            await this.save(saveParam);
        }
        catch (error) {
            ibiz.log.error(error);
            throw error;
        }
    }
    /**
     * 立即执行自动保存
     *
     * @return {*}  {Promise<void>}
     * @memberof EditFormController
     */
    async immediateAutoSave() {
        if (!this.model.enableAutoSave) {
            return;
        }
        // todo 临时模型数据 节流保存
        const { autoSaveMode } = this.model;
        // 自动保存静默，报错直接控制台输出
        const saveParam = {
            silent: true,
            noFillBack: false,
            silentVerify: true,
        };
        switch (autoSaveMode) {
            case 3:
                saveParam.data = this.getDiffData();
                saveParam.context = IBizContext.create({ srfsimple: true });
                break;
            default:
        }
        try {
            await this.save(saveParam);
        }
        catch (error) {
            ibiz.log.error(error);
        }
    }
    /**
     * 比较旧数据跟当前数据的差异返回差异数据
     *
     * @author zk
     * @date 2023-12-20 10:12:06
     * @protected
     * @return {*}  {ControlVO}
     * @memberof EditFormController
     */
    getDiffData() {
        const { data } = this.state;
        const diffData = {};
        Object.keys(data).forEach(key => {
            // 值不一致 || 属性为主键
            if (Array.isArray(data[key])) {
                if (!isElementSame(data[key], this.oldData[key])) {
                    diffData[key] = data[key];
                }
            }
            else if (data[key] !== this.oldData[key] || key === data.srfkeyfield) {
                diffData[key] = data[key];
            }
        });
        diffData.srfuf = data.srfuf;
        return new ControlVO(diffData, this.oldData.$dataUIMap);
    }
    /**
     * 设置simple模式的数据
     * @author lxm
     * @date 2023-11-22 07:11:21
     * @param {IData} data
     */
    setSimpleData(data) {
        // data由外部直接修改，先克隆一份隔离跟外部的对象。补全对应表单项字段不存在的时候设置为null，避免响应式问题。
        const UIData = this.service.toUIData(data);
        const cloneData = UIData.clone();
        this.oldData = this.state.data.clone();
        this.formItems.forEach(item => {
            if (!Object.prototype.hasOwnProperty.call(cloneData, item.name)) {
                cloneData[item.name] = null;
            }
        });
        this.state.modified = false;
        this.state.data = cloneData;
        if (!this.state.isLoaded) {
            // 第一次设置的时候走更新通知，触发更新默认值
            this.formStateNotify(FormNotifyState.LOAD);
            this.state.isLoaded = true;
        }
        else {
            // 后续的变更都只走值变更触发
            const diffData = this.getDiffData().getOrigin();
            // 只传递变化项名称
            this.dataChangeNotify(Object.keys(diffData));
        }
    }
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:14
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    onDEDataChange(msg) {
        var _a;
        // 表单只关心更新
        if (msg.subtype !== 'OBJECTUPDATED') {
            return;
        }
        // msg.triggerKey 不为空，且与当前控制器的triggerKey一致时，则不处理
        if (!isNil(msg.triggerKey) && msg.triggerKey === this.triggerKey) {
            return;
        }
        // 非这个实体的数据变更，则不处理
        // 非当前主键的变更不处理
        if (this.model.appDataEntityId) {
            const dename = calcDeCodeNameById(this.model.appDataEntityId);
            if (!msg.data ||
                ((_a = msg.data.srfdecodename) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== dename ||
                msg.data.srfkey !== this.data.srfkey) {
                return;
            }
            this.doNextActive(() => !this.ctx.isDestroyed && this.load(), {
                key: 'load',
            });
        }
    }
}
