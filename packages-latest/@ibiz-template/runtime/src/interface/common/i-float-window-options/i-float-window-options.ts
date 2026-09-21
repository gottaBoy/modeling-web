/**
 * 全局悬浮窗口配置项
 *
 * @author chitanda
 * @date 2023-10-11 21:10:18
 * @export
 * @interface IFloatWindowOptions
 */
export interface IFloatWindowOptions {
  /**
   * 初始宽度，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 21:10:10
   * @type {number}
   */
  width?: number;
  /**
   * 初始高度，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 21:10:19
   * @type {number}
   */
  height?: number;
  /**
   * 最小宽度，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 22:10:18
   * @type {number}
   */
  minWidth?: number;
  /**
   * 最小高度，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 22:10:25
   * @type {number}
   */
  minHeight?: number;
  /**
   * 初始 x 坐标，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 21:10:29
   * @type {number}
   */
  x?: number;
  /**
   * 初始 y 坐标，单位 px
   *
   * @author chitanda
   * @date 2023-10-11 21:10:38
   * @type {number}
   */
  y?: number;
  /**
   * 附加样式，用于自定义样式
   *
   * @author chitanda
   * @date 2023-10-11 21:10:22
   * @type {string}
   */
  windowClass?: string;
  /**
   * 是否默认全屏
   *
   * @author chitanda
   * @date 2023-10-11 21:10:49
   * @type {boolean}
   */
  fullscreen?: boolean;
}
