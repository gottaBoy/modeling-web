import {
  TreeGridExController,
  TreeGridExFieldColumnController,
  ITreeGridExColumnProvider,
} from '@ibiz-template/runtime';
import { IDETreeDEFColumn } from '@ibiz/model-core';

/**
 * 树表格（增强）属性列适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class TreeGridExFieldColumnProvider
 * @implements {ITreeGridExColumnProvider}
 */
export class TreeGridExFieldColumnProvider
  implements ITreeGridExColumnProvider
{
  component: string = 'IBizTreeGridExFieldColumn';

  async createController(
    columnModel: IDETreeDEFColumn,
    grid: TreeGridExController,
  ): Promise<TreeGridExFieldColumnController> {
    const c = new TreeGridExFieldColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}
