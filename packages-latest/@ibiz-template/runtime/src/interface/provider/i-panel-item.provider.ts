/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelController,
  IPanelItemContainerController,
  IPanelItemController,
} from '../controller';

/**
 * 面板成员适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IPanelItemProvider
 */
export interface IPanelItemProvider {
  /**
   * 面板成员组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建面板成员控制器
   *
   * @author lxm
   * @date 2023-04-27 06:06:03
   * @param {IPanelItem} panelItem 面板成员模型
   * @param {PanelController} panel 面板控制器
   * @param {(PanelItemController | undefined)} parent 父容器控制器
   * @return {*}  {Promise<PanelItemController>}
   */
  createController(
    panelItem: IPanelItem,
    panel: IPanelController,
    parent: IPanelItemContainerController | undefined,
  ): Promise<IPanelItemController>;

  // todo 类型接口
}
