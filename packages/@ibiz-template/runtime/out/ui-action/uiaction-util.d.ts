import { IUILogicParams, IUIActionResult } from '../interface';
/**
 * 界面行为工具类
 *
 * @author chitanda
 * @date 2022-08-26 00:08:17
 * @export
 * @class AppDEUIActionUtil
 */
export declare class UIActionUtil {
    /**
     * 执行界面行为
     *
     * @author lxm
     * @date 2023-05-15 07:54:53
     * @static
     * @param {string} actionId 界面行为id
     * @param {IUILogicParams} params 界面行为参数
     * @return {*}  {Promise<IUIActionResult>}
     */
    static exec(actionId: string, params: IUILogicParams, appId: string): Promise<IUIActionResult>;
    /**
     * 执行界面行为并处理返回值
     * @author lxm
     * @date 2023-05-15 07:54:36
     * @static
     * @param {string} actionId 界面行为id
     * @param {IUILogicParams} params 界面行为参数
     */
    static execAndResolved(actionId: string, params: IUILogicParams, appId: string): Promise<void>;
    /**
     * 处理异步行为
     *
     * @author zk
     * @date 2024-01-23 11:01:58
     * @static
     * @param {(Event | undefined)} event
     * @return {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    private static handleAsyncAction;
    /**
     * 处理异步行为动画
     *
     * @author zk
     * @date 2024-01-24 04:01:29
     * @private
     * @static
     * @param {(Event | undefined)} event
     * @return {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    private static handleAsyncActionAnime;
}
//# sourceMappingURL=uiaction-util.d.ts.map