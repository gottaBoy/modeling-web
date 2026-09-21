import { IAppCodeList } from '@ibiz/model-core';
import { IPortalMessage } from '@ibiz-template/core';
import { QXEvent } from 'qx-util';
import { Application } from '../../../application';
import { CodeListItem } from '../../../interface';
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
export declare class DynamicCodeListCache {
    protected app: Application;
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
    protected cache: Map<string, CacheData>;
    /**
     * 是否是预定义类型
     *
     * @author lxm
     * @date 2022-10-20 10:10:48
     * @protected
     * @type {boolean}
     */
    protected isPredefined: boolean;
    /**
     * 是否是系统操作者类型
     *
     * @author tony001
     * @date 2024-10-14 15:10:19
     * @protected
     * @type {boolean}
     */
    protected isOperatorType: boolean;
    /**
     * @description 是否全局缓存，通过定义自定义参数（格式如：globalCache=true）启用全局缓存，若启用全局缓存，则缓存全局唯一，缓存key为代码表代码标识
     * @protected
     * @type {boolean}
     * @memberof DynamicCodeListCache
     */
    protected isGlobalCache: boolean;
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
    protected context: IContext;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2024-04-10 15:04:39
     * @protected
     * @type {IParams}
     */
    protected params: IParams;
    /**
     * 事件对象
     *
     * @author tony001
     * @date 2024-04-10 17:04:00
     * @protected
     */
    protected evt: QXEvent<{
        change: (data: CodeListItem[]) => void;
    }>;
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
    protected commonKeys: string[];
    constructor(codeList: IAppCodeList);
    /**
     * 设置上下文以及查询参数
     *
     * @author tony001
     * @date 2024-04-10 15:04:04
     * @protected
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    protected setParams(context?: IContext, params?: IParams): void;
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-26 14:08:28
     * @returns {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 把数据转换成代码项
     *
     * @author lxm
     * @date 2022-08-26 15:08:24
     * @param {IData} data
     * @returns {*}
     */
    protected convertData(data: IData, index: number, items: IData[]): CodeListItem;
    protected presetconvertData(data: IData): CodeListItem;
    protected sortShoworder(arr: IData[]): IData[];
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
    protected load(context: IContext, params?: IParams): Promise<CodeListItem[]>;
    /**
     * 组装树形代码表数据
     *
     * @return {codeListItem[] | undefined}
     */
    protected prepareTreeData(items: IData[]): CodeListItem[] | undefined;
    /**
     * @description 获取代码表缓存key
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @returns {*}  {string}
     * @memberof DynamicCodeListCache
     */
    getCacheKey(context: IContext, params?: IParams): string;
    /**
     * 获取动态的代码项
     *
     * @author lxm
     * @date 2022-08-26 14:08:44
     * @param {IParams} [context={}]
     * @param {IParams} [params={}]
     * @returns {*}  {Promise<IData[]>}
     */
    get(context: IContext, params?: IParams): Promise<CodeListItem[]>;
    /**
     * 接受代码表实体数据变更，刷新代码表
     *
     * @author tony001
     * @date 2024-04-10 15:04:42
     * @protected
     * @param {IPortalMessage} msg
     */
    protected codelistChange(msg: IPortalMessage): void;
    /**
     * 刷新代码表数据
     *
     * @author tony001
     * @date 2024-04-10 17:04:20
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 代码表数据变更事件监听
     *
     * @author tony001
     * @date 2024-04-10 17:04:52
     * @param {(data: CodeListItem[]) => void} fn
     * @param {boolean} [immediate=true] 当有数据时，立即触发一次回调
     */
    onChange(fn: (data: CodeListItem[]) => void, immediate?: boolean): void;
    /**
     * 取消代码表数据变更监听
     *
     * @author tony001
     * @date 2024-04-10 17:04:57
     * @param {(data: CodeListItem[]) => void} fn
     */
    offChange(fn: (data: CodeListItem[]) => void): void;
    /**
     * 销毁(取消数据变更监听)
     *
     * @author tony001
     * @date 2024-04-10 15:04:11
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=dynamic-code-list.d.ts.map