import { IKnowledgeBase } from '../../interface';

export declare class KnowledgeBase implements IKnowledgeBase {
    knowledgeBase: IKnowledgeBase;
    get id(): string;
    get name(): string;
    get value(): string;
    get label(): string;
    constructor(knowledgeBase: IKnowledgeBase);
}
