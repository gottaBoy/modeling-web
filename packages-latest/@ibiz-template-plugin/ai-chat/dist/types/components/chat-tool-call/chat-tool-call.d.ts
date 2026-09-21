import { IChatToolCall } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatToolCallProps {
    /**
     * @description 工具调用集合
     * @type {IChatToolCall[]}
     * @memberof ChatToolCallProps
     */
    items: IChatToolCall[];
    /**
     * @description 工具调用是否处理完成
     */
    toolcallCompleted: boolean;
    /**
     * @description 聊天控制器
     */
    controller: AiChatController;
    /**
     * @description 点击链接
     * @memberof ChatToolCallProps
     */
    onLinkClick: (event: MouseEvent) => void;
    /**
     * @description 折叠状态改变
     * @memberof ChatToolCallProps
     */
    onCollapseChange?: (isCollapse: boolean) => void;
}
export declare const ChatToolCall: (props: ChatToolCallProps) => import("preact").JSX.Element;
