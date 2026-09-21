import { IApiModalParams, IApiModalUtil } from '../../api';

/**
 * @description 简洁确认框参数
 * @export
 * @interface ModalParams
 * @extends {IApiModalParams}
 */
export interface ModalParams extends IApiModalParams {}

/**
 * @description 消息提示，当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。
 * @export
 * @interface IModalUtil
 * @extends {IApiModalUtil}
 */
export interface IModalUtil extends IApiModalUtil {}
