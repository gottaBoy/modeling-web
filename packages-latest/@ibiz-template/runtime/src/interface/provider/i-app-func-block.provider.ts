import { IAppData, IOrgData } from '@ibiz-template/core';

/**
 * @description 登录上下文，传递给登录提供者的参数
 * @author tony001
 * @date 2026-05-13 14:05:28
 * @export
 * @interface ILoginContext
 */
export interface ILoginContext {
  /** 用户名 */
  loginname: string;
  /** 密码 */
  password: string;
  /** 是否记住我 */
  rememberme?: boolean;
  /** 自定义请求头 */
  headers?: IData;
}

/**
 * @description 应用功能块提供者接口
 * @author tony001
 * @date 2026-05-13 14:05:12
 * @export
 * @interface IAppFuncBlockProvider
 */
export interface IAppFuncBlockProvider {
  /**
   * @description 登录
   * @author tony001
   * @date 2026-05-13 14:05:33
   * @param {ILoginContext} ctx
   * @param {Function} [requestedCallback] 数据响应成功的回调
   * @returns {Promise<boolean>}
   */
  login(
    ctx: ILoginContext,
    requestedCallback?: (result: boolean) => void,
  ): Promise<boolean>;

  /**
   * @description 登出
   * @author tony001
   * @date 2026-05-13 16:05:10
   * @param {IData} [params]
   * @returns {*}  {Promise<boolean>}
   * @memberof IAppFuncBlockProvider
   */
  logout(params: IData): Promise<boolean>;

  /**
   * @description 加载应用数据
   * @author tony001
   * @date 2026-05-13 16:05:38
   * @param {IParams} [context]
   * @returns {*}  {Promise<{ ok: boolean; data: IAppData }>}
   * @memberof IAppFuncBlockProvider
   */
  loadAppData(context?: IParams): Promise<{ ok: boolean; data: IAppData }>;

  /**
   * @description 获取组织数据
   * @author tony001
   * @date 2026-05-13 16:05:44
   * @returns {*}  {Promise<{ ok: boolean; data: IOrgData[] }>}
   * @memberof IAppFuncBlockProvider
   */
  loadOrgData(): Promise<{ ok: boolean; data: IOrgData[] }>;
}
