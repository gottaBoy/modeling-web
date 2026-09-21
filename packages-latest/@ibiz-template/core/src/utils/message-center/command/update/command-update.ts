import {
  IAppDataEntity,
  ICommandUpdate,
  IMsgMetaData,
} from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 更新指令消息控制器
 * @export
 * @class CommandUpdate
 * @extends {CommandBase}
 * @implements {ICommandUpdate}
 */
export class CommandUpdate extends CommandBase implements ICommandUpdate {
  /**
   * @description 发送消息
   * @param {IAppDataEntity} data 实体数据
   * @param {IMsgMetaData} [meta] 元数据
   * @memberof CommandUpdate
   */
  send(data: IAppDataEntity, meta?: IMsgMetaData): void {
    this.sendCommand(data, 'OBJECTUPDATED', meta?.triggerKey);
  }
}
