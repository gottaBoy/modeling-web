import { IApiEditView2State } from '../../../api';
import { IEditViewState } from './i-edit-view.state';

/**
 * @description 实体编辑视图（左右关系）UI状态
 * @export
 * @interface IEditView2State
 * @extends {IEditViewState}
 * @extends {IApiEditView2State}
 */
export interface IEditView2State extends IEditViewState, IApiEditView2State {
  /**
   * 导航数据
   *
   * @author lxm
   * @date 2023-12-11 06:23:55
   * @type {string}
   */
  srfnav: string;
}
