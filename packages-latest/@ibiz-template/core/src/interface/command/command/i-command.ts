/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDisposable } from '../disposable/i-disposable';
import { ICommandHandler, ICommandOption } from './i-command-option';

/**
 * @description 指令声明
 * @export
 * @interface ICommand
 */
export interface ICommand {
  id: string;
  handler: ICommandHandler;
  opts?: ICommandOption;
}

/**
 * 指令控制器集
 */
export type ICommandsMap = Map<string, ICommand>;

/**
 * @description 指令注册器
 * @export
 * @interface ICommandRegistry
 */
export interface ICommandRegistry {
  /**
   * @description 注册指令
   * @param {string} id 指令id
   * @param {ICommandHandler} command 指令处理回调
   * @param {ICommandOption} opts 指令参数
   * @returns {*}  {IDisposable} 指令释放对象
   * @memberof ICommandRegistry
   */
  registerCommand(
    id: string,
    command: ICommandHandler,
    opts: ICommandOption,
  ): IDisposable;
  /**
   * @description 注册指令
   * @param {string} id 指令id
   * @param {ICommandHandler} command 指令处理回调
   * @returns {*}  {IDisposable} 指令释放对象
   * @memberof ICommandRegistry
   */
  registerCommand(id: string, command: ICommandHandler): IDisposable;
  /**
   * @description 注册指令
   * @param {ICommand} command 指令
   * @returns {*}  {IDisposable} 指令释放对象
   * @memberof ICommandRegistry
   */
  registerCommand(command: ICommand): IDisposable;
  /**
   * @description 获取指令
   * @param {string} id 指令id
   * @returns {*}  {(ICommand | undefined)}
   * @memberof ICommandRegistry
   */
  getCommand(id: string): ICommand | undefined;
  /**
   * @description 获取所有指令
   * @returns {*}  {ICommandsMap}
   * @memberof ICommandRegistry
   */
  getCommands(): ICommandsMap;
}
