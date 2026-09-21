import { IPlatformProvider } from '../../interface';
import { PlatformType } from '../../constant';
/** 搭载平台适配器前缀 */
export declare const PLATFORM_PROVIDER_PREFIX = "PLATFORM";
/**
 * 注册搭载平台适配器
 * @author zk
 * @date 2023-11-20 02:11:36
 * @export
 * @param {string} key
 * @param {() => IPlatformProvider} callback 生成搭载平台适配器的回调
 */
export declare function registerPlatformProvider(key: PlatformType, callback: () => IPlatformProvider): void;
/**
 * 获取搭载平台适配器
 * @author zk
 * @date 2023-11-20 02:11:38
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPlatformProvider>}
 */
export declare function getPlatformProvider(): IPlatformProvider;
//# sourceMappingURL=platform-register.d.ts.map