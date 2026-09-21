import { Signal } from '@preact/signals';
import { QXEvent } from 'qx-util';
import { AIAgent, ChatMessage, KnowledgeBase } from '../../entity';
import { ITopic, IMaterial, IChatMessage, IChatOptions, IChatUIAction, IAIAgentConfig, IChatSuggestion, IResourceOptions, IChatMessageUsage } from '../../interface';
import { AiTopicController } from '../ai-topic/ai-topic.controller';

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
    readonly resourceOptions: IResourceOptions | undefined;
    /**
     * 事件触发器
     * @type {EventBase}
     */
    evt: QXEvent<{
        [p: string]: (...args: any[]) => any;
    }>;
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
     * 输入框是否展开
     * @type {Signal<boolean>}
     */
    readonly inputExpand: Signal<boolean>;
    /**
     * 重新编辑内容
     * @type {Signal<string>}
     */
    readonly reEditContent: Signal<string>;
    /**
     * 重新编辑内容是否改变
     * @type {Signal<boolean>}
     */
    readonly reEditContentChanged: Signal<boolean>;
    /**
     * 最后一个用户消息ID
     * @type {Signal<string | undefined>}
     */
    readonly lastUserMsgID: Signal<string | undefined>;
    /**
     * 是否加载中
     *
     * @author tony001
     * @date 2025-03-10 18:03:42
     * @type {Signal<boolean>}
     */
    readonly isLoading: Signal<boolean>;
    /**
     * 是否启用选择知识库
     *
     * @author tony001
     * @date 2026-02-03 16:38:09
     * @type {Signal<boolean>}
     */
    readonly enableKnowledgeBaseSelect: Signal<boolean>;
    /**
     * 是否启用知识库
     */
    readonly enableKnowledgeBaseState: Signal<boolean>;
    /**
     * 是否启用设置召回参数
     *
     * @author tony001
     * @date 2026-02-03 16:39:00
     * @type {Signal<boolean>}
     */
    readonly enableRecallConfigSetting: Signal<boolean>;
    /**
     * 是否允许切换AI代理
     */
    enableAIAgentChange: boolean;
    /**
     * 激活AI代理标识
     *
     * @type {(string | undefined)}
     */
    activeAIAgentID: string | undefined;
    /**
     * AI代理列表
     *
     * @type {Signal<AIAgent[]>}
     */
    readonly agentList: Signal<AIAgent[]>;
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
     * 话题控制器
     */
    readonly aiTopic: AiTopicController | undefined;
    /**
     * @description 聊天sessionid
     * @type {string}
     * @memberof AiChatController
     */
    chatSessionid: string;
    /**
     * 模式参数，用于业务区分
     */
    chatMode: string | undefined;
    /**
     * 聊天范围参数，用于业务区分
     */
    chatScope: string | undefined;
    /**
     * 摘要是否正在处理完成
     */
    private isDigestProcessed;
    /**
     * 知识库列表
     */
    private knowledgeBasesList;
    /**
     * 选中知识库
     */
    selectionKnowledgeBases: Signal<string[]>;
    /**
     * 当前可选知识库
     */
    knowledgeBases: Signal<KnowledgeBase[]>;
    /**
     * 智能体召回配置
     */
    reCallConfig: Signal<IAIAgentConfig>;
    /**
     * 当前正在处理的消息ID
     */
    private streamingMsgID;
    /**
     * @description 是否已完成初始化
     * @type {Signal<boolean>}
     * @memberof AiChatController
     */
    inited: Signal<boolean>;
    /**
     * AI资源模式
     */
    get resourceMode(): 'REMOTE' | 'LOCAL';
    /**
     * 当前话题是否禁止存储
     */
    get currentTopicDisableStorage(): boolean;
    /**
     * 当前话题标题模式
     */
    get sessionCaptionMode(): 'default' | 'snippet' | 'summary';
    /**
     * 当前话题标题
     */
    get sessionDefaultCaption(): string;
    /**
     * Creates an instance of AiChatController.
     *
     * @author chitanda
     * @date 2023-10-15 19:10:34
     * @param {IChatOptions} opts 聊天配置
     * @param {IChatOptions} resourceOptions 资源配置
     */
    constructor(opts: IChatOptions, resourceOptions: IResourceOptions | undefined);
    /**
     * 更新会话数据（当前若存在正在处理的消息则不做处理，不存在则重新构建相关数据）
     * @returns
     */
    updateAIChat(): void;
    /**
     * 初始化
     */
    private initAIChat;
    /**
     * 初始化AI代理列表
     */
    private initAIChatAgent;
    /**
     * 初始化AI知识库
     */
    private initAIChatKnowledge;
    /**
     * 计算选中知识库
     */
    private computeSelectedKnowledge;
    /**
     * @description 知识库远程搜索
     * @param {string} query
     * @returns {*}  {Promise<{ value: string; label: string }[]>}
     * @memberof AiChatController
     */
    knowledgeRemoteSearch(query: string): Promise<{
        value: string;
        label: string;
    }[]>;
    /**
     * 获取历史记录存储key(用于适配不同智能体存在不同的历史记录)
     * @param topicId 话题标识
     * @returns 历史存储key
     */
    private getHistoryStoreKey;
    /**
     * 获取查询知识库数据ID字符集
     *
     * @returns string | undefined
     */
    getQueryKnowledgeBases(): string | undefined;
    /**
     * 获取召回配置参数
     *
     * @returns IAIAgentConfig | undefined
     */
    private getQueryRecallConfig;
    /**
     * 获取历史记录
     *
     * @author tony001
     * @date 2025-02-24 13:02:52
     * @return {*}  {Promise<boolean>}
     */
    fecthHistory(): Promise<boolean>;
    /**
     * 获取历史记录后续处理
     */
    private afterFecthHistory;
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
     * @description 当前消息附加agentID(ai助手消息且无metadata属性且存在激活智能体)
     * @param {IChatMessage} data
     * @memberof AiChatController
     */
    attachMessageAgentID(data: IChatMessage): void;
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
    replaceMessage(data: IChatMessage, isRecommendPrompt?: boolean): void;
    /**
     * @description 更新消息资源使用情况
     * @param {string} messageid 消息ID
     * @param {IChatMessageUsage} usage 消息资源使用情况
     * @memberof AiChatController
     */
    updateMsgUsage(messageid: string, usage: IChatMessageUsage): void;
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
    stringlyMaterialResource(clearable?: boolean): string;
    /**
     * @description 拷贝消息数据（排除思维链数据）
     * @private
     * @param {IChatMessage} message
     * @returns {*}  {IChatMessage}
     * @memberof AiChatController
     */
    private cloneMessage;
    /**
     * @description 获取当前会话的消息集合
     * @private
     * @returns {*}  {IChatMessage[]}
     * @memberof AiChatController
     */
    private getMessages;
    /**
     * 获取完整消息集合
     * @returns
     */
    getAllMessages(): IChatMessage[];
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
    deleteMessage(message: IChatMessage): Promise<void>;
    /**
     * 刷新当前消息
     *
     * @memberof AiChatController
     */
    refreshMessage(message: IChatMessage, isuser?: boolean): Promise<void>;
    /**
     * @description 复制消息
     * @param {string} text 复制的文本
     * @param {IChatMessage} message 消息
     * @memberof AiChatController
     */
    copyMessage(text: string, message: IChatMessage): void;
    /**
     * 重新编辑当前消息
     *
     * @memberof AiChatController
     */
    reEditEnter(message: IChatMessage): Promise<void>;
    /**
     * 重新编辑退出
     *
     * @memberof AiChatController
     */
    reEditExit(): Promise<void>;
    /**
     *  重新提交当前消息
     *
     * @param message
     */
    reEditSubmit(message: IChatMessage): Promise<void>;
    /**
     * 重新编辑取消
     *
     * @param message
     */
    reEditCancel(message: IChatMessage): Promise<void>;
    /**
     * 标记最后一条用户消息
     *
     */
    markLastUserMessage(): Promise<void>;
    /**
     * 重置对话（清空当前对话、查询历史）
     * @returns
     */
    resetTopic(): Promise<boolean>;
    /**
     * 清空对话
     * @returns
     */
    clearTopic(): Promise<boolean>;
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
     * 清空界面操作，包含当前消息的界面行为、推荐提示
     *
     * @param message
     */
    clearUIActions(message: IChatMessage): Promise<void>;
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
    /**
     * 处理用户点击界面行为
     * @param message
     * @param uiAction
     * @param event
     */
    handleUIActionClick(message: IChatMessage, uiAction: IChatUIAction, event: MouseEvent): Promise<void>;
    /**
     * 设置当前激活的AI助手ID
     * @param agentID
     */
    setActiveAIAgentID(agentID: string): Promise<void>;
    /**
     * 设置智能体配置
     * @param config
     */
    setAIAgentConfig(config: Record<string, any>): void;
    /**
     * 搜索AI智能体
     * @param query
     * @returns
     */
    searchAIAgent(query: string): Promise<AIAgent[]>;
    /**
     * 设置选中知识库
     * @param ids
     */
    setSelectionKnowledge(ids: string[]): void;
    /**
     * 切换知识库启用状态
     */
    switchKnowledgeEnableState(): void;
    /**
     * 更新当前话题标题
     */
    updateTopicCaption(): Promise<void>;
    /**
     * @description 消息点赞
     * @param {IChatMessage} message
     * @returns {*}  {Promise<void>}
     * @memberof AiChatController
     */
    messageLike(message: IChatMessage): Promise<void>;
    /**
     * @description 消息点踩
     * @param {IChatMessage} message
     * @returns {*}  {Promise<void>}
     * @memberof AiChatController
     */
    messageDisLike(message: IChatMessage): Promise<void>;
    /**
     * 处理预定义点击
     * @param type
     * @param url
     * @param message
     * @param event
     * @returns
     */
    handlePredefinedClick(type: 'chunkview' | 'view' | 'action', url: string, message: IChatMessage, event: MouseEvent): Promise<void>;
    /**
     * 处理预定义视图跳转点击
     * @param url
     * @param message
     * @param event
     * @returns
     */
    handlePredefViewClick(url: string, message: IChatMessage, event: MouseEvent): Promise<void>;
    /**
     * 处理预定义界面行为点击
     * @param url
     * @param message
     * @param event
     * @returns
     */
    handlePredefActionClick(url: string, message: IChatMessage, event: MouseEvent): Promise<void>;
    /**
     * 销毁
     *
     * @return {*}  {Promise<void>}
     * @memberof AiChatController
     */
    destroyed(): Promise<void>;
}
