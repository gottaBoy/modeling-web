import { ICommandHandler, ICommandOption, IDisposable } from './interface';
/**
 * 指令控制器
 *
 * @author chitanda
 * @date 2022-06-28 19:06:51
 * @export
 * @class CommandController
 */
export declare class CommandController {
    private commandRegister;
    /**
     * 注册指令
     *
     * @author chitanda
     * @date 2022-06-28 19:06:45
     * @param {string} id
     * @param {ICommandHandler} handler
     * @param {ICommandOption} [opts]
     * @return {*}  {IDisposable}
     */
    register(id: string, handler: ICommandHandler, opts?: ICommandOption): IDisposable;
    /**
     * 执行指令
     *
     * @author chitanda
     * @date 2022-06-28 19:06:38
     * @template T
     * @param {string} id
     * @param {...unknown[]} args
     * @return {*}  {Promise<T>}
     */
    execute<T = undefined>(id: string, ...args: unknown[]): Promise<T>;
    /**
     * 判断指令是否存在，可直接抛出异常
     *
     * @author chitanda
     * @date 2022-06-28 19:06:11
     * @param {string} id
     * @param {boolean} [err]
     * @return {*}  {boolean}
     */
    hasCommand(id: string, err?: boolean): boolean;
    /**
     * 获取指令配置参数
     *
     * @author chitanda
     * @date 2022-07-21 17:07:11
     * @param {string} id
     * @return {*}  {(ICommandOption | undefined)}
     */
    getCommandOpts(id: string): ICommandOption | undefined;
}
//# sourceMappingURL=command.d.ts.map