import { CommandController } from './command';
import { Environment } from './environment/environment';
import { MessageCenter, Net } from './utils';
import { logger } from './utils/logger/logger';
/**
 * 全局对象
 *
 * @author chitanda
 * @date 2022-07-19 16:07:50
 * @export
 * @class IBizSys
 */
export class IBizSys {
    constructor() {
        /**
         * 环境变量
         *
         * @author chitanda
         * @date 2022-07-19 18:07:04
         */
        this.env = Environment;
        /**
         * 日志输出工具类
         *
         * @author chitanda
         * @date 2023-07-10 18:07:05
         * @type {Logger}
         */
        this.log = logger;
        /**
         * 网络请求工具类(发送默认请求)
         *
         * @author chitanda
         * @date 2022-07-19 17:07:56
         * @type {Net}
         */
        this.net = new Net();
        /**
         * 指令集
         *
         * @author chitanda
         * @date 2022-07-20 10:07:33
         * @type {AuthService}
         */
        this.commands = new CommandController();
        /**
         * 界面消息中心
         *
         * @author chitanda
         * @date 2023-09-05 17:09:38
         * @type {MessageCenter}
         */
        this.mc = new MessageCenter();
    }
    /**
     * 注册全局扩展，用于替换预置能力
     *
     * @author tony001
     * @date 2025-01-24 15:01:33
     * @param {keyof IBizSys} key
     * @param {*} value
     */
    registerExtension(key, value) {
        const self = this;
        self[key] = value;
    }
}
