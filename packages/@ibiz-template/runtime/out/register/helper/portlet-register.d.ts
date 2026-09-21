import { IDBPortletPart } from '@ibiz/model-core';
import { IPortletProvider } from '../../interface';
/** 门户部件成员适配器前缀 */
export declare const PORTLET_PROVIDER_PREFIX = "PORTLET";
/**
 * 注册门户部件成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IPortletProvider} callback 生成门户部件成员适配器的回调
 */
export declare function registerPortletProvider(key: string, callback: () => IPortletProvider): void;
/**
 * 获取门户部件成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPortletProvider>}
 */
export declare function getPortletProvider(model: IDBPortletPart): Promise<IPortletProvider | undefined>;
//# sourceMappingURL=portlet-register.d.ts.map