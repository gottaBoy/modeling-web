import { IAuthResult, IHubController } from '../interface';
/**
 * 应用级功能
 *
 * @author chitanda
 * @date 2023-08-21 14:08:51
 * @export
 * @class AppController
 * @implements {IHubController}
 */
export declare class HubController implements IHubController {
    /**
     * 全局共享数据对象
     *
     * @author tony001
     * @date 2024-05-14 14:05:22
     * @type {IData}
     */
    session: IData;
    /**
     * 登录（包含调用登录逻辑，及跳转应用界面）
     *
     * @author tony001
     * @date 2024-05-14 16:05:04
     * @param {string} loginName
     * @param {string} password
     * @param {(boolean | undefined)} [remember]
     * @param {(IData | undefined)} [headers]
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    login(loginName: string, password: string, remember?: boolean | undefined, headers?: IData | undefined, opts?: IData | undefined): Promise<boolean>;
    /**
     * 登出（包含调用登录逻辑，及跳转登录页）
     *
     * @author tony001
     * @date 2024-05-14 16:05:01
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    logout(opts?: IData | undefined): Promise<boolean>;
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 16:05:54
     * @param {string} oldPwd
     * @param {string} newPwd
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    changePwd(oldPwd: string, newPwd: string, opts?: IData | undefined): Promise<IAuthResult>;
    /**
     * 切换组织（包括界面刷新）
     *
     * @author tony001
     * @date 2024-05-14 16:05:09
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
     * @date 2024-05-14 16:05:12
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
     * @date 2024-05-14 16:05:01
     * @param {string} oldLanguage
     * @param {string} newLanguage
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    switchLanguage(oldLanguage: string, newLanguage: string, opts?: IData | undefined): Promise<boolean>;
}
//# sourceMappingURL=hub.controller.d.ts.map