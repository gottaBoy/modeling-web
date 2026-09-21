import { IChatThink } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatThinkProps {
    /**
     * @description AI聊天思维链
     * @type {IChatThink[]}
     * @memberof ChatThinkProps
     */
    item: IChatThink;
    /**
     * @description 聊天控制器
     */
    controller: AiChatController;
}
export declare const ChatThink: (props: ChatThinkProps) => import("preact").JSX.Element | undefined;
