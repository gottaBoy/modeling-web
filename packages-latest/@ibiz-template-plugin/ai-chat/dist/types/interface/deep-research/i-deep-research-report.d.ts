/**
 * @description 深度研究报告
 * @author tony001
 * @date 2026-06-10 11:06:10
 * @export
 * @interface IDeepResearchReport
 */
export interface IDeepResearchReport {
    /**
     * 显示文本
     */
    display_text: string;
    /**
     *  报告名称
     */
    name: string;
    /**
     *  报告封面图链接地址
     */
    report_cover: string;
    /**
     *  报告文本内容
     */
    report_content: string;
    /**
     * 可视化报告文本内容(html)
     */
    visualized_report_content: string;
    /**
     *  创建时间时间戳
     */
    timestamp: number;
    /**
     *  文本数量
     */
    word_count: number;
    /**
     * 状态，初始化 | 处理中 | 完成
     */
    status: 'init' | 'processing' | 'complete';
}
