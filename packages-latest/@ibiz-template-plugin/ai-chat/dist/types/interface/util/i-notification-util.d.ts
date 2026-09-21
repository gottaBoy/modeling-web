/**
 * @description 全局通知参数
 * @export
 * @interface INotificationParams
 */
export interface INotificationParams {
    /**
     * @description 标题
     * @type {string}
     * @memberof INotificationParams
     */
    title?: string;
    /**
     * @description 描述
     * @type {string}
     * @memberof INotificationParams
     */
    desc?: string;
    /**
     * @description 描述是否是html字符串
     * @type {boolean}
     * @memberof INotificationParams
     */
    isHtmlDesc?: boolean;
    /**
     * @description 自动关闭的延时，单位秒，不关闭可以写 0
     * @type {number}
     * @memberof INotificationParams
     */
    duration?: number;
    /**
     * @description 位置
     * @type {('top-right' | 'top-left' | 'bottom-right' | 'bottom-left')}
     * @memberof INotificationParams
     */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    /**
     * @description 自定义类名
     * @type {string}
     * @memberof INotificationParams
     */
    class?: string;
    /**
     * @description 点击事件回调
     * @memberof INotificationParams
     */
    onClick?: () => void;
}
/**
 * @description 悬浮出现在界面右上角，显示全局的通知
 * @export
 * @interface INotificationUtil
 */
export interface INotificationUtil {
    /**
     * @description 显示默认样式通知
     * @param {INotificationParams} params 通知参数
     * @memberof INotificationUtil
     */
    default(params: INotificationParams): void;
    /**
     * @description 显示普通信息通知
     * @param {INotificationParams} params 通知参数
     * @memberof INotificationUtil
     */
    info(params: INotificationParams): void;
    /**
     * @description 显示成功通知
     * @param {INotificationParams} params 通知参数
     * @memberof INotificationUtil
     */
    success(params: INotificationParams): void;
    /**
     * @description 显示警告通知
     * @param {INotificationParams} params 通知参数
     * @memberof INotificationUtil
     */
    warning(params: INotificationParams): void;
    /**
     * @description 显示失败通知
     * @param {INotificationParams} params 通知参数
     * @memberof INotificationUtil
     */
    error(params: INotificationParams): void;
}
