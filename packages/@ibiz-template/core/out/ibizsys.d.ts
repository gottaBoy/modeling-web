import { Logger } from 'loglevel';
import { CommandController } from './command';
import { I18n, OrgData } from './interface';
import { MessageCenter, Net } from './utils';
/**
 * 全局对象
 *
 * @author chitanda
 * @date 2022-07-19 16:07:50
 * @export
 * @class IBizSys
 */
export declare class IBizSys {
    /**
     * 环境变量
     *
     * @author chitanda
     * @date 2022-07-19 18:07:04
     */
    env: import("./interface").IEnvironment;
    /**
     * 日志输出工具类
     *
     * @author chitanda
     * @date 2023-07-10 18:07:05
     * @type {Logger}
     */
    log: Logger;
    /**
     * 网络请求工具类(发送默认请求)
     *
     * @author chitanda
     * @date 2022-07-19 17:07:56
     * @type {Net}
     */
    net: Net;
    /**
     * 指令集
     *
     * @author chitanda
     * @date 2022-07-20 10:07:33
     * @type {AuthService}
     */
    commands: CommandController;
    /**
     * 界面消息中心
     *
     * @author chitanda
     * @date 2023-09-05 17:09:38
     * @type {MessageCenter}
     */
    mc: MessageCenter;
    /**
     * 国际化
     *
     * @author tony001
     * @date 2024-05-20 19:05:34
     * @type {I18n}
     */
    i18n: I18n;
    /**
     * sass 模式下的中心系统标识
     *
     * @author chitanda
     * @date 2022-07-19 18:07:23
     * @type {string}
     */
    orgData?: OrgData;
    /**
     * 应用数据
     *
     * @author chitanda
     * @date 2022-07-20 19:07:22
     * @type {IData}
     */
    appData?: IData;
    /**
     * 注册全局扩展，用于替换预置能力
     *
     * @author tony001
     * @date 2025-01-24 15:01:33
     * @param {keyof IBizSys} key
     * @param {*} value
     */
    registerExtension(key: keyof IBizSys, value: any): void;
}
//# sourceMappingURL=ibizsys.d.ts.map