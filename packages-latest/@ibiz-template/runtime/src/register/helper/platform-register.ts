import { IPlatformProvider } from '../../interface';

import { PlatformType } from '../../constant';
import { getPlatformType } from '../../platform';

/** 搭载平台适配器前缀 */
export const PLATFORM_PROVIDER_PREFIX = 'PLATFORM';

/**
 * 注册搭载平台适配器
 * @author zk
 * @date 2023-11-20 02:11:36
 * @export
 * @param {string} key
 * @param {() => IPlatformProvider} callback 生成搭载平台适配器的回调
 */

export function registerPlatformProvider(
  key: PlatformType,
  callback: () => IPlatformProvider,
): void {
  ibiz.register.register(`${PLATFORM_PROVIDER_PREFIX}_${key}`, callback);
}

/**
 * 获取适配器
 *
 * @author zk
 * @date 2023-11-20 02:11:00
 * @param {string} key
 * @return {*}  {(IPlatformProvider | undefined)}
 */
function getProvider(key: PlatformType): IPlatformProvider | undefined {
  return ibiz.register.get(
    `${PLATFORM_PROVIDER_PREFIX}_${key}`,
  ) as IPlatformProvider;
}

/**
 * 获取搭载平台适配器
 * @author zk
 * @date 2023-11-20 02:11:38
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPlatformProvider>}
 */
export function getPlatformProvider(): IPlatformProvider {
  // 搭载平台类型
  const platformType = getPlatformType();
  const provider: IPlatformProvider | undefined = getProvider(platformType);
  if (!provider) {
    // 默认返回浏览器搭载平台适配器
    return getProvider(PlatformType.BROWSER)!;
  }
  return provider;
}
