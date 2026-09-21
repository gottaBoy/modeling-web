import { IContainerOptions } from '../../interface';
import { AiTopicController } from '../ai-topic/ai-topic.controller';
import { AiChatController } from '../ai-chat/ai-chat.controller';
import { ChatTopic } from '../../entity';
/**
 * 聊天器控制器
 *
 * @author chitanda
 * @date 2023-10-13 17:10:47
 * @export
 * @class ChatController
 */
export declare class ChatController {
    /**
     * 聊天框容器
     *
     * @author chitanda
     * @date 2023-10-13 17:10:03
     * @protected
     * @type {HTMLDivElement}
     */
    protected container?: HTMLDivElement;
    /**
     * 默认模式（聊天框）和话题模式（支持多话题切换），聊天框为默认模式
     *
     * @author tony001
     * @date 2025-02-20 16:02:50
     * @protected
     * @type {('DEFAULT' | 'TOPIC')}
     */
    protected mode: 'DEFAULT' | 'TOPIC';
    /**
     * 是否挂载ai话题
     *
     * @author tony001
     * @date 2025-02-23 16:02:54
     * @protected
     * @type {boolean}
     */
    protected isMountedAiTopic: boolean;
    /**
     * 容器配置备份
     *
     * @author tony001
     * @date 2025-02-24 11:02:49
     * @protected
     * @type {(IContainerOptions | undefined)}
     */
    protected backupChatOptions: IContainerOptions | undefined;
    /**
     * 话题控制器
     *
     * @author tony001
     * @date 2025-02-23 16:02:56
     * @public
     * @type {AiTopicController}
     */
    aiTopic: AiTopicController;
    /**
     * 聊天控制器
     *
     * @readonly
     * @type {(AiChatController | undefined)}
     * @memberof ChatController
     */
    get aiChat(): AiChatController | undefined;
    /**
     * 话题map
     *
     * @private
     * @type {Map<string, AiChatController>}
     * @memberof ChatController
     */
    private aiTopicMap;
    /**
     * Creates an instance of ChatController.
     * @author tony001
     * @date 2025-02-24 11:02:20
     */
    constructor();
    /**
     * 初始化IndexDB
     *
     * @author tony001
     * @date 2025-02-24 18:02:50
     * @return {*}  {Promise<void>}
     */
    initIndexDB(): Promise<void>;
    /**
     * 创建聊天窗口(会同时显示出来)
     *
     * @author tony001
     * @date 2025-02-24 12:02:58
     * @param {IContainerOptions} opts
     * @return {*}  {Promise<AiChatController>}
     */
    create(opts: IContainerOptions): Promise<AiChatController>;
    /**
     * 切换聊天控制器
     *
     * @author tony001
     * @date 2025-02-24 11:02:24
     * @param {ChatTopic} topic
     */
    switchAiChatController(topic: ChatTopic): void;
    /**
     * 隐藏聊天窗口(必须先创建)
     *
     * @author chitanda
     * @date 2023-10-13 17:10:55
     */
    hidden(): void;
    /**
     * 显示聊天窗窗口(必须先创建)
     *
     * @author chitanda
     * @date 2023-10-13 17:10:29
     */
    show(): void;
    /**
     * 关闭聊天窗口
     *
     * @author chitanda
     * @date 2023-10-13 17:10:10
     */
    close(): void;
}
declare const chat: ChatController;
export { chat };
