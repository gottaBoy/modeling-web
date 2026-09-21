import { RuntimeError } from '@ibiz-template/core';
import { IAppFuncBlockProvider } from '../../interface';

/** 应用功能块适配器前缀 */
export const APP_FUNC_BLOCK_PROVIDER_PREFIX = 'APPFUNCBLOCK';

/**
 * @description 注册应用功能块适配器
 * @author tony001
 * @date 2026-05-13 14:05:00
 * @export
 * @param {() => IAppFuncBlockProvider} callback
 */
export function registerAppFuncBlockProvider(
  callback: () => IAppFuncBlockProvider,
): void {
  ibiz.register.register(`${APP_FUNC_BLOCK_PROVIDER_PREFIX}_DEFAULT`, callback);
}

/**
 * @description 获取应用功能块适配器
 * @author tony001
 * @date 2026-05-13 14:05:23
 * @export
 * @returns {*}  {Promise<IAppFuncBlockProvider>}
 */
export async function getAppFuncBlockProvider(): Promise<IAppFuncBlockProvider> {
  const provider: IAppFuncBlockProvider | undefined = ibiz.register.get(
    `${APP_FUNC_BLOCK_PROVIDER_PREFIX}_DEFAULT`,
  ) as IAppFuncBlockProvider | undefined;
  if (!provider) {
    throw new RuntimeError(
      ibiz.i18n.t('runtime.register.helper.noFoundAppFuncBlock'),
    );
  } else {
    return provider;
  }
}
