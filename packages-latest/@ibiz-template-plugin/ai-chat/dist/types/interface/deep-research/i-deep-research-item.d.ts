import { DeepResearchType } from '../../constants';
import { IDeepResearchStep } from './i-deep-research-step';
import { IDeepResearchResource } from './i-deep-research-resource';
import { IDeepResearchResourceWeb } from './i-deep-research-source-web';
import { IDeepResearchReport } from './i-deep-research-report';

/**
 * @description 深度研究项数据
 * @author tony001
 * @date 2026-06-10 11:06:36
 * @export
 * @interface IDeepResearchItem
 */
export type IDeepResearchItem = {
    source_seq: string;
    type: typeof DeepResearchType.DEEP_RESEARCH_STEP;
    content: IDeepResearchStep;
} | {
    source_seq: string;
    type: typeof DeepResearchType.DEEP_RESEARCH_SOURCE;
    content: IDeepResearchResource;
} | {
    source_seq: string;
    type: typeof DeepResearchType.DEEP_RESEARCH_SOURCE_WEB;
    content: IDeepResearchResourceWeb;
} | {
    source_seq: string;
    type: typeof DeepResearchType.DEEP_RESEARCH_REPORT;
    content: IDeepResearchReport;
};
