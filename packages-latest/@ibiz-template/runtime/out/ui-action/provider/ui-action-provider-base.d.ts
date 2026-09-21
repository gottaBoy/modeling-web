import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionProvider, IUIActionResult, IUILogicParams, IViewController } from '../../interface';
/**
 * 界面行为处理器基类
 *
 * @author lxm
 * @date 2022-10-25 14:10:31
 * @export
 * @class UIActionProviderBase
 */
export declare abstract class UIActionProviderBase implements IUIActionProvider {
    /**
     * 界面行为执行入口，处理公共逻辑，子类一般不要重写
     * @author lxm
     * @date 2023-05-08 10:02:10
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} params
     * @return {*}  {Promise<IUIActionResult>}
     */
    exec(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 根据界面行为逻辑返回值，合并参数获得后续逻辑要用的参数
     * @author lxm
     * @date 2023-12-25 02:42:23
     * @protected
     * @param {IUILogicParams} args 当前环境的参数
     * @param {IUIActionResult} result 上一次逻辑执行的结果
     * @return {*}  {IUILogicParams}
     */
    protected mergeArgsByResult(args: IUILogicParams, result: IUIActionResult): IUILogicParams;
    /**
     * 有错误和取消时对result做的处理
     * @author lxm
     * @date 2023-03-15 07:43:21
     * @protected
     * @param {IUIActionResult} result
     * @returns {*}  {IUIActionResult}
     * @memberof UIActionHandler
     */
    protected returnError(result: IUIActionResult, view: IViewController): IUIActionResult;
    /**
     * 用户操作确认
     *
     * @author lxm
     * @date 2022-10-25 14:10:55
     * @param {IAppDEUIAction} action 界面行为模型
     * @returns {*}  {Promise<boolean>}
     */
    isConfirm(action: IAppDEUIAction, args: IUILogicParams): Promise<boolean>;
    /**
     * 执行具体界面行为的独有逻辑(子类重写)
     *
     * @author lxm
     * @date 2022-10-25 15:10:03
     * @abstract
     * @param {IAppDEUIAction} action
     * @param {IContext} context
     * @param {(IData[])} data
     * @param {IParams} params
     * @param {(IData | undefined)} [opts]
     * @returns {*}  {Promise<IUIActionResult>}
     */
    abstract execAction(action: IAppDEUIAction, params: IUILogicParams): Promise<IUIActionResult>;
    /**
     * 执行后续界面行为
     *
     * @author lxm
     * @date 2022-10-25 15:10:54
     * @param {IAppDEUIAction} action
     * @param {IContext} context
     * @param {(IData[])} data
     * @param {IParams} params
     * @param {(IData | undefined)} [opts]
     * @returns {*}  {Promise<void>}
     */
    doNextAction(action: IAppDEUIAction, params: IUILogicParams, appId: string): Promise<IUIActionResult | undefined>;
    /**
     * 参数处理(根据数据目标和数据参数，导航参数)
     *
     * @author lxm
     * @date 2022-08-29 17:08:00
     * @protected
     * @static
     * @param {IAppDEUIAction} action 界面行为
     * @param {IContext} context 上下文
     * @param {(IData[])} data 数据集合
     * @param {IParams} params 视图参数
     * @returns {*}  {Promise<{
     *     resultContext: IContext; 处理后的上下文
     *     resultData: IData[]; 处理后的数据集合
     *     resultParams: IParams; 处理后的视图参数
     *   }>}
     */
    protected handleParams(action: IAppDEUIAction, context: IContext, data: IData[], params: IParams): Promise<{
        resultContext: IContext;
        resultData: IData[];
        resultParams: IParams;
        presetParams: IParams;
    }>;
    /**
     * 计算消息信息（动态，多语言资源）
     * @author lxm
     * @date 2023-09-25 03:03:01
     * @protected
     * @param {('confirm' | 'success')} type
     * @param {IAppDEUIAction} action
     * @param {IUILogicParams} args
     * @return {*}
     */
    protected calcMessage(type: 'confirm' | 'success', action: IAppDEUIAction, args: IUILogicParams): string | undefined;
    /**
     * 处理打开视图配置自定义参数 modalOption
     *
     * @author zk
     * @date 2024-02-01 01:02:28
     * @param {IData} param
     * @return {*}  {IData}
     * @memberof FrontUIActionProvider
     */
    handleViewOptionParams(param: IData): IData;
}
//# sourceMappingURL=ui-action-provider-base.d.ts.map