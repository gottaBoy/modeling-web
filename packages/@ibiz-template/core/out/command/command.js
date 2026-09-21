import { CommandsRegistry } from './command-register';
/**
 * 指令控制器
 *
 * @author chitanda
 * @date 2022-06-28 19:06:51
 * @export
 * @class CommandController
 */
export class CommandController {
    constructor() {
        this.commandRegister = new CommandsRegistry();
    }
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
    register(id, handler, opts) {
        return this.commandRegister.registerCommand(id, handler, opts);
    }
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
    async execute(id, ...args) {
        const command = this.commandRegister.getCommand(id);
        if (command) {
            return command.handler(...args);
        }
        throw new Error(ibiz.i18n.t('core.command.unregisteredCommand', { id }));
    }
    /**
     * 判断指令是否存在，可直接抛出异常
     *
     * @author chitanda
     * @date 2022-06-28 19:06:11
     * @param {string} id
     * @param {boolean} [err]
     * @return {*}  {boolean}
     */
    hasCommand(id, err) {
        const bol = !!this.commandRegister.hasCommand(id);
        if (err === true && bol === true) {
            throw new Error(`未注册指令: ${id}，请先注册指令`);
        }
        return bol;
    }
    /**
     * 获取指令配置参数
     *
     * @author chitanda
     * @date 2022-07-21 17:07:11
     * @param {string} id
     * @return {*}  {(ICommandOption | undefined)}
     */
    getCommandOpts(id) {
        return this.commandRegister.getCommandOpt(id);
    }
}
