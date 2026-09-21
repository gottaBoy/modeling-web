import { GridController, GridFieldEditColumnController, IGridColumnProvider } from '@ibiz-template/runtime';
import { IDEGridFieldColumn } from '@ibiz/model-core';
/**
 * 自动表格编辑列适配器
 *
 * @export
 * @class AutoGridFieldEditColumnProvider
 * @implements {IGridColumnProvider}
 */
export declare class AutoGridFieldEditColumnProvider implements IGridColumnProvider {
    component: string;
    createController(columnModel: IDEGridFieldColumn, grid: GridController): Promise<GridFieldEditColumnController>;
}
