import { StringUtil, RuntimeModelError, ModelError, RuntimeError, } from '@ibiz-template/core';
import { clone, mergeRight } from 'ramda';
import { OpenAppViewCommand } from '../../command';
import { ScriptFactory } from '../../utils';
import { UIActionProviderBase } from './ui-action-provider-base';
import { openDataImport } from '../../controller/utils';
import { SysUIActionTag } from '../../constant';
/**
 * 前台调用界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class FrontUIActionProvider
 * @implements {IUIActionProvider}
 */
export class FrontUIActionProvider extends UIActionProviderBase {
    async execAction(action, args) {
        const { context, params, data, event, noWaitRoute } = args;
        let actionResult = {};
        switch (action.frontProcessType) {
            case 'OPENHTMLPAGE': {
                const url = StringUtil.fill(action.htmlPageUrl, context, data === null || data === void 0 ? void 0 : data[0]);
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
                const { resultContext, resultParams } = await this.handleParams(action, context, data, params);
                //  解析自定义 视图 option 参数
                const options = this.handleViewOptionParams(resultParams);
                const res = await ibiz.commands.execute(OpenAppViewCommand.TAG, frontPSAppView, resultContext, resultParams, Object.assign({ event, noWaitRoute }, options));
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
        const { scriptCode, uiactionTag } = action;
        const { context, params, data, event, view, ctrl } = args;
        if (uiactionTag === SysUIActionTag.SHOTR_CUT) {
            const result = await view.callUIAction(uiactionTag, args);
            return result || {};
        }
        if (scriptCode) {
            const result = (await ScriptFactory.asyncExecScriptFn({ context, params, data, el: event === null || event === void 0 ? void 0 : event.target, view, ctrl }, scriptCode));
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
            let requestUrl = '';
            if (resultContext &&
                resultContext[appDataEntity.codeName.toLowerCase()]) {
                // TODO 临时写死printdata， 非标准，后续优化
                requestUrl += `/${appDataEntity.deapicodeName2}/printdata/${resultContext[appDataEntity.codeName.toLowerCase()]}`;
            }
            else {
                throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.dataPrimaryKey'));
            }
            const res = await ibiz.net.request(requestUrl, {
                method: 'get',
                responseType: 'blob',
                params: Object.assign({ srfprinttag: appDEPrint.codeName }, resultParams),
            });
            if (res.ok) {
                // 存在srfcontenttype参数需响应文件
                if (resultParams && resultParams.srfcontenttype) {
                    const fileName = ibiz.util.file.getFileName(res);
                    const href = URL.createObjectURL(res.data);
                    const a = document.createElement('a');
                    a.href = href;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(href);
                }
                else {
                    const link = window.URL.createObjectURL(res.data);
                    window.open(link, '_blank');
                }
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
        const { resultContext, resultParams } = await this.handleParams(action, args.context, args.data, args.params);
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
        var _a;
        // 处理参数
        const { resultContext, resultParams } = await this.handleParams(action, args.context, args.data, args.params);
        const appDataEntity = await ibiz.hub.getAppDataEntity(action.appDataEntityId, action.appId);
        const appDEDataExport = (_a = appDataEntity.appDEDataExports) === null || _a === void 0 ? void 0 : _a.find(dataExport => {
            return dataExport.id === action.appDEDataExportId;
        });
        if (appDEDataExport) {
            // TODO 临时写死fetchdefault，应该从appDEDataExport的主表格上获取加载行为，但现在缺主表格模型，后续优化
            const url = `/${appDataEntity.deapicodeName2}/exportdata/fetchdefault`;
            //  查询参数
            const queryParam = { srfexporttag: appDEDataExport.codeName };
            if (resultContext === null || resultContext === void 0 ? void 0 : resultContext.srfdatatype) {
                Object.assign(queryParam, { srfdatatype: resultContext.srfdatatype });
            }
            //  参数
            const params = Object.assign(Object.assign({ page: 0, size: appDEDataExport.maxRowCount ? appDEDataExport.maxRowCount : 1000 }, args.params), resultParams);
            const res = await ibiz.net.request(url, {
                method: 'post',
                responseType: 'blob',
                params: queryParam,
                data: params,
            });
            if (res.status === 200) {
                const fileName = ibiz.util.file.getFileName(res);
                const blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel',
                });
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            }
            else {
                throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.exportRequestFailed'));
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
}
