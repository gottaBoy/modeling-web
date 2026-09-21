import { IMessageUtil, IMessageParams } from '@ibiz-template/runtime';
import { MessageOptions } from 'element-plus';
/**
 * 消息通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:24
 * @export
 * @class MessageUtil
 * @implements {IMessageUtil}
 */
export declare class MessageUtil implements IMessageUtil {
    protected ns: import("@ibiz-template/core").Namespace;
    info(msg: string, duration?: number | undefined, closable?: boolean | undefined): void;
    success(msg: string, duration?: number | undefined, closable?: boolean | undefined): void;
    warning(msg: string, duration?: number | undefined, closable?: boolean | undefined): void;
    error(msg: string, duration?: number | undefined, closable?: boolean | undefined): void;
    /**
     * 格式化参数
     * @author lxm
     * @date 2024-03-21 02:22:27
     * @protected
     * @param {IMessageParams} params
     * @return {*}  {MessageOptions}
     */
    protected formatParams(params: IMessageParams): MessageOptions;
    notice(params: IMessageParams): void;
}
