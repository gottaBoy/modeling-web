import { Signal } from '@preact/signals';
import { ChatMessage } from '../../entity';
import { IChatMessage, IChatOptions, IChatSuggestion, IMaterial, ITopic } from '../../interface';
/**
 * 聊天逻辑控制器
 *
 * @author chitanda
 * @date 2023-10-09 15:10:51
 * @export
 * @class AiChatController
 */
export declare class AiChatController {
    readonly opts: IChatOptions;
    /**
     * 聊天记录
     *
     * @author chitanda
     * @date 2023-10-16 16:10:29
     * @type {Signal<ChatMessage[]>}
     */
    readonly messages: Signal<ChatMessage[]>;
    /**
     * 素材列表
     *
     * @author tony001
     * @date 2025-02-27 18:02:46
     * @type {Signal<IMaterial[]>}
     */
    readonly materials: Signal<IMaterial[]>;
    /**
     * 聊天框输入值
     *
     * @author chitanda
     * @date 2023-10-16 15:10:43
     * @type {Signal<string>}
     */
    readonly input: Signal<string>;
    /**
     * 是否加载中
     *
     * @author tony001
     * @date 2025-03-10 18:03:42
     * @type {Signal<boolean>}
     */
    readonly isLoading: Signal<boolean>;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:23
     * @type {object}
     */
    readonly context: object;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2025-02-24 14:02:32
     * @type {object}
     */
    readonly params: object;
    /**
     * 应用实体标记
     *
     * @author tony001
     * @date 2025-02-24 14:02:10
     * @type {string}
     */
    readonly appDataEntityId: string;
    /**
     * 话题标识
     *
     * @author tony001
     * @date 2025-02-24 18:02:02
     * @type {(string | undefined)}
     */
    readonly topicId: string | undefined;
    /**
     * 话题数据
     *
     * @author tony001
     * @date 2025-03-10 16:03:26
     * @type {(ITopic | undefined)}
     */
    readonly topic: ITopic | undefined;
    /**
     * 聊天窗触发提问回调
     *
     * @author tony001
     * @date 2025-02-24 14:02:51
     * @param {object} context
     * @param {object} params
     * @param {object} otherParams
     * @param {IChatMessage[]} question 提问历史内容(包含当前提问)
    * @return {*}  {Promise<boolean>} 等待回答
  
    /**
     * Creates an instance of AiChatController.
     *
     * @author chitanda
     * @date 2023-10-15 19:10:34
     * @param {IChatOptions} opts 聊天配置
     */
    constructor(opts: IChatOptions);
    /**
     * 获取历史记录
     *
     * @author tony001
     * @date 2025-02-24 13:02:52
     * @return {*}  {Promise<boolean>}
     */
    fecthHistory(): Promise<boolean>;
    /**
     * 更新数据到indexdb
     *
     * @author tony001
     * @date 2025-02-24 18:02:41
     * @return {*}  {Promise<void>}
     */
    asyncToIndexDB(): Promise<void>;
    /**
     * 设置聊天框值
     *
     * @author chitanda
     * @date 2023-10-16 16:10:21
     * @param {string} input
     */
    setInput(input: string): void;
    /**
     * 新增聊天记录
     *
     * @author chitanda
     * @date 2023-10-09 15:10:15
     * @param {IMessage} data
     */
    addMessage(data: IChatMessage): void;
    /**
     * 更新消息完成状态
     *
     * @author tony001
     * @date 2025-02-25 17:02:19
     * @param {string} id
     * @param {boolean} completed
     */
    completeMessage(id: string, completed: boolean): Promise<void>;
    /**
     * 替换已经存在的聊天消息
     *
     * @author chitanda
     * @date 2023-10-16 22:10:49
     * @param {IChatMessage} data
     */
    replaceMessage(data: IChatMessage): void;
    /**
     * 终止消息
     *
     * @author tony001
     * @date 2025-03-10 14:03:17
     * @param {IChatMessage} data
     */
    stopMessage(data: IChatMessage): Promise<void>;
    /**
     * 数据对象转 XML 字符串
     *
     * @author tony001
     * @date 2025-03-03 11:03:55
     * @return {*}  {string}
     */
    stringlyMaterialResource(): string;
    /**
     * 提问
     *
     * @author chitanda
     * @date 2023-10-09 20:10:43
     * @return {*}  {Promise<void>}
     */
    question(input: string): Promise<void>;
    /**
     * 中断请求
     *
     * @author tony001
     * @date 2025-03-10 14:03:48
     */
    abortQuestion(): Promise<void>;
    /**
     * 回填选中的消息
     *
     * @author chitanda
     * @date 2023-10-16 18:10:19
     * @param {IChatMessage} message
     */
    backfill(message: IChatMessage): void;
    /**
     *
     * 删除指定消息，如果是用户提问的刷新调用的删除，则需要删除从问题开始到最后的所有记录
     * @param {IChatMessage} message
     * @param {boolean} [isuser=false]
     * @memberof AiChatController
     */
    deleteMessage(message: IChatMessage): void;
    /**
     * 刷新当前消息
     *
     * @memberof AiChatController
     */
    refreshMessage(message: IChatMessage, isuser?: boolean): Promise<void>;
    /**
     * 复制消息
     *
     * @param {IChatMessage} message
     * @memberof AiChatController
     */
    copyMessage(message: IChatMessage): void;
    /**
     * 重置对话
     *
     * @memberof AiChatController
     */
    resetTopic(): Promise<void>;
    /**
     * 清空对话
     *
     * @author tony001
     * @date 2025-03-18 17:03:57
     */
    clearTopic(): Promise<void>;
    /**
     * 新增素材资源
     *
     * @author tony001
     * @date 2025-02-27 18:02:00
     * @param {IMaterial} data
     */
    addMaterial(data: IMaterial): void;
    /**
     * 替换素材资源
     *
     * @author tony001
     * @date 2025-02-28 15:02:24
     * @param {string} id
     * @param {IMaterial} data
     */
    replaceMaterial(id: string, data: IMaterial): void;
    /**
     * 删除指定素材资源
     *
     * @author tony001
     * @date 2025-02-27 18:02:33
     * @param {IMaterial} data
     */
    deleteMaterial(data: IMaterial): void;
    /**
     * 更新指定消息推荐提示
     *
     * @author tony001
     * @date 2025-03-19 11:03:47
     * @param {IChatMessage} data
     * @param {string} suggestionStr
     */
    updateRecommendPrompt(data: IChatMessage, suggestionStr: string): void;
    /**
     * 处理建议点击
     *
     * @author tony001
     * @date 2025-03-19 12:03:25
     * @param {IChatMessage} message
     * @param {IChatSuggestion} suggestion
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    handleSuggestionClick(message: IChatMessage, suggestion: IChatSuggestion, event: MouseEvent): Promise<void>;
}
