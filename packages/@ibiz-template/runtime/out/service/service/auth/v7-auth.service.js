import { CoreConst, clearAppCookie, getAppCookie, getRandomInt, setAppCookie, } from '@ibiz-template/core';
/**
 * 认证服务
 *
 * @author chitanda
 * @date 2022-07-19 18:07:51
 * @export
 * @class AuthService
 */
export class V7AuthService {
    get isAnonymous() {
        return getAppCookie(CoreConst.IS_ANONYMOUS) === '1';
    }
    /**
     * 使用匿名账号登录
     *
     * @author tony001
     * @date 2024-05-14 17:05:47
     * @return {*}  {Promise<boolean>}
     */
    async anonymousLogin() {
        const { anonymousUser, anonymousPwd } = ibiz.env;
        if (!anonymousUser || !anonymousPwd) {
            ibiz.log.error(ibiz.i18n.t('runtime.service.noFoundUsernamePassword'));
            return false;
        }
        let password = anonymousPwd;
        let headers = {};
        if (ibiz.env.enableEncryption) {
            password = await ibiz.util.encryption.encryptByRSA(`${anonymousPwd}|${getRandomInt()}`);
            headers = { 'captcha-state': 'RSA' };
        }
        const result = await this.login(anonymousUser, password, undefined, headers);
        if (result) {
            setAppCookie(CoreConst.IS_ANONYMOUS, '1', 0);
            // 全部改成session级别的
            const token = getAppCookie(CoreConst.TOKEN);
            const expirein = getAppCookie(CoreConst.TOKEN_EXPIRES);
            const remember = getAppCookie(CoreConst.TOKEN_REMEMBER);
            const refreshToken = getAppCookie(CoreConst.REFRESH_TOKEN);
            setAppCookie(CoreConst.TOKEN, token, 0);
            setAppCookie(CoreConst.TOKEN_EXPIRES, expirein, 0);
            setAppCookie(CoreConst.TOKEN_REMEMBER, remember, 0);
            if (refreshToken) {
                setAppCookie(CoreConst.REFRESH_TOKEN, refreshToken, 0);
            }
        }
        return result;
    }
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
    async login(loginName, password, remember, headers) {
        // eslint-disable-next-line no-useless-catch
        try {
            this.clearAuthData();
            if (ibiz.env.enableEncryption) {
                password = await ibiz.util.encryption.encryptByRSA(`${password}|${getRandomInt()}`);
                headers = Object.assign(Object.assign({}, headers), { 'captcha-state': 'RSA' });
            }
            const res = await ibiz.net.post('/v7/login', {
                loginname: loginName,
                password,
                rememberme: remember,
            }, {}, headers);
            const { data } = res;
            if (data && data.token) {
                const cacheDay = remember ? 30 : 0;
                if (remember) {
                    setAppCookie(CoreConst.TOKEN_REMEMBER, '1', cacheDay);
                }
                setAppCookie(CoreConst.TOKEN, data.token, cacheDay);
                const expiredDate = new Date().getTime() + (data.expirein || 7199) * 1000;
                setAppCookie(CoreConst.TOKEN_EXPIRES, `${expiredDate}`, cacheDay);
                if (data.refresh_token) {
                    setAppCookie(CoreConst.REFRESH_TOKEN, data.refresh_token, cacheDay);
                }
                clearAppCookie(CoreConst.IS_ANONYMOUS);
            }
            return true;
        }
        catch (err) {
            ibiz.notification.error({
                title: ibiz.i18n.t('runtime.service.loginFailure'),
                desc: err.message || '',
            });
        }
        return false;
    }
    /**
     * 登出
     *
     * @author tony001
     * @date 2024-05-14 17:05:04
     * @return {*}  {Promise<boolean>}
     */
    async logout() {
        try {
            await ibiz.net.get('/v7/logout');
            this.clearAuthData();
            return true;
        }
        catch (err) {
            ibiz.notification.error({
                title: ibiz.i18n.t('runtime.service.logoutFailure'),
                desc: err.message || '',
            });
        }
        return false;
    }
    /**
     * 变更密码
     *
     * @author tony001
     * @date 2024-05-14 17:05:22
     * @param {string} oldPwd
     * @param {string} newPwd
     * @return {*}  {Promise<IAuthResult>}
     */
    async changePwd(oldPwd, newPwd) {
        try {
            let headers = {};
            if (ibiz.env.enableEncryption) {
                oldPwd = await ibiz.util.encryption.encryptByRSA(`${oldPwd}|${getRandomInt()}`);
                newPwd = await ibiz.util.encryption.encryptByRSA(`${newPwd}|${getRandomInt()}`);
                headers = { 'captcha-state': 'RSA' };
            }
            const res = await ibiz.net.post('/uaa/changepwd', {
                oldPwd,
                newPwd,
            }, {}, headers);
            return { ok: true, result: res };
        }
        catch (err) {
            return { ok: false, result: err };
        }
    }
    /**
     * 页面未关闭情况下，自动延长登录时间
     *
     * @author tony001
     * @date 2024-05-14 17:05:38
     * @return {*}  {Promise<void>}
     */
    async extendLogin() {
        if (this.isAnonymous) {
            // 匿名登录不需要延长都是会话级的
            return;
        }
        const token = getAppCookie(CoreConst.TOKEN);
        const expirein = getAppCookie(CoreConst.TOKEN_EXPIRES);
        if (token && expirein) {
            // 计算到过期时间所需的延时毫秒数，预留提前量
            let wait = Number(expirein) - new Date().getTime();
            const early = 5 * 60 * 1000;
            wait = wait > early ? wait - early : 0;
            setTimeout(async () => {
                const remember = getAppCookie(CoreConst.TOKEN_REMEMBER);
                const refreshToken = getAppCookie(CoreConst.REFRESH_TOKEN);
                const cacheDay = remember ? 30 : 0;
                let res;
                if (refreshToken != null && refreshToken !== '') {
                    res = await ibiz.net.get(`/uaa/refresh_token/${refreshToken}`);
                }
                else {
                    res = await ibiz.net.get(`/uaa/refreshtoken2`);
                }
                if (res.ok) {
                    if (remember) {
                        setAppCookie(CoreConst.TOKEN_REMEMBER, '1', cacheDay);
                    }
                    setAppCookie(CoreConst.TOKEN, res.data.token, cacheDay);
                    const expiredDate = new Date().getTime() + (res.data.expirein || 7199) * 1000;
                    setAppCookie(CoreConst.TOKEN_EXPIRES, `${expiredDate}`, cacheDay);
                    if (res.data.refresh_token) {
                        setAppCookie(CoreConst.REFRESH_TOKEN, res.data.refresh_token, cacheDay);
                    }
                    // token刷新后，更新 appData
                    await this.loadAppData();
                    // 刷新token之后用新的token重连mqtt
                    ibiz.hub.initMqtt();
                }
                // 下一次延时做准备
                this.extendLogin();
            }, wait);
        }
    }
    /**
     * 通过refreshToken换算token
     *
     * @author tony001
     * @date 2024-05-14 17:05:45
     * @return {*}  {Promise<void>}
     */
    async refreshToken() {
        const remember = getAppCookie(CoreConst.TOKEN_REMEMBER);
        const refreshToken = getAppCookie(CoreConst.REFRESH_TOKEN);
        if (refreshToken != null && refreshToken !== '') {
            const res = await ibiz.net.get(`/uaa/refresh_token/${refreshToken}`);
            if (res.ok) {
                const cacheDay = remember ? 30 : 0;
                if (remember) {
                    setAppCookie(CoreConst.TOKEN_REMEMBER, '1', cacheDay);
                }
                setAppCookie(CoreConst.TOKEN, res.data.token, cacheDay);
                const expiredDate = new Date().getTime() + (res.data.expirein || 7199) * 1000;
                setAppCookie(CoreConst.TOKEN_EXPIRES, `${expiredDate}`, cacheDay);
                if (res.data.refresh_token) {
                    setAppCookie(CoreConst.REFRESH_TOKEN, res.data.refresh_token, cacheDay);
                }
                clearAppCookie(CoreConst.IS_ANONYMOUS);
            }
        }
    }
    /**
     * 获取当前环境的权限信息（无登录则返回undefined）
     *
     * @author tony001
     * @date 2024-05-14 17:05:57
     * @return {*}  {(IAuthInfo | undefined)}
     */
    getAuthInfo() {
        const token = getAppCookie(CoreConst.TOKEN);
        const isAnonymous = !!getAppCookie(CoreConst.IS_ANONYMOUS);
        return token
            ? {
                token,
                isAnonymous,
            }
            : undefined;
    }
    /**
     * 加载应用数据
     *
     * @author chitanda
     * @date 2022-07-20 20:07:50
     * @return {*}  {Promise<void>}
     */
    async loadAppData() {
        const res = await ibiz.net.get('/appdata');
        if (res.ok) {
            ibiz.appData = res.data;
        }
    }
    /**
     * 清空权限数据
     *
     * @author tony001
     * @date 2024-05-14 17:05:18
     */
    clearAuthData() {
        clearAppCookie(CoreConst.TOKEN);
        clearAppCookie(CoreConst.TOKEN_EXPIRES);
        clearAppCookie(CoreConst.TOKEN_REMEMBER);
        clearAppCookie(CoreConst.REFRESH_TOKEN);
        clearAppCookie(CoreConst.IS_ANONYMOUS);
        ibiz.appData = undefined;
        ibiz.orgData = undefined;
    }
}
