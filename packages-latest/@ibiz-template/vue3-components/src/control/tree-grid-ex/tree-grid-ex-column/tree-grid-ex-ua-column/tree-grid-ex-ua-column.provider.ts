import {
  TreeGridExController,
  TreeGridExUAColumnController,
  ITreeGridExColumnProvider,
} from '@ibiz-template/runtime';
import { IDETreeUAColumn } from '@ibiz/model-core';

/**
 * 树表格（增强）操作列适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class TreeGridExUAColumnProvider
 * @implements {ITreeGridExColumnProvider}
 */
export class TreeGridExUAColumnProvider implements ITreeGridExColumnProvider {
  component: string = 'IBizTreeGridExUAColumn';

  async createController(
    columnModel: IDETreeUAColumn,
    grid: TreeGridExController,
  ): Promise<TreeGridExUAColumnController> {
    const c = new TreeGridExUAColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}
