/* eslint-disable no-shadow */
/**
 * 视图打开方式
 *
 * @author lxm
 * @date 2022-09-01 10:09:04
 * @export
 * @enum {number}
 */
export enum ViewMode {
  /**
   * 路由(默认)
   */
  ROUTE = 'ROUTE',
  /**
   * 模态路由
   */
  ROUTE_MODAL = 'ROUTE_MODAL',
  /**
   * 模态
   */
  MODAL = 'MODAL',
  /**
   * 抽屉
   */
  DRAWER = 'DRAWER',
  /**
   * 嵌入
   */
  EMBED = 'EMBED',
  /**
   * 气泡
   */
  POPOVER = 'POPOVER',
}
