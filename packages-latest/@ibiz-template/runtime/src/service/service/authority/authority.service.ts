/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeError } from '@ibiz-template/core';
import { IAppDataEntity, IApplication } from '@ibiz/model-core';
import { IAppDeAuthorityService } from '../../../interface';
import { DeAuthorityService } from './de-authority.service';
import { convertToObject } from '../../utils/util/util';

/**
 * 权限服务
 *
 * @author lxm
 * @date 2022-10-12 17:10:01
 * @export
 * @class AuthorityService
 */
export class AuthorityService {
  /**
   * 实体服务缓存
   *
   * @author chitanda
   * @date 2022-08-17 23:08:36
   * @protected
   * @type {Map<string, IAppDEService>}
   */
  protected cache: Map<string, IAppDeAuthorityService> = new Map();

  /**
   * 实体服务构造方法缓存
   *
   * @author chitanda
   * @date 2022-08-17 23:08:36
   * @protected
   * @type {Map<string, IAppDEService>}
   */
  protected constructorCache: Map<
    string,
    (entityModel: IAppDataEntity) => Promise<IAppDeAuthorityService>
  > = new Map();

  /**
   * 统一资源集合
   *
   * @author lxm
   * @date 2022-10-12 17:10:46
   * @private
   * @type {string[]}
   */
  protected resCodes: string[] = [];

  /**
   * 是否启用权限校验
   * @author lxm
   * @date 2022-10-14 19:10:50
   * @private
   * @type {boolean}
   */
  protected enablePermission: boolean = false;

  constructor(protected appModel: IApplication) {}

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
  register(
    id: string,
    constructor: (
      entityModel: IAppDataEntity,
    ) => Promise<IAppDeAuthorityService>,
  ): void {
    this.constructorCache.set(id, constructor);
  }

  /**
   * 根据实体标识获取实体服务
   *
   * @author chitanda
   * @date 2022-12-23 10:12:24
   * @param {string} id 实体标识
   * @param {IContext} [context] 上下文,用于计算模型所属沙箱环境
   * @return {*}  {Promise<IAppDEService>}
   */
  async getService(id: string): Promise<IAppDeAuthorityService> {
    if (!this.cache.has(id)) {
      const entityModel = await ibiz.hub.getAppDataEntity(
        id,
        this.appModel.appId,
      );
      if (!entityModel) {
        throw new RuntimeError(ibiz.i18n.t('runtime.service.noFound', { id }));
      }

      const constructor = this.constructorCache.get(id);
      let service: IAppDeAuthorityService;
      if (constructor) {
        service = await constructor(entityModel);
      } else {
        service = new DeAuthorityService(entityModel);
      }
      this.cache.set(id, service);
    }
    return this.cache.get(id)!;
  }

  /**
   * 权限服务初始化
   *
   * @author lxm
   * @date 2022-10-13 15:10:44
   * @param {*} [appData=ibiz.appData]
   * @returns {*}  {Promise<void>}
   */
  async init(appData = ibiz.appData): Promise<void> {
    if (!appData) {
      return;
    }
    // 设置当前用户拥有的统一标识集合
    if (appData.unires) {
      this.resCodes = appData.unires;
    }

    // 设置权限校验开启与否
    if (appData.enablepermissionvalid === true && ibiz.env.enablePermission) {
      this.enablePermission = true;
    }
  }

  /**
   * 通过统一资源标识计算权限
   * @author lxm
   * @date 2023-05-10 12:29:53
   * @param {string} resCode
   */
  calcByResCode(resCode: string): boolean {
    return !this.enablePermission || this.resCodes.includes(resCode);
  }

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
  async calcByNoDataAccessAction(
    dataAccessAction: string,
    context: IContext,
    appDeId?: string,
  ): Promise<boolean> {
    // 默认为true
    const result = true;

    // 启用权限校验的通过操作标识去找它映射的统一资源校验
    if (this.enablePermission) {
      const app = await ibiz.hub.getApp(this.appModel.appId);
      const opPriv = await app.getOPPriv(dataAccessAction, appDeId);
      // 存在映射统一资源并且校验统一资源不通过时，返回false
      if (this.enablePermission && opPriv?.mapSysUniResCode) {
        if (!this.calcByResCode(opPriv.mapSysUniResCode)) {
          return false;
        }
      } else {
        // 无数据还需校验父数据权限
        // eslint-disable-next-line no-lonely-if
        if (appDeId) {
          const service = await this.getService(appDeId);
          const majorAccObject = convertToObject(
            await service.calcMajorDataAccAction(context),
          );
          if (
            majorAccObject &&
            dataAccessAction &&
            !majorAccObject[dataAccessAction]
          ) {
            return false;
          }
        }
      }
    }

    return result;
  }

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
  async calcByDataAccessAction(
    dataAccessAction: string,
    context: IContext,
    data?: IData,
    appDeId?: string,
  ): Promise<boolean> {
    // 默认为true
    const result = true;

    // 启用权限校验的通过操作标识去找它映射的统一资源校验，先通过了才走主状态
    if (this.enablePermission) {
      const app = await ibiz.hub.getApp(this.appModel.appId);
      const opPriv = await app.getOPPriv(dataAccessAction, appDeId);
      // 存在映射统一资源并且校验统一资源不通过时，返回false
      if (
        this.enablePermission &&
        opPriv?.mapSysUniResCode &&
        !this.calcByResCode(opPriv.mapSysUniResCode)
      ) {
        return false;
      }
    }

    // 有实体标识走实体权限的校验（不一定需要数据，可以使用附属主实体的操作标识）
    if (appDeId) {
      const service = await this.getService(appDeId);
      return service.calcByDataAccessAction(
        dataAccessAction,
        data,
        context,
        this.enablePermission,
      );
    }

    return result;
  }
}
