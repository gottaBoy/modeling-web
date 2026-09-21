import { RuntimeError, downloadFileFromBlob, } from '@ibiz-template/core';
import { exportData } from '../../controller';
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
    /**
     * @description 登录
     * @param {string} loginName
     * @param {string} passWord
     * @param {(string | undefined)} [_verificationCode]
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    async login(loginName, passWord, _verificationCode) {
        return ibiz.auth.login(loginName, passWord);
    }
    /**
     * @description 下载
     * @param {string} url
     * @param {string} fileName
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    async download(url, fileName) {
        // 发送get请求
        const response = await ibiz.net.request(url, {
            baseURL: '',
            method: 'get',
            responseType: 'blob',
        });
        if (response.status !== 200) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.failedDownload'));
        }
        // 请求成功，后台返回的是一个文件流
        if (!response.data) {
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.fileStreamData'));
        }
        else {
            downloadFileFromBlob(response.data, fileName);
            return Promise.resolve(true);
        }
    }
    /**
     * @description 后台导出
     * @param {IBackendExportParams} args
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    async backendExport(args) {
        const { baseURL, url, method, params, data, newWindow } = args;
        // 规范化参数
        if (data &&
            Object.prototype.hasOwnProperty.call(data, 'srfexportdataset')) {
            delete data.srfexportdataset;
        }
        if (data &&
            Object.prototype.hasOwnProperty.call(data, 'srfexportdatakey')) {
            delete data.srfexportdatakey;
        }
        const response = await ibiz.net.request(url, {
            data,
            method,
            params,
            baseURL,
            responseType: 'blob',
        });
        if (response.status !== 200)
            throw new RuntimeError(ibiz.i18n.t('runtime.platform.failedExport'));
        // TODO 移动端不支持新窗口预览
        if (!ibiz.env.isMob && newWindow) {
            const link = window.URL.createObjectURL(response.data);
            window.open(link, '_blank');
        }
        else {
            const fileName = ibiz.util.file.getFileName(response);
            downloadFileFromBlob(response.data, fileName);
        }
        return true;
    }
    /**
     * @description 前台导出
     * @param {IFrontExportParams} args
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    async frontExport(args) {
        await exportData(args);
        return true;
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
        // 隐藏应用标题时，有视图标题就显示视图标题，没有时则显示应用标题
        if (ibiz.env.isMob && !ibiz.config.mob.mobShowAppTitle) {
            document.title = title || tabTitle;
        }
        else if (title) {
            document.title = `${tabTitle} - ${title}`;
        }
        else {
            document.title = tabTitle;
        }
    }
}
