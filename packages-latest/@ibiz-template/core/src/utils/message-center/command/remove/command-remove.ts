import {
  IAppDataEntity,
  ICommandRemove,
  IMsgMetaData,
} from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 删除指令消息控制器
 * @export
 * @class CommandRemove
 * @extends {CommandBase}
 * @implements {ICommandRemove}
 */
export class CommandRemove extends CommandBase implements ICommandRemove {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof CommandRemove
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void {
    this.sendCommand(data, 'OBJECTREMOVED', meta?.triggerKey);
  }
}
