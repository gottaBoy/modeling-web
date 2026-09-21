/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from 'loglevel';
import { IApiIBizsys } from '../api';
import { ICommandController } from '../command';

/**
 * @description 全局对象
 * @export
 * @interface IIBizsys
 */
export interface IIBizsys extends IApiIBizsys {
  /**
   * @description 日志输出工具
   * @type {Logger}
   * @memberof IIBizsys
   */
  log: Logger;

  /**
   * @description 指令控制器
   * @type {ICommandController}
   * @memberof IIBizsys
   */
  commands: ICommandController;

  /**
   * @description 注册全局扩展，用于替换预置能力
   * @param {keyof IBizSys} key
   * @param {*} value
   * @memberof IIBizsys
   */
  registerExtension(key: keyof IApiIBizsys, value: any): void;
}
