import {
  IPortletState,
  ILayoutState,
  IPortletClass,
  IButtonContainerState,
} from '../../../../../interface';

/**
 *  门户部件控件状态
 *
 * @export
 * @class PortletPartState
 */
export class PortletPartState implements IPortletState {
  visible: boolean = true;

  keepAlive: boolean = false;

  layout: ILayoutState = {
    width: '',
    height: '',
    extraStyle: {},
    extraClass: [],
    contentStyle: {},
  };

  class: IPortletClass = {
    container: [],
    containerDyna: [],
  };

  /**
   * 上下文
   *
   * @author zzq
   * @date 2024-04-25 16:04:24
   * @type {IContext}
   */
  context!: IContext;

  /**
   * 界面行为组状态
   *
   * @type {(IButtonContainerState | null)}
   * @memberof PortletPartState
   */
  actionGroupState: IButtonContainerState | null = null;

  /**
   * 门户标题
   *
   * @type {string | undefined}
   * @memberof PortletPartState
   */
  title: string | undefined;

  /**
   * @description 是否高亮
   * @type {boolean}
   * @memberof PortletPartState
   */
  hightLight: boolean = false;
}
