import { IPortalAsyncAction } from '@ibiz-template/core';
import { IAsyncActionProvider } from '../../interface';
/** 界面行为适配器前缀 */
export declare const ASYNC_ACTION_PROVIDER_PREFIX = "ASYNC_ACTION";
/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAsyncActionProvider} callback 生成界面行为适配器的回调
 */
export declare function registerAsyncActionProvider(key: string, callback: () => IAsyncActionProvider): void;
/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IAsyncActionProvider>}
 */
export declare function getAsyncActionProvider(action: IPortalAsyncAction): IAsyncActionProvider;
//# sourceMappingURL=async-action-register.d.ts.map