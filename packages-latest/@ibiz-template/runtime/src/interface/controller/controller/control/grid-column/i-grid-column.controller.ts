import { IApiGridColumnController } from '../../../../api';
import { IGridController } from '../i-grid.controller';

/**
 * @description 表格列控制器
 * @export
 * @interface IGridColumnController
 * @extends {IApiGridColumnController}
 */
export interface IGridColumnController extends IApiGridColumnController {
  grid: IGridController;
}
