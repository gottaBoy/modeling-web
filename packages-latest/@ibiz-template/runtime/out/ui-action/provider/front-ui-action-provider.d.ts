import { IDEEditForm, IDEFormDetail, IAppDEUIAction } from '@ibiz/model-core';
import { IUILogicParams, IUIActionResult } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
/**
 * 前台调用界面行为适配器
 *
 * @export
 * @class FrontUIActionProvider
 * @implements {IUIActionProvider}
 */
export declare class FrontUIActionProvider extends UIActionProviderBase {
    execAction(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 处理模式：用户自定义
     * @author lxm
     * @date 2023-07-25 02:39:48
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    protected doOther(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 执行打印行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    protected executePrint(action: IAppDEUIAction, args: IUILogicParams): Promise<void>;
    /**
     * 执行导入行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    protected executeDataImport(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 执行导出行为
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    protected executeDataExport(action: IAppDEUIAction, args: IUILogicParams): Promise<void>;
    /**
     * 打开编辑表单
     * @author lxm
     * @date 2024-03-21 03:54:01
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {IUIActionResult}
     */
    protected openEditForm(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 打开快速编辑
     *
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {Promise<IUIActionResult>}
     * @memberof FrontUIActionProvider
     */
    protected openQuickEdit(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 合并自定义表单项模型到表单模型里
     *
     * @protected
     * @param {IData} formModel 表单模型
     * @param {IData} EditorForm 表单项模型
     * @return {*}
     * @memberof FrontUIActionProvider
     */
    protected mergeFormItemModel(formModel: IDEEditForm | undefined, editorModel?: IDEFormDetail): IDEEditForm | undefined;
    /**
     * 打开AI聊天框
     *
     * @protected
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}  {Promise<IUIActionResult>}
     * @memberof FrontUIActionProvider
     */
    protected openAiChat(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=front-ui-action-provider.d.ts.map