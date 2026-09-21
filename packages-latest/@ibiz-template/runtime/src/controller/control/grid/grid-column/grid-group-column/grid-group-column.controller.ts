import { IDEGridGroupColumn } from '@ibiz/model-core';
import { GridColumnController } from '../../grid/grid-column.controller';
import { IApiGridGroupColumnController } from '../../../../../interface';

/**
 * @description 表格分组列控制器
 * @export
 * @class GridGroupColumnController
 * @extends {GridColumnController<IDEGridGroupColumn>}
 * @implements {IApiGridGroupColumnController}
 */
export class GridGroupColumnController
  extends GridColumnController<IDEGridGroupColumn>
  implements IApiGridGroupColumnController {}
