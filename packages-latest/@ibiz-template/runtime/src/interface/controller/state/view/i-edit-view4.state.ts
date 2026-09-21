import { IApiEditView4State } from '../../../api';
import { IEditViewState } from './i-edit-view.state';

/**
 * @description 实体编辑视图（上下关系）UI状态
 * @export
 * @interface IEditView4State
 * @extends {IEditViewState}
 * @extends {IApiEditView4State}
 */
export interface IEditView4State extends IEditViewState, IApiEditView4State {
  /**
   * 视图路由导航参数
   * @author lxm
   * @date 2023-06-21 07:09:07
   * @type {string}
   */
  srfnav?: string;
}
