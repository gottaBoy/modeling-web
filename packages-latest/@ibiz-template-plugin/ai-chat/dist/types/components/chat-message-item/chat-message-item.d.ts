import { VNode, h } from 'preact';
import { IChatMessage } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatMessageItemProps {
    /**
     * 单实例聊天总控
     *
     * @author chitanda
     * @date 2023-10-13 17:10:43
     * @type {AiChatController}
     */
    controller: AiChatController;
    message: IChatMessage;
    /**
     * 内容大小，用于更新绘制
     *
     * @author chitanda
     * @date 2023-10-15 21:10:22
     * @type {number}
     */
    size: number;
    /**
     * 插槽
     *
     * @type {VNode}
     * @memberof ChatMessageItemProps
     */
    children: VNode;
}
export declare const ChatMessageItem: (props: ChatMessageItemProps) => h.JSX.Element;
