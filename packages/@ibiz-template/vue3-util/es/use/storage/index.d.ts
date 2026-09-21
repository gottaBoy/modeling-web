/**
 * 获取本地缓存key函数
 *
 * @author zhanghengfeng
 * @date 2024-05-29 21:05:53
 * @export
 * @param {IContext} context
 * @param {string} type
 * @param {number} [routeDepth]
 * @param {string} [splitter='@']
 * @return {*}  {(() => string | undefined)}
 */
export declare function useLocalCacheKey(context: IContext, type: string, routeDepth?: number, splitter?: string): () => string | undefined;
//# sourceMappingURL=index.d.ts.map