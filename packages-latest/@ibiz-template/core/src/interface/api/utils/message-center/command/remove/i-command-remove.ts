import { IAppDataEntity, IMsgMetaData } from '../../common';
import { ICommandBase } from '../i-command-base';

/**
 * @description 删除指令消息控制器
 * @export
 * @interface ICommandRemove
 * @extends {ICommandBase}
 */
export interface ICommandRemove extends ICommandBase {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof ICommandRemove
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void;
}
