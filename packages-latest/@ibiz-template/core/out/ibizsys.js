import { CommandController } from './command';
import { Environment } from './environment/environment';
import { MessageCenter, Net } from './utils';
import { logger } from './utils/logger/logger';
/**
 * @description 全局对象
 * @export
 * @class IBizSys
 * @implements {IIBizsys}
 */
export class IBizSys {
    constructor() {
        /**
         * @description 环境变量
         * @memberof IBizSys
         */
        this.env = Environment;
        /**
         * @description 日志输出工具类
         * @type {Logger}
         * @memberof IBizSys
         */
        this.log = logger;
        /**
         * @description 网络请求工具类(发送默认请求)
         * @type {Net}
         * @memberof IBizSys
         */
        this.net = new Net();
        /**
         * @description 指令工具类
         * @type {CommandController}
         * @memberof IBizSys
         */
        this.commands = new CommandController();
        /**
         * @description 消息中心
         * @type {MessageCenter}
         * @memberof IBizSys
         */
        this.mc = new MessageCenter();
    }
    /**
     * @description 注册全局扩展，用于替换预置能力
     * @param {keyof IBizSys} key
     * @param {*} value
     * @memberof IBizSys
     */
    registerExtension(key, value) {
        const self = this;
        self[key] = value;
    }
}
