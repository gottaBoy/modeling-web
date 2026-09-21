import { IErrorViewProvider } from '../../interface';
/** 错误视图适配器前缀 */
export declare const ERROR_VIEW_PROVIDER_PREFIX = "ERROR_VIEW";
/**
 * 注册错误视图适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IErrorViewProvider} callback 生成错误视图适配器的回调
 */
export declare function registerErrorViewProvider(key: string, callback: () => IErrorViewProvider): void;
/**
 * 获取错误视图适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IErrorViewProvider>}
 */
export declare function getErrorViewProvider(code: string): IErrorViewProvider | undefined;
//# sourceMappingURL=error-view-register.d.ts.map