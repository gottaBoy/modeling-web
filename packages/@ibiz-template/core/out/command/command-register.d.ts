import { ICommand, ICommandHandler, ICommandOption, ICommandRegistry, ICommandsMap, IDisposable } from './interface';
/**
 * 命令注册中心
 *
 * @author chitanda
 * @date 2022-06-27 13:06:50
 * @export
 * @class CommandRegisterService
 * @implements {ICommandRegistry}
 */
export declare class CommandsRegistry implements ICommandRegistry {
    /**
     * 已经注册的所有指令
     *
     * @author chitanda
     * @date 2022-07-21 15:07:47
     * @private
     */
    private readonly commands;
    /**
     * 注册指令
     *
     * @author chitanda
     * @date 2022-06-27 13:06:31
     * @param {(string | ICommand)} idOrCommand
     * @param {ICommandHandler} [handler]
     * @return {*}  {IDisposable}
     */
    registerCommand(idOrCommand: string | ICommand, handler?: ICommandHandler, opts?: ICommandOption): IDisposable;
    /**
     * 指令是否已经注册
     *
     * @author chitanda
     * @date 2022-07-21 15:07:58
     * @param {string} id
     * @return {*}  {boolean}
     */
    hasCommand(id: string): boolean;
    /**
     * 查找指令
     *
     * @author chitanda
     * @date 2022-07-21 16:07:12
     * @param {string} id
     * @return {*}  {(ICommand | undefined)}
     */
    getCommand(id: string): ICommand | undefined;
    /**
     * 获取所有指令
     *
     * @author chitanda
     * @date 2022-07-21 16:07:20
     * @return {*}  {ICommandsMap}
     */
    getCommands(): ICommandsMap;
    /**
     * 获取指令配置参数
     *
     * @author chitanda
     * @date 2022-07-21 16:07:27
     * @param {string} id
     * @return {*}  {(ICommandOption | undefined)}
     */
    getCommandOpt(id: string): ICommandOption | undefined;
}
//# sourceMappingURL=command-register.d.ts.map