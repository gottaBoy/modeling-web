import { IChatMessage } from '../../interface';
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
    get messageid(): IChatMessage['messageid'];
    get state(): IChatMessage['state'];
    get role(): IChatMessage['role'];
    get type(): IChatMessage['type'];
    get realcontent(): IChatMessage['realcontent'];
    get content(): IChatMessage['content'];
    get completed(): IChatMessage['completed'];
    get suggestions(): IChatMessage['suggestions'];
    get _origin(): IChatMessage;
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
     * 更新消息完成状态
     *
     * @author tony001
     * @date 2025-02-25 17:02:31
     * @param {boolean} completed
     */
    updateCompleted(completed: boolean): void;
}
