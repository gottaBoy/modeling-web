/**
 * @description 深度研究网络资源项
 * @author tony001
 * @date 2026-06-10 11:06:07
 * @export
 * @interface IDeepResearchResourceWebItem
 */
export interface IDeepResearchResourceWebItem {
    /**
     * 来源名称
     */
    name: string;
    /**
     *  文章链接
     */
    url: string;
    /**
     *  文章标题
     */
    title: string;
    /**
     * 内容摘要
     */
    summary: string;
    /**
     *  发布时间
     */
    publish_time: string;
    /**
     * 网站图标
     */
    icon: string;
    /**
     * 文档索引，通常用于标识该文档在搜索结果或列表中的排序位置
     */
    doc_index: number;
    /**
     * 属性标签，通常用于存储文章的分类标签（如“汽车”、“科技”等）
     */
    attribute?: string[];
    /**
     * 来源
     */
    authority?: string;
}
/**
 * @description 深度研究网络资源
 * @author tony001
 * @date 2026-06-10 11:06:58
 * @export
 * @interface IDeepResearchResourceWeb
 */
export interface IDeepResearchResourceWeb {
    /**
     *  网络资源列表
     */
    list: IDeepResearchResourceWebItem[];
}
