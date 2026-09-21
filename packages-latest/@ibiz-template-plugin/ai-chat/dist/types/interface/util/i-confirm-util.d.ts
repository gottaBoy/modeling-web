/**
 * @description 确认框参数
 * @export
 * @interface IConfirmParams
 */
export interface IConfirmParams {
    /**
     * @description 标题
     * @type {string}
     * @memberof IConfirmParams
     */
    title: string;
    /**
     * @description 描述
     * @type {string}
     * @memberof IConfirmParams
     */
    desc?: string;
    /**
     * @description 传递额外参数
     * @type {object}
     * @memberof IConfirmParams
     */
    options?: object;
}
/**
 * @description 确认消息，提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
 * @export
 * @interface IConfirmUtil
 */
export interface IConfirmUtil {
    /**
     * @description 显示普通信息确认框，用户确认返回 true
     * @param {IConfirmParams} params 确认框参数
     * @returns {*}  {Promise<boolean>}
     * @memberof IConfirmUtil
     */
    info(params: IConfirmParams): Promise<boolean>;
    /**
     * @description 显示成功类型确认框，常用于用户确认提示
     * @param {IConfirmParams} params 确认框参数
     * @returns {*}  {Promise<boolean>}
     * @memberof IConfirmUtil
     */
    success(params: IConfirmParams): Promise<boolean>;
    /**
     * @description 显示警告类型确认框，常用于风险提示
     * @param {IConfirmParams} params 确认框参数
     * @returns {*}  {Promise<boolean>}
     * @memberof IConfirmUtil
     */
    warning(params: IConfirmParams): Promise<boolean>;
    /**
     * @description 显示错误类型确认框，常用于确认错误信息
     * @param {IConfirmParams} params 确认框参数
     * @returns {*}  {Promise<boolean>}
     * @memberof IConfirmUtil
     */
    error(params: IConfirmParams): Promise<boolean>;
}
