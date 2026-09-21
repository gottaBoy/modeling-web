import { Router } from 'vue-router';
import { IAppUtil, IAuthResult } from '@ibiz-template/runtime';
export declare class AppUtil implements IAppUtil {
    protected router: Router;
    /**
     * Creates an instance of AppUtil.
     * @author tony001
     * @date 2024-05-14 17:05:00
     * @param {Router} router
     */
    constructor(router: Router);
    /**
     * 登录
     *
     * @author tony001
     * @date 2024-05-14 16:05:41
     * @param {string} loginName
     * @param {string} password
     * @param {(boolean | undefined)} [remember]
     * @param {(IData | undefined)} [headers]
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean | undefined, headers?: IData | undefined, opts?: IData | undefined): Promise<boolean>;
    /**
     * 登出
     *
     * @author tony001
     * @date 2024-05-14 16:05:02
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    logout(opts?: IData | undefined): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 16:05:11
     * @param {string} oldPwd
     * @param {string} newPwd
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    changePwd(oldPwd: string, newPwd: string, opts?: IData | undefined): Promise<IAuthResult>;
    /**
     * 切换组织
     *
     * @author tony001
     * @date 2024-05-14 16:05:20
     * @param {string} oldOrgId
     * @param {string} newOrgId
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchOrg(oldOrgId: string, newOrgId: string, opts?: IData | undefined): Promise<boolean>;
    /**
     * 切换主题
     *
     * @author tony001
     * @date 2024-05-14 16:05:30
     * @param {string} oldTheme
     * @param {string} newTheme
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchTheme(oldTheme: string, newTheme: string, opts?: IData | undefined): Promise<boolean>;
    /**
     * 切换语言
     *
     * @author tony001
     * @date 2024-05-14 16:05:42
     * @param {string} oldLanguage
     * @param {string} newLanguage
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchLanguage(oldLanguage: string, newLanguage: string, opts?: IData | undefined): Promise<boolean>;
    /**
     * 校验密码
     *
     * @author tony001
     * @date 2024-05-14 17:05:31
     * @protected
     * @param {string} oldPwd
     * @param {string} newPwd
     * @param {IData} [opts={}]
     * @return {*}  {boolean}
     */
    protected validatePwd(oldPwd: string, newPwd: string, opts?: IData): boolean;
}
