import { IChatToolbarItem } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatToolbarProps {
    /**
     * 单实例聊天总控
     *
     * @type {AiChatController}
     * @memberof ChatToolbarProps
     */
    controller: AiChatController;
    /**
     * 用户自定义工具项集合
     *
     * @type {IChatToolbarItem}
     * @memberof ChatToolbarProps
     */
    items?: IChatToolbarItem[];
    /**
     * 业务数据
     *
     * @type {*}
     * @memberof ChatToolbarProps
     */
    data: any;
    /**
     * 工具栏类型
     *
     * @type {('content' | 'footer')}
     * @memberof ChatToolbarProps
     */
    type: 'content' | 'footer';
    /**
     * 类名
     *
     * @type {string}
     * @memberof ChatToolbarProps
     */
    className?: string;
    /**
     * AI模式
     *
     * @type {('DEFAULT' | 'TOPIC')}
     * @memberof ChatToolbarProps
     */
    mode: 'DEFAULT' | 'TOPIC';
    /**
     * 隐藏话题侧边栏
     *
     * @type {boolean}
     * @memberof ChatToolbarProps
     */
    hideTopicSidebar: boolean;
}
export declare const ChatToolbar: (props: ChatToolbarProps) => import("preact").JSX.Element;
