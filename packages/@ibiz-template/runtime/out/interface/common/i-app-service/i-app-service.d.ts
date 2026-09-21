import { Net } from '@ibiz-template/core';
import { IAppDEUIAction, IAppFunc, IAppUtil, IApplication, IDEOPPriv, IDEUILogic } from '@ibiz/model-core';
import { AuthorityService, CodeListService, DEServiceUtil } from '../../../service';
import { IConfigService } from '../../service';
/**
 * 应用服务
 *
 * @author chitanda
 * @date 2023-04-23 15:04:50
 * @export
 * @interface IAppService
 */
export interface IAppService {
    /**
     * 当前应用标识(带系统标识)
     *
     * @author chitanda
     * @date 2023-04-23 15:04:12
     * @type {string}
     */
    readonly appId: string;
    /**
     * 当前应用标识(仅标识)
     *
     * @author tony001
     * @date 2024-09-11 15:09:03
     * @type {string}
     */
    readonly id: string;
    /**
     * 应用模型
     *
     * @author chitanda
     * @date 2023-11-21 15:11:33
     * @type {IApplication}
     */
    readonly model: IApplication;
    /**
     * 请求服务
     *
     * @author chitanda
     * @date 2023-04-23 15:04:20
     * @type {Net}
     */
    readonly net: Net;
    /**
     * 应用级配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:58
     * @type {IConfigService}
     */
    readonly configCache: IConfigService;
    /**
     * 实体服务工具类
     *
     * @author chitanda
     * @date 2023-04-23 15:04:36
     * @type {DEServiceUtil}
     */
    readonly deService: DEServiceUtil;
    /**
     * 代码表服务
     *
     * @author chitanda
     * @date 2023-04-23 15:04:51
     * @type {CodeListService}
     */
    readonly codeList: CodeListService;
    /**
     * 认证服务
     *
     * @author chitanda
     * @date 2023-04-23 15:04:15
     * @type {AuthorityService}
     */
    readonly authority: AuthorityService;
    /**
     * 应用实体名称到应用实体代码名称的映射
     *
     * @author chitanda
     * @date 2023-11-21 15:11:18
     * @type {Map<string, string>}
     */
    readonly deName2DeCodeName: Map<string, string>;
    /**
     * 应用智能报表体系映射，key为应用智能报表体系标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:11
     * @type {Map<string, IModel>}
     */
    readonly appBISchemeMap: Map<string, IModel>;
    /**
     * 应用智能报表立方体映射，key为应用智能报表立方体标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:56
     * @type {Map<string, IModel>}
     */
    readonly appBICubeMap: Map<string, IModel>;
    /**
     * 应用智能报表映射，key为应用智能报表立方体标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:57
     * @type {Map<string, IModel>}
     */
    readonly appBIReportMap: Map<string, IModel>;
    /**
     * 根据 id 查找应用功能
     *
     * @author chitanda
     * @date 2023-04-20 17:04:24
     * @param {string} id
     * @return {*}  {(IAppFunc | null)}
     */
    getAppFunc(id: string): IAppFunc | null;
    /**
     * 根据id获取应用功能组件
     *
     * @author tony001
     * @date 2024-05-09 16:05:58
     * @param {string} id 标识
     * @param {'CUSTOM' | 'DEFAULT'} [type] 类型
     * @return {*}  {(IAppUtil | undefined)}
     */
    getAppUtil(id: string, type?: 'CUSTOM' | 'DEFAULT'): IAppUtil | undefined;
    /**
     * 获取界面行为模型
     * @author lxm
     * @date 2023-04-28 05:44:14
     * @param {string} actionId
     * @param {string} [_appDataEntityId]
     * @return {*}
     */
    getUIAction(actionId: string): Promise<IAppDEUIAction | undefined>;
    /**
     * 获取操作标识模型
     * @author lxm
     * @date 2023-05-10 11:24:17
     * @param {string} id
     * @param {string} [appDataEntityId]
     * @return {*}  {(Promise<IDEOPPriv | undefined>)}
     */
    getOPPriv(id: string, appDataEntityId?: string): Promise<IDEOPPriv | undefined>;
    /**
     * 查找实体的界面逻辑模型
     * @author lxm
     * @date 2023-06-14 07:20:30
     * @param {string} deUILogicId
     * @param {string} appDataEntityId
     * @return {*}  {(Promise<IDEUILogic | undefined>)}
     */
    getDEUILogic(deUILogicId: string, appDataEntityId: string): Promise<IDEUILogic | undefined>;
    /**
     * 销毁应用
     *
     * @author tony001
     * @date 2024-04-10 15:04:12
     */
    destroy(): void;
}
//# sourceMappingURL=i-app-service.d.ts.map