import { IAppUIAction } from '@ibiz/model-core';
import { IUIActionProvider } from '../../interface';
/** 界面行为适配器前缀 */
export declare const UIACTION_PROVIDER_PREFIX = "UIACTION";
/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IUIActionProvider} callback 生成界面行为适配器的回调
 */
export declare function registerUIActionProvider(key: string, callback: () => IUIActionProvider): void;
/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IUIActionProvider>}
 */
export declare function getUIActionProvider(model: IAppUIAction): Promise<IUIActionProvider>;
//# sourceMappingURL=ui-action-register.d.ts.map