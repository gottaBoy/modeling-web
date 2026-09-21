import { IPortalAsyncAction, RuntimeError } from '@ibiz-template/core';
import { IAsyncActionProvider } from '../../interface';

/** 界面行为适配器前缀 */
export const ASYNC_ACTION_PROVIDER_PREFIX = 'ASYNC_ACTION';

/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAsyncActionProvider} callback 生成界面行为适配器的回调
 */
export function registerAsyncActionProvider(
  key: string,
  callback: () => IAsyncActionProvider,
): void {
  ibiz.register.register(`${ASYNC_ACTION_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IAsyncActionProvider | undefined {
  return ibiz.register.get(
    `${ASYNC_ACTION_PROVIDER_PREFIX}_${key}`,
  ) as IAsyncActionProvider;
}

/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IAsyncActionProvider>}
 */
export function getAsyncActionProvider(
  action: IPortalAsyncAction,
): IAsyncActionProvider {
  const provider: IAsyncActionProvider | undefined = getProvider(
    action.actiontype || 'DEFAULT',
  );

  // 找异步操作类型
  if (!provider) {
    throw new RuntimeError(
      ibiz.i18n.t('runtime.register.helper.asynchronousAction', {
        actiontype: action.actiontype,
      }),
    );
  } else {
    return provider;
  }
}
