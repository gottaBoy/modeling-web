/**
 * @description 深度研究资源
 * @author tony001
 * @date 2026-06-10 11:06:30
 * @export
 * @interface IDeepResearchResource
 */
export interface IDeepResearchResource {
    /**
     * 查询问题
     */
    query: string[];
    /**
     * web查询结果，映射IDeepResearchResourceWeb资源doc_index
     */
    list: number[];
    /**
     * 是否展开
     */
    expanded?: boolean;
}
