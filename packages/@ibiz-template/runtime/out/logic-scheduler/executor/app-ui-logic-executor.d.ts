import { IAppUIOpenDataLogic, IAppUINewDataLogic, IAppUILogicRefViewBase } from '@ibiz/model-core';
import { IModalData, IUILogicParams, IViewController } from '../../interface';
import { LogicExecutor } from './logic-executor';
/**
 * 应用预置界面逻辑
 * @author lxm
 * @date 2023-07-17 01:57:27
 * @export
 * @class AppUILogicExecutor
 * @extends {LogicExecutor}
 */
export declare class AppUILogicExecutor extends LogicExecutor {
    type: 'APPUILOGIC';
    execute(executeParams: IUILogicParams): Promise<any>;
    /**
     * 执行应用预置界面逻辑 opendata
     *
     * @author chitanda
     * @date 2023-11-02 11:11:36
     * @param {IAppUIOpenDataLogic} appUILogic 应用预置界面逻辑 opendata 模型对象
     * @param {IUILogicParams} parameters
     * @return {*}  {Promise<IModalData>}
     */
    executeOpenDataAppUILogic(appUILogic: IAppUIOpenDataLogic, parameters: IUILogicParams): Promise<IModalData>;
    protected calcOpenViewRef(appUILogic: IAppUIOpenDataLogic, parameters: IUILogicParams): Promise<IAppUILogicRefViewBase>;
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
    executeNewDataAppUILogic(appUILogic: IAppUINewDataLogic, parameters: IUILogicParams): Promise<IModalData>;
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
    protected getWizardNewViewRef(appUILogic: IAppUINewDataLogic, parameters: IUILogicParams): Promise<IAppUILogicRefViewBase | undefined>;
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
    protected doBatchAdd(appUILogic: IAppUINewDataLogic, selections: IData[], context: IContext, newViewRef: IAppUILogicRefViewBase, view: IViewController): Promise<void>;
}
//# sourceMappingURL=app-ui-logic-executor.d.ts.map