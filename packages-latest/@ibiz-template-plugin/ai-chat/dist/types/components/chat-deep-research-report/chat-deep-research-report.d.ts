import { IDeepResearchReport } from '../../interface';

export interface ChatDeepResearchReportProps {
    report: IDeepResearchReport;
    index: number;
    total: number;
    defaultExpanded?: boolean;
    onCopy?: (content: string) => void;
}
export declare const ChatDeepResearchReport: (props: ChatDeepResearchReportProps) => import("preact").JSX.Element;
