import { AiChatController } from '../../controller';
import { IChatToolbarItem } from '../../interface';

export interface ChatInputProps {
    /**
     * 单实例聊天总控
     *
     * @author chitanda
     * @date 2023-10-13 17:10:43
     * @type {AiChatController}
     */
    controller: AiChatController;
    /**
     * 提问区交互工具栏
     *
     * @author tony001
     * @date 2025-02-28 16:02:58
     * @type {IChatToolbarItem[]}
     */
    questionToolbarItems?: IChatToolbarItem[];
}
export declare const ChatInput: (props: ChatInputProps) => import("preact").JSX.Element;
