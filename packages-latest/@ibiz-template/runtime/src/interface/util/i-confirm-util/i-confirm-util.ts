import { IApiConfirmParams, IApiConfirmUtil } from '../../api';

/**
 * @description 确认框参数
 * @export
 * @interface ConfirmParams
 * @extends {IApiConfirmParams}
 */
export interface ConfirmParams extends IApiConfirmParams {}

/**
 * @description 确认消息，提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
 * @export
 * @interface IConfirmUtil
 * @extends {IApiConfirmUtil}
 */
export interface IConfirmUtil extends IApiConfirmUtil {}
