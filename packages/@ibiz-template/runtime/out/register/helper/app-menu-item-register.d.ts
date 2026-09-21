import { IAppMenuItem } from '@ibiz/model-core';
import { IAppMenuItemProvider } from '../../interface';
/** 应用菜单项适配器前缀 */
export declare const APPMENUITEM_PROVIDER_PREFIX = "APPMENUITEM";
/**
 * 注册应用菜单项适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAppMenuItemProvider} callback 生成界面行为适配器的回调
 */
export declare function registerAppMenuItemProvider(key: string, callback: () => IAppMenuItemProvider): void;
/**
 * 获取应用菜单项适配器
 *
 * @author chitanda
 * @date 2023-11-01 17:11:43
 * @export
 * @param {IAppMenuItem} model
 * @return {*}  {Promise<IAppMenuItemProvider>}
 */
export declare function getAppMenuItemProvider(model: IAppMenuItem): Promise<IAppMenuItemProvider | undefined>;
//# sourceMappingURL=app-menu-item-register.d.ts.map