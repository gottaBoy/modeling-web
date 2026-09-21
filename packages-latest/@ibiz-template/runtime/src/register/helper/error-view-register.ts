import { IErrorViewProvider } from '../../interface';

/** 错误视图适配器前缀 */
export const ERROR_VIEW_PROVIDER_PREFIX = 'ERROR_VIEW';

/**
 * 注册错误视图适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IErrorViewProvider} callback 生成错误视图适配器的回调
 */
export function registerErrorViewProvider(
  key: string,
  callback: () => IErrorViewProvider,
): void {
  ibiz.register.register(`${ERROR_VIEW_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IErrorViewProvider | undefined {
  return ibiz.register.get(
    `${ERROR_VIEW_PROVIDER_PREFIX}_${key}`,
  ) as IErrorViewProvider;
}

/**
 * 获取错误视图适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IErrorViewProvider>}
 */
export function getErrorViewProvider(
  code: string,
): IErrorViewProvider | undefined {
  let provider: IErrorViewProvider | undefined;
  // 找错误视图类型
  if (!provider) {
    provider = getProvider(code);
  }
  return provider;
}
