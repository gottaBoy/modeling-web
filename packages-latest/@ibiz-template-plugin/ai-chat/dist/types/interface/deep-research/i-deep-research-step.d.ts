/**
 * @description 深度研究步骤项
 * @author tony001
 * @date 2026-06-10 10:06:20
 * @export
 * @interface IDeepResearchStepItem
 */
export interface IDeepResearchStepItem {
    /**
     *  名称（简写）
     */
    abbr_name: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 状态，初始化 | 处理中 | 完成
     */
    status: 'init' | 'processing' | 'complete';
    /**
     * 思考内容，需动态链接[(xxxxxxx)]资源
     *
     * 格式如：通过研究，我已掌握2023-2026年新能源汽车市场关键数据，包括渗透率突破30%、41.83%、47.9%-53%及70%的关键节点。需进一步确认2025年渗透率数据差异及获取2026年上半年最新数据，以完善从增量到存量的市场转变分析。
     * [(deep_research_source_1)]
     * 经调研发现2026年5月新能源车零售渗透率已达62.9%，批发达61.1%，创历史新高。市场已进入存量竞争阶段，2025年突破50%是关键转折点。值得注意的是插混/增程在2024年增速反超纯电，但2026年纯电占比又回升。下步将分析技术路线分化趋势和出口支撑作用。
     *
     */
    think_content: string;
}
/**
 * @description 深度研究步骤
 * @author tony001
 * @date 2026-06-10 11:06:30
 * @export
 * @interface IDeepResearchStep
 */
export interface IDeepResearchStep {
    /**
     * 显示文本
     */
    display_text: string;
    /**
     * 文档数量
     */
    doc_count: number;
    /**
     * 状态，初始化 | 处理中 | 完成
     */
    status: 'init' | 'processing' | 'complete';
    /**
     * 步骤项集合
     */
    step: IDeepResearchStepItem[];
}
