import { CommandsRegistry } from './command-register';
/**
 * @description 指令控制器
 * @export
 * @class CommandController
 */
export class CommandController {
    constructor() {
        /**
         * @description 指令注册器
         * @private
         * @memberof CommandController
         */
        this.commandRegister = new CommandsRegistry();
    }
    /**
     * @description 注册指令
     * @param {string} id 指令id
     * @param {ICommandHandler} handler 指令处理回调
     * @param {ICommandOption} [opts] 指令参数
     * @returns {*}  {IDisposable} 指令释放对象
     * @memberof CommandController
     */
    register(id, handler, opts) {
        return this.commandRegister.registerCommand(id, handler, opts);
    }
    /**
     * @description 执行指令
     * @template T
     * @param {string} id 指令id
     * @param {...unknown[]} args 指令参数
     * @returns {*}  {Promise<T>} 指令返回值
     * @memberof CommandController
     */
    async execute(id, ...args) {
        const command = this.commandRegister.getCommand(id);
        if (command) {
            return command.handler(...args);
        }
        throw new Error(ibiz.i18n.t('core.command.unregisteredCommand', { id }));
    }
    /**
     * @description 判断指令是否存在，没有则直接抛出异常
     * @param {string} id 指令id
     * @param {boolean} [err] 是否抛出异常
     * @returns {*}  {boolean} 是否存在
     * @memberof CommandController
     */
    hasCommand(id, err) {
        const bol = !!this.commandRegister.hasCommand(id);
        if (err === true && bol === true) {
            throw new Error(`未注册指令: ${id}，请先注册指令`);
        }
        return bol;
    }
    /**
     * @description 获取指令参数
     * @param {string} id 指令id
     * @returns {*}  {(ICommandOption | undefined)} 指令参数
     * @memberof CommandController
     */
    getCommandOpts(id) {
        return this.commandRegister.getCommandOpt(id);
    }
}
