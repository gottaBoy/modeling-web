import { IAIAgent, IAIKnowledgeBase } from '../../interface';

export declare class AIAgent implements IAIAgent {
    agent: IAIAgent;
    defaultConfig: {
        chunkrerank: 0 | 1 | 2;
        maxchunks?: number;
        chunkthreshold?: number;
        chunkpageindex?: 0 | 1;
    };
    get id(): string;
    get caption(): string;
    get default(): 0 | 1;
    get order(): number | undefined;
    get value(): string;
    get label(): string;
    get knowledge_bases(): IAIKnowledgeBase[] | undefined;
    get allow_any_knowledge_base(): 0 | 1;
    get rerank(): 0 | 1 | 2;
    get maxchunks(): number | undefined;
    get chunkthreshold(): number | undefined;
    get chunkpageindex(): 0 | 1 | undefined;
    constructor(agent: IAIAgent, defaultConfig: {
        chunkrerank: 0 | 1 | 2;
        maxchunks?: number;
        chunkthreshold?: number;
        chunkpageindex?: 0 | 1;
    });
}
