import { ICommandHandler, ICommandOption } from '../../command';
import { IDisposable } from './disposable/i-disposable';

/**
 * @description 指令控制器接口
 * @export
 * @interface ICommandController
 */
export interface ICommandController {
  /**
   * @description 注册指令
   * @param {string} id 指令id
   * @param {ICommandHandler} handler 指令处理回调
   * @param {ICommandOption} [opts] 指令参数
   * @returns {*}  {IDisposable} 指令释放对象
   * @memberof ICommandController
   */
  register(
    id: string,
    handler: ICommandHandler,
    opts?: ICommandOption,
  ): IDisposable;

  /**
   * @description 执行指令
   * @template T
   * @param {string} id 指令id
   * @param {...unknown[]} args 指令参数
   * @returns {*}  {Promise<T>} 指令返回值
   * @memberof ICommandController
   */
  execute<T = undefined>(id: string, ...args: unknown[]): Promise<T>;

  /**
   * @description 判断指令是否存在，没有则直接抛出异常
   * @param {string} id 指令id
   * @param {boolean} [err] 是否抛出异常
   * @returns {*}  {boolean} 是否存在
   * @memberof ICommandController
   */
  hasCommand(id: string, err?: boolean): boolean;

  /**
   * @description 获取指令参数
   * @param {string} id 指令id
   * @returns {*}  {(ICommandOption | undefined)} 指令参数
   * @memberof ICommandController
   */
  getCommandOpts(id: string): ICommandOption | undefined;
}
