import { GridController, GridUAColumnController, IGridColumnProvider } from '@ibiz-template/runtime';
import { IDEGridUAColumn } from '@ibiz/model-core';
/**
 * 表格操作列适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class GridUAColumnProvider
 * @implements {IGridColumnProvider}
 */
export declare class GridUAColumnProvider implements IGridColumnProvider {
    component: string;
    createController(columnModel: IDEGridUAColumn, grid: GridController): Promise<GridUAColumnController>;
}
