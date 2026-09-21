import { IPlatformProvider, IFrontExportParams, IBackendExportParams } from '../../interface';
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
export declare abstract class PlatformProviderBase implements IPlatformProvider {
    sourceTitle: string;
    back(): void;
    init(): Promise<void>;
    destroyed(): Promise<void>;
    /**
     * @description 登录
     * @param {string} loginName
     * @param {string} passWord
     * @param {(string | undefined)} [_verificationCode]
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    login(loginName: string, passWord: string, _verificationCode?: string | undefined): Promise<boolean>;
    /**
     * @description 下载
     * @param {string} url
     * @param {string} fileName
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    download(url: string, fileName: string): Promise<boolean>;
    /**
     * @description 后台导出
     * @param {IBackendExportParams} args
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    backendExport(args: IBackendExportParams): Promise<boolean>;
    /**
     * @description 前台导出
     * @param {IFrontExportParams} args
     * @returns {*}  {Promise<boolean>}
     * @memberof PlatformProviderBase
     */
    frontExport(args: IFrontExportParams): Promise<boolean>;
    /**
     * @description 设置浏览器标签页标题
     * @param {string} title
     * @memberof PlatformProviderBase
     */
    setBrowserTitle(title: string): void;
}
//# sourceMappingURL=platform-provider-base.d.ts.map