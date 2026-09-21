/**
 * 简洁确认框参数
 *
 * @author chitanda
 * @date 2022-08-17 16:08:42
 * @export
 * @interface ModalParams
 */
export interface ModalParams {
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
     * 显示确认按钮（默认显示）
     * @author lxm
     * @date 2023-09-04 05:37:59
     * @type {boolean}
     */
    showConfirmButton?: boolean;
    /**
     * 是否显示取消按钮
     * @author lxm
     * @date 2023-09-04 05:38:49
     * @type {boolean}
     */
    showCancelButton?: boolean;
    /**
     * 确认按钮显示文本
     * @author lxm
     * @date 2023-09-04 05:39:30
     * @type {string}
     */
    confirmButtonText?: string;
    /**
     * 取消按钮显示文本
     * @author lxm
     * @date 2023-09-04 05:39:30
     * @type {string}
     */
    cancelButtonText?: string;
    /**
     * 消息类型
     * @author lxm
     * @date 2023-09-04 05:40:25
     * @type {('success' | '')}
     */
    type?: 'success' | 'info' | 'warning' | 'error';
    /**
     * 传递给时机组件的参数
     *
     * @author chitanda
     * @date 2023-08-14 15:08:07
     * @type {IParams}
     */
    options?: IParams;
}
/**
 * 简洁确认框
 *
 * @description 需要用户确认收到提示消息时使用此工具
 * @author chitanda
 * @date 2022-08-17 16:08:25
 * @export
 * @interface IModalUtil
 */
export interface IModalUtil {
    /**
     * 普通信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:36
     * @param {ModalParams} params
     * @return {*}  {Promise<void>}
     */
    info(params: ModalParams): Promise<void>;
    /**
     * 成功信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:47
     * @param {ModalParams} params
     * @return {*}  {Promise<void>}
     */
    success(params: ModalParams): Promise<void>;
    /**
     * 警告信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:53
     * @param {ModalParams} params
     * @return {*}  {Promise<void>}
     */
    warning(params: ModalParams): Promise<void>;
    /**
     * 错误信息
     *
     * @author chitanda
     * @date 2022-08-17 16:08:59
     * @param {ModalParams} params
     * @return {*}  {Promise<void>}
     */
    error(params: ModalParams): Promise<void>;
    /**
     * 确认操作
     *
     * @author chitanda
     * @date 2022-08-17 16:08:10
     * @param {ModalParams} params
     * @return {*}  {Promise<boolean>}
     */
    confirm(params: ModalParams): Promise<boolean>;
}
//# sourceMappingURL=i-modal-util.d.ts.map