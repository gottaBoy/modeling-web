/**
 * 确认框参数
 *
 * @author chitanda
 * @date 2022-08-17 16:08:42
 * @export
 * @interface ConfirmParams
 */
export interface ConfirmParams {
    /**
     * 标题
     *
     * @author chitanda
     * @date 2022-08-17 16:08:04
     * @type {string}
     */
    title: string;
    /**
     * 描述
     *
     * @author chitanda
     * @date 2022-08-17 16:08:08
     * @type {string}
     */
    desc?: string;
    /**
     * 传递给组件的参数
     *
     * @author chitanda
     * @date 2023-08-14 15:08:07
     * @type {IParams}
     */
    options?: IParams;
}
/**
 * 确认框
 *
 * @description 需要用户确认收到提示消息时使用此工具
 * @author chitanda
 * @date 2022-08-17 16:08:25
 * @export
 * @interface IConfirmUtil
 */
export interface IConfirmUtil {
    /**
     * 普通信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:36
     * @param {ConfirmParams} params
     * @return {*}  {Promise<boolean>}
     */
    info(params: ConfirmParams): Promise<boolean>;
    /**
     * 成功信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:47
     * @param {ConfirmParams} params
     * @return {*}  {Promise<boolean>}
     */
    success(params: ConfirmParams): Promise<boolean>;
    /**
     * 警告信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:53
     * @param {ConfirmParams} params
     * @return {*}  {Promise<boolean>}
     */
    warning(params: ConfirmParams): Promise<boolean>;
    /**
     * 错误信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:59
     * @param {ConfirmParams} params
     * @return {*}  {Promise<boolean>}
     */
    error(params: ConfirmParams): Promise<boolean>;
}
//# sourceMappingURL=i-confirm-util.d.ts.map