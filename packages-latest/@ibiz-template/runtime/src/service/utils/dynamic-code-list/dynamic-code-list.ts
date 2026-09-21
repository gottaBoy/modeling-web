import { IAppCodeList } from '@ibiz/model-core';
import {
  IBizContext,
  IPortalMessage,
  ModelError,
  RuntimeModelError,
  StringUtil,
} from '@ibiz-template/core';
import { clone, isNil } from 'ramda';
import { QXEvent, notNilEmpty } from 'qx-util';
import { Application } from '../../../application';
import { CodeListItem, IDataEntity } from '../../../interface';
import { convertNavData, ScriptFactory } from '../../../utils';
import { fieldValueToBoolean } from '../../utils';
import { calcDeCodeNameById } from '../../../model';
import { CodeListDataItem } from '../../vo';
import { getTempContext } from '../util/util';

/**
 * 实际缓存对象
 *
 * @author lxm
 * @date 2022-08-26 14:08:10
 * @interface CacheData
 */
type CacheData = {
  /**
   * 过期时间
   *
   * @author lxm
   * @date 2022-08-26 14:08:56
   * @type {number}
   */
  expirationTime: number;

  /**
   * 代码项数据
   *
   * @author lxm
   * @date 2022-08-26 14:08:01
   * @type {CodeListItem[]}
   */
  items?: CodeListItem[];

  /**
   * 正在加载的promise
   *
   * @author lxm
   * @date 2022-08-26 14:08:47
   * @type {Promise<CodeListItem[]>}
   */
  promise?: Promise<CodeListItem[]>;
};

/**
 * 动态代码表缓存对象
 *
 * @author lxm
 * @date 2022-08-26 13:08:08
 * @export
 * @class DynamicCodeListCache
 */
export class DynamicCodeListCache {
  protected app!: Application;

  /**
   * 代码表对象
   *
   * @author lxm
   * @date 2022-08-26 14:08:11
   * @protected
   * @type {IAppCodeList}
   */
  protected codeList: IAppCodeList;

  /**
   * 缓存的map,key是context和params合成的字符串
   *
   * @author lxm
   * @date 2022-08-26 14:08:19
   * @protected
   */
  protected cache = new Map<string, CacheData>();

  /**
   * 是否是预定义类型
   *
   * @author lxm
   * @date 2022-10-20 10:10:48
   * @protected
   * @type {boolean}
   */
  protected isPredefined: boolean = false;

  /**
   * 是否是系统操作者类型
   *
   * @author tony001
   * @date 2024-10-14 15:10:19
   * @protected
   * @type {boolean}
   */
  protected isOperatorType: boolean = false;

  /**
   * @description 是否全局缓存，通过定义自定义参数（格式如：globalCache=true）启用全局缓存，若启用全局缓存，则缓存全局唯一，缓存key为代码表代码标识
   * @protected
   * @type {boolean}
   * @memberof DynamicCodeListCache
   */
  protected isGlobalCache: boolean = false;

  /**
   * @description 前端缓存key，通过定义自定义参数（格式如：localCacheTag=${context.product}@${params.sort}）设置前端缓存key，若启用前端缓存key，则缓存key以前端缓存key为准
   * @protected
   * @type {(string | undefined)}
   * @memberof DynamicCodeListCache
   */
  protected localCacheTag: string | undefined;

  /**
   * 应用上下文
   *
   * @author tony001
   * @date 2024-04-10 15:04:25
   * @protected
   * @type {IContext}
   */
  protected context: IContext = IBizContext.create();

  /**
   * 视图参数
   *
   * @author tony001
   * @date 2024-04-10 15:04:39
   * @protected
   * @type {IParams}
   */
  protected params: IParams = {};

  /**
   * 事件对象
   *
   * @author tony001
   * @date 2024-04-10 17:04:00
   * @protected
   */
  protected evt: QXEvent<{ change: (data: CodeListItem[]) => void }> =
    new QXEvent(1000);

  /**
   * 初始化promise
   *
   * @author lxm
   * @date 2022-08-26 15:08:06
   * @type {Promise<void>}
   */
  protected initPromise?: Promise<void>;

  /**
   * 常见关键字
   *
   * @author zzq
   * @date 2024-04-15 17:08:06
   * @type {Promise<void>}
   */
  protected commonKeys: string[] = ['query', 'queryconds', 'searchconds'];

  constructor(codeList: IAppCodeList) {
    this.codeList = codeList;
    // 动态代码表监听数据变化
    if (this.codeList.enableCache) {
      this.codelistChange = this.codelistChange.bind(this);
      const { appDataEntityId, appDEDataSetId } = this.codeList;
      if (appDataEntityId && appDEDataSetId) {
        ibiz.mc.command.change.on(this.codelistChange);
      }
    }
  }

  /**
   * 设置上下文以及查询参数
   *
   * @author tony001
   * @date 2024-04-10 15:04:04
   * @protected
   * @param {IContext} [context]
   * @param {IParams} [params]
   */
  protected setParams(context?: IContext, params?: IParams): void {
    if (context) {
      this.context = IBizContext.create({}, { ...context });
    }
    if (params) {
      this.params = clone(params);
    }
  }

  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-26 14:08:28
   * @returns {*}  {Promise<void>}
   */
  async init(): Promise<void> {
    const fn = async (): Promise<void> => {
      const { predefinedType, userParam } = this.codeList;
      // 启用全局缓存
      if (
        userParam &&
        userParam.globalCache &&
        userParam.globalCache === 'true'
      ) {
        this.isGlobalCache = true;
      }
      // 前端缓存key
      if (userParam && userParam.localCacheTag) {
        this.localCacheTag = userParam.localCacheTag;
      }
      // 预定义类型处理
      if (predefinedType) {
        this.isPredefined = true;
        this.isOperatorType = predefinedType === 'OPERATOR';
        if (!['OPERATOR', 'RUNTIME', 'DEMAINSTATE'].includes(predefinedType)) {
          throw new ModelError(
            this.codeList,
            ibiz.i18n.t('runtime.service.predefinedType', { predefinedType }),
          );
        }
        return;
      }
      this.initPromise = undefined;
    };

    this.initPromise = fn();
    return this.initPromise;
  }

  /**
   * 把数据转换成代码项
   *
   * @author lxm
   * @date 2022-08-26 15:08:24
   * @param {IData} data
   * @returns {*}
   */
  protected convertData(
    data: IData,
    index: number,
    items: IData[],
  ): CodeListItem {
    const result = {} as CodeListItem;

    const {
      valueAppDEFieldId,
      textAppDEFieldId,
      iconClsAppDEFieldId,
      iconClsXAppDEFieldId,
      iconPathAppDEFieldId,
      iconPathXAppDEFieldId,
      disableAppDEFieldId,
      dataAppDEFieldId,
      clsAppDEFieldId,
      colorAppDEFieldId,
      thresholdGroup,
      beginValueAppDEFieldId,
      endValueAppDEFieldId,
      incBeginValueMode,
      incEndValueMode,
      bkcolorAppDEFieldId,
    } = this.codeList;
    // 值属性
    const value = valueAppDEFieldId ? data[valueAppDEFieldId] : data.srfkey;
    result.id = value;
    result.value = value;
    // 文本属性
    result.text = textAppDEFieldId ? data[textAppDEFieldId] : data.srfmajortext;
    if (
      iconClsAppDEFieldId ||
      iconClsXAppDEFieldId ||
      iconPathAppDEFieldId ||
      iconPathXAppDEFieldId
    ) {
      result.sysImage = { appId: this.codeList.appId };
      // 图标样式属性
      if (iconClsAppDEFieldId) {
        result.sysImage.cssClass = data[iconClsAppDEFieldId];
      }
      // 图标样式(倍数)属性
      if (iconClsXAppDEFieldId) {
        result.sysImage.cssClassX = data[iconClsXAppDEFieldId];
      }
      // 图标路径属性
      if (iconPathAppDEFieldId) {
        result.sysImage.imagePath = data[iconPathAppDEFieldId];
      }
      // 图标路径(倍数)属性
      if (iconPathXAppDEFieldId) {
        result.sysImage.imagePathX = data[iconPathXAppDEFieldId];
      }
    }
    // 禁止选择属性
    if (disableAppDEFieldId) {
      result.disableSelect = fieldValueToBoolean(data[disableAppDEFieldId]);
    }
    // 样式表属性
    if (clsAppDEFieldId) {
      result.textCls = data[clsAppDEFieldId];
    }
    // 颜色值属性
    if (colorAppDEFieldId) {
      result.color = data[colorAppDEFieldId];
    }
    // 背景颜色属性
    if (bkcolorAppDEFieldId) {
      result.bkcolor = data[bkcolorAppDEFieldId];
    }
    // 数据属性
    if (dataAppDEFieldId && data[dataAppDEFieldId]) {
      try {
        result.data = ScriptFactory.execSingleLine(
          dataAppDEFieldId,
          data,
        ) as IData;
      } catch (error) {
        ibiz.log.error(ibiz.i18n.t('runtime.service.dynamicCodeTable'));
      }
    }
    if (thresholdGroup) {
      if (beginValueAppDEFieldId) {
        result.beginValue = data[beginValueAppDEFieldId];
      }
      if (endValueAppDEFieldId) {
        result.endValue = data[endValueAppDEFieldId];
      }
      if (incBeginValueMode) {
        // 0：不包含、 1：包含、 2：首项包含、 3：尾项包含
        switch (incBeginValueMode) {
          case 1:
            result.includeBeginValue = true;
            break;
          case 2:
            result.includeBeginValue = index === 0;
            break;
          case 3:
            result.includeBeginValue = index === items.length - 1;
            break;
          default:
        }
      }
      if (incEndValueMode) {
        // 0：不包含、 1：包含、 2：首项包含、 3：尾项包含
        switch (incEndValueMode) {
          case 1:
            result.includeEndValue = true;
            break;
          case 2:
            result.includeEndValue = index === 0;
            break;
          case 3:
            result.includeEndValue = index === items.length - 1;
            break;
          default:
        }
      }
    }
    return result;
  }

  protected presetconvertData(data: IData): CodeListItem {
    const result = {} as CodeListItem;
    const { color, bkcolor, disabled, id, text, value, cls } = data;
    result.value = value;
    result.color = color;
    result.bkcolor = bkcolor;
    result.text = text;
    result.id = id;
    result.disableSelect = disabled;
    result.cls = cls;
    result.data = data;

    return result;
  }

  protected sortShoworder(arr: IData[]): IData[] {
    arr.forEach((item: IData) => {
      if (!('showorder' in item)) {
        Object.assign(item, { showorder: 1000 });
      }
    });
    return arr.sort((a: IData, b: IData) => a.showorder - b.showorder);
  }

  /**
   * 加载服务获取数据，返回代码项
   *
   * @author lxm
   * @date 2022-08-26 14:08:08
   * @protected
   * @param {IParams} [context={}]
   * @param {IParams} [params={}]
   * @returns {*}  {Promise<CodeListItem[]>}
   */
  protected async load(
    context: IContext,
    params: IParams = {},
  ): Promise<CodeListItem[]> {
    // 删除常见查询关键字属性，防止查询失败
    const tempParams = { ...params };
    this.commonKeys.forEach((key: string) => {
      delete tempParams[key];
    });
    this.setParams(context, tempParams);
    const app = ibiz.hub.getApp(context.srfappid);
    const {
      appDataEntityId,
      appDEDataSetId,
      minorSortAppDEFieldId,
      minorSortDir,
      pvalueAppDEFieldId,
      customCond,
      userParam,
    } = this.codeList;

    // 排序
    if (minorSortAppDEFieldId && minorSortDir) {
      Object.assign(tempParams, {
        sort: `${minorSortAppDEFieldId.toLowerCase()},${minorSortDir.toLowerCase()}`,
      });
    }

    // 前端条件识别：优先识别用户参数的cond，没有再识别自定义查询条件
    let navParams: IData = {};
    if (userParam && userParam.cond) {
      navParams = ScriptFactory.execSingleLine(userParam.cond) as IData;
    } else if (customCond) {
      navParams = ScriptFactory.execSingleLine(customCond) as IData;
    }
    if (navParams && Object.keys(navParams).length > 0) {
      const addParams = convertNavData(navParams, tempParams, context);
      Object.assign(tempParams, addParams);
    }

    // 特殊处理，避免预置代码表加载不全
    if (!tempParams.size) {
      tempParams.size = 10000;
    }

    // *预定义加载
    if (this.isPredefined && this.codeList.codeName) {
      let tag = this.codeList.codeName;
      if (this.codeList.predefinedType === 'OPERATOR') {
        const index = this.codeList.codeName.indexOf('__');
        tag =
          index !== -1
            ? this.codeList.codeName.substring(index + 2)
            : this.codeList.codeName;
      }
      const res = await app.net.get(
        `/dictionaries/codelist/${tag}`,
        tempParams,
      );
      const presetresultItems: CodeListItem[] = [];
      const { items = [] } = res.data;
      const sortItems = this.sortShoworder(items);
      if (sortItems.length) {
        items.forEach((item: IData) => {
          presetresultItems.push(this.presetconvertData(item));
        });
      }
      return Object.freeze(presetresultItems) as CodeListItem[];
    }

    // *加载实体服务数据
    if (!appDataEntityId) {
      throw new RuntimeModelError(
        this.codeList,
        ibiz.i18n.t('runtime.controller.utils.viewMsg.unconfiguredEntities'),
      );
    }
    if (!appDEDataSetId) {
      throw new RuntimeModelError(
        this.codeList,
        ibiz.i18n.t('runtime.service.unconfiguredDataset'),
      );
    }

    const res = await app.deService.exec(
      appDataEntityId!,
      appDEDataSetId,
      context,
      undefined,
      tempParams,
    );
    let resultItems: CodeListItem[] = [];
    if (res.data.length) {
      if (pvalueAppDEFieldId) {
        const tempItems = this.prepareTreeData(res.data as IData[]);
        if (tempItems) {
          resultItems = tempItems;
        }
      } else {
        res.data.forEach((item: IData, index: number) => {
          resultItems.push(
            new CodeListDataItem(this.codeList, item, {
              index,
              total: res.data.length,
            }),
          );
        });
      }
    }
    return Object.freeze(resultItems) as CodeListItem[];
  }

  /**
   * 组装树形代码表数据
   *
   * @return {codeListItem[] | undefined}
   */
  protected prepareTreeData(items: IData[]): CodeListItem[] | undefined {
    const { valueAppDEFieldId, pvalueAppDEFieldId } = this.codeList;
    const map: { [id: string]: CodeListItem } = {};
    const nestedList: CodeListItem[] = [];
    items.forEach((data: IData, index: number) => {
      map[data[valueAppDEFieldId as string]] = new CodeListDataItem(
        this.codeList,
        data,
        {
          index,
          total: items.length,
        },
      );
    });
    items.forEach((data: IData) => {
      const parent = map[data[pvalueAppDEFieldId as string]];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(map[data[valueAppDEFieldId as string]]);
      } else {
        nestedList.push(map[data[valueAppDEFieldId as string]]);
      }
    });
    return nestedList;
  }

  /**
   * @description 获取代码表缓存key
   * @param {IContext} context
   * @param {IParams} [params={}]
   * @returns {*}  {string}
   * @memberof DynamicCodeListCache
   */
  getCacheKey(context: IContext, params: IParams = {}): string {
    let key =
      this.isOperatorType || this.isGlobalCache
        ? this.codeList.codeListTag!
        : `${this.codeList.codeListTag}@${JSON.stringify(getTempContext(context))}@${JSON.stringify(params)}`;
    if (this.localCacheTag) {
      key = StringUtil.fill(
        `${this.codeList.codeListTag}@${this.localCacheTag}`,
        context,
        params,
      );
    }
    return key;
  }

  /**
   * 获取动态的代码项
   *
   * @author lxm
   * @date 2022-08-26 14:08:44
   * @param {IParams} [context={}]
   * @param {IParams} [params={}]
   * @returns {*}  {Promise<IData[]>}
   */
  async get(context: IContext, params: IParams = {}): Promise<CodeListItem[]> {
    // 初始化还未完成时被调用
    if (this.initPromise) {
      await this.initPromise;
    }
    // 不需要缓存的直接请求;
    if (!this.codeList.enableCache) {
      return this.load(context, params);
    }
    // 需要缓存的先找，在判断是否过期，是否正在加载等情况
    const key = this.getCacheKey(context, params);
    if (this.cache.has(key)) {
      const cacheData: CacheData = this.cache.get(key)!;
      // 开启全局缓存则全局唯一
      if (this.isGlobalCache) {
        return cacheData.promise ? cacheData.promise! : cacheData.items!;
      }
      // 没过期的返回cacheData的promise或items
      if (cacheData.expirationTime > new Date().getTime()) {
        return cacheData.promise ? cacheData.promise! : cacheData.items!;
      }
      // 过期的删除缓存
      this.cache.delete(key);
    }
    // 创建新的cacheData,存入cache,并添加load的promise
    const promise = this.load(context, params);
    const { cacheTimeout } = this.codeList;
    const waitTime =
      cacheTimeout === -1 || isNil(cacheTimeout)
        ? ibiz.config.codeList.timeout
        : this.codeList.cacheTimeout;
    const cacheData: CacheData = {
      expirationTime: new Date().getTime() + waitTime!,
      promise,
    };
    this.cache.set(key, cacheData);

    // 加载完后删除promise,添加items
    const result = await promise;
    cacheData.items = result;
    delete cacheData.promise;
    return result;
  }

  /**
   * 接受代码表实体数据变更，刷新代码表
   *
   * @author tony001
   * @date 2024-04-10 15:04:42
   * @protected
   * @param {IPortalMessage} msg
   */
  protected codelistChange(msg: IPortalMessage): void {
    const data = msg.data as IDataEntity;
    const { appDataEntityId } = this.codeList;
    if (appDataEntityId) {
      const codeName = calcDeCodeNameById(appDataEntityId);
      if (
        data &&
        data.srfdecodename &&
        data.srfdecodename.toLowerCase() === codeName
      ) {
        this.refresh();
      }
    }
  }

  /**
   * 刷新代码表数据
   *
   * @author tony001
   * @date 2024-04-10 17:04:20
   * @return {*}  {Promise<void>}
   */
  async refresh(): Promise<void> {
    // 删除缓存数据
    const key = this.getCacheKey(this.context, this.params);
    this.cache.delete(key);
    // 重新加载数据
    const result = await this.get(this.context, this.params);
    this.evt.emit('change', result);
  }

  /**
   * 代码表数据变更事件监听
   *
   * @author tony001
   * @date 2024-04-10 17:04:52
   * @param {(data: CodeListItem[]) => void} fn
   * @param {boolean} [immediate=true] 当有数据时，立即触发一次回调
   */
  onChange(
    fn: (data: CodeListItem[]) => void,
    immediate: boolean = true,
  ): void {
    this.evt.on('change', fn);
    const key = this.getCacheKey(this.context, this.params);
    const cacheData: CacheData = this.cache.get(key)!;
    if (immediate && notNilEmpty(cacheData)) {
      fn(cacheData.items as CodeListItem[]);
    }
  }

  /**
   * 取消代码表数据变更监听
   *
   * @author tony001
   * @date 2024-04-10 17:04:57
   * @param {(data: CodeListItem[]) => void} fn
   */
  offChange(fn: (data: CodeListItem[]) => void): void {
    this.evt.off('change', fn);
  }

  /**
   * 销毁(取消数据变更监听)
   *
   * @author tony001
   * @date 2024-04-10 15:04:11
   */
  destroy(): void {
    const { appDataEntityId, appDEDataSetId } = this.codeList;
    if (appDataEntityId && appDEDataSetId && this.codeList.enableCache) {
      ibiz.mc.command.change.off(this.codelistChange);
    }
  }
}
