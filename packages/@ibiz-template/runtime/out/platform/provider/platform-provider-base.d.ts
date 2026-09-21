import { IPlatformProvider } from '../../interface';
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
    login(loginName: string, passWord: string, _verificationCode?: string | undefined): Promise<boolean>;
    download(url: string, name: string): Promise<boolean>;
    /**
     * @description 设置浏览器标签页标题
     * @param {string} title
     * @memberof PlatformProviderBase
     */
    setBrowserTitle(title: string): void;
}
//# sourceMappingURL=platform-provider-base.d.ts.map