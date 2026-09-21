import { VNode } from 'preact';
import { IChatMessage } from '../../../interface';
import { AiChatController } from '../../../controller';
export interface MarkdownMessageProps {
    /**
     * 单实例聊天总控
     *
     * @author chitanda
     * @date 2023-10-13 17:10:43
     * @type {AiChatController}
     */
    controller: AiChatController;
    /**
     * 消息
     *
     * @author tony001
     * @date 2025-03-18 14:03:38
     * @type {IChatMessage}
     */
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
     * 工具栏
     *
     * @type {VNode}
     * @memberof MarkdownMessageProps
     */
    children: VNode;
}
export declare const MarkdownMessage: (props: MarkdownMessageProps) => import("preact").JSX.Element;
