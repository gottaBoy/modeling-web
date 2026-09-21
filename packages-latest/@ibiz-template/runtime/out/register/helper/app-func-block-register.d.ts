import { IAppFuncBlockProvider } from '../../interface';
/** 应用功能块适配器前缀 */
export declare const APP_FUNC_BLOCK_PROVIDER_PREFIX = "APPFUNCBLOCK";
/**
 * @description 注册应用功能块适配器
 * @author tony001
 * @date 2026-05-13 14:05:00
 * @export
 * @param {() => IAppFuncBlockProvider} callback
 */
export declare function registerAppFuncBlockProvider(callback: () => IAppFuncBlockProvider): void;
/**
 * @description 获取应用功能块适配器
 * @author tony001
 * @date 2026-05-13 14:05:23
 * @export
 * @returns {*}  {Promise<IAppFuncBlockProvider>}
 */
export declare function getAppFuncBlockProvider(): Promise<IAppFuncBlockProvider>;
//# sourceMappingURL=app-func-block-register.d.ts.map