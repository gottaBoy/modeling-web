import { IDEToolbarItem } from '@ibiz/model-core';
import { IToolbarItemProvider } from '../../interface';
/** 工具栏项适配器前缀 */
export declare const TOOLBAR_ITEM_PROVIDER_PREFIX = "TOOLBAR_ITEM";
/**
 * 注册工具栏项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:26
 * @export
 * @param {string} key
 * @param {() => IToolbarItemProvider} callback
 */
export declare function registerToolbarItemProvider(key: string, callback: () => IToolbarItemProvider): void;
/**
 * 获取工具栏项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:47
 * @export
 * @param {IDEToolbarItem} model
 * @return {*}  {(Promise<IToolbarItemProvider | undefined>)}
 */
export declare function getToolbarItemProvider(model: IDEToolbarItem): Promise<IToolbarItemProvider | undefined>;
//# sourceMappingURL=toolbar-item-register.d.ts.map