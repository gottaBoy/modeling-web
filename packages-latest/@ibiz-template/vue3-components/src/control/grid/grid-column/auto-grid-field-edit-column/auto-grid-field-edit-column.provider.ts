import {
  GridController,
  GridFieldEditColumnController,
  IGridColumnProvider,
} from '@ibiz-template/runtime';
import { IDEGridFieldColumn } from '@ibiz/model-core';

/**
 * 自动表格编辑列适配器
 *
 * @export
 * @class AutoGridFieldEditColumnProvider
 * @implements {IGridColumnProvider}
 */
export class AutoGridFieldEditColumnProvider implements IGridColumnProvider {
  component: string = 'IBizAutoGridFieldEditColumn';

  async createController(
    columnModel: IDEGridFieldColumn,
    grid: GridController,
  ): Promise<GridFieldEditColumnController> {
    const c = new GridFieldEditColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}
