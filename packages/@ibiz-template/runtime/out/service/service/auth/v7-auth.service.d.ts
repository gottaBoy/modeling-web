import { IAuthService, IAuthInfo, IAuthResult } from '../../../interface';
/**
 * 认证服务
 *
 * @author chitanda
 * @date 2022-07-19 18:07:51
 * @export
 * @class AuthService
 */
export declare class V7AuthService implements IAuthService {
    get isAnonymous(): boolean;
    /**
     * 使用匿名账号登录
     *
     * @author tony001
     * @date 2024-05-14 17:05:47
     * @return {*}  {Promise<boolean>}
     */
    anonymousLogin(): Promise<boolean>;
    /**
     * 登录
     *
     * @author tony001
     * @date 2024-05-14 17:05:54
     * @param {string} loginName
     * @param {string} password
     * @param {boolean} [remember]
     * @param {IData} [headers]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean, headers?: IData): Promise<boolean>;
    /**
     * 登出
     *
     * @author tony001
     * @date 2024-05-14 17:05:04
     * @return {*}  {Promise<boolean>}
     */
    logout(): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 17:05:22
     * @param {string} oldPwd
     * @param {string} newPwd
     * @return {*}  {Promise<IAuthResult>}
     */
    changePwd(oldPwd: string, newPwd: string): Promise<IAuthResult>;
    /**
     * 页面未关闭情况下，自动延长登录时间
     *
     * @author tony001
     * @date 2024-05-14 17:05:38
     * @return {*}  {Promise<void>}
     */
    extendLogin(): Promise<void>;
    /**
     * 通过refreshToken换算token
     *
     * @author tony001
     * @date 2024-05-14 17:05:45
     * @return {*}  {Promise<void>}
     */
    refreshToken(): Promise<void>;
    /**
     * 获取当前环境的权限信息（无登录则返回undefined）
     *
     * @author tony001
     * @date 2024-05-14 17:05:57
     * @return {*}  {(IAuthInfo | undefined)}
     */
    getAuthInfo(): IAuthInfo | undefined;
    /**
     * 加载应用数据
     *
     * @author chitanda
     * @date 2022-07-20 20:07:50
     * @return {*}  {Promise<void>}
     */
    protected loadAppData(): Promise<void>;
    /**
     * 清空权限数据
     *
     * @author tony001
     * @date 2024-05-14 17:05:18
     */
    clearAuthData(): void;
}
//# sourceMappingURL=v7-auth.service.d.ts.map