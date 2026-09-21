import { VNode } from 'preact';
import { IChatMessage } from '../../../interface';
import { AiChatController } from '../../../controller';
export interface UserMessageProps {
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
     * 工具栏
     *
     * @type {VNode}
     * @memberof UserMessageProps
     */
    children: VNode;
}
export declare const UserMessage: (props: UserMessageProps) => import("preact").JSX.Element;
