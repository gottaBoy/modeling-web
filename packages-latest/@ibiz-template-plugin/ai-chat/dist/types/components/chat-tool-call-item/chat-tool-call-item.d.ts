import { IChatToolCall } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatToolCallItemProps {
    /**
     * @description 工具调用
     * @type {IChatToolCall}
     * @memberof ChatToolCallItemProps
     */
    item: IChatToolCall;
    /**
     * @description 聊天控制器
     * @type {AiChatController}
     * @memberof ChatToolCallItemProps
     */
    controller: AiChatController;
    /**
     * @description 点击链接
     * @memberof ChatToolCallItemProps
     */
    onLinkClick: (event: MouseEvent) => void;
    /**
     * @description 折叠状态改变
     * @memberof ChatToolCallItemProps
     */
    onCollapseChange?: (isCollapse: boolean) => void;
}
export declare const ChatToolCallItem: (props: ChatToolCallItemProps) => import('preact').VNode<import('preact').Attributes & {
    item: IChatToolCall;
    className: string;
    controller: AiChatController;
    onLinkClick: (event: MouseEvent) => void;
    onCollapseChange: (isCollapse: boolean) => void;
}>;
