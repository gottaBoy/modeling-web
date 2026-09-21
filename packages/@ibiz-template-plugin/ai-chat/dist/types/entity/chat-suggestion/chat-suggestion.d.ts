import { IChatSuggestion } from '../../interface';
export declare class ChatSuggestion implements IChatSuggestion {
    suggestion: IChatSuggestion;
    get type(): IChatSuggestion['type'];
    get metadata(): IChatSuggestion['metadata'];
    get data(): IChatSuggestion['data'];
    constructor(suggestion: IChatSuggestion);
}
