import { IDBPortletPart } from '@ibiz/model-core';
import {
  IDashboardController,
  IPortletContainerController,
  IPortletController,
} from '../controller';

/**
 * 门户部件适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IPortletProvider
 */
export interface IPortletProvider {
  /**
   * 门户部件组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建门户部件控制器
   *
   * @author lxm
   * @date 2022-10-20 22:10:17
   * @param {PortletPartModel} portletModel 门户部件模型
   * @param {DashboardController} dashboard 数据看板控制器
   * @returns {*}  {Promise<T>}
   */
  createController(
    portletModel: IDBPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<IPortletController>;
}
