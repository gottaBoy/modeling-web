import { IAuthResult } from '../../service';
/**
 * 应用级功能接口定义，承载应用级功能实现，包含登录、注册、修改密码、切换主题等功能
 *
 * @author tony001
 * @date 2024-05-14 15:05:10
 * @export
 * @interface IAppUtil
 */
export interface IAppUtil {
    /**
     * 登录（包含调用登录逻辑，及跳转应用界面）
     *
     * @author tony001
     * @date 2024-05-14 15:05:07
     * @param {string} loginName
     * @param {string} password
     * @param {boolean} [remember]
     * @param {IData} [headers]
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean, headers?: IData, opts?: IData): Promise<boolean>;
    /**
     * 登出（包含调用登录逻辑，及跳转登录页）
     *
     * @author tony001
     * @date 2024-05-14 15:05:24
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    logout(opts?: IData): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 15:05:33
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
     * @date 2024-05-14 15:05:51
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
     * @date 2024-05-14 16:05:06
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
     * @date 2024-05-14 16:05:20
     * @param {string} oldLanguage
     * @param {string} newLanguage
     * @param {IData} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchLanguage(oldLanguage: string, newLanguage: string, opts?: IData): Promise<boolean>;
}
//# sourceMappingURL=i-app-util.d.ts.map