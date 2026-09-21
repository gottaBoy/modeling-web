/**
 * 参数接口
 * @author lxm
 * @date 2024-03-21 01:33:54
 * @export
 * @interface IMessageParams
 */
export interface IMessageParams {
    /**
     * 类型（默认info）
     * @author lxm
     * @date 2024-03-21 01:37:54
     * @type {('success' | 'info' | 'warning' | 'error')}
     */
    type?: 'success' | 'info' | 'warning' | 'error';
    /**
     * 消息内容
     * @author lxm
     * @date 2024-03-21 01:38:41
     * @type {string}
     */
    message: string;
    /**
     * 持续时间，单位：秒，默认：1.5
     * @author lxm
     * @date 2024-03-21 01:38:17
     * @type {number}
     */
    duration?: number;
    /**
     * 显示关闭按钮，默认：false
     * @author lxm
     * @date 2024-03-21 01:38:15
     * @type {boolean}
     */
    showClose?: boolean;
    /**
     * 预置的样式类型
     * @author lxm
     * @date 2024-03-21 02:00:02
     * @type {'alert'}
     */
    styleType?: 'alert';
}
/**
 * 顶部居中显示，并自动消失
 *
 * @author chitanda
 * @date 2022-08-17 15:08:23
 * @export
 * @interface IMessageUtil
 */
export interface IMessageUtil {
    /**
     * 普通信息
     *
     * @author chitanda
     * @date 2022-08-17 15:08:39
     * @param {string} msg
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     */
    info(msg: string, duration?: number, closable?: boolean): void;
    /**
     * 成功消息
     *
     * @author chitanda
     * @date 2022-08-17 15:08:32
     * @param {string} msg
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     */
    success(msg: string, duration?: number, closable?: boolean): void;
    /**
     * 警告消息
     *
     * @author chitanda
     * @date 2022-08-17 15:08:57
     * @param {string} msg
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     */
    warning(msg: string, duration?: number, closable?: boolean): void;
    /**
     * 错误消息
     *
     * @author chitanda
     * @date 2022-08-17 15:08:02
     * @param {string} msg
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     */
    error(msg: string, duration?: number, closable?: boolean): void;
    /**
     * 通用消息方法，可以配置详细的参数
     * @author lxm
     * @date 2024-03-21 01:36:13
     * @param {IMessageParams} params
     */
    notice(params: IMessageParams): void;
}
//# sourceMappingURL=i-message-util.d.ts.map