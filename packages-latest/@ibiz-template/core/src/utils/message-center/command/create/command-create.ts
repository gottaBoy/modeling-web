import {
  IAppDataEntity,
  ICommandCreate,
  IMsgMetaData,
} from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 创建指令消息控制器
 * @export
 * @class CommandCreate
 * @extends {CommandBase}
 * @implements {ICommandCreate}
 */
export class CommandCreate extends CommandBase implements ICommandCreate {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data
   * @param {IMsgMetaData} [meta]
   * @memberof CommandCreate
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void {
    this.sendCommand(data, 'OBJECTCREATED', meta?.triggerKey);
  }
}
