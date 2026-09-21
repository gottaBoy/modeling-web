import { Component } from 'preact';
import { Namespace } from '../../utils';
import { IChatToolbarItem } from '../../interface';
import { AiChatController } from '../../controller';

export interface SimpleChatContainerProps {
    /**
     * @description 是否加载中
     * @type {boolean}
     * @memberof SimpleChatContainerProps
     */
    isLoading: boolean;
    /**
     * @description 聊天控制器
     * @type {AiChatController}
     * @memberof SimpleChatContainerProps
     */
    aiChat?: AiChatController;
    /**
     * @description 空白占位
     * @type {string}
     * @memberof SimpleChatContainerProps
     */
    placeholder?: string;
    /**
     * @description 提问区互交工具栏
     * @type {IChatToolbarItem[]}
     * @memberof SimpleChatContainerProps
     */
    questionToolbarItems?: IChatToolbarItem[];
}
/**
 * 简单聊天容器
 *
 * @export
 * @class SimpleChatContainer
 * @extends {Component<SimpleChatContainerProps>}
 */
export declare class SimpleChatContainer extends Component<SimpleChatContainerProps> {
    ns: Namespace;
    render(): import("preact").JSX.Element;
}
