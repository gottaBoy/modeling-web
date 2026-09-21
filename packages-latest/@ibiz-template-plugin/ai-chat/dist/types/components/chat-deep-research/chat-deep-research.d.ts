import { IDeepResearchItem } from '../../interface';

interface ChatDeepResearchProps {
    items: IDeepResearchItem[];
    title?: string;
    onReportCopy?: (content: string) => void;
    onClose?: () => void;
}
export declare const ChatDeepResearch: (props: ChatDeepResearchProps) => import("preact").JSX.Element;
export {};
