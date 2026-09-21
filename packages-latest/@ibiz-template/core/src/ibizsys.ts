/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from 'loglevel';
import { CommandController } from './command';
import { Environment } from './environment/environment';
import { I18n, IIBizsys, OrgData } from './interface';
import { MessageCenter, Net } from './utils';
import { logger } from './utils/logger/logger';

/**
 * @description 全局对象
 * @export
 * @class IBizSys
 * @implements {IIBizsys}
 */
export class IBizSys implements IIBizsys {
  /**
   * @description 环境变量
   * @memberof IBizSys
   */
  env = Environment;

  /**
   * @description 日志输出工具类
   * @type {Logger}
   * @memberof IBizSys
   */
  log: Logger = logger;

  /**
   * @description 网络请求工具类(发送默认请求)
   * @type {Net}
   * @memberof IBizSys
   */
  net: Net = new Net();

  /**
   * @description 指令工具类
   * @type {CommandController}
   * @memberof IBizSys
   */
  commands: CommandController = new CommandController();

  /**
   * @description 消息中心
   * @type {MessageCenter}
   * @memberof IBizSys
   */
  mc: MessageCenter = new MessageCenter();

  /**
   * @description 国际化工具类
   * @type {I18n}
   * @memberof IBizSys
   */
  i18n!: I18n;

  /**
   * @description 组织数据
   * @type {OrgData}
   * @memberof IBizSys
   */
  orgData?: OrgData;

  /**
   * @description 应用数据
   * @type {IData}
   * @memberof IBizSys
   */
  appData?: IData;

  /**
   * @description 注册全局扩展，用于替换预置能力
   * @param {keyof IBizSys} key
   * @param {*} value
   * @memberof IBizSys
   */
  registerExtension(key: keyof IBizSys, value: any): void {
    const self = this as IData;
    self[key] = value;
  }
}
