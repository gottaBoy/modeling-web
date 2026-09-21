/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEnvironment } from '../environment';
import { IApiData } from '../global-param';
import { IApiI18n, IApiNet, IMessageCenter } from '../utils';
import { IOrgData } from './i-org-data';

/**
 * @description 全局对象
 * @export
 * @interface IApiIBizsys
 */
export interface IApiIBizsys {
  /**
   * @description 环境变量
   * @type {IEnvironment}
   * @memberof IApiIBizsys
   */
  env: IEnvironment;

  /**
   * @description 网络请求工具
   * @type {IApiNet}
   * @memberof IApiIBizsys
   */
  net: IApiNet;

  /**
   * @description 界面消息中心
   * @type {IMessageCenter}
   * @memberof IApiIBizsys
   */
  mc: IMessageCenter;

  /**
   * @description 国际化工具
   * @type {IApiI18n}
   * @memberof IApiIBizsys
   */
  i18n: IApiI18n;

  /**
   * @description 组织数据
   * @type {IOrgData}
   * @memberof IApiIBizsys
   */
  orgData?: IOrgData;

  /**
   * @description 应用数据
   * @type {IApiData}
   * @memberof IApiIBizsys
   */
  appData?: IApiData;
}
