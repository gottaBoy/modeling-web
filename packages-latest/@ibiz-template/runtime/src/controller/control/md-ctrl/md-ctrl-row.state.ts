import {
  IButtonContainerState,
  IMobMDCtrlController,
  IMobMDCtrlRowState,
} from '../../../interface';
import { ControlVO } from '../../../service';

/**
 * 多数据部件行状态
 *
 * @author chitanda
 * @date 2023-06-19 18:06:44
 * @export
 * @class MobMDCtrlRowState
 */
export class MobMDCtrlRowState implements IMobMDCtrlRowState {
  /**
   * 界面行为状态，key 为界面行为组标识
   *
   * @author chitanda
   * @date 2023-06-19 18:06:27
   * @type {{ [p: string]: IButtonContainerState }}
   */
  readonly uaColStates: { [p: string]: IButtonContainerState } = {};

  /**
   * Creates an instance of MDCtrlRowState.
   *
   * @author chitanda
   * @date 2023-06-19 18:06:12
   * @param {ControlVO} data 行数据
   * @param {IMobMDCtrlController} controller 多数据部件控制器
   */
  constructor(
    public data: ControlVO,
    public controller: IMobMDCtrlController,
  ) {
    this.data = data;
  }
}
