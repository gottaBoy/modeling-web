import { IAppCounter } from '@ibiz/model-core';
import { IAppCounterProvider } from '../../interface';
/** 系统计数器适配器前缀 */
export declare const APP_COUNTER_PROVIDER_PREFIX = "APPCOUNTER";
/**
 * 注册系统计数器适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAppCounterProvider} callback 生成系统计数器适配器的回调
 */
export declare function registerAppCounterProvider(key: string, callback: () => IAppCounterProvider): void;
/**
 * 获取系统计数器适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IAppCounterProvider>}
 */
export declare function getAppCounterProvider(model: IAppCounter): Promise<IAppCounterProvider>;
//# sourceMappingURL=app-counter-register.d.ts.map