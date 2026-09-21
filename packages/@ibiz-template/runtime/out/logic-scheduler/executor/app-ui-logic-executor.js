var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ModelError, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { notNilEmpty } from 'qx-util';
import { OpenAppViewCommand } from '../../command';
import { calcDeCodeNameById } from '../../model';
import { convertNavData } from '../../utils';
import { LogicExecutor } from './logic-executor';
import { Srfuf } from '../../service';
/**
 * 应用预置界面逻辑
 * @author lxm
 * @date 2023-07-17 01:57:27
 * @export
 * @class AppUILogicExecutor
 * @extends {LogicExecutor}
 */
export class AppUILogicExecutor extends LogicExecutor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async execute(executeParams) {
        let result;
        try {
            if (this.logic.builtinAppUILogic &&
                this.logic.builtinAppUILogic.viewLogicType === 'APP_OPENDATA') {
                // 执行打开数据界面逻辑
                result = await this.executeOpenDataAppUILogic(this.logic.builtinAppUILogic, executeParams);
            }
            else if (this.logic.builtinAppUILogic &&
                this.logic.builtinAppUILogic.viewLogicType === 'APP_NEWDATA') {
                // 执行新建数据逻辑
                result = await this.executeNewDataAppUILogic(this.logic.builtinAppUILogic, executeParams);
            }
        }
        catch (error) {
            ibiz.log.error(error);
        }
        return result;
    }
    /**
     * 执行应用预置界面逻辑 opendata
     *
     * @author chitanda
     * @date 2023-11-02 11:11:36
     * @param {IAppUIOpenDataLogic} appUILogic 应用预置界面逻辑 opendata 模型对象
     * @param {IUILogicParams} parameters
     * @return {*}  {Promise<IModalData>}
     */
    async executeOpenDataAppUILogic(appUILogic, parameters) {
        const { context, params } = parameters, rest = __rest(parameters, ["context", "params"]);
        const { data } = parameters;
        if (!(data === null || data === void 0 ? void 0 : data[0])) {
            throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.executor.noActionableData'));
        }
        // openDataAppViews 只有[索引实体]或[多表单实体]才会有值
        const openViewRefs = appUILogic.openDataAppViews;
        let openViewRef;
        if (openViewRefs) {
            openViewRef = await this.calcOpenViewRef(appUILogic, parameters);
        }
        else {
            // 准备需要的模型
            openViewRef = appUILogic.openDataAppView;
            if (!openViewRef) {
                throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.defaultOpendataViewLogic'));
            }
        }
        const openView = openViewRef.refAppViewId;
        if (!openView) {
            throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.noActuallyReference'));
        }
        // 处理导航参数
        // 处理上下文导航参数
        const navContexts = openViewRef.navigateContexts || [];
        const tempContext = Object.assign(context, convertNavData(navContexts, data[0], params, context));
        // 处理导航视图参数
        let tempParams = {};
        const navParams = openViewRef.navigateParams;
        if (notNilEmpty(navParams)) {
            tempParams = convertNavData(navParams, data[0], params, context);
        }
        // 添加触发源
        ibiz.util.record.addTriggerLogic(context.srfviewid, {
            navContexts,
            navParams,
        }, tempContext);
        // 打开视图
        return ibiz.commands.execute(OpenAppViewCommand.TAG, openView, tempContext, tempParams, Object.assign(Object.assign({}, rest), { openMode: openViewRef.openMode }));
    }
    async calcOpenViewRef(appUILogic, parameters) {
        const appDataEntity = await ibiz.hub.getAppDataEntity(parameters.view.model.appDataEntityId, parameters.view.model.appId);
        // [多表单实体] or [索引实体]类型属性
        const typeFileName = appDataEntity.formTypeAppDEFieldId || appDataEntity.dataTypeAppDEFieldId;
        if (!typeFileName) {
            throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.attributeConfiguration', {
                codeName: appDataEntity.codeName,
            }));
        }
        const { data } = parameters;
        // 表单类型值
        const formTypeValue = data[0][typeFileName];
        if (!formTypeValue) {
            throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.entityAttributeValues'));
        }
        const openViewRefs = appUILogic.openDataAppViews;
        // 根据表单类型值找到实际打开的视图
        const findView = openViewRefs === null || openViewRefs === void 0 ? void 0 : openViewRefs.find(item => item.refMode === formTypeValue);
        if (!findView) {
            throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.executor.editViews', {
                formTypeValue,
            }));
        }
        return findView;
    }
    /**
     * 执行应用预置界面逻辑newdata
     *
     * @author lxm
     * @date 2022-08-22 14:08:03
     * @export
     * @param {IPSAppUINewDataLogic} appUILogic 应用预置界面逻辑newdata模型对象
     * @param {IContext} context 上下文参数
     * @param {(IData | null)} data 数据集合
     * @param {IParams} params 视图参数
     * @param {IData} [opts] 额外参数，event是js原生事件
     */
    async executeNewDataAppUILogic(appUILogic, parameters) {
        const { context, params } = parameters, rest = __rest(parameters, ["context", "params"]);
        const { data, view } = parameters;
        const { enableWizardAdd, enableBatchAdd, batchAddOnly, newDataAppView } = appUILogic;
        let newViewRef;
        if (enableWizardAdd) {
            newViewRef = await this.getWizardNewViewRef(appUILogic, parameters);
            if (!newViewRef) {
                // 选择视图取消操作直接返回
                return { ok: false };
            }
        }
        else if (enableBatchAdd) {
            // 查找批添加打开视图
            const parentDeName = calcDeCodeNameById(view.parentView.model.appDataEntityId);
            const batchViews = appUILogic.batchAddAppViews;
            newViewRef = batchViews === null || batchViews === void 0 ? void 0 : batchViews.find(viewRef => {
                return viewRef.refMode.toLowerCase() !== parentDeName;
            });
            if (!newViewRef) {
                throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.selectionView'));
            }
        }
        else if (batchAddOnly) {
            // todo 只支持批添加
            throw new ModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.noSupportedBatchAddOnly'));
        }
        else {
            // 准备需要的模型
            newViewRef = newDataAppView;
            if (!newViewRef || !newViewRef.refAppViewId) {
                throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.newdataViewLogic'));
            }
        }
        // 处理导航参数
        let tempContext = {};
        let tempParams = {};
        const _data = (data === null || data === void 0 ? void 0 : data[0]) || {};
        const navContexts = newViewRef.navigateContexts;
        if (notNilEmpty(navContexts)) {
            tempContext = convertNavData(navContexts, _data, params, context);
        }
        tempContext = Object.assign(context.clone(), tempContext);
        const navParams = newViewRef.navigateParams;
        if (notNilEmpty(navParams)) {
            tempParams = convertNavData(navParams, _data, params, context);
        }
        // 添加触发源
        ibiz.util.record.addTriggerLogic(context.srfviewid, {
            navContexts,
            navParams,
        }, tempContext);
        // 拷贝数据处理
        if (params.srfcopymode) {
            const entity = await ibiz.hub.getAppDataEntity(view.model.appDataEntityId, view.model.appId);
            const key = entity.keyAppDEFieldId;
            if (key && _data) {
                tempParams[key] = _data.srfkey;
                tempParams.srfcopymode = true;
            }
        }
        // 特殊处理标记，标记当前是新建数据。在打开视图前会被删除，具体在 open-app-view.ts 中处理
        tempParams.srfuf = Srfuf.CREATE;
        // 打开视图
        const result = await ibiz.commands.execute(OpenAppViewCommand.TAG, newViewRef.refAppViewId, tempContext, tempParams, Object.assign(Object.assign({}, rest), { openMode: newViewRef.openMode }));
        // 执行批添加新建逻辑
        if (enableBatchAdd && result.data) {
            await this.doBatchAdd(appUILogic, result.data, context, newViewRef, parameters.view);
        }
        return result;
    }
    /**
     * 获取向导新建视图引用
     * 返回undefined为取消操作
     * 找不到会报错
     * @author lxm
     * @date 2023-08-03 06:37:22
     * @protected
     * @param {IAppUINewDataLogic} appUILogic
     * @param {IUILogicParams} parameters
     * @return {*}  {(Promise<IAppUILogicRefViewBase | undefined>)}
     */
    async getWizardNewViewRef(appUILogic, parameters) {
        var _a;
        const { wizardAppView, newDataAppViews } = appUILogic;
        const { context, params } = parameters, rest = __rest(parameters, ["context", "params"]);
        // 索引实体的向导添加
        if (!wizardAppView || !wizardAppView.refAppViewId) {
            throw new RuntimeModelError(appUILogic, ibiz.i18n.t('runtime.logicScheduler.executor.indexEntity'));
        }
        // 打开视图
        const result = await ibiz.commands.execute(OpenAppViewCommand.TAG, wizardAppView.refAppViewId, context, params, Object.assign(Object.assign({}, rest), { openMode: 'POPUPMODAL' }));
        if (!result.ok) {
            // 取消
            return;
        }
        const selectData = (_a = result.data) === null || _a === void 0 ? void 0 : _a[0];
        if (!selectData) {
            throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.executor.checkOne'));
        }
        const indexType = selectData.srfkey;
        const findView = newDataAppViews === null || newDataAppViews === void 0 ? void 0 : newDataAppViews.find(item => { var _a; return ((_a = item.refMode) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === indexType.toUpperCase(); });
        if (!findView) {
            throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.executor.entitiesAssociated', {
                indexType,
            }));
        }
        return findView;
    }
    /**
     * 拿选中的数据做批添加新建
     * @author lxm
     * @date 2023-09-15 05:20:02
     * @protected
     * @param {IAppUIOpenDataLogic} appUILogic
     * @param {IData[]} selections
     * @param {IContext} context
     * @param {IAppUILogicRefViewBase} newViewRef
     * @return {*}  {Promise<void>}
     */
    async doBatchAdd(appUILogic, selections, context, newViewRef, view) {
        var _a;
        // 批添加新建选中数据后
        if (selections === null || selections === void 0 ? void 0 : selections.length) {
            const selfDe = await ibiz.hub.getAppDataEntity(appUILogic.appDataEntityId, context.srfappid);
            const minorDERs = selfDe.minorAppDERSs;
            const pickParentDeName = newViewRef.refMode.toLowerCase();
            if (!minorDERs) {
                throw new RuntimeModelError(selfDe, ibiz.i18n.t('runtime.logicScheduler.executor.relationships'));
            }
            // *获取选择视图对应父实体在当前实体里的外键属性名称。
            let pickParentFieldName = '';
            minorDERs === null || minorDERs === void 0 ? void 0 : minorDERs.forEach(item => {
                const majorDeName = calcDeCodeNameById(item.majorAppDataEntityId);
                if (pickParentDeName === majorDeName) {
                    pickParentFieldName = item.parentAppDEFieldId;
                }
            });
            if (pickParentFieldName === undefined) {
                throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.executor.foreignKey', {
                    pickParentDeName,
                }));
            }
            // *转换的属性映射，默认映射一个外键属性，额外的通过当前视图的参数配置PROPERTYMAP
            const keyMapping = {
                srfkey: pickParentFieldName,
            };
            const propertyMap = (_a = view.model.appViewParams) === null || _a === void 0 ? void 0 : _a.find(item => item.key.toLowerCase() === 'PROPERTYMAP'.toLowerCase());
            if (propertyMap) {
                const keyValuePairs = propertyMap.value.split(',');
                // 遍历键值对数组并添加到 keyMapping 映射对象中
                for (const pair of keyValuePairs) {
                    const [sourceKey, targetKey] = pair.split(':');
                    if (sourceKey && targetKey) {
                        keyMapping[sourceKey] = targetKey;
                    }
                }
            }
            ibiz.log.debug(ibiz.i18n.t('runtime.logicScheduler.executor.mappingProperties'), keyMapping);
            // *转换属性
            const addData = selections.map(item => {
                const tempData = {};
                // 遍历映射对象，将属性从 item 复制到 tempData
                Object.keys(keyMapping).forEach(key => {
                    const targetKey = keyMapping[key];
                    tempData[targetKey] = item[key];
                });
                return tempData;
            });
            ibiz.log.debug(ibiz.i18n.t('runtime.logicScheduler.executor.newCreationData'), addData);
            // 获取实体服务并调用创建接口
            const service = ibiz.hub.getApp(context.srfappid).deService;
            await service.exec(selfDe.id, 'Create', context, addData);
        }
    }
}
