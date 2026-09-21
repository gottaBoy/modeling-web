import { IApiData } from '../../../global-param';
import { IMessageBase } from '../base';
import { IPortalMessage } from '../common';
/**
 * @description 指令消息基类控制器接口
 * @export
 * @interface ICommandBase
 * @extends {IMessageBase}
 */
export interface ICommandBase extends IMessageBase {
  /**
   * @description 发送指令消息
   * @param {IApiData} data 数据
   * @param {IPortalMessage['subtype']} subtype 子类型
   * @param {string} [triggerKey] 触发源
   * @memberof ICommandBase
   */
  sendCommand(
    data: IApiData,
    subtype: IPortalMessage['subtype'],
    triggerKey?: string,
  ): void;
}
