import { IInternalMessage, RuntimeError } from '@ibiz-template/core';
import { IInternalMessageProvider } from '../../interface';

/** 界面行为适配器前缀 */
export const INTERNAL_MESSAGE_PROVIDER_PREFIX = 'INTERNAL_MESSAGE';

/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IInternalMessageProvider} callback 生成界面行为适配器的回调
 */
export function registerInternalMessageProvider(
  key: string,
  callback: () => IInternalMessageProvider,
): void {
  ibiz.register.register(
    `${INTERNAL_MESSAGE_PROVIDER_PREFIX}_${key}`,
    callback,
  );
}

function getProvider(key: string): IInternalMessageProvider | undefined {
  return ibiz.register.get(
    `${INTERNAL_MESSAGE_PROVIDER_PREFIX}_${key}`,
  ) as IInternalMessageProvider;
}

/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IInternalMessageProvider>}
 */
export function getInternalMessageProvider(
  msg: IInternalMessage,
): IInternalMessageProvider {
  const provider: IInternalMessageProvider | undefined = getProvider(
    msg.content_type || 'DEFAULT',
  );

  // 找异步操作类型
  if (!provider) {
    throw new RuntimeError(
      ibiz.i18n.t('runtime.register.helper.messageType', {
        content_type: msg.content_type,
      }),
    );
  } else {
    return provider;
  }
}
