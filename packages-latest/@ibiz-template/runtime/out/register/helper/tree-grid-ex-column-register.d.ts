import { IDETreeColumn } from '@ibiz/model-core';
import { ITreeGridExColumnProvider } from '../../interface';
/** 表格列适配器前缀 */
export declare const TREEGRIDEX_COLUMN_PROVIDER_PREFIX = "TREEGRIDEX_COLUMN";
/**
 * 注册表格列适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => ITreeGridExColumnProvider} callback 生成表格列适配器的回调
 */
export declare function registerTreeGridExColumnProvider(key: string, callback: () => ITreeGridExColumnProvider): void;
/**
 * 获取表格列适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<ITreeGridExColumnProvider>}
 */
export declare function getTreeGridExColumnProvider(model: IDETreeColumn): Promise<ITreeGridExColumnProvider | undefined>;
//# sourceMappingURL=tree-grid-ex-column-register.d.ts.map