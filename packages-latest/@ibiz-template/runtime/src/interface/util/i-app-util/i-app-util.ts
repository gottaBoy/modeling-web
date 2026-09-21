import { IApiAiChatParam, IApiAppUtil } from '../../api';

/**
 * @description Ai聊天参数
 * @export
 * @interface IAiChatParam
 * @extends {IApiAiChatParam}
 */
export interface IAiChatParam extends IApiAiChatParam {}

/**
 * @description 应用级功能接口定义，承载应用级功能实现，包含登录、注册、修改密码、切换主题等功能
 * @export
 * @interface IAppUtil
 * @extends {IApiAppUtil}
 */
export interface IAppUtil extends IApiAppUtil {}
