import { ICommandChange } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 数据变更指令消息控制器
 * @export
 * @class CommandChange
 * @extends {CommandBase}
 * @implements {ICommandChange}
 */
export class CommandChange extends CommandBase implements ICommandChange {}
