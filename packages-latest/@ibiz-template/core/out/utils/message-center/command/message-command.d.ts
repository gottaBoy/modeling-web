import { IMessageCommand, IPortalMessage } from '../../../interface';
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
 * @description 指令消息控制器
 * @export
 * @class MessageCommand
 * @extends {MessageBase}
 * @implements {IMessageCommand}
 */
export declare class MessageCommand extends MessageBase implements IMessageCommand {
    /**
     * @description 数据变更指令消息控制器
     * @type {CommandChange}
     * @memberof MessageCommand
     */
    readonly change: CommandChange;
    /**
     * @description 新建数据指令消息控制器
     * @type {CommandCreate}
     * @memberof MessageCommand
     */
    readonly create: CommandCreate;
    /**
     * @description 更新数据指令消息控制器
     * @type {CommandUpdate}
     * @memberof MessageCommand
     */
    readonly update: CommandUpdate;
    /**
     * @description 删除数据指令消息控制器
     * @type {CommandRemove}
     * @memberof MessageCommand
     */
    readonly remove: CommandRemove;
    /**
     * @description 异步指令消息控制器
     * @type {CommandAsyncAction}
     * @memberof MessageCommand
     */
    readonly asyncAction: CommandAsyncAction;
    /**
     * @description 站内信消息指令消息控制器
     * @type {CommandInternalMessage}
     * @memberof MessageCommand
     */
    readonly internalMessage: CommandInternalMessage;
    /**
     * @description 协同指令消息控制器
     * @type {CommandMarkOpenData}
     * @memberof MessageCommand
     */
    readonly markOpenData: CommandMarkOpenData;
    /**
     * @description 添加变更指令消息控制器
     * @type {CommandAddInChanged}
     * @memberof MessageCommand
     */
    readonly addInChanged: CommandAddInChanged;
    /**
     * @description 推送指令消息
     * @param {IPortalMessage} msg
     * @memberof MessageCommand
     */
    next(msg: IPortalMessage): void;
    /**
     * @description 发送消息给父级
     * @protected
     * @param {IPortalMessage} msg
     * @memberof MessageCommand
     */
    protected nextParent(msg: IPortalMessage): void;
    /**
     * @description 发送指令消息
     * @param {IData} data
     * @param {IPortalMessage['subtype']} subtype
     * @param {string} [triggerKey]
     * @memberof MessageCommand
     */
    send(data: IData, subtype: IPortalMessage['subtype'], triggerKey?: string): void;
}
//# sourceMappingURL=message-command.d.ts.map