import { PlatformType } from '../../constant';
import { registerPlatformProvider } from '../../register';
import { BrowserPlatformProvider } from './browser-platform-provider';
import { PlatformProviderBase } from './platform-provider-base';

/**
 * 预置搭载平台适配器
 *
 * @author zk
 * @date 2023-11-20 03:11:00
 * @export
 */
export function install(): void {
  // 预制浏览器搭载平台
  const browserPlatformProvider = new BrowserPlatformProvider();
  registerPlatformProvider(PlatformType.BROWSER, () => browserPlatformProvider);
}

export { BrowserPlatformProvider, PlatformProviderBase };
