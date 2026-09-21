import { IContainerOptions } from '../../interface';
import { AiChatController } from '../ai-chat/ai-chat.controller';
import { ChatBaseController } from './chat-base.controller';

/**
 * @description 聊天总控制器(模态框模式)
 * @author tony001
 * @date 2026-05-15 14:05:54
 * @export
 * @class ModalChatController
 * @extends {ChatBaseController}
 */
export declare class ModalChatController extends ChatBaseController {
    /**
     * @description 聊天框容器
     * @author tony001
     * @date 2026-05-15 13:05:46
     * @protected
     * @type {HTMLDivElement}
     * @memberof ModalChatController
     */
    protected container?: HTMLDivElement;
    /**
     * @description 创建容器，渲染loading状态
     * @author tony001
     * @date 2026-05-15 14:05:47
     * @protected
     * @param {IContainerOptions} opts
     * @param {Record<string, any>} chatOptions
     * @memberof ModalChatController
     */
    protected setupContainer(opts: IContainerOptions, chatOptions: Record<string, any>): void;
    /**
     * @description 渲染正式聊天内容
     * @author tony001
     * @date 2026-05-15 14:05:02
     * @protected
     * @param {IContainerOptions} opts
     * @param {Record<string, any>} chatOptions
     * @param {AiChatController} aiChat
     * @memberof ModalChatController
     */
    protected renderChatContent(opts: IContainerOptions, chatOptions: Record<string, any>, aiChat: AiChatController): void;
    /**
     * @description 渲染切换后的内容
     * @author tony001
     * @date 2026-05-15 14:05:38
     * @protected
     * @param {Record<string, any>} opts
     * @param {AiChatController} aiChat
     * @memberof ModalChatController
     */
    protected renderSwitchedContent(opts: Record<string, any>, aiChat: AiChatController): void;
    /**
     * @description 隐藏聊天窗口(必须先创建)
     * @author tony001
     * @date 2026-05-15 13:05:41
     * @memberof ModalChatController
     */
    hidden(): void;
    /**
     * @description 显示聊天窗窗口(必须先创建)
     * @author tony001
     * @date 2026-05-15 13:05:53
     * @memberof ModalChatController
     */
    show(): void;
    /**
     * @description 关闭聊天窗口
     * @author tony001
     * @date 2026-05-15 13:05:06
     * @memberof ModalChatController
     */
    close(): void;
}
declare const chat: ModalChatController;
export { chat };
