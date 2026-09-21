/**
 * @description 消息提示参数接口
 * @export
 * @interface IMessageParams
 */
export interface IMessageParams {
    /**
     * @description 类型（默认info）
     * @type {('success' | 'info' | 'warning' | 'error')}
     * @memberof IMessageParams
     */
    type?: 'success' | 'info' | 'warning' | 'error';
    /**
     * @description 消息内容
     * @type {string}
     * @memberof IMessageParams
     */
    message: string;
    /**
     * @description 持续时间，单位：秒，默认：1.5
     * @type {number}
     * @memberof IMessageParams
     */
    duration?: number;
    /**
     * @description 显示关闭按钮，默认：false
     * @type {boolean}
     * @memberof IMessageParams
     */
    showClose?: boolean;
    /**
     * @description 预置的样式类型
     * @type {'alert'}
     * @memberof IMessageParams
     */
    styleType?: 'alert';
}
/**
 * @description 主动操作后的反馈提示，顶部居中显示，并自动消失
 * @export
 * @interface IMessageUtil
 */
export interface IMessageUtil {
    /**
     * @description 显示普通提示消息
     * @param {string} msg 消息内容
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     * @memberof IMessageUtil
     */
    info(msg: string, duration?: number, closable?: boolean): void;
    /**
     * @description 显示成功提示消息
     * @param {string} msg 消息内容
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     * @memberof IMessageUtil
     */
    success(msg: string, duration?: number, closable?: boolean): void;
    /**
     * @description 显示警告提示消息
     * @param {string} msg 消息内容
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     * @memberof IMessageUtil
     */
    warning(msg: string, duration?: number, closable?: boolean): void;
    /**
     * @description 显示错误提示消息
     * @param {string} msg 消息内容
     * @param {number} [duration] 持续时间，单位：秒，默认：1.5
     * @param {boolean} [closable] 显示关闭按钮，默认：false
     * @memberof IMessageUtil
     */
    error(msg: string, duration?: number, closable?: boolean): void;
}
