/// <reference types="node" />
import { INotificationUtil, IUploadManagerParams, NotificationParams } from '@ibiz-template/runtime';
/**
 * 在界面右上角显示可关闭的全局通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:26
 * @export
 * @class NotificationUtil
 * @implements {INotificationUtil}
 */
export declare class NotificationUtil implements INotificationUtil {
    /**
     * 通知调用栈
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 15:32:07
     */
    callStack: Array<() => void>;
    /**
     * 用于存储定时器返回的标识符
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 15:32:23
     */
    intervalId: NodeJS.Timeout | null;
    /**
     * 上传管理器
     *
     * @private
     * @type {(NotificationHandle | undefined)}
     * @memberof NotificationUtil
     */
    private uploadManagerHandle;
    /**
     * 执行下一步
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 15:32:45
     */
    private executeNext;
    /**
     * 处理各类型提示
     * @param {NotificationParams} params
     * @param {string} type
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 16:09:40
     */
    private handleNotice;
    /**
     * 设置定时器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 16:08:40
     */
    private setTimer;
    default(params: NotificationParams): void;
    info(params: NotificationParams): void;
    success(params: NotificationParams): void;
    warning(params: NotificationParams): void;
    error(params: NotificationParams): void;
    uploadManager(params: IUploadManagerParams): Promise<IData[]>;
}
