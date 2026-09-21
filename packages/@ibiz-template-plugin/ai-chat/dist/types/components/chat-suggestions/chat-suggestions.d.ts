import { IChatSuggestion } from '../../interface';
export interface ChatSuggestionsProps {
    /**
     * 聊天建议集合
     *
     * @author tony001
     * @date 2025-03-18 14:03:17
     * @type {IChatSuggestion[]}
     */
    items: IChatSuggestion[];
    /**
     * 点击事件回调
     *
     * @author tony001
     * @date 2025-03-18 14:03:30
     */
    onItemClick?: (item: IChatSuggestion, event: MouseEvent) => void;
}
export declare const ChatSuggestions: (props: ChatSuggestionsProps) => import("preact").JSX.Element;
