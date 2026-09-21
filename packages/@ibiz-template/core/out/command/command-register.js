import { LinkedList, toDisposable } from './utils';
/**
 * 命令注册中心
 *
 * @author chitanda
 * @date 2022-06-27 13:06:50
 * @export
 * @class CommandRegisterService
 * @implements {ICommandRegistry}
 */
export class CommandsRegistry {
    constructor() {
        /**
         * 已经注册的所有指令
         *
         * @author chitanda
         * @date 2022-07-21 15:07:47
         * @private
         */
        this.commands = new Map();
    }
    /**
     * 注册指令
     *
     * @author chitanda
     * @date 2022-06-27 13:06:31
     * @param {(string | ICommand)} idOrCommand
     * @param {ICommandHandler} [handler]
     * @return {*}  {IDisposable}
     */
    registerCommand(idOrCommand, handler, opts) {
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
            commands = new LinkedList();
            this.commands.set(id, commands);
        }
        const removeFn = commands.unshift(idOrCommand);
        const ret = toDisposable(() => {
            removeFn();
            const command = this.commands.get(id);
            if (command === null || command === void 0 ? void 0 : command.isEmpty()) {
                this.commands.delete(id);
            }
        });
        return ret;
    }
    /**
     * 指令是否已经注册
     *
     * @author chitanda
     * @date 2022-07-21 15:07:58
     * @param {string} id
     * @return {*}  {boolean}
     */
    hasCommand(id) {
        return this.commands.has(id);
    }
    /**
     * 查找指令
     *
     * @author chitanda
     * @date 2022-07-21 16:07:12
     * @param {string} id
     * @return {*}  {(ICommand | undefined)}
     */
    getCommand(id) {
        const list = this.commands.get(id);
        if (!list || list.isEmpty()) {
            return undefined;
        }
        return list[Symbol.iterator]().next().value;
    }
    /**
     * 获取所有指令
     *
     * @author chitanda
     * @date 2022-07-21 16:07:20
     * @return {*}  {ICommandsMap}
     */
    getCommands() {
        const result = new Map();
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
     * 获取指令配置参数
     *
     * @author chitanda
     * @date 2022-07-21 16:07:27
     * @param {string} id
     * @return {*}  {(ICommandOption | undefined)}
     */
    getCommandOpt(id) {
        const cmd = this.getCommand(id);
        return cmd === null || cmd === void 0 ? void 0 : cmd.opts;
    }
}
