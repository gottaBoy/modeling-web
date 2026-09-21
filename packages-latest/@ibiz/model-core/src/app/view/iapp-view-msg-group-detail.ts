import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用视图消息组成员模型对象接口
 * @export
 * @interface IAppViewMsgGroupDetail
 */
export interface IAppViewMsgGroupDetail extends IModelObject {
  /**
   * 应用视图消息
   *
   * @type {string}
   * 来源  getPSAppViewMsg
   */
  appViewMsgId?: string;

  /**
   * 显示位置
   * @description 值模式 [视图消息位置] {TOP：视图上方、 BOTTOM：视图下方、 BODY：视图内容区、 POPUP：弹出、 CUSTOM：自定义 }
   * @type {( string | 'TOP' | 'BOTTOM' | 'BODY' | 'POPUP' | 'CUSTOM')}
   * 来源  getPosition
   */
  position?: string | 'TOP' | 'BOTTOM' | 'BODY' | 'POPUP' | 'CUSTOM';
}
