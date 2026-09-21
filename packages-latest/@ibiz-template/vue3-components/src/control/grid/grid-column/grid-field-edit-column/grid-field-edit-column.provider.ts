import {
  GridController,
  GridFieldEditColumnController,
  IGridColumnProvider,
} from '@ibiz-template/runtime';
import { IDEGridFieldColumn } from '@ibiz/model-core';

/**
 * 表格属性列(开启行编辑)适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class GridFieldEditColumnProvider
 * @implements {IGridColumnProvider}
 */
export class GridFieldEditColumnProvider implements IGridColumnProvider {
  component: string = 'IBizGridFieldEditColumn';

  async createController(
    columnModel: IDEGridFieldColumn,
    grid: GridController,
  ): Promise<GridFieldEditColumnController> {
    const c = new GridFieldEditColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}
