import { IDeepResearchStep, IDeepResearchResource, IDeepResearchResourceWeb } from '../../interface';

export interface ChatDeepResearchStepProps {
    step: IDeepResearchStep;
    resource?: IDeepResearchResource;
    resourceWeb?: IDeepResearchResourceWeb;
    index: number;
    total: number;
    isLast?: boolean;
    defaultExpanded?: boolean;
}
export declare const ChatDeepResearchStep: (props: ChatDeepResearchStepProps) => import("preact").JSX.Element;
