import { Signal } from '@preact/signals';
import { ChatTopic } from '../../entity';
import { ITopic, ITopicOptions, IResourceOptions, IChatController } from '../../interface';

/**
 * ai话题控制器
 *
 * @author tony001
 * @date 2025-02-20 16:02:01
 * @export
 * @class AiTopicController
 */
export declare class AiTopicController {
    private chat;
    /**
     * 话题清单
     *
     * @author tony001
     * @date 2025-02-20 16:02:38
     * @type {Signal<ChatTopic[]>}
     */
    readonly topics: Signal<ChatTopic[]>;
    /**
     * 激活话题
     *
     * @author tony001
     * @date 2025-02-24 16:02:44
     * @type {(Signal<ITopic | undefined>)}
     */
    readonly activedTopic: Signal<ITopic | undefined>;
    /**
     * 折叠话题侧边栏
     *
     * @author tony001
     * @date 2026-02-05 11:33:34
     * @type {Signal<boolean>}
     */
    readonly topicSidebarCollapse: Signal<boolean>;
    /**
     * 侧边栏宽度
     * @author tony001
     * @date 2026-02-05 13:48:34
     * @type {Signal<number>}
     */
    readonly topicSidebarWidth: Signal<number>;
    /**
     * 是否是临时会话
     *
     * @author tony001
     * @date 2026-02-05 17:26:34
     * @type {Signal<boolean>}
     */
    readonly isTempChat: Signal<boolean>;
    /**
     * 当前话题配置备份
     *
     * @author tony001
     * @date 2025-02-24 16:02:28
     * @public
     * @type {(ITopicOptions | undefined)}
     */
    backupOptions: ITopicOptions | undefined;
    /**
     * 上一次激活话题
     */
    preActivedTopic: ChatTopic | undefined;
    /**
     * 远程会话列表
     */
    private remoteSessionList;
    /**
     * 资源模式
     */
    private resourceMode;
    /**
     * 资源选项
     */
    private resourceOptions;
    /**
     * Creates an instance of AiTopicController.
     * @author tony001
     * @date 2025-02-24 11:02:26
     * @param {IChatController} chat
     */
    constructor(chat: IChatController);
    /**
     * 设置激活话题
     * @param topic 话题数据
     */
    setActivedTopic(topic: ChatTopic | undefined): void;
    /**
     * 注入资源选项
     * @param resourceOptions
     */
    injectResourceOptions(resourceOptions: IResourceOptions | undefined): void;
    /**
     * 获取历史话题
     *
     * @author tony001
     * @date 2025-02-23 16:02:37
     * @return {*}  {Promise<void>}
     */
    fetchHistory(options: ITopicOptions): Promise<void>;
    /**
     * 同步远程会话
     * @param configList config存储数据
     */
    asyncRemoteSession(configList: Array<ITopic>): Promise<void>;
    /**
     * 同步当前话题
     *
     * @author tony001
     * @date 2025-02-23 17:02:43
     * @param {ITopicOptions} options
     * @return {*}  {Promise<void>}
     */
    asyncTopic(options: ITopicOptions): Promise<void>;
    /**
     * 获取指定标识话题
     * @param topicid
     * @returns
     */
    getCurrentTopicByID(topicid: string): ChatTopic | undefined;
    /**
     * 基于话题标识更新当前话题
     * @param topicid 话题标识
     */
    updateTopicChatByID(topicid: string, args: Record<string, any>): Promise<void>;
    /**
     * 删除话题
     *
     * @author tony001
     * @date 2025-02-24 16:02:03
     * @param {ITopicOptions} options
     * @param {object} context
     * @param {object} params
     * @param {ITopic} data
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    removeTopic(options: ITopicOptions, context: object, params: object, data: ITopic, event: MouseEvent): Promise<void>;
    /**
     * 处理选中变化
     *
     * @author tony001
     * @date 2025-02-20 19:02:27
     * @param {ChatTopic} item
     */
    handleTopicChange(item: ChatTopic): void;
    /**
     * 处理话题行为
     *
     * @author tony001
     * @date 2025-02-24 16:02:58
     * @param {string} action
     * @param {ChatTopic} topic
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    handleTopicAction(action: string, topic: ChatTopic, event: MouseEvent): Promise<void>;
    /**
     * 新建对话
     *
     * @author tony001
     * @date 2025-03-18 18:03:49
     * @return {*}  {Promise<void>}
     */
    newTopic(topicid: string, args: Record<string, any>): Promise<void>;
    /**
     * 清空话题
     * - 当前激活项不清空
     * @return {*}  {Promise<void>}
     * @memberof AiTopicController
     */
    clearTopic(): Promise<void>;
    /**
     * 更新话题标题
     * @param topicId
     * @param message
     */
    updateTopicCaption(topicId: string, newCaption: string): Promise<void>;
    /**
     * 更新话题数据
     *
     * @param {ITopicOptions} options 话题配置
     * @return {*}  {Promise<void>}
     * @memberof AiTopicController
     */
    updateTopic(options: ITopicOptions): Promise<void>;
    /**
     * 计算话题侧边栏宽度
     */
    computeTopicSidebarWidth(): void;
    /**
     * 切换话题侧边栏折叠状态
     */
    switchTopicSidebarCollapse(): void;
    /**
     * 全局新建会话
     * @returns
     */
    globalNewTopic(): void;
    /**
     * 进入临时会话
     */
    enterTempChat(): void;
    /**
     * 退出临时会话
     * @param isSwitchTopic 是否切换激活会话
     * @returns
     */
    exitTempChat(): void;
}
