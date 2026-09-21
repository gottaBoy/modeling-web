import { IAppDERS, IApplication } from '@ibiz/model-core';
import { plural } from '../plural/plural';
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
export class ServicePathUtil {
  /**
   * 应用实体关系
   *
   * @author chitanda
   * @date 2022-08-22 22:08:18
   * @protected
   * @type {Map<string, IAppDERS[]>} <应用实体 id, 应用实体父关系>
   */
  protected entityRsMap: Map<string, IAppDERS[]> = new Map();

  /**
   * 实体资源路径
   *
   * @author chitanda
   * @date 2022-08-22 22:08:58
   * @protected
   * @type {Map<string, ServicePathItem[][]>}
   */
  protected entityRsPathMap: Map<string, ServicePathItem[][]> = new Map();

  /**
   * 实体资源加载状态关系
   *
   * @author tony001
   * @date 2024-05-20 16:05:41
   * @protected
   * @type {Map<string, boolean>}
   */
  protected entityRsLoadMap: Map<string, boolean> = new Map();

  constructor(
    protected appDataEntities: IModel[],
    protected allDERss: IAppDERS[],
    protected modelUtil: ModelUtil,
  ) {}

  /**
   * 根据应用主实体过滤从关系集合
   *
   * @author chitanda
   * @date 2023-04-20 17:04:34
   * @protected
   * @param {string} id
   * @return {*}  {IAppDERS[]}
   */
  protected filterDERSs(id: string): IAppDERS[] {
    if (this.entityRsMap.has(id)) {
      return this.entityRsMap.get(id)!;
    }
    const items = this.allDERss.filter(item => {
      if ((item as IModel).rSMode === 2 && item.minorAppDataEntityId === id) {
        return item;
      }
      return null;
    });
    if (items.length > 0) {
      this.entityRsMap.set(id, items);
    }
    return items;
  }

  /**
   * 计算指定应用实体所有资源路径
   *
   * @author chitanda
   * @date 2023-04-22 13:04:27
   * @param {string} id
   * @return {*}  {string[]}
   */
  async calcRequestPaths(id: string): Promise<string[]> {
    const paths = await this.calcPaths(id);
    return paths.map(path => {
      return path.map(item => `${item.plural}/\${${item.lower}}`).join('/');
    });
  }

  /**
   * 计算指定实体所有资源路径
   *
   * @author chitanda
   * @date 2023-04-22 13:04:36
   * @protected
   * @param {string} id
   * @return {*}  {ServicePathItem[][]} 返回顺序为 [祖父实体，爷爷实体，父实体，当前实体]
   */
  protected async calcPaths(id: string): Promise<ServicePathItem[][]> {
    const entityRef = this.appDataEntities.find(item => item.id === id);
    if (!entityRef) {
      throw new Error(ibiz.i18n.t('modelHelper.utils.noFoundEntity', { id }));
    }
    const { codeName } = entityRef;
    if (!this.entityRsLoadMap.has(codeName)) {
      this.entityRsLoadMap.set(codeName, false);
    }
    // 需要处理完成才能获取
    if (
      this.entityRsPathMap.has(codeName) &&
      this.entityRsLoadMap.get(codeName)
    ) {
      return this.entityRsPathMap.get(codeName)!;
    }
    const deRss = this.filterDERSs(id);
    if (deRss) {
      // 已经计算过的应用实体标识
      const ids: string[] = [id];
      const arr = this.calcDeepPath(ids, deRss);
      await this.deepFillPath(codeName, [codeName], arr);
      let paths = this.entityRsPathMap.get(codeName);
      if (paths) {
        paths = this.sortPath(paths);
        this.entityRsPathMap.set(codeName, paths);
        this.entityRsLoadMap.set(codeName, true);
        return paths;
      }
    }
    this.entityRsLoadMap.set(codeName, true);
    return [];
  }

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
  protected calcDeepPath(
    ids: string[],
    deRss: IAppDERS[],
    num: number = 0,
  ): ServicePathDeep[] {
    if (num > 10) {
      throw new Error(ibiz.i18n.t('modelHelper.utils.maximumTier'));
    }
    num += 1;
    const arr: ServicePathDeep[] = [];
    deRss.forEach(rs => {
      if (ids.includes(rs.majorAppDataEntityId!)) {
        ibiz.log.warn(
          ibiz.i18n.t('modelHelper.utils.circularRecursive'),
          rs.majorAppDataEntityId,
          ibiz.i18n.t('modelHelper.utils.calculatedEntities'),
          ids,
        );
        return;
      }
      const items = this.filterDERSs(rs.majorAppDataEntityId!);
      arr.push([
        rs,
        this.calcDeepPath([...ids, rs.majorAppDataEntityId!], items, num),
      ]);
    });
    return arr;
  }

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
  protected async deepFillPath(
    deCodeName: string,
    pathNames: string[],
    items: ServicePathDeep[],
  ): Promise<void> {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const [rs, children] = item;
      if (children.length > 0) {
        await this.deepFillPath(
          deCodeName,
          [...pathNames, rs.majorDECodeName!],
          children,
        );
      }
      if (!this.entityRsPathMap.has(deCodeName)) {
        this.entityRsPathMap.set(deCodeName, []);
      }
      const arr = this.entityRsPathMap.get(deCodeName)!;

      const serviceApiItems = await this.getServiceApiItems(pathNames);
      const rsServiceApiItems = await this.getServiceApiItems([
        rs.majorDECodeName!,
      ]);
      const tempArr = [
        ...pathNames.map((pathName, index) => {
          return {
            codeName: pathName,
            lower: pathName.toLowerCase(),
            plural: serviceApiItems[index].deApiCodeName2,
          };
        }),
        {
          codeName: rs.majorDECodeName!,
          lower: rs.majorDECodeName!.toLowerCase(),
          plural: rsServiceApiItems[0].deApiCodeName2,
        },
      ].reverse();
      const targetIndex = arr.findIndex(ele => {
        return (
          ele
            .map(val => {
              return val.codeName;
            })
            .join('/') ===
          tempArr
            .map(temp => {
              return temp.codeName;
            })
            .join('/')
        );
      });
      if (targetIndex === -1) {
        arr.push(tempArr);
      }
    }
  }

  /**
   * 排序资源路径顺序
   *
   * @author chitanda
   * @date 2022-08-22 22:08:44
   * @protected
   * @param {ServicePathItem[][]} paths
   * @return {*}  {ServicePathItem[][]}
   */
  protected sortPath(paths: ServicePathItem[][]): ServicePathItem[][] {
    return paths.sort((a, b) => {
      return b.length - a.length;
    });
  }

  /**
   * 通过codeName数据获取相关接口标识数据
   *
   * @author tony001
   * @date 2024-05-11 17:05:51
   * @protected
   * @param {string[]} codeNames
   * @return {*}  {Promise<ServiceApiItem[]>}
   */
  protected async getServiceApiItems(
    codeNames: string[],
  ): Promise<ServiceApiItem[]> {
    const serviceApiItems: ServiceApiItem[] = [];
    for (let i = 0; i < codeNames.length; i++) {
      const appEntity = await this.modelUtil.getAppDataEntityModel(
        codeNames[i],
        false,
      );
      const serviceApiItem: ServiceApiItem = {
        codeName: codeNames[i],
        deApiCodeName: appEntity.dEAPICodeName,
        deApiCodeName2: '',
      };
      if (appEntity.dEAPICodeName) {
        if (!appEntity.deapicodeName2) {
          serviceApiItem.deApiCodeName2 = plural(appEntity.dEAPICodeName);
        }
        const { engineVer } =
          (await this.modelUtil.getAppModel()) as IApplication;
        if (!engineVer || engineVer < 240) {
          serviceApiItem.deApiCodeName2 =
            appEntity.deapicodeName2!.toLowerCase();
        }
      }
      serviceApiItems.push(serviceApiItem);
    }
    return serviceApiItems;
  }
}
