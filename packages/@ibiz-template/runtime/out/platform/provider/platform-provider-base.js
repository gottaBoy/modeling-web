import { downloadFileFromBlob, RuntimeError } from '@ibiz-template/core';
/**
 * 搭载平台处理器基类
 *
 * @author zk
 * @date 2023-11-20 03:11:13
 * @export
 * @abstract
 * @class PlatformProviderBase
 * @implements {IPlatformProvider}
 */
export class PlatformProviderBase {
    constructor() {
        // 保存浏览器标签原始标题
        this.sourceTitle = document.title;
    }
    back() { }
    async init() { }
    async destroyed() { }
    async login(loginName, passWord, _verificationCode) {
        return ibiz.auth.login(loginName, passWord);
    }
    async download(url, name) {
        // 发送get请求
        const response = await ibiz.net.request(url, {
            method: 'get',
            responseType: 'blob',
            baseURL: '',
        });
        if (response.status !== 200) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.failedDownload'));
        }
        // 请求成功，后台返回的是一个文件流
        if (!response.data) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.fileStreamData'));
        }
        else {
            // 获取文件名
            const fileName = name;
            downloadFileFromBlob(response.data, fileName);
            return Promise.resolve(true);
        }
    }
    /**
     * @description 设置浏览器标签页标题
     * @param {string} title
     * @memberof PlatformProviderBase
     */
    setBrowserTitle(title) {
        const app = ibiz.hub.getApp();
        let tabTitle = '';
        if (ibiz.env.AppLabel) {
            tabTitle = ibiz.env.AppLabel;
        }
        else if (app.model.title) {
            tabTitle = app.model.title;
        }
        else {
            tabTitle = this.sourceTitle;
        }
        if (title) {
            document.title = `${tabTitle} - ${title}`;
        }
        else {
            document.title = tabTitle;
        }
    }
}
