import { IApiPanelItemController } from './i-api-panel-item.controller';

/**
 * @description 容器类面板成员控制器接口
 * @export
 * @interface IApiPanelItemContainerController
 * @extends {IApiPanelItemController}
 */
export interface IApiPanelItemContainerController
  extends IApiPanelItemController {
  /**
   * @description 是否是数据父容器
   * @type {true}
   * @memberof IApiPanelItemContainerController
   */
  isDataContainer?: true;
}
