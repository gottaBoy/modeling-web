import { ICommand, ICommandHandler, ICommandOption, ICommandRegistry, ICommandsMap, IDisposable } from '../interface';
/**
 * @description 指令注册中心
 * @export
 * @class CommandsRegistry
 * @implements {ICommandRegistry}
 */
export declare class CommandsRegistry implements ICommandRegistry {
    /**
     * @description 已经注册的所有指令
     * @private
     * @memberof CommandsRegistry
     */
    private readonly commands;
    /**
     * @description 注册指令
     * @param {(string | ICommand)} idOrCommand 指令id或者指令对象
     * @param {ICommandHandler} [handler] 指令处理器
     * @param {ICommandOption} [opts] 指令配置参数
     * @returns {*}  {IDisposable} 返回一个可销毁对象，用于取消注册该指令
     * @memberof CommandsRegistry
     */
    registerCommand(idOrCommand: string | ICommand, handler?: ICommandHandler, opts?: ICommandOption): IDisposable;
    /**
     * @description 指令是否已经注册
     * @param {string} id
     * @returns {*}  {boolean}
     * @memberof CommandsRegistry
     */
    hasCommand(id: string): boolean;
    /**
     * @description 查找指令
     * @param {string} id
     * @returns {*}  {(ICommand | undefined)}
     * @memberof CommandsRegistry
     */
    getCommand(id: string): ICommand | undefined;
    /**
     * @description 获取所有指令
     * @returns {*}  {ICommandsMap}
     * @memberof CommandsRegistry
     */
    getCommands(): ICommandsMap;
    /**
     * @description 获取指令配置参数
     * @param {string} id
     * @returns {*}  {(ICommandOption | undefined)}
     * @memberof CommandsRegistry
     */
    getCommandOpt(id: string): ICommandOption | undefined;
}
//# sourceMappingURL=command-register.d.ts.map