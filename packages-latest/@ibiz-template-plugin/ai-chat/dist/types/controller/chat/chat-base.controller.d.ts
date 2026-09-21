import { ChatTopic } from '../../entity';
import { IChatController, IContainerOptions, IResourceOptions } from '../../interface';
import { AiChatController } from '../ai-chat/ai-chat.controller';
import { AiTopicController } from '../ai-topic/ai-topic.controller';

/**
 * @description 聊天总控制器基类
 * @author tony001
 * @date 2026-05-15 13:05:59
 * @export
 * @class ChatBaseController
 */
export declare abstract class ChatBaseController implements IChatController {
    /**
     * @description 默认模式（聊天框）和话题模式（支持多话题切换），聊天框为默认模式
     * @author tony001
     * @date 2026-05-15 13:05:03
     * @protected
     * @type {('DEFAULT' | 'TOPIC')}
     * @memberof ChatBaseController
     */
    protected mode: 'DEFAULT' | 'TOPIC';
    /**
     * @description 容器配置备份
     * @author tony001
     * @date 2026-05-15 13:05:26
     * @protected
     * @type {(IContainerOptions | undefined)}
     * @memberof ChatBaseController
     */
    protected backupChatOptions: IContainerOptions | undefined;
    /**
     * @description 资源配置数据
     * @author tony001
     * @date 2026-05-15 13:05:16
     * @type {(IResourceOptions | undefined)}
     * @memberof ChatBaseController
     */
    resourceOptions: IResourceOptions | undefined;
    /**
     * @description 话题控制器
     * @author tony001
     * @date 2026-05-15 13:05:38
     * @type {AiTopicController}
     * @memberof ChatBaseController
     */
    aiTopic: AiTopicController;
    /**
     * @description 聊天控制器
     * @author tony001
     * @date 2026-05-15 13:05:55
     * @readonly
     * @type {(AiChatController | undefined)}
     * @memberof ChatBaseController
     */
    get aiChat(): AiChatController | undefined;
    /**
     * @description 话题map
     * @author tony001
     * @date 2026-05-15 13:05:17
     * @protected
     * @type {Map<string, AiChatController>}
     * @memberof ChatBaseController
     */
    protected aiTopicMap: Map<string, AiChatController>;
    /**
     * Creates an instance of ChatBaseController.
     * @author tony001
     * @date 2026-05-15 14:05:01
     * @memberof ChatBaseController
     */
    constructor();
    /**
     * @description 初始化IndexDB
     * @author tony001
     * @date 2026-05-15 13:05:37
     * @returns {*}  {Promise<void>}
     * @memberof ChatBaseController
     */
    initIndexDB(): Promise<void>;
    /**
     * @description 创建聊天窗口(会同时显示出来)
     * @author tony001
     * @date 2026-05-15 14:05:11
     * @param {IContainerOptions} opts
     * @returns {*}  {Promise<AiChatController>}
     * @memberof ChatBaseController
     */
    create(opts: IContainerOptions): Promise<AiChatController>;
    /**
     * @description 同步历史参数(历史激活标识、历史会话标识)
     * @author tony001
     * @date 2026-05-15 14:05:40
     * @protected
     * @param {Record<string, any>} topicOptions
     * @param {Record<string, any>} chatOptions
     * @param {IResourceOptions} resourceOptions
     * @returns {*}  {void}
     * @memberof ChatBaseController
     */
    protected syncHistoryOptions(topicOptions: Record<string, any>, chatOptions: Record<string, any>, resourceOptions: IResourceOptions): void;
    /**
     * @description 创建容器，渲染loading状态
     * @author tony001
     * @date 2026-05-15 18:05:31
     * @protected
     * @abstract
     * @param {IContainerOptions} opts
     * @param {Record<string, any>} chatOptions
     * @memberof ChatBaseController
     */
    protected abstract setupContainer(opts: IContainerOptions, chatOptions: Record<string, any>): void;
    /**
     * @description 渲染正式聊天内容
     * @author tony001
     * @date 2026-05-15 18:05:21
     * @protected
     * @abstract
     * @param {IContainerOptions} opts
     * @param {*} chatOptions
     * @param {AiChatController} aiChat
     * @memberof ChatBaseController
     */
    protected abstract renderChatContent(opts: IContainerOptions, chatOptions: any, aiChat: AiChatController): void;
    /**
     * @description 切换聊天控制器
     * @author tony001
     * @date 2026-05-15 14:05:04
     * @param {ChatTopic} topic
     * @memberof ChatBaseController
     */
    switchAiChatController(topic: ChatTopic): void;
    /**
     * @description 渲染切换聊天后的内容
     * @author tony001
     * @date 2026-05-15 18:05:07
     * @protected
     * @abstract
     * @param {Record<string, any>} opts
     * @param {AiChatController} aiChat
     * @memberof ChatBaseController
     */
    protected abstract renderSwitchedContent(opts: Record<string, any>, aiChat: AiChatController): void;
    /**
     * @description 关闭聊天窗口
     * @author tony001
     * @date 2026-05-15 14:05:06
     * @memberof ChatBaseController
     */
    close(): void;
}
