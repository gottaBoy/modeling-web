import { AiChatController } from '../../controller';
import { IChatToolbarItem } from '../../interface';

interface SimpleChatInputProps {
    /**
     * @description 聊天实例控制器
     *
     * @type {AiChatController}
     * @memberof SimpleChatInputProps
     */
    controller: AiChatController;
    /**
     * @description 空白占位
     * @type {string}
     * @memberof SimpleChatInputProps
     */
    placeholder?: string;
    /**
     * @description 提问区工具栏
     * @type {IChatToolbarItem[]}
     * @memberof SimpleChatInputProps
     */
    questionToolbarItems?: IChatToolbarItem[];
}
export declare const SimpleChatInput: (props: SimpleChatInputProps) => import("preact").JSX.Element;
export {};
