import { AiChatController } from '../../controller';

export interface ChatMinimizeProps {
    /**
     * 单实例聊天总控
     *
     * @type {AiChatController}
     * @memberof ChatMessageItemProps
     */
    controller: AiChatController;
    /**
     * 标题
     *
     * @type {string}
     * @memberof ChatMinimizeProps
     */
    title: string;
    /**
     * 是否最小化
     *
     * @type {boolean}
     * @memberof ChatMinimizeProps
     */
    isMinimize: boolean;
    /**
     * 点击
     *
     * @memberof ChatMinimizeProps
     */
    onClick: () => void;
}
export declare const ChatMinimize: (props: ChatMinimizeProps) => import("preact").JSX.Element;
