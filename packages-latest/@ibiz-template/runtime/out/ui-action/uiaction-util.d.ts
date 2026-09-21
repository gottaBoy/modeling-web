import { IUILogicParams, IUIActionResult } from '../interface';
/**
 * @description 界面行为工具类
 * @export
 * @class UIActionUtil
 * @implements {IApiUiActionUtil}
 */
export declare class UIActionUtil {
    /**
     * @description 执行界面行为
     * @static
     * @param {string} actionId
     * @param {IUILogicParams} params
     * @param {string} appId
     * @returns {*}  {Promise<IUIActionResult>}
     * @memberof UIActionUtil
     */
    static exec(actionId: string, params: IUILogicParams, appId: string): Promise<IUIActionResult>;
    /**
     * 执行界面逻辑
     * @param appDEUILogicId
     * @param appDataEntityId
     * @param args
     * @returns
     */
    static execUILogic(appDEUILogicId: string, appDataEntityId: string, args: IUILogicParams): Promise<unknown>;
    /**
     * @description 执行界面行为并处理返回值
     * @static
     * @param {string} actionId
     * @param {IUILogicParams} params
     * @param {string} appId
     * @returns {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    static execAndResolved(actionId: string, params: IUILogicParams, appId: string): Promise<void>;
    /**
     * @description 处理异步行为
     * @private
     * @static
     * @param {(Event | undefined)} event
     * @returns {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    private static handleAsyncAction;
    /**
     * @description 处理异步行为动画
     * @private
     * @static
     * @param {(Event | undefined)} event
     * @returns {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    private static handleAsyncActionAnime;
}
//# sourceMappingURL=uiaction-util.d.ts.map