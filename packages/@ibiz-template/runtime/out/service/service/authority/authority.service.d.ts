import { IAppDataEntity, IApplication } from '@ibiz/model-core';
import { IAppDeAuthorityService } from '../../../interface';
/**
 * 权限服务
 *
 * @author lxm
 * @date 2022-10-12 17:10:01
 * @export
 * @class AuthorityService
 */
export declare class AuthorityService {
    protected appModel: IApplication;
    /**
     * 实体服务缓存
     *
     * @author chitanda
     * @date 2022-08-17 23:08:36
     * @protected
     * @type {Map<string, IAppDEService>}
     */
    protected cache: Map<string, IAppDeAuthorityService>;
    /**
     * 实体服务构造方法缓存
     *
     * @author chitanda
     * @date 2022-08-17 23:08:36
     * @protected
     * @type {Map<string, IAppDEService>}
     */
    protected constructorCache: Map<string, (entityModel: IAppDataEntity) => Promise<IAppDeAuthorityService>>;
    /**
     * 统一资源集合
     *
     * @author lxm
     * @date 2022-10-12 17:10:46
     * @private
     * @type {string[]}
     */
    protected resCodes: string[];
    /**
     * 是否启用权限校验
     * @author lxm
     * @date 2022-10-14 19:10:50
     * @private
     * @type {boolean}
     */
    protected enablePermission: boolean;
    constructor(appModel: IApplication);
    /**
     * 注册服务工厂方法
     *
     * @author chitanda
     * @date 2023-06-14 10:06:21
     * @param {string} id
     * @param {(
     *       entityModel: IAppDataEntity,
     *     ) => Promise<IAppDeAuthorityService>} constructor
     */
    register(id: string, constructor: (entityModel: IAppDataEntity) => Promise<IAppDeAuthorityService>): void;
    /**
     * 根据实体标识获取实体服务
     *
     * @author chitanda
     * @date 2022-12-23 10:12:24
     * @param {string} id 实体标识
     * @param {IContext} [context] 上下文,用于计算模型所属沙箱环境
     * @return {*}  {Promise<IAppDEService>}
     */
    getService(id: string): Promise<IAppDeAuthorityService>;
    /**
     * 权限服务初始化
     *
     * @author lxm
     * @date 2022-10-13 15:10:44
     * @param {*} [appData=ibiz.appData]
     * @returns {*}  {Promise<void>}
     */
    init(appData?: IData | undefined): Promise<void>;
    /**
     * 通过统一资源标识计算权限
     * @author lxm
     * @date 2023-05-10 12:29:53
     * @param {string} resCode
     */
    calcByResCode(resCode: string): boolean;
    /**
     * 通过操作标识计算权限（无数据）
     *
     * @author tony001
     * @date 2024-05-29 16:05:33
     * @param {string} dataAccessAction
     * @param {IContext} context
     * @param {IData} [data]
     * @param {string} [appDeId]
     * @return {*}  {Promise<boolean>}
     */
    calcByNoDataAccessAction(dataAccessAction: string, context: IContext, appDeId?: string): Promise<boolean>;
    /**
     * 通过操作标识计算权限(非无数据)
     * @author lxm
     * @date 2023-05-10 12:33:10
     * @param {string} dataAccessAction 操作标识
     * @param {IContext} context 上下文
     * @param {IData} [data] 实体数据
     * @param {string} [appDeId] 应用实体id
     * @return {*}  {Promise<boolean>}
     */
    calcByDataAccessAction(dataAccessAction: string, context: IContext, data?: IData, appDeId?: string): Promise<boolean>;
}
//# sourceMappingURL=authority.service.d.ts.map