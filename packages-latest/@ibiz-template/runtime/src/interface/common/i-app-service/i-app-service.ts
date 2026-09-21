import {
  IAppDEUIAction,
  IAppFunc,
  IAppUtil,
  IDEOPPriv,
  IDEUILogic,
  IAppDEFInputTipSet,
} from '@ibiz/model-core';
import { Net } from '@ibiz-template/core';
import {
  AuthorityService,
  CodeListService,
  DEServiceUtil,
} from '../../../service';
import { IConfigService } from '../../service';
import { IApiAppService } from '../../api';

/**
 * @description 应用服务接口
 * @export
 * @interface IAppService
 * @extends {IApiAppService}
 */
export interface IAppService extends IApiAppService {
  /**
   * @description 应用级配置存储服务
   * @type {IConfigService}
   * @memberof IAppService
   */
  readonly configCache: IConfigService;

  /**
   * @description 网络服务
   * @type {Net}
   * @memberof IAppService
   */
  readonly net: Net;

  /**
   * @description 实体服务工具类
   * @type {DEServiceUtil}
   * @memberof IAppService
   */
  readonly deService: DEServiceUtil;

  /**
   * @description 代码表服务
   * @type {CodeListService}
   * @memberof IAppService
   */
  readonly codeList: CodeListService;

  /**
   * @description 认证服务
   * @type {AuthorityService}
   * @memberof IAppService
   */
  readonly authority: AuthorityService;

  /**
   * @description 应用实体名称到应用实体代码名称的映射
   * @type {Map<string, string>}
   * @memberof IAppService
   */
  readonly deName2DeCodeName: Map<string, string>;

  /**
   * @description 应用智能报表体系映射，key为应用智能报表体系标识，value为原始模型
   * @type {Map<string, IModel>}
   * @memberof IAppService
   */
  readonly appBISchemeMap: Map<string, IModel>;

  /**
   * @description 应用智能报表立方体映射，key为应用智能报表立方体标识，value为原始模型
   * @type {Map<string, IModel>}
   * @memberof IAppService
   */
  readonly appBICubeMap: Map<string, IModel>;

  /**
   * @description 应用智能报表映射，key为应用智能报表立方体标识，value为原始模型
   * @type {Map<string, IModel>}
   * @memberof IAppService
   */
  readonly appBIReportMap: Map<string, IModel>;

  /**
   * @description 根据id查找应用功能
   * @param {string} id
   * @returns {*}  {(IAppFunc | null)}
   * @memberof IAppService
   */
  getAppFunc(id: string): IAppFunc | null;

  /**
   * @description 根据id获取应用功能组件
   * @param {string} id
   * @param {('CUSTOM' | 'DEFAULT')} [type]
   * @returns {*}  {(IAppUtil | undefined)}
   * @memberof IAppService
   */
  getAppUtil(id: string, type?: 'CUSTOM' | 'DEFAULT'): IAppUtil | undefined;

  /**
   * @description 根据id获取应用实体属性输入提示集合
   * @param {string} id
   * @returns {*}  {(IAppDEFInputTipSet | undefined)}
   * @memberof IAppService
   */
  getInputTipsSet(id: string): IAppDEFInputTipSet | undefined;

  /**
   * @description 获取界面行为模型
   * @param {string} actionId
   * @returns {*}  {(Promise<IAppDEUIAction | undefined>)}
   * @memberof IAppService
   */
  getUIAction(actionId: string): Promise<IAppDEUIAction | undefined>;

  /**
   * @description 获取操作标识模型
   * @param {string} id
   * @param {string} [appDataEntityId]
   * @returns {*}  {(Promise<IDEOPPriv | undefined>)}
   * @memberof IAppService
   */
  getOPPriv(
    id: string,
    appDataEntityId?: string,
  ): Promise<IDEOPPriv | undefined>;

  /**
   * @description 查找实体的界面逻辑模型
   * @param {string} deUILogicId
   * @param {string} appDataEntityId
   * @returns {*}  {(Promise<IDEUILogic | undefined>)}
   * @memberof IAppService
   */
  getDEUILogic(
    deUILogicId: string,
    appDataEntityId: string,
  ): Promise<IDEUILogic | undefined>;
}
