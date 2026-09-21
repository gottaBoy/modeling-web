import { IPortalMessage } from '../../../../interface';
import { MessageBase } from '../../base/message-base';
/**
 * 指令消息基类
 *
 * @author chitanda
 * @date 2023-09-05 16:09:11
 * @export
 * @class CommandBase
 * @extends {MessageBase}
 */
export declare class CommandBase extends MessageBase {
    /**
     *  发送指令消息
     *
     * @author tony001
     * @date 2024-03-26 20:03:38
     * @protected
     * @param {IData} data 数据
     * @param {IPortalMessage['subtype']} subtype 子类型 数据更新 | 数据删除 | 数据创建
     * @param {string} [triggerKey] 触发源
     */
    protected sendCommand(data: IData, subtype: IPortalMessage['subtype'], triggerKey?: string): void;
}
//# sourceMappingURL=command-base.d.ts.map