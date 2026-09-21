import { IAppDataEntity, IAppUtil } from '@ibiz/model-core';
import { IAppDEService } from '../../../interface';
/**
 * 应用功能组件服务
 *
 * @author tony001
 * @date 2024-04-23 11:04:58
 * @export
 * @class UtilService
 */
export declare class UtilService {
    protected appUtil: IAppUtil;
    /**
     * 存储实体模型
     *
     * @author tony001
     * @date 2024-04-24 15:04:36
     * @type {(IAppDataEntity | null)}
     */
    protected stoageAppDataEntity: IAppDataEntity | null;
    /**
     * 存储服务
     *
     * @author tony001
     * @date 2024-04-24 14:04:36
     * @type {(IAppDEService | null)}
     */
    protected appDEService: IAppDEService | null;
    /**
     * Creates an instance of UtilService.
     * @author tony001
     * @date 2024-04-24 14:04:41
     * @param {IAppUtil} appUtil
     */
    constructor(appUtil: IAppUtil);
    /**
     * 获取存储服务
     *
     * @author tony001
     * @date 2024-04-24 14:04:21
     * @private
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IAppDEService>}
     */
    private getAppDEService;
    /**
     * 加载指定数据
     *
     * @author tony001
     * @date 2024-04-23 11:04:22
     * @param {string} tag
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData>}
     */
    load(tag: string, context: IContext, params: IParams): Promise<IData>;
    /**
     * 保存指定数据
     *
     * @author tony001
     * @date 2024-04-23 12:04:36
     * @param {string} tag
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    save(tag: string, context: IContext, params: IParams, data: IData): Promise<IData>;
    /**
     * 处理请求数据
     *
     * @author tony001
     * @date 2024-04-24 15:04:02
     * @private
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @return {*}  {{ context: IContext; params: IParams; data: IData }}
     */
    private handleRequestData;
    /**
     * @description 处理自定义类型请求数据
     * @private
     * @param {(IData | IData[])} data
     * @returns {*}  IData | IData[]
     * @memberof UtilService
     */
    private handleUserRequestData;
    /**
     * @description 解析用户自定义功能参数(getAppDEActionId|saveAppDEActionId|modelMapping),分别表示获取行为|保存行为|数据映射关系
     * @private
     * @returns {*}  {IParams}
     * @memberof UtilService
     */
    private parseUserUtilParams;
    /**
     * 处理响应数据
     *
     * @author tony001
     * @date 2024-04-24 16:04:45
     * @private
     * @param {IData} response
     * @return {*}  {IData}
     */
    private handleResponse;
    /**
     * @description 处理自定义类型响应数据
     * @private
     * @param {IData[]} response
     * @returns {*}  {IData | IData[]}
     * @memberof UtilService
     */
    private handleUserResponse;
}
//# sourceMappingURL=util.service.d.ts.map