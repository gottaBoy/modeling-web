import { createUUID } from 'qx-util';
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
export class MessageCommand extends MessageBase {
    constructor() {
        super(...arguments);
        /**
         * @description 数据变更指令消息控制器
         * @type {CommandChange}
         * @memberof MessageCommand
         */
        this.change = new CommandChange();
        /**
         * @description 新建数据指令消息控制器
         * @type {CommandCreate}
         * @memberof MessageCommand
         */
        this.create = new CommandCreate(this);
        /**
         * @description 更新数据指令消息控制器
         * @type {CommandUpdate}
         * @memberof MessageCommand
         */
        this.update = new CommandUpdate(this);
        /**
         * @description 删除数据指令消息控制器
         * @type {CommandRemove}
         * @memberof MessageCommand
         */
        this.remove = new CommandRemove(this);
        /**
         * @description 异步指令消息控制器
         * @type {CommandAsyncAction}
         * @memberof MessageCommand
         */
        this.asyncAction = new CommandAsyncAction(this);
        /**
         * @description 站内信消息指令消息控制器
         * @type {CommandInternalMessage}
         * @memberof MessageCommand
         */
        this.internalMessage = new CommandInternalMessage(this);
        /**
         * @description 协同指令消息控制器
         * @type {CommandMarkOpenData}
         * @memberof MessageCommand
         */
        this.markOpenData = new CommandMarkOpenData(this);
        /**
         * @description 添加变更指令消息控制器
         * @type {CommandAddInChanged}
         * @memberof MessageCommand
         */
        this.addInChanged = new CommandAddInChanged(this);
    }
    /**
     * @description 推送指令消息
     * @param {IPortalMessage} msg
     * @memberof MessageCommand
     */
    next(msg) {
        // 消息分子类型，子类型发完消息后，会让父发消息
        // 所以子类型有父时，会一级一级的往上发消息。不需要在此处发全局消息
        // change 特殊处理，不给父发消息
        switch (msg.subtype) {
            case 'OBJECTCREATED':
                this.create.next(msg);
                this.change.next(msg);
                break;
            case 'OBJECTUPDATED':
                this.update.next(msg);
                this.change.next(msg);
                break;
            case 'OBJECTREMOVED':
                this.remove.next(msg);
                this.change.next(msg);
                break;
            case 'ASYNCACTION':
                this.asyncAction.next(msg);
                break;
            case 'INTERNALMESSAGE':
                this.internalMessage.next(msg);
                break;
            case 'MARKOPENDATA':
                this.markOpenData.next(msg);
                break;
            case 'ADDINCHANGED':
                this.addInChanged.next(msg);
                break;
            default:
                super.next(msg);
        }
    }
    /**
     * @description 发送消息给父级
     * @protected
     * @param {IPortalMessage} msg
     * @memberof MessageCommand
     */
    nextParent(msg) {
        switch (msg.subtype) {
            case 'OBJECTCREATED':
                this.change.next(msg);
                break;
            case 'OBJECTUPDATED':
                this.change.next(msg);
                break;
            case 'OBJECTREMOVED':
                this.change.next(msg);
                break;
            default:
        }
        super.nextParent(msg);
    }
    /**
     * @description 发送指令消息
     * @param {IData} data
     * @param {IPortalMessage['subtype']} subtype
     * @param {string} [triggerKey]
     * @memberof MessageCommand
     */
    send(data, subtype, triggerKey) {
        const msg = {
            messageid: createUUID(),
            messagename: 'command',
            type: 'COMMAND',
            subtype,
            triggerKey,
            data,
        };
        this.next(msg);
    }
}
