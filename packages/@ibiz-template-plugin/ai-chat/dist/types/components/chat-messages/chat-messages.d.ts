import { AiChatController } from '../../controller';
import { IChatToolbarItem } from '../../interface';
export interface ChatMessageProps {
    /**
     * 单实例聊天总控
     *
     * @author chitanda
     * @date 2023-10-13 17:10:43
     * @type {AiChatController}
     */
    controller: AiChatController;
    /**
     * 工具项集合
     *
     * @type {IChatToolbarItem[]}
     * @memberof ChatMessageProps
     */
    toolbarItems?: IChatToolbarItem[];
}
export declare const ChatMessages: (props: ChatMessageProps) => import("preact").JSX.Element;
