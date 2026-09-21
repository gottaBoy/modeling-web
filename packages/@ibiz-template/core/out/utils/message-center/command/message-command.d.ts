import { IPortalMessage } from '../../../interface';
import { MessageBase } from '../base/message-base';
import { CommandCreate } from './create/command-create';
import { CommandUpdate } from './update/command-update';
import { CommandRemove } from './remove/command-remove';
import { CommandChange } from './change/command-change';
import { CommandAsyncAction } from './async-action/command-async-action';
import { CommandInternalMessage } from './internal-message/command-internal-message';
import { CommandMarkOpenData } from './mark-open-data/command-mark-open-data';
import { CommandAddInChanged } from './add-in-changed/command-add-in-changed';
/**
 * 指令消息
 *
 * @author chitanda
 * @date 2023-09-05 16:09:41
 * @export
 * @class MessageCommand
 * @extends {MessageBase}
 */
export declare class MessageCommand extends MessageBase {
    /**
     * 数据变更指令消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:15
     * @type {CommandChange}
     */
    readonly change: CommandChange;
    /**
     * 新建消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:55
     * @type {CommandCreate}
     */
    readonly create: CommandCreate;
    /**
     * 更新消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:01
     * @type {CommandUpdate}
     */
    readonly update: CommandUpdate;
    /**
     * 删除消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:05
     * @type {CommandRemove}
     */
    readonly remove: CommandRemove;
    /**
     * 异步作业指令消息
     *
     * @author chitanda
     * @date 2023-10-23 17:10:56
     * @type {CommandAsyncAction}
     */
    readonly asyncAction: CommandAsyncAction;
    /**
     * 站内信 指令消息
     *
     * @author chitanda
     * @date 2023-10-23 17:10:56
     * @type {CommandInternalMessage}
     */
    readonly internalMessage: CommandInternalMessage;
    /**
     * 标记数据指令消息
     *
     * @type {CommandMarkOpenData}
     * @memberof MessageCommand
     */
    readonly markOpenData: CommandMarkOpenData;
    /**
     * 添加变更指令消息
     *
     * @type {CommandAddInChanged}
     * @memberof MessageCommand
     */
    readonly addInChanged: CommandAddInChanged;
    /**
     * 推送指令消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:50
     * @param {IPortalMessage} msg
     */
    next(msg: IPortalMessage): void;
    protected nextParent(msg: IPortalMessage): void;
    /**
     * 发送指令消息
     *
     * @author tony001
     * @date 2024-03-26 20:03:53
     * @param {IData} data 数据
     * @param {IPortalMessage['subtype']} subtype 子类型
     * @param {string} [triggerKey] 触发源
     */
    send(data: IData, subtype: IPortalMessage['subtype'], triggerKey?: string): void;
}
//# sourceMappingURL=message-command.d.ts.map