import { IPanelItemContainerController } from './i-panel-item-container.controller';

/**
 * 面板成员数据父容器控制器接口
 * @author lxm
 * @date 2023-05-24 07:11:30
 * @export
 * @interface IPanelDataContainerController
 */
export interface IPanelDataContainerController
  extends IPanelItemContainerController {
  isDataContainer: true;

  /**
   * 容器数据
   * @author lxm
   * @date 2023-07-15 11:23:37
   * @type {IData}
   */
  data: IData;

  /**
   * 设置面板数据的值
   *
   * @param {string} name 要设置的数据的属性名称
   * @param {unknown} value 要设置的值
   */
  setDataValue(name: string, value: unknown): Promise<void>;
}
