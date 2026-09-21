import { IContainerOptions } from '../../interface';
import { AiChatController } from '../ai-chat/ai-chat.controller';
import { ChatBaseController } from './chat-base.controller';

/**
 * @description 聊天总控制器(平铺模式)，支持多实例
 * @author tony001
 * @date 2026-05-15 15:05:12
 * @export
 * @class FlatChatController
 * @extends {ChatBaseController}
 */
export declare class FlatChatController extends ChatBaseController {
    /**
     * @description 挂载容器
     * @author tony001
     * @date 2026-05-15 15:05:30
     * @protected
     * @type {HTMLElement}
     * @memberof FlatChatController
     */
    protected container?: HTMLElement;
    /**
     * @description 创建平铺聊天
     * @author tony001
     * @date 2026-05-15 15:05:15
     * @param {IContainerOptions} opts
     * @returns {*}  {Promise<AiChatController>}
     * @memberof FlatChatController
     */
    create(opts: IContainerOptions): Promise<AiChatController>;
    /**
     * @description 创建容器，渲染loading状态
     * @author tony001
     * @date 2026-05-15 15:05:33
     * @protected
     * @param {IContainerOptions} opts
     * @param {Record<string, any>} chatOptions
     * @memberof FlatChatController
     */
    protected setupContainer(opts: IContainerOptions, chatOptions: Record<string, any>): void;
    /**
     * @description 渲染正式聊天内容
     * @author tony001
     * @date 2026-05-15 15:05:51
     * @protected
     * @param {IContainerOptions} opts
     * @param {Record<string, any>} chatOptions
     * @param {AiChatController} aiChat
     * @memberof FlatChatController
     */
    protected renderChatContent(opts: IContainerOptions, chatOptions: Record<string, any>, aiChat: AiChatController): void;
    /**
     * @description 渲染切换聊天后的内容
     * @author tony001
     * @date 2026-05-15 15:05:08
     * @protected
     * @param {Record<string, any>} opts
     * @param {AiChatController} aiChat
     * @memberof FlatChatController
     */
    protected renderSwitchedContent(opts: Record<string, any>, aiChat: AiChatController): void;
    /**
     * @description 清空聊天窗口
     * @author tony001
     * @date 2026-05-15 18:05:08
     * @memberof FlatChatController
     */
    close(): void;
}
/**
 * @description 创建平铺聊天实例
 * @author tony001
 * @date 2026-05-15 15:05:30
 * @export
 * @returns {*}  {FlatChatController}
 */
export declare function createFlatChat(): FlatChatController;
