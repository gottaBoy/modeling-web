import { IAuthResult } from '../service';
/**
 * 应用控制器
 *
 * @author chitanda
 * @date 2023-08-21 14:08:41
 * @export
 * @interface IHubController
 */
export interface IHubController {
    /**
     * 全局共享数据对象
     *
     * @author chitanda
     * @date 2023-08-21 14:08:01
     * @type {IData}
     */
    session: IData;
    /**
     * 登录（包含调用登录逻辑，及跳转应用界面）
     *
     * @author tony001
     * @date 2024-05-14 16:05:18
     * @param {string} loginName
     * @param {string} password
     * @param {boolean} [remember]
     * @param {IData} [headers]
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean, headers?: IData, opts?: IData): Promise<boolean>;
    /**
     * 登出
     *
     * @author tony001
     * @date 2024-05-14 16:05:16
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    logout(opts?: IData): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 16:05:47
     * @param {string} oldPwd
     * @param {string} newPwd
     * @param {IData} [opts]
     * @return {*}  {Promise<IAuthResult>}
     */
    changePwd(oldPwd: string, newPwd: string, opts?: IData): Promise<IAuthResult>;
    /**
     * 切换组织
     *
     * @author tony001
     * @date 2024-05-14 16:05:11
     * @param {string} oldOrgId
     * @param {string} newOrgId
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchOrg(oldOrgId: string, newOrgId: string, opts?: IData): Promise<boolean>;
    /**
     * 切换主题
     *
     * @author tony001
     * @date 2024-05-14 16:05:51
     * @param {string} oldTheme
     * @param {string} newTheme
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchTheme(oldTheme: string, newTheme: string, opts?: IData): Promise<boolean>;
    /**
     * 切换语言
     *
     * @author tony001
     * @date 2024-05-14 16:05:56
     * @param {string} oldLanguage
     * @param {string} newLanguage
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchLanguage(oldLanguage: string, newLanguage: string, opts?: IData): Promise<boolean>;
}
//# sourceMappingURL=app.d.ts.map