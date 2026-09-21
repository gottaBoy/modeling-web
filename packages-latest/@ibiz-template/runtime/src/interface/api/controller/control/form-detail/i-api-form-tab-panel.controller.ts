import { IApiFormTabPanelState } from '../../../state';
import { IApiFormDetailController } from './i-api-form-detail.controller';
/**
 * @description 表单分页部件控制器
 * @export
 * @interface IApiFormTabPanelController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormTabPanelController extends IApiFormDetailController {
  /**
   * @description 表单分页部件状态
   * @type {IApiFormTabPanelState}
   * @memberof IApiFormTabPanelController
   */
  state: IApiFormTabPanelState;

  /**
   * @description 切换激活分页
   * @param {string} tabId 分页标识
   * @memberof IApiFormTabPanelController
   */
  selectTab(tabId: string): void;
}
