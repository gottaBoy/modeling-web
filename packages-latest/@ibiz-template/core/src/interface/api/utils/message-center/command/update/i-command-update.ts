import { IAppDataEntity, IMsgMetaData } from '../../common';
import { ICommandBase } from '../i-command-base';

/**
 * @description 更新指令消息控制器
 * @export
 * @interface ICommandUpdate
 * @extends {ICommandBase}
 */
export interface ICommandUpdate extends ICommandBase {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof ICommandUpdate
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void;
}
