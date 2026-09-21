/**
 * 应用级功能
 *
 * @author chitanda
 * @date 2023-08-21 14:08:51
 * @export
 * @class AppController
 * @implements {IHubController}
 */
export class HubController {
    constructor() {
        /**
         * 全局共享数据对象
         *
         * @author tony001
         * @date 2024-05-14 14:05:22
         * @type {IData}
         */
        this.session = {};
    }
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
    async login(loginName, password, remember, headers, opts) {
        const bol = await ibiz.appUtil.login(loginName, password, remember, headers, opts);
        return bol;
    }
    /**
     * 登出（包含调用登录逻辑，及跳转登录页）
     *
     * @author tony001
     * @date 2024-05-14 16:05:01
     * @param {(IData | undefined)} [opts]
     * @return {*}  {Promise<boolean>}
     */
    async logout(opts) {
        const bol = await ibiz.appUtil.logout(opts);
        return bol;
    }
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
    async changePwd(oldPwd, newPwd, opts) {
        const bol = await ibiz.appUtil.changePwd(oldPwd, newPwd, opts);
        return bol;
    }
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
    async switchOrg(oldOrgId, newOrgId, opts) {
        const bol = await ibiz.appUtil.switchOrg(oldOrgId, newOrgId, opts);
        return bol;
    }
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
    async switchTheme(oldTheme, newTheme, opts) {
        const bol = await ibiz.appUtil.switchTheme(oldTheme, newTheme, opts);
        return bol;
    }
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
    async switchLanguage(oldLanguage, newLanguage, opts) {
        const bol = await ibiz.appUtil.switchTheme(oldLanguage, newLanguage, opts);
        return bol;
    }
}
