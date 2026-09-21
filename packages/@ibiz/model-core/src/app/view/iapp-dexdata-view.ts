import { IAppDEView } from './iapp-deview';
import { IControlXDataContainer } from '../../control/icontrol-xdata-container';

/**
 *
 * @export
 * @interface IAppDEXDataView
 */
export interface IAppDEXDataView extends IAppDEView, IControlXDataContainer {
  /**
   * 数据能力部件名称
   * @type {string}
   * 来源  getXDataControlName
   */
  xdataControlName?: string;
}
