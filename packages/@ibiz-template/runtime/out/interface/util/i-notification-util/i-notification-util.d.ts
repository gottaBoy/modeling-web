/**
 * 通知参数
 *
 * @author chitanda
 * @date 2022-08-17 15:08:04
 * @export
 * @interface NotificationParams
 */
export interface NotificationParams {
    /**
     * 标题
     *
     * @author chitanda
     * @date 2022-08-17 15:08:11
     * @type {string}
     */
    title?: string;
    /**
     * 描述
     *
     * @author chitanda
     * @date 2022-08-17 15:08:15
     * @type {string}
     */
    desc?: string;
    /**
     * 描述是否是html字符串
     * @author lxm
     * @date 2024-02-04 03:18:25
     * @type {boolean}
     */
    isHtmlDesc?: boolean;
    /**
     * 自动关闭的延时，单位秒，不关闭可以写 0
     *
     * @default 4.5
     * @author chitanda
     * @date 2022-08-17 15:08:37
     * @type {number}
     */
    duration?: number;
    /**
     * 位置
     * @author lxm
     * @date 2024-01-30 11:43:21
     * @type {('top-right' | 'top-left' | 'bottom-right' | 'bottom-left')}
     */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    /**
     * 自定义类名
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-03-01 11:17:52
     */
    class?: string;
    /**
     * 点击事件回调
     * @author lxm
     * @date 2024-02-27 05:24:10
     */
    onClick?: () => void;
}
/**
 * 上传管理器参数
 *
 * @export
 * @interface IUploadManagerParams
 */
export interface IUploadManagerParams {
    /**
     * 上传路径
     *
     * @type {string}
     * @memberof IUploadManagerParams
     */
    uploadUrl: string;
    /**
     * 上传文件
     *
     * @type {FileList}
     * @memberof IUploadManagerParams
     */
    files: FileList;
    /**
     * 请求头
     *
     * @type {Record<string, string>}
     * @memberof IUploadManagerParams
     */
    headers?: Record<string, string>;
}
/**
 * 在界面右上角显示可关闭的全局通知
 *
 * @description 常用于以下场景：通知内容带有描述信息、系统主动推送
 * @author chitanda
 * @date 2022-08-17 15:08:11
 * @export
 * @interface INotificationUtil
 */
export interface INotificationUtil {
    /**
     * 默认通知
     *
     * @author chitanda
     * @date 2022-08-17 15:08:22
     * @param {NotificationParams} params
     */
    default(params: NotificationParams): void;
    /**
     * 普通通知
     *
     * @author chitanda
     * @date 2022-08-17 15:08:22
     * @param {NotificationParams} params
     */
    info(params: NotificationParams): void;
    /**
     * 成功通知
     *
     * @author chitanda
     * @date 2022-08-17 15:08:28
     * @param {NotificationParams} params
     */
    success(params: NotificationParams): void;
    /**
     * 警告通知
     *
     * @author chitanda
     * @date 2022-08-17 15:08:35
     * @param {NotificationParams} params
     */
    warning(params: NotificationParams): void;
    /**
     * 失败通知
     *
     * @author chitanda
     * @date 2022-08-17 15:08:41
     * @param {NotificationParams} params
     */
    error(params: NotificationParams): void;
    /**
     * 上传管理器
     *
     * @param {IUploadManagerParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof INotificationUtil
     */
    uploadManager(params: IUploadManagerParams): Promise<IData[]>;
}
//# sourceMappingURL=i-notification-util.d.ts.map