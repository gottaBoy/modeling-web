import { IAppViewMsgGroupDetail } from './iapp-view-msg-group-detail';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用视图消息组模型基础对象接口
 * @export
 * @interface IAppViewMsgGroup
 */
export interface IAppViewMsgGroup extends IModelObject {
  /**
   * 内部消息区样式
   * @description 值模式 [视图消息显示模式] {LIST：列表显示、 MARQUEE：横向滚动显示、 MARQUEE2：纵向滚动显示、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2')}
   * 来源  getBodyStyle
   */
  bodyStyle?: string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2';

  /**
   * 尾部消息区样式
   * @description 值模式 [视图消息显示模式] {LIST：列表显示、 MARQUEE：横向滚动显示、 MARQUEE2：纵向滚动显示、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2')}
   * 来源  getBottomStyle
   */
  bottomStyle?: string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2';

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 消息组成员集合
   *
   * @type {IAppViewMsgGroupDetail[]}
   * 来源  getPSAppViewMsgGroupDetails
   */
  appViewMsgGroupDetails?: IAppViewMsgGroupDetail[];

  /**
   * 头部消息区样式
   * @description 值模式 [视图消息显示模式] {LIST：列表显示、 MARQUEE：横向滚动显示、 MARQUEE2：纵向滚动显示、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2')}
   * 来源  getTopStyle
   */
  topStyle?: string | 'LIST' | 'MARQUEE' | 'MARQUEE2' | 'USER' | 'USER2';
}
