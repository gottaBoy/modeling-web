/**
 * 加载动画工具
 *
 * @author chitanda
 * @date 2022-08-17 17:08:25
 * @export
 * @interface ILoadingUtil
 */
export interface ILoadingUtil {
  /**
   * 显示全局加载动画
   *
   * @author chitanda
   * @date 2022-08-17 17:08:24
   * @param {string} [message]
   */
  show(message?: string): void;
  /**
   * 隐藏全局加载动画
   *
   * @author chitanda
   * @date 2022-08-17 17:08:48
   */
  hide(): void;
  /**
   * 显示顶部全局加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:18
   */
  showRedirect(): void;
  /**
   * 隐藏顶部全局加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:29
   */
  hideRedirect(): void;
}
