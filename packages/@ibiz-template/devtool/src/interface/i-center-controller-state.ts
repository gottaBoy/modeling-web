export interface ICenterControllerState {
  /**
   * 是否显示
   * @author lxm
   * @date 2024-01-19 04:44:39
   * @type {boolean}
   */
  isShow: boolean;

  /**
   * 视图控制器列表变更刷新用的key
   * @author lxm
   * @date 2024-01-22 11:30:22
   * @type {string}
   */
  viewListRefreshKey: string;

  /**
   * 当前选中的视图控制器的id
   * @author lxm
   * @date 2024-01-22 02:19:49
   * @type {string}
   */
  selectedViewId: string | null;

  /**
   * 当前悬浮的视图控制器的id
   * @author lxm
   * @date 2024-01-22 02:19:49
   * @type {string}
   */
  hoverViewId: string | null;
}
