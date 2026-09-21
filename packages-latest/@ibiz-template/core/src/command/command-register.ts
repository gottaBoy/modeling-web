import {
  ICommand,
  ICommandHandler,
  ICommandOption,
  ICommandRegistry,
  ICommandsMap,
  IDisposable,
} from '../interface';
import { LinkedList, toDisposable } from './utils';

/**
 * @description 指令注册中心
 * @export
 * @class CommandsRegistry
 * @implements {ICommandRegistry}
 */
export class CommandsRegistry implements ICommandRegistry {
  /**
   * @description 已经注册的所有指令
   * @private
   * @memberof CommandsRegistry
   */
  private readonly commands = new Map<string, LinkedList<ICommand>>();

  /**
   * @description 注册指令
   * @param {(string | ICommand)} idOrCommand 指令id或者指令对象
   * @param {ICommandHandler} [handler] 指令处理器
   * @param {ICommandOption} [opts] 指令配置参数
   * @returns {*}  {IDisposable} 返回一个可销毁对象，用于取消注册该指令
   * @memberof CommandsRegistry
   */
  registerCommand(
    idOrCommand: string | ICommand,
    handler?: ICommandHandler,
    opts?: ICommandOption,
  ): IDisposable {
    if (!idOrCommand) {
      throw new Error(`invalid command`);
    }

    if (typeof idOrCommand === 'string') {
      if (!handler) {
        throw new Error(`invalid command`);
      }
      return this.registerCommand({ id: idOrCommand, handler, opts });
    }

    const { id } = idOrCommand;

    let commands = this.commands.get(id);
    if (!commands) {
      commands = new LinkedList<ICommand>();
      this.commands.set(id, commands);
    }

    const removeFn = commands.unshift(idOrCommand);

    const ret = toDisposable(() => {
      removeFn();
      const command = this.commands.get(id);
      if (command?.isEmpty()) {
        this.commands.delete(id);
      }
    });

    return ret;
  }

  /**
   * @description 指令是否已经注册
   * @param {string} id
   * @returns {*}  {boolean}
   * @memberof CommandsRegistry
   */
  hasCommand(id: string): boolean {
    return this.commands.has(id);
  }

  /**
   * @description 查找指令
   * @param {string} id
   * @returns {*}  {(ICommand | undefined)}
   * @memberof CommandsRegistry
   */
  getCommand(id: string): ICommand | undefined {
    const list = this.commands.get(id);
    if (!list || list.isEmpty()) {
      return undefined;
    }
    return list[Symbol.iterator]().next().value;
  }

  /**
   * @description 获取所有指令
   * @returns {*}  {ICommandsMap}
   * @memberof CommandsRegistry
   */
  getCommands(): ICommandsMap {
    const result = new Map<string, ICommand>();
    const keys = this.commands.keys();
    for (const key of keys) {
      const command = this.getCommand(key);
      if (command) {
        result.set(key, command);
      }
    }
    return result;
  }

  /**
   * @description 获取指令配置参数
   * @param {string} id
   * @returns {*}  {(ICommandOption | undefined)}
   * @memberof CommandsRegistry
   */
  getCommandOpt(id: string): ICommandOption | undefined {
    const cmd = this.getCommand(id);
    return cmd?.opts;
  }
}
