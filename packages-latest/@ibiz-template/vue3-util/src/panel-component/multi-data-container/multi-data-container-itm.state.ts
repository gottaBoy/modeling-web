import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 多项数据容器项状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class MultiDataContainerItemState
 * @extends {PanelItemState}
 */
export class MultiDataContainerItemState extends PanelItemState {
  /**
   * 多项数据容器数据
   * @author lxm
   * @date 2023-07-14 12:07:45
   * @type {(IData | IData[])}
   */
  data: IData = {};
}
