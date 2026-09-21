import { Signal } from '@preact/signals';
import { ChatTopic } from '../../entity';
import { ITopic, ITopicOptions } from '../../interface';
import { ChatController } from '../chat/chat.controller';
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
     * 当前话题配置备份
     *
     * @author tony001
     * @date 2025-02-24 16:02:28
     * @public
     * @type {(ITopicOptions | undefined)}
     */
    currentTopicOptions: ITopicOptions | undefined;
    /**
     * Creates an instance of AiTopicController.
     * @author tony001
     * @date 2025-02-24 11:02:26
     * @param {ChatController} chat
     */
    constructor(chat: ChatController);
    /**
     * 获取历史话题
     *
     * @author tony001
     * @date 2025-02-23 16:02:37
     * @return {*}  {Promise<void>}
     */
    fetchHistory(options: ITopicOptions): Promise<void>;
    /**
     * 更新当前话题
     *
     * @author tony001
     * @date 2025-02-23 17:02:43
     * @param {ITopicOptions} options
     * @return {*}  {Promise<void>}
     */
    updateCurrentTopic(options: ITopicOptions): Promise<void>;
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
     * 更新话题数据
     *
     * @param {ITopicOptions} options 话题配置
     * @param {ChatTopic} _data 话题数据
     * @return {*}  {Promise<void>}
     * @memberof AiTopicController
     */
    updateTopic(options: ITopicOptions, _data: ChatTopic): Promise<void>;
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
    newTopic(): Promise<void>;
    /**
     * 清空话题
     * - 当前激活项不清空
     * @return {*}  {Promise<void>}
     * @memberof AiTopicController
     */
    clearTopic(): Promise<void>;
}
