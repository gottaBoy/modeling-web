import { IApiMessageParams, IApiMessageUtil } from '../../api';

/**
 * @description 消息提示参数接口
 * @export
 * @interface IMessageParams
 * @extends {IApiMessageParams}
 */
export interface IMessageParams extends IApiMessageParams {}

/**
 * @description 主动操作后的反馈提示，顶部居中显示，并自动消失
 * @export
 * @interface IMessageUtil
 * @extends {IApiMessageUtil}
 */
export interface IMessageUtil extends IApiMessageUtil {}
