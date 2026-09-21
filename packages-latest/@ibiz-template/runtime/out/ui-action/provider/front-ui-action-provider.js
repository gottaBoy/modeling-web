import { StringUtil, ModelError, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { clone, mergeRight } from 'ramda';
import { OpenAppViewCommand } from '../../command';
import { ScriptFactory } from '../../utils';
import { UIActionProviderBase } from './ui-action-provider-base';
import { openDataImport } from '../../controller/utils';
import { SysUIActionTag } from '../../constant';
import { calcResPath } from '../../service';
/**
 * 前台调用界面行为适配器
 *
 * @export
 * @class FrontUIActionProvider
 * @implements {IUIActionProvider}
 */
export class FrontUIActionProvider extends UIActionProviderBase {
    async execAction(action, args) {
        const { context, params, data, event, noWaitRoute, view } = args;
        let actionResult = {};
        switch (action.frontProcessType) {
            case 'OPENHTMLPAGE': {
                const url = StringUtil.fill(action.htmlPageUrl, context, params, data === null || data === void 0 ? void 0 : data[0]);
                window.open(url, '_blank');
                break;
            }
            case 'TOP':
            case 'WIZARD': {
                const frontPSAppView = action.frontAppViewId;
                if (!frontPSAppView) {
                    throw new RuntimeModelError(action, ibiz.i18n.t('runtime.uiAction.noConfiguredopenView'));
                }
                // 处理参数
                const { resultContext, resultParams, resultData } = await this.handleParams(action, context, data, params);
                // 获取视图数据能力部件
                const { xdataControlName = '' } = view.model;
                const xdataControl = view.getController(xdataControlName);
                if (xdataControl) {
                    // 添加srfnavctrlid到上下文，适配上一条，下一条，第一条，最后一条相关功能
                    resultContext.srfnavctrlid = xdataControl.ctrlId;
                }
                //  解析自定义 视图 option 参数
                const options = this.handleViewOptionParams(resultParams);
                const res = await ibiz.commands.execute(OpenAppViewCommand.TAG, frontPSAppView, resultContext, resultParams, Object.assign({ ctx: view.getCtx(), event,
                    noWaitRoute, parentData: resultData }, options));
                // 打开视图取消操作
                if (!(res === null || res === void 0 ? void 0 : res.ok)) {
                    actionResult.cancel = true;
                }
                if ((res === null || res === void 0 ? void 0 : res.ok) && res.data) {
                    actionResult.data = res.data;
                    actionResult.nextContext = resultContext;
                    actionResult.nextParams = Object.assign(Object.assign({}, params), resultParams);
                }
                break;
            }
            case 'PRINT':
                await this.executePrint(action, args);
                break;
            case 'DATAIMP':
                actionResult = await this.executeDataImport(action, args);
                break;
            case 'DATAEXP':
                await this.executeDataExport(action, args);
                break;
            case 'OTHER':
                actionResult = await this.doOther(action, args);
                break;
            case 'EDITFORM':
                actionResult = await this.openEditForm(action, args);
                break;
            case 'QUICKEDIT':
                actionResult = await this.openQuickEdit(action, args);
                break;
            case 'CHAT':
                actionResult = await this.openAiChat(action, args);
                break;
            default:
                throw new ModelError(action, ibiz.i18n.t('runtime.uiAction.frontProcessingModes', {
                    frontProcessType: action.frontProcessType,
                }));
        }
        return actionResult;
    }
    /**
     * 处理模式：用户自定义
     * @author lxm
     * @date 2023-07-25 02:39:48
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    async doOther(action, args) {
        const { context, params, data, event, view, ctrl } = args;
        const { resultContext, resultParams } = await this.handleParams(action, context, data, params);
        const { scriptCode, uiactionTag } = action;
        if (uiactionTag === SysUIActionTag.SHOTR_CUT) {
            const result = await view.callUIAction(uiactionTag, args);
            return result || {};
        }
        if (scriptCode) {
            const result = (await ScriptFactory.asyncExecScriptFn({
                context: resultContext,
                params: Object.assign(Object.assign({}, params), resultParams),
                data,
                el: event === null || event === void 0 ? void 0 : event.target,
                view,
                ctrl,
                action,
            }, scriptCode));
            return result || {};
        }
        throw new RuntimeModelError(action, ibiz.i18n.t('runtime.uiAction.missingConfigurationScriptCode'));
    }
    /**
     * 执行打印行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    async executePrint(action, args) {
        var _a;
        // 处理参数
        const { resultContext, resultParams } = await this.handleParams(action, args.context, args.data, args.params);
        const appDataEntity = await ibiz.hub.getAppDataEntity(action.appDataEntityId, action.appId);
        const appDEPrint = (_a = appDataEntity.appDEPrints) === null || _a === void 0 ? void 0 : _a.find(print => {
            return print.id === action.appDEPrintId;
        });
        if (appDEPrint) {
            let url = '';
            if (resultContext &&
                resultContext[appDataEntity.codeName.toLowerCase()]) {
                // TODO 临时写死printdata， 非标准，后续优化
                const resPath = calcResPath(resultContext, appDataEntity);
                url += `${resPath}/${appDataEntity.deapicodeName2}/printdata/${encodeURIComponent(resultContext[appDataEntity.codeName.toLowerCase()])}`;
            }
            else {
                throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.dataPrimaryKey'));
            }
            // 识别动态打印标识srfdynaprinttag，拼接格式为srfdynaprinttag@printtag，当srfdynaprinttag值为''时不拼接
            let printTag = '';
            if (resultContext.srfdynaprinttag) {
                printTag += `${resultContext.srfdynaprinttag}@`;
            }
            printTag += appDEPrint.codeName;
            const params = Object.assign({ srfprinttag: printTag }, resultParams);
            const app = await ibiz.hub.getAppAsync(action.appId);
            const res = await app.net.request(url, {
                method: 'get',
                responseType: 'blob',
                params,
            });
            if (res.ok) {
                const success = await ibiz.printPreview.execPrint(resultContext, resultParams, res.data);
                if (success)
                    return;
                ibiz.platform.backendExport({
                    url,
                    params,
                    method: 'get',
                    newWindow: !resultParams.srfcontenttype,
                });
            }
            else {
                throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.printFailure'));
            }
        }
        else {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.physicalPrint'));
        }
    }
    /**
     * 执行导入行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    async executeDataImport(action, args) {
        // 处理参数
        const { resultContext, resultParams, presetParams } = await this.handleParams(action, args.context, args.data, args.params);
        const { appDataEntityId, appDEDataImportId, frontAppViewId } = action;
        if (!appDataEntityId || !appDEDataImportId) {
            throw new RuntimeModelError(action, ibiz.i18n.t('runtime.controller.common.control.noImportModel'));
        }
        await openDataImport({
            appDataEntityId,
            deDataImportId: appDEDataImportId,
            dataImportViewId: frontAppViewId,
            context: resultContext,
            params: resultParams,
            event: args.event,
            viewOption: presetParams.viewoption,
        });
        return {
            refresh: true,
            refreshMode: 1,
        };
    }
    /**
     * 执行导出行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    async executeDataExport(action, args) {
        var _a, _b;
        // 处理参数
        const { resultContext, resultParams, presetParams } = await this.handleParams(action, args.context, args.data, args.params);
        const appDataEntity = await ibiz.hub.getAppDataEntity(action.appDataEntityId, action.appId);
        const appDEDataExport = (_a = appDataEntity.appDEDataExports) === null || _a === void 0 ? void 0 : _a.find(dataExport => {
            return dataExport.id === action.appDEDataExportId;
        });
        if (appDEDataExport) {
            // 导出数据集优先通过界面行为参数srfexportdataset获取，然后再从导出对象数据集合获取，都没有则获取当前界面行为实体默认数据集，最后则抛出异常
            let exportDatasetCodeName = presetParams.srfexportdataset;
            if (!exportDatasetCodeName && appDEDataExport.appDEDataSetId) {
                exportDatasetCodeName = appDEDataExport.appDEDataSetId;
            }
            if (!exportDatasetCodeName) {
                const defaultDataset = (_b = appDataEntity.appDEMethods) === null || _b === void 0 ? void 0 : _b.find(appDEMethod => {
                    return appDEMethod.dataSetTag === 'Default';
                });
                if (defaultDataset) {
                    exportDatasetCodeName = defaultDataset.codeName;
                }
            }
            if (!exportDatasetCodeName) {
                throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.exportWithNoDataSet'));
            }
            // 异步导出
            const isAsyncAction = presetParams.srfasyncaction === 'true';
            const resPath = calcResPath(resultContext, appDataEntity);
            const url = `${resPath}/${appDataEntity.deapicodeName2}/${isAsyncAction ? 'asyncexportdata' : 'exportdata'}/${exportDatasetCodeName}`;
            //  查询参数
            const queryParam = { srfexporttag: appDEDataExport.codeName };
            if (resultContext === null || resultContext === void 0 ? void 0 : resultContext.srfdatatype) {
                Object.assign(queryParam, { srfdatatype: resultContext.srfdatatype });
            }
            //  参数
            const params = Object.assign(Object.assign({ page: 0, size: appDEDataExport.maxRowCount
                    ? appDEDataExport.maxRowCount
                    : ibiz.config.common.maxExportRowsDefault }, args.params), resultParams);
            // 多项数据和多项数据主键如果没有选择全部界面参数则认为导出选中行
            const { actionTarget } = action;
            if ((actionTarget === 'MULTIDATA' || actionTarget === 'MULTIKEY') &&
                args.view) {
                const srfexportdatakey = presetParams.srfexportdatakey || 'srfkey';
                if (!args.params.srfallselected) {
                    await args.view.call(SysUIActionTag.EXPORT_EXCEL, {
                        params: {
                            type: 'selectedRows',
                            srfexportdatakey,
                            srfexportdataset: exportDatasetCodeName,
                            srfdataexport: appDEDataExport,
                            srfdatatype: resultContext.srfdatatype,
                            srfexportparams: args.params.srfexportparams,
                        },
                    });
                }
                else {
                    await args.view.call(SysUIActionTag.EXPORT_EXCEL, {
                        params: {
                            type: 'maxRowCount',
                            srfexportdatakey,
                            srfexportdataset: exportDatasetCodeName,
                            srfdataexport: appDEDataExport,
                            srfdatatype: resultContext.srfdatatype,
                            srfexportparams: args.params.srfexportparams,
                        },
                    });
                }
                return;
            }
            // 如果srfallselected存在需要删除，规范化参数
            if (params &&
                Object.prototype.hasOwnProperty.call(params, 'srfallselected')) {
                delete params.srfallselected;
            }
            // 异步导出时只发消息不下载
            if (isAsyncAction) {
                const app = await ibiz.hub.getAppAsync(action.appId);
                await app.net.request(url, {
                    method: 'post',
                    responseType: 'blob',
                    params: queryParam,
                    data: params,
                });
            }
            else {
                await ibiz.platform.backendExport({
                    url,
                    data: params,
                    method: 'post',
                    params: queryParam,
                });
            }
        }
        else {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.noEntityExportsFound'));
        }
    }
    /**
     * 打开编辑表单
     * @author lxm
     * @date 2024-03-21 03:54:01
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {IUIActionResult}
     */
    async openEditForm(action, args) {
        const actionResult = {};
        const { context, params, data, event } = args;
        if (!event) {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.lackNativeEvent'));
        }
        // 自定义模型
        let tempModel = null;
        if (params.customeditormodel) {
            tempModel = params.customeditormodel;
        }
        // 处理参数
        const { resultContext, resultParams } = await this.handleParams(action, context, data, params);
        //  解析自定义 视图 option 参数
        const options = this.handleViewOptionParams(resultParams).modalOption || {};
        const popoverOpts = mergeRight({
            autoClose: true,
        }, options);
        let hasSave = false;
        const overlay = ibiz.overlay.createPopover('IBizControlShell', {
            context: resultContext,
            params: resultParams,
            modelData: this.mergeFormItemModel(action.deeditForm, tempModel),
            onSaveSuccess: (eventArgs) => {
                actionResult.data = [eventArgs.args];
                if (overlay) {
                    overlay.dismiss();
                }
                hasSave = true;
            },
            onFinish: (_eventArgs) => {
                overlay === null || overlay === void 0 ? void 0 : overlay.dismiss();
            },
        }, popoverOpts);
        overlay.present(event.target);
        await overlay.onWillDismiss();
        // 打开表单没有保存，取消操作
        if (!hasSave) {
            actionResult.cancel = true;
        }
        return actionResult;
    }
    /**
     * 打开快速编辑
     *
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {Promise<IUIActionResult>}
     * @memberof FrontUIActionProvider
     */
    async openQuickEdit(action, args) {
        const actionResult = {
            cancel: true,
        };
        const { context, params, data, event } = args;
        if (!event) {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.lackNativeEvent'));
        }
        // 自定义模型
        let tempModel = null;
        if (params.customeditormodel) {
            tempModel = params.customeditormodel;
        }
        // 处理参数
        const { resultContext, resultParams } = await this.handleParams(action, context, data, params);
        //  解析自定义 视图 option 参数
        const options = this.handleViewOptionParams(resultParams).modalOption || {};
        const popoverOpts = mergeRight({
            autoClose: true,
        }, options);
        const overlay = ibiz.overlay.createPopover('IBizQuickEdit', {
            context: resultContext,
            params: Object.assign(Object.assign({}, params), resultParams),
            modelData: this.mergeFormItemModel(action.deeditForm, tempModel),
            onClose: (modalData) => {
                if (modalData.ok) {
                    actionResult.data = modalData.data;
                    actionResult.cancel = false;
                }
                if (overlay) {
                    overlay.dismiss();
                }
            },
        }, popoverOpts);
        overlay.present(event.target);
        await overlay.onWillDismiss();
        return actionResult;
    }
    /**
     * 合并自定义表单项模型到表单模型里
     *
     * @protected
     * @param {IData} formModel 表单模型
     * @param {IData} EditorForm 表单项模型
     * @return {*}
     * @memberof FrontUIActionProvider
     */
    mergeFormItemModel(formModel, editorModel) {
        const tempFormModel = clone(formModel);
        if (tempFormModel &&
            editorModel &&
            tempFormModel.deformPages &&
            tempFormModel.deformPages.length > 0) {
            const { deformDetails } = tempFormModel.deformPages[0];
            deformDetails === null || deformDetails === void 0 ? void 0 : deformDetails.push(editorModel);
        }
        return tempFormModel;
    }
    /**
     * 打开AI聊天框
     *
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {Promise<IUIActionResult>}
     * @memberof FrontUIActionProvider
     */
    async openAiChat(action, args) {
        var _a;
        if (!ibiz.env.enableAI)
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.noEnableAI'));
        const { appDEACModeId, appDataEntityId, appId } = action;
        const { resultContext, resultParams } = await this.handleParams(action, args.context, args.data, args.params);
        const context = Object.assign(resultContext, { srfappid: appId });
        if (!appDataEntityId || !appDEACModeId) {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.noEntityOrAcMode'));
        }
        const data = await ibiz.appUtil.openAiChat({
            appDEACModeId,
            appDataEntityId,
            context,
            view: args.view,
            ctrl: args.ctrl,
            params: resultParams,
            data: (_a = args.data) === null || _a === void 0 ? void 0 : _a[0],
        });
        return { data };
    }
}
