import { IDEGridColumn } from '@ibiz/model-core';
import { IGridColumnController, IGridController } from '../controller';

/**
 * 表格列适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IGridColumnProvider
 */
export interface IGridColumnProvider {
  /**
   * 表格列组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建表格列控制器
   *
   * @author lxm
   * @date 2022-11-09 10:11:07
   * @param {GridColumnModel} columnModel 列模型
   * @param {GridController} grid 表格控制器
   * @returns {*}  {Promise<GridColumnController>}
   */
  createController(
    columnModel: IDEGridColumn,
    grid: IGridController,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<IGridColumnController>;
}
