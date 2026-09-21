import {
  GridController,
  GridGroupColumnController,
  IGridColumnProvider,
} from '@ibiz-template/runtime';
import { IDEGridGroupColumn } from '@ibiz/model-core';

/**
 * 表格分组列适配器
 *
 * @export
 * @class GridGroupColumnProvider
 * @implements {IGridColumnProvider}
 */
export class GridGroupColumnProvider implements IGridColumnProvider {
  component: string = '';

  async createController(
    columnModel: IDEGridGroupColumn,
    grid: GridController,
  ): Promise<GridGroupColumnController> {
    const c = new GridGroupColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}
