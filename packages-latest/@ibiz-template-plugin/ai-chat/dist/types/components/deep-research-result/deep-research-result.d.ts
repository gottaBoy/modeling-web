import { IDeepResearchReport } from '../../interface';

export type DeepResearchResultTab = 'visualized' | 'text';
export interface DeepResearchResultProps {
    /**
     * @description 深度研究报告数据
     */
    report: IDeepResearchReport;
    /**
     * @description 默认激活页签
     */
    defaultActiveTab?: DeepResearchResultTab;
    /**
     * @description 自定义类名
     */
    className?: string;
    /**
     * @description 页签切换回调
     */
    onTabChange?: (tab: DeepResearchResultTab) => void;
    /**
     * @description 关闭回调，由外层决定是否销毁/隐藏组件
     */
    onClose?: () => void;
}
export declare const DeepResearchResult: (props: DeepResearchResultProps) => import("preact").JSX.Element;
