import { IAppView, IPanel, IPanelItem } from '@ibiz/model-core';
import { IPanelItemProvider } from '../../interface';
/** 面板成员适配器前缀 */
export declare const PANELITEM_PROVIDER_PREFIX = "PANELITEM";
/**
 * 注册面板成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key 忽略大小写
 * @param {() => IPanelItemProvider} callback 生成面板成员适配器的回调
 */
export declare function registerPanelItemProvider(key: string, callback: () => IPanelItemProvider): void;
/**
 * 获取面板成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPanelItemProvider>}
 */
export declare function getPanelItemProvider(model: IPanelItem, panelModel: IPanel, viewModel: IAppView): Promise<IPanelItemProvider | undefined>;
//# sourceMappingURL=panel-item-register.d.ts.map