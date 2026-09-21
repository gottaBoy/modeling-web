import { IControlXDataContainer } from './icontrol-xdata-container';

/**
 *
 * @export
 * @interface IControlMDataContainer
 */
export interface IControlMDataContainer extends IControlXDataContainer {
  /**
   * 启用快速建立
   * @type {boolean}
   * 来源  isEnableQuickCreate
   */
  enableQuickCreate?: boolean;

  /**
   * 支持查看数据
   * @type {boolean}
   * 来源  isEnableViewData
   */
  enableViewData?: boolean;

  /**
   * 数据选择视图
   * @type {boolean}
   * @default false
   * 来源  isPickupMode
   */
  pickupMode?: boolean;
}
