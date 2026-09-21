/**
 * @description 获取本地缓存key函数
 * @export
 * @param {IContext} context
 * @param {string} type
 * @param {number} [routeDepth]
 * @param {string} [splitter='@']
 * @param {string} [noRouteTag='']
 * @returns {*}  {(() => string | undefined)}
 */
export declare function useLocalCacheKey(context: IContext, type: string, routeDepth?: number, splitter?: string, noRouteTag?: string): () => string | undefined;
//# sourceMappingURL=index.d.ts.map