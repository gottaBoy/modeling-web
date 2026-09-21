import { IDEGrid, IDEGridColumn } from '@ibiz/model-core';
import { IGridColumnProvider } from '../../interface';
/** 表格列适配器前缀 */
export declare const GRIDCOLUMN_PROVIDER_PREFIX = "GRIDCOLUMN";
/**
 * 注册表格列适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IGridColumnProvider} callback 生成表格列适配器的回调
 */
export declare function registerGridColumnProvider(key: string, callback: () => IGridColumnProvider): void;
/**
 * 获取表格列适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IGridColumnProvider>}
 */
export declare function getGridColumnProvider(model: IDEGridColumn, grid: IDEGrid): Promise<IGridColumnProvider | undefined>;
/**
 * 获取自动表格列适配器
 *
 * @export
 * @param {IDEGridColumn} model
 * @param {IDEGrid} grid
 * @return {*}  {(Promise<IGridColumnProvider | undefined>)}
 */
export declare function getAutoGridColumnProvider(model: IDEGridColumn, grid: IDEGrid): Promise<IGridColumnProvider | undefined>;
//# sourceMappingURL=grid-column-register.d.ts.map