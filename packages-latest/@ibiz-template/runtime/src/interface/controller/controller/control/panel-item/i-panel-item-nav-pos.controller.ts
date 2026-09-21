import { INavViewMsg } from '../../../common';
import { IPanelItemController } from './i-panel-item.controller';

/**
 * 导航占位控制器接口
 *
 * @author zk
 * @date 2023-07-11 09:07:42
 * @export
 * @interface INavPosController
 */
export interface IPanelItemNavPosController extends IPanelItemController {
  /**
   * 打开视图
   *
   * @author zk
   * @date 2023-07-11 09:07:56
   * @param {INavViewMsg} openViewMsg
   * @memberof INavPosController
   */
  openView(openViewMsg: INavViewMsg): void;
}
