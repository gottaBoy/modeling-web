import { IApiListViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体列表视图UI状态
 * @export
 * @interface IListViewState
 * @extends {IMDViewState}
 * @extends {IApiListViewState}
 */
export interface IListViewState extends IMDViewState, IApiListViewState {
  /**
   * 是否单选
   *
   * @author zk
   * @date 2023-05-26 05:05:02
   * @type {boolean}
   * @memberof IPickupGridViewState
   */
  singleSelect: boolean;

  /**
   * 多数据部件激活模式
   * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
   * @author lxm
   * @date 2023-05-22 09:52:44
   * @type {(number | 0 | 1 | 2)}
   */
  mdctrlActiveMode: number | 0 | 1 | 2;
}
