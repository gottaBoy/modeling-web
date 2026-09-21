import { IDisposable } from '../disposable/disposable';
import { ICommandOption } from './command-option';
/**
 * 注册指令
 *
 * @author chitanda
 * @date 2022-06-27 13:06:25
 * @export
 * @interface ICommand
 */
export interface ICommand {
    id: string;
    handler: ICommandHandler;
    opts?: ICommandOption;
}
/**
 * 触发指令声明
 *
 * @author chitanda
 * @date 2022-06-28 17:06:10
 * @export
 * @interface Command
 */
export interface Command {
    /**
     * Title of the command, like `save`.
     */
    title: string;
    /**
     * The identifier of the actual command handler.
     * @see {@link commands.registerCommand}
     */
    command: string;
    /**
     * A tooltip for the command, when represented in the UI.
     */
    tooltip?: string;
    /**
     * Arguments that the command handler should be
     * invoked with.
     */
    arguments?: any[];
}
/**
 * 指令处理回调
 *
 * @author chitanda
 * @date 2022-06-27 13:06:33
 * @export
 * @interface ICommandHandler
 */
export interface ICommandHandler {
    (...args: any[]): unknown | Promise<unknown>;
}
/**
 * 指令控制器集
 */
export type ICommandsMap = Map<string, ICommand>;
/**
 * 注册服务
 *
 * @author chitanda
 * @date 2022-06-27 13:06:16
 * @export
 * @interface ICommandRegistry
 */
export interface ICommandRegistry {
    registerCommand(id: string, command: ICommandHandler, opts: ICommandOption): IDisposable;
    registerCommand(id: string, command: ICommandHandler): IDisposable;
    registerCommand(command: ICommand): IDisposable;
    getCommand(id: string): ICommand | undefined;
    getCommands(): ICommandsMap;
}
//# sourceMappingURL=command.d.ts.map