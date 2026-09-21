import { IChatMessage, IChatThink, IChatMessageUsage } from '../../interface';

/**
 * 消息实体
 *
 * @author chitanda
 * @date 2023-10-09 16:10:45
 * @export
 * @class ChatMessage
 * @implements {IMessage}
 */
export declare class ChatMessage implements IChatMessage {
    protected msg: IChatMessage;
    toolcallcompleted: IChatMessage['toolcallcompleted'];
    toolcalls: IChatMessage['toolcalls'];
    chatsteps: IChatMessage['chatsteps'];
    chatuiactions: IChatMessage['chatuiactions'];
    think: IChatThink | undefined;
    usage: IChatMessageUsage | undefined;
    /**
     * @description 是否为重新编辑状态，为重新编辑状态为true/不为重新编辑状态为false
     *
     * @type {boolean}
     * @memberof ChatMessage
     */
    reeditstate: boolean;
    /**
     * @description 消息的所有原始内容
     * - 用于维护工具调用消息数据
     * @type {string}
     * @memberof ChatMessage
     */
    allcontent: string;
    get messageid(): IChatMessage['messageid'];
    get state(): IChatMessage['state'];
    get role(): IChatMessage['role'];
    get type(): IChatMessage['type'];
    get status(): IChatMessage['status'];
    get realcontent(): IChatMessage['realcontent'];
    get errorText(): IChatMessage['errorText'];
    get content(): IChatMessage['content'];
    get completed(): IChatMessage['completed'];
    get suggestions(): IChatMessage['suggestions'];
    get _origin(): IChatMessage;
    get islike(): IChatMessage['islike'];
    get isdislike(): IChatMessage['isdislike'];
    get feedbackcontent(): IChatMessage['feedbackcontent'];
    get realmessageid(): IChatMessage['realmessageid'];
    get metadata(): IChatMessage['metadata'];
    constructor(msg: IChatMessage);
    /**
     * 更新消息
     *
     * @author chitanda
     * @date 2023-10-10 17:10:07
     * @param {IChatMessage} msg
     */
    update(msg: IChatMessage): void;
    /**
     * @description 替换消息
     * @param {IChatMessage} msg
     * @memberof ChatMessage
     */
    replace(msg: IChatMessage): void;
    /**
     * 更新消息完成状态
     *
     * @author tony001
     * @date 2025-02-25 17:02:31
     * @param {boolean} completed
     */
    updateCompleted(completed: boolean): void;
    /**
     * @description 计算工具调用
     * @memberof ChatMessage
     */
    computeToolCalls(): void;
    /**
     * @description 计算聊天步骤
     */
    computeChatSteps(): void;
    /**
     * @description 计算聊天界面操作
     */
    computeChatUIActions(): void;
}
