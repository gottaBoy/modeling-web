import { IAuthResult } from '../i-auth-result/i-auth-result';
export interface IAuthInfo {
    /**
     * 是否是匿名账户登录
     * @author lxm
     * @date 2024-01-03 05:25:31
     * @type {boolean}
     */
    isAnonymous: boolean;
    /**
     * 访问令牌
     * @author lxm
     * @date 2024-01-03 05:30:43
     * @type {string}
     */
    token: string;
}
/**
 * 认证服务
 *
 * @author chitanda
 * @date 2023-08-17 16:08:08
 * @export
 * @interface IAuthService
 */
export interface IAuthService {
    /**
     * 是否匿名登录
     *
     * @default false
     * @author chitanda
     * @date 2023-12-27 14:12:44
     * @type {boolean}
     */
    isAnonymous: boolean;
    /**
     * 使用匿名账号登录
     *
     * @author chitanda
     * @date 2023-12-27 14:12:49
     * @return {*}  {Promise<boolean>}
     */
    anonymousLogin(): Promise<boolean>;
    /**
     * 登录
     *
     * @author chitanda
     * @date 2023-12-13 15:12:16
     * @param {string} loginName
     * @param {string} password
     * @param {boolean} [remember]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean, headers?: IData): Promise<boolean>;
    /**
     * 登出
     *
     * @author chitanda
     * @date 2023-08-17 16:08:33
     * @return {*}  {Promise<boolean>}
     */
    logout(): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 17:05:33
     * @param {string} oldPwd
     * @param {string} newPwd
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<IAuthResult>}
     */
    changePwd(oldPwd: string, newPwd: string, opts?: IData | undefined): Promise<IAuthResult>;
    /**
     * 页面未关闭情况下，自动延长登录时间
     *
     * @param {IParams} [context]
     * @return {*}  {Promise<void>}
     * @memberof IAuthService
     */
    extendLogin(context?: IParams): Promise<void>;
    /**
     * 获取当前环境的权限信息（无登录则返回undefined）
     * @author lxm
     * @date 2024-01-03 05:31:48
     * @return {*}  {(Promise<IAuthInfo | undefined>)}
     */
    getAuthInfo(): IAuthInfo | undefined;
    /**
     * 通过refreshToken换算token
     * @author zpc
     * @date 2024-03-15 14:24:48
     * @return {*}  {(Promise<void>)}
     */
    refreshToken(): Promise<void>;
    /**
     * @description 清空用户数据
     * @memberof IAuthService
     */
    clearAuthData(): void;
    /**
     * @description 加载用户数据
     * @memberof IAuthService
     */
    loadAppData(context?: IParams): Promise<boolean>;
}
//# sourceMappingURL=i-auth.service.d.ts.map