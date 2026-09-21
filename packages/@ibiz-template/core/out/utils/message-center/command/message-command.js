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
 * 指令消息
 *
 * @author chitanda
 * @date 2023-09-05 16:09:41
 * @export
 * @class MessageCommand
 * @extends {MessageBase}
 */
export class MessageCommand extends MessageBase {
    constructor() {
        super(...arguments);
        /**
         * 数据变更指令消息
         *
         * @author chitanda
         * @date 2023-09-05 17:09:15
         * @type {CommandChange}
         */
        this.change = new CommandChange();
        /**
         * 新建消息
         *
         * @author chitanda
         * @date 2023-09-05 17:09:55
         * @type {CommandCreate}
         */
        this.create = new CommandCreate(this);
        /**
         * 更新消息
         *
         * @author chitanda
         * @date 2023-09-05 17:09:01
         * @type {CommandUpdate}
         */
        this.update = new CommandUpdate(this);
        /**
         * 删除消息
         *
         * @author chitanda
         * @date 2023-09-05 17:09:05
         * @type {CommandRemove}
         */
        this.remove = new CommandRemove(this);
        /**
         * 异步作业指令消息
         *
         * @author chitanda
         * @date 2023-10-23 17:10:56
         * @type {CommandAsyncAction}
         */
        this.asyncAction = new CommandAsyncAction(this);
        /**
         * 站内信 指令消息
         *
         * @author chitanda
         * @date 2023-10-23 17:10:56
         * @type {CommandInternalMessage}
         */
        this.internalMessage = new CommandInternalMessage(this);
        /**
         * 标记数据指令消息
         *
         * @type {CommandMarkOpenData}
         * @memberof MessageCommand
         */
        this.markOpenData = new CommandMarkOpenData(this);
        /**
         * 添加变更指令消息
         *
         * @type {CommandAddInChanged}
         * @memberof MessageCommand
         */
        this.addInChanged = new CommandAddInChanged(this);
    }
    /**
     * 推送指令消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:50
     * @param {IPortalMessage} msg
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
     * 发送指令消息
     *
     * @author tony001
     * @date 2024-03-26 20:03:53
     * @param {IData} data 数据
     * @param {IPortalMessage['subtype']} subtype 子类型
     * @param {string} [triggerKey] 触发源
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
