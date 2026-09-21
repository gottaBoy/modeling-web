import { IInternalMessage } from '@ibiz-template/core';
import { IInternalMessageProvider } from '../../interface';
/** 界面行为适配器前缀 */
export declare const INTERNAL_MESSAGE_PROVIDER_PREFIX = "INTERNAL_MESSAGE";
/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IInternalMessageProvider} callback 生成界面行为适配器的回调
 */
export declare function registerInternalMessageProvider(key: string, callback: () => IInternalMessageProvider): void;
/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IInternalMessageProvider>}
 */
export declare function getInternalMessageProvider(msg: IInternalMessage): IInternalMessageProvider;
//# sourceMappingURL=internal-message-register.d.ts.map