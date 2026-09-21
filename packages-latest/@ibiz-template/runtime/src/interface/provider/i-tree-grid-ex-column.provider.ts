import { IDETreeColumn } from '@ibiz/model-core';
import {
  ITreeGridExColumnController,
  ITreeGridExController,
} from '../controller';

/**
 * 树表格（增强）列适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface ITreeGridExColumnProvider
 */
export interface ITreeGridExColumnProvider {
  /**
   * 树表格（增强）列组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建树表格（增强）列控制器
   *
   * @author lxm
   * @date 2022-11-09 10:11:07
   * @param {GridColumnModel} columnModel 列模型
   * @param {GridController} grid 树表格（增强）控制器
   * @returns {*}  {Promise<GridColumnController>}
   */
  createController(
    columnModel: IDETreeColumn,
    treeGrid: ITreeGridExController,
  ): Promise<ITreeGridExColumnController>;
}
