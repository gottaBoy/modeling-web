import { Component } from 'preact';
import { Namespace } from '../../utils';
import { AiChatController, AiTopicController } from '../../controller';
import { IChatToolbarItem } from '../../interface';

export interface FlatChatContainerProps {
    /**
     * 呈现模式
     */
    mode: 'DEFAULT' | 'TOPIC';
    /**
     * 是否允许回填
     */
    enableBackFill?: boolean;
    /**
     * ai话题控制器，非loading模式必传
     */
    aiTopic?: AiTopicController;
    /**
     * 聊天控制器，非loading模式必传
     */
    aiChat?: AiChatController;
    /**
     * 隐藏话题侧边栏
     */
    hideTopicSidebar: boolean;
    /**
     * 标题
     */
    caption?: string;
    /**
     * 内容工具项
     */
    contentToolbarItems?: IChatToolbarItem[];
    /**
     * 底部工具项
     */
    footerToolbarItems?: IChatToolbarItem[];
    /**
     * 提问区工具栏
     */
    questionToolbarItems?: IChatToolbarItem[];
    /**
     * 是否加载中
     */
    isLoading: boolean;
}
interface FlatContainerContext {
    enableBackFill: boolean;
}
export declare const FlatContainerContext: import('preact').Context<FlatContainerContext>;
/**
 * 平铺聊天容器，无拖拽/缩放/全屏/最小化，铺满外部容器
 *
 * @export
 * @class FlatChatContainer
 * @extends {Component<FlatChatContainerProps>}
 */
export declare class FlatChatContainer extends Component<FlatChatContainerProps> {
    ns: Namespace;
    /**
     * 容器上下文
     */
    containerContext: FlatContainerContext;
    /**
     * @description 绘制loading
     * @returns {*}
     * @memberof FlatChatContainer
     */
    renderLoading(): import("preact").JSX.Element;
    /**
     * @description 绘制内容
     * @memberof FlatChatContainer
     */
    renderContent(): import("preact").JSX.Element | import("preact").JSX.Element[] | undefined;
    render(): import("preact").JSX.Element;
}
export {};
