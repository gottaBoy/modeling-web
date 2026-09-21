/**
 * 全局呈现容器
 *
 * @author chitanda
 * @date 2022-11-09 14:11:59
 * @export
 * @interface IOverlayContainer
 */
export interface IOverlayContainer {
  /**
   * 展示容器
   *
   * @author chitanda
   * @date 2022-11-09 14:11:10
   * @return {*}  {Promise<void>}
   */
  present(): Promise<void>;

  /**
   * 关闭容器
   *
   * @author chitanda
   * @date 2022-11-09 14:11:17
   * @param {unknown} [data]
   * @return {*}  {Promise<void>}
   */
  dismiss(data?: unknown): Promise<void>;

  /**
   * 等待容器关闭并返回返回值
   *
   * @author chitanda
   * @date 2022-11-09 14:11:21
   * @template T
   * @return {*}  {Promise<T>}
   */
  onWillDismiss<T = unknown>(): Promise<T>;
}
