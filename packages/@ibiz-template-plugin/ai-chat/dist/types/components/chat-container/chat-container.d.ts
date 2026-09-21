import { Component } from 'preact';
import { Namespace } from '../../utils';
import { AiChatController, AiTopicController } from '../../controller';
import { IChatToolbarItem, IChatContainerOptions } from '../../interface';
export interface ChatContainerProps {
    /**
     * 呈现模式
     *
     * @author tony001
     * @date 2025-02-23 16:02:00
     * @type {('DEFAULT' | 'TOPIC')}
     */
    mode: 'DEFAULT' | 'TOPIC';
    /**
     * 是否允许回填
     *
     * @author tony001
     * @date 2025-03-10 16:03:08
     * @type {boolean}
     */
    enableBackFill?: boolean;
    /**
     * ai话题控制器
     *
     * @author tony001
     * @date 2025-02-23 16:02:38
     * @type {AiTopicController}
     */
    aiTopic: AiTopicController;
    /**
     * 聊天控制器
     *
     * @author tony001
     * @date 2025-02-23 16:02:24
     * @type {AiChatController}
     */
    aiChat: AiChatController;
    /**
     * 关闭聊天窗口
     *
     * @author chitanda
     * @date 2023-10-15 19:10:35
     */
    close: () => void;
    /**
     * 全屏行为
     *
     * @memberof ChatContainerProps
     */
    fullscreen: (target: boolean) => void;
    /**
     * 最小化行为
     *
     * @memberof ChatContainerProps
     */
    minimize: (target: boolean) => void;
    /**
     * 标题
     *
     * @type {string}
     * @memberof ChatContainerProps
     */
    caption?: string;
    /**
     * 内容工具项
     *
     * @type {IChatToolbarItem[]}
     * @memberof ChatContainerProps
     */
    contentToolbarItems?: IChatToolbarItem[];
    /**
     * 底部工具项
     *
     * @type {IChatToolbarItem[]}
     * @memberof ChatContainerProps
     */
    footerToolbarItems?: IChatToolbarItem[];
    /**
     * 提问区工具栏
     *
     * @author tony001
     * @date 2025-02-28 16:02:51
     * @type {IChatToolbarItem[]}
     */
    questionToolbarItems?: IChatToolbarItem[];
    /**
     * AI容器呈现
     *
     * @author tony001
     * @date 2025-03-03 16:03:06
     * @type {IChatContainerOptions}
     */
    containerOptions?: IChatContainerOptions;
}
interface ChatContainerState {
    /**
     * 全屏状态
     *
     * @author ljx
     * @date 2024-05-07 15:10:31
     */
    isFullScreen: boolean;
    /**
     * 最小化
     *
     * @type {boolean}
     * @memberof ChatContainerState
     */
    isMinimize: boolean;
}
interface ContainerContext {
    zIndex: number;
    enableBackFill: boolean;
    newTopic: Function;
}
export declare const ContainerContext: import("preact").Context<ContainerContext>;
/**
 * 聊天窗口容器，可拖拽，可缩放
 *
 * @author chitanda
 * @date 2023-10-13 17:10:37
 * @export
 * @class ChatContainer
 * @extends {Component<ChatContainerProps>}
 */
export declare class ChatContainer extends Component<ChatContainerProps, ChatContainerState> {
    constructor(props: ChatContainerProps | undefined);
    ns: Namespace;
    containerRef: import("preact").RefObject<HTMLDivElement>;
    dragHandle: import("preact").RefObject<HTMLDivElement>;
    /**
     * 窗口样式数据
     *
     * @memberof ChatContainer
     */
    data: {
        side: {
            y: number;
            height: number;
            width: number;
            x: number;
        };
        window: {
            y: number;
            width: number;
            height: number;
            x: number;
        };
        minWidth: number;
        minHeight: number;
        showMode: string;
    };
    /**
     * 是否禁止拖动
     * - 拖拽边时应禁止拖动
     * @type {boolean}
     * @memberof ChatContainer
     */
    disabled: boolean;
    /**
     * 最小化是否在拖拽中
     * - 在拖拽时不应触发点击事件
     * @type {boolean}
     * @memberof ChatContainer
     */
    isDragging: boolean;
    /**
     * 容器上下文
     *
     * @author tony001
     * @date 2025-03-03 16:03:44
     * @type {ContainerContext}
     */
    containerContext: ContainerContext;
    /**
     * 计算AI窗口样式
     *
     * @return {*}
     * @memberof ChatContainer
     */
    calcWindowStyle(): {
        left: string;
        top: string;
        width: string;
        height: string;
        minWidth: string;
        minHeight: string;
        'z-index': string;
    };
    /**
     * 计算靠边模式样式
     *
     * @param {('left' | 'right')} side
     * @memberof ChatContainer
     */
    calcSideModeStyle(side: 'left' | 'right'): void;
    /**
     * 设置样式
     *
     * @memberof ChatContainer
     */
    setStyle(): void;
    /**
     * 吸附边缘（窗口模式）
     * - 靠近窗口上下边缘(20px) - 自动吸附
     * - 靠近窗口左右边缘(20px) - 靠边模式
     * @memberof ChatContainer
     */
    snapToEdge(): void;
    /**
     * 注册对话框拖拽
     *
     * @memberof ChatContainer
     */
    registerDragDialog(): void;
    /**
     * 注册对话框边界拖拽
     *
     * @memberof ChatContainer
     */
    registerDragDialogBorder(): void;
    /**
     * 处理全屏改变
     *
     * @memberof ChatContainer
     */
    handleFullScreenChange(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * 关闭聊天窗口
     *
     * @author chitanda
     * @date 2023-10-15 19:10:31
     */
    close(): void;
    /**
     * 全屏
     *
     * @author ljx
     * @date 2024-05-07 15:10:31
     */
    fullScreen(): void;
    /**
     * 关闭全屏
     *
     * @author ljx
     * @date 2024-05-07 15:10:31
     */
    closeFullScreen(): void;
    /**
     * 最小化
     *
     * @memberof ChatContainer
     */
    minimize(): void;
    /**
     * 退出最小化
     *
     * @memberof ChatContainer
     */
    exitMinimize(): void;
    /**
     * 阻止冒泡
     * - 防止点击头部行为时误触发拖动监听
     * @param {MouseEvent} evt
     * @memberof ChatContainer
     */
    stopPropagation(evt: MouseEvent): void;
    render(): import("preact").JSX.Element;
}
export {};
