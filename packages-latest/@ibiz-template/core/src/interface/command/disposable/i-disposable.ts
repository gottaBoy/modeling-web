/**
 * @description 可释放的对象
 * @export
 * @interface IDisposable
 */
export interface IDisposable {
  /**
   * @description 释放对象持有的所有资源
   * @memberof IDisposable
   */
  dispose(): void;
}
