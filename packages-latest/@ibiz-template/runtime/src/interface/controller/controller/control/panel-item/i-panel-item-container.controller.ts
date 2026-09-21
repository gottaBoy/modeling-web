import { IApiPanelItemContainerController } from '../../../../api';
import { IPanelController } from '../i-panel.controller';
import { IPanelItemController } from './i-panel-item.controller';

/**
 * @description 容器类面板成员控制器接口
 * @export
 * @interface IPanelItemContainerController
 * @extends {IPanelItemController}
 * @extends {IApiPanelItemContainerController}
 */
export interface IPanelItemContainerController
  extends IPanelItemController,
    IApiPanelItemContainerController {
  /**
   * @description 是否是数据父容器
   * @type {true}
   * @memberof IPanelItemContainerController
   */
  isDataContainer?: true;
  /**
   * @description 面板控制器
   * @type {IPanelController}
   * @memberof IPanelItemContainerController
   */
  panel: IPanelController;

  /**
   * @description 父容器控制器(除了根成员都存在)
   * @type {IPanelItemContainerController}
   * @memberof IPanelItemContainerController
   */
  parent?: IPanelItemContainerController;
}
