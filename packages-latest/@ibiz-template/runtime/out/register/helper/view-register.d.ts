import { IAppView } from '@ibiz/model-core';
import { IViewProvider } from '../../interface';
/** 视图适配器前缀 */
export declare const VIEW_PROVIDER_PREFIX = "VIEW";
/**
 * 注册视图适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IViewProvider} callback 生成视图适配器的回调
 */
export declare function registerViewProvider(key: string, callback: () => IViewProvider): void;
/**
 * 获取视图适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IViewProvider>}
 */
export declare function getViewProvider(model: IAppView): Promise<IViewProvider | undefined>;
//# sourceMappingURL=view-register.d.ts.map