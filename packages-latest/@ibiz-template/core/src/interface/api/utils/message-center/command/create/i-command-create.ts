import { IAppDataEntity, IMsgMetaData } from '../../common';
import { ICommandBase } from '../i-command-base';

/**
 * @description 创建指令消息控制器
 * @export
 * @interface ICommandCreate
 * @extends {ICommandBase}
 */
export interface ICommandCreate extends ICommandBase {
  /**
   * @description 发送数据
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof ICommandCreate
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void;
}
