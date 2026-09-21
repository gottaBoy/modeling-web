import { IChatMessage } from '../../../interface';
import { AiChatController } from '../../../controller';

interface MessageToolbarProps {
    /**
     * @description 单实例聊天总控
     * @type {AiChatController}
     * @memberof MessageToolbarProps
     */
    controller: AiChatController;
    /**
     * @description 消息
     * @type {IChatMessage}
     * @memberof MessageToolbarProps
     */
    message: IChatMessage;
    /**
     * @description 拷贝
     * @memberof MessageToolbarProps
     */
    onCopy: (type: string) => void;
}
export declare const MessageToolbar: (props: MessageToolbarProps) => import("preact").JSX.Element;
export {};
