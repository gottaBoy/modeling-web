import { IApiEditView3State } from '../../../api';
import { IEditViewState } from './i-edit-view.state';

/**
 * @description 实体编辑视图（分页关系）UI状态
 * @export
 * @interface IEditView3State
 * @extends {IEditViewState}
 * @extends {IApiEditView3State}
 */
export interface IEditView3State extends IEditViewState, IApiEditView3State {
  /**
   * 视图路由导航参数
   * @author lxm
   * @date 2023-06-21 07:09:07
   * @type {string}
   */
  srfnav?: string;
}
