import { IAppDERS } from '@ibiz/model-core';
import { ModelUtil } from '../../model-util';
/**
 * 获取服务拼接递归对象
 */
export type ServicePathDeep = [IAppDERS, ServicePathDeep[]];
/**
 * 服务路径项
 */
export type ServicePathItem = {
    /**
     * 实体代码名称(标准)
     *
     * @author chitanda
     * @date 2022-08-25 18:08:35
     * @type {string}
     */
    codeName: string;
    /**
     * 实体代码名称(小写)
     *
     * @author chitanda
     * @date 2022-08-25 18:08:54
     * @type {string}
     */
    lower: string;
    /**
     * 实体代码名称复数(小写)
     *
     * @author chitanda
     * @date 2022-08-25 18:08:13
     * @type {string}
     */
    plural: string;
};
/**
 * 服务接口项
 */
export type ServiceApiItem = {
    /**
     * 实体代码名称(标准)
     *
     * @author tony001
     * @date 2024-05-11 15:05:54
     * @type {string}
     */
    codeName: string;
    /**
     * 实体服务接口代码标识
     *
     * @author tony001
     * @date 2024-05-11 15:05:43
     * @type {string}
     */
    deApiCodeName: string;
    /**
     * 实体服务接口代码标识2（复数）
     *
     * @author tony001
     * @date 2024-05-11 15:05:43
     * @type {string}
     */
    deApiCodeName2: string;
};
/**
 * 服务路径拼接工具
 *
 * @author chitanda
 * @date 2022-08-22 21:08:52
 * @export
 * @class ServicePathUtil
 */
export declare class ServicePathUtil {
    protected appDataEntities: IModel[];
    protected allDERss: IAppDERS[];
    protected modelUtil: ModelUtil;
    /**
     * 应用实体关系
     *
     * @author chitanda
     * @date 2022-08-22 22:08:18
     * @protected
     * @type {Map<string, IAppDERS[]>} <应用实体 id, 应用实体父关系>
     */
    protected entityRsMap: Map<string, IAppDERS[]>;
    /**
     * 实体资源路径
     *
     * @author chitanda
     * @date 2022-08-22 22:08:58
     * @protected
     * @type {Map<string, ServicePathItem[][]>}
     */
    protected entityRsPathMap: Map<string, ServicePathItem[][]>;
    /**
     * 实体资源加载状态关系
     *
     * @author tony001
     * @date 2024-05-20 16:05:41
     * @protected
     * @type {Map<string, boolean>}
     */
    protected entityRsLoadMap: Map<string, boolean>;
    constructor(appDataEntities: IModel[], allDERss: IAppDERS[], modelUtil: ModelUtil);
    /**
     * 根据应用主实体过滤从关系集合
     *
     * @author chitanda
     * @date 2023-04-20 17:04:34
     * @protected
     * @param {string} id
     * @return {*}  {IAppDERS[]}
     */
    protected filterDERSs(id: string): IAppDERS[];
    /**
     * 计算指定应用实体所有资源路径
     *
     * @author chitanda
     * @date 2023-04-22 13:04:27
     * @param {string} id
     * @return {*}  {string[]}
     */
    calcRequestPaths(id: string): Promise<string[]>;
    /**
     * 计算指定实体所有资源路径
     *
     * @author chitanda
     * @date 2023-04-22 13:04:36
     * @protected
     * @param {string} id
     * @return {*}  {ServicePathItem[][]} 返回顺序为 [祖父实体，爷爷实体，父实体，当前实体]
     */
    protected calcPaths(id: string): Promise<ServicePathItem[][]>;
    /**
     * 计算递归资源路径
     *
     * @author chitanda
     * @date 2023-08-23 14:08:39
     * @protected
     * @param {string[]} ids
     * @param {IAppDERS[]} deRss
     * @param {number} [num=0]
     * @return {*}  {ServicePathDeep[]}
     */
    protected calcDeepPath(ids: string[], deRss: IAppDERS[], num?: number): ServicePathDeep[];
    /**
     * 递归填充计算所有资源路径
     *
     * @author chitanda
     * @date 2022-08-22 22:08:04
     * @protected
     * @param {string} deCodeName
     * @param {string[]} pathNames
     * @param {ServicePathDeep[]} items
     */
    protected deepFillPath(deCodeName: string, pathNames: string[], items: ServicePathDeep[]): Promise<void>;
    /**
     * 排序资源路径顺序
     *
     * @author chitanda
     * @date 2022-08-22 22:08:44
     * @protected
     * @param {ServicePathItem[][]} paths
     * @return {*}  {ServicePathItem[][]}
     */
    protected sortPath(paths: ServicePathItem[][]): ServicePathItem[][];
    /**
     * 通过codeName数据获取相关接口标识数据
     *
     * @author tony001
     * @date 2024-05-11 17:05:51
     * @protected
     * @param {string[]} codeNames
     * @return {*}  {Promise<ServiceApiItem[]>}
     */
    protected getServiceApiItems(codeNames: string[]): Promise<ServiceApiItem[]>;
}
//# sourceMappingURL=service-path-util.d.ts.map