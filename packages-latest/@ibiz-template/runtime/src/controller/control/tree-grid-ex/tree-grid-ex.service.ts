import { IDETreeGridEx } from '@ibiz/model-core';
import { TreeService } from '../tree/tree.service';

/**
 * 树表格增强部件服务
 *
 * @author lxm
 * @date 2023-12-21 10:50:35
 * @export
 * @class TreeGridExService
 * @extends {TreeService<T>}
 * @template T
 */
export class TreeGridExService<
  T extends IDETreeGridEx = IDETreeGridEx,
> extends TreeService<T> {}
