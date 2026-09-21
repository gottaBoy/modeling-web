import { BreadcrumbMsg } from './nav-breadcrumb.state';
/**
 * @description 面包屑服务
 * @export
 * @class NavBreadcrumbService
 */
export declare class NavBreadcrumbService {
    readonly navMode: 'router' | 'menu' | 'store';
    private context;
    /**
     * @description 面包屑堆栈
     * @private
     * @type {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbService
     */
    private chache;
    constructor(navMode: 'router' | 'menu' | 'store', context: IContext);
    /**
     * @description 添加缓存项
     * @param {BreadcrumbMsg} item
     * @memberof NavBreadcrumbService
     */
    add(item: BreadcrumbMsg): void;
    /**
     * @description 删除缓存项
     * @param {string} fullPath
     * @return {*}  {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbService
     */
    remove(fullPath: string): BreadcrumbMsg[];
    /**
     * @description 删除当前项之后缓存数据
     * @param {string} fullPath
     * @return {*}  {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbService
     */
    removeAfter(fullPath: string): BreadcrumbMsg[];
    /**
     * @description 更新缓存数据
     * @param {BreadcrumbMsg} item
     * @memberof NavBreadcrumbService
     */
    updateOrAdd(item: BreadcrumbMsg): void;
    /**
     * @description 获取缓存数据项
     * @param {IData} data
     * @return {*}  {(BreadcrumbMsg | undefined)}
     * @memberof NavBreadcrumbService
     */
    getItem(data: IData): BreadcrumbMsg | undefined;
    /**
     * @description 获取缓存数据
     * @return {*}  {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbService
     */
    getChache(): BreadcrumbMsg[];
    /**
     * @description 设置缓存数据
     * @param {BreadcrumbMsg[]} items
     * @memberof NavBreadcrumbService
     */
    setChache(items: BreadcrumbMsg[]): void;
}
