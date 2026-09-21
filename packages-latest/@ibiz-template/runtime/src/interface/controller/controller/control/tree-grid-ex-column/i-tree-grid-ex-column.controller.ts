import { ITreeGridExController } from '../i-tree-grid-ex.controller';
import { IApiTreeGridExColumnController } from '../../../../api';

/**
 * 树表格（增强）列控制器
 * @author lxm
 * @date 2023-05-24 07:34:51
 * @export
 * @interface IGridColumnController
 */
export interface ITreeGridExColumnController
  extends IApiTreeGridExColumnController {
  treeGrid: ITreeGridExController;
}
