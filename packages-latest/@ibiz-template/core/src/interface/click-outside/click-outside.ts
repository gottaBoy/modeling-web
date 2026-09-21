/**
 * @description 可选配置参数
 * @export
 * @interface OnClickOutsideOptions
 */
export interface OnClickOutsideOptions {
  /**
   * @description 指定使用的window,不给就用默认的window
   * @type {Window}
   * @memberof OnClickOutsideOptions
   */
  window?: Window;
  /**
   * @description 指定需要忽略的元素，用于排除某些外部的元素
   * @type {HTMLElement[]}
   * @memberof OnClickOutsideOptions
   */
  ignore?: HTMLElement[];
  /**
   * @description 是否捕获内部元素。默认为是，内部元素不会触发回调。
   * @type {boolean}
   * @memberof OnClickOutsideOptions
   */
  capture?: boolean;
}

// 回调处理函数类型
export type OnClickOutsideHandler = (_evt: PointerEvent | MouseEvent) => void;

/**
 * @description OnClickOutside返回对象类型
 * @export
 * @interface OnClickOutsideResult
 */
export interface OnClickOutsideResult {
  /**
   * @description 停止监听，并移除相关监听事件
   * @memberof OnClickOutsideResult
   */
  stop: () => void;
  /**
   * @description 暂停监听
   * @memberof OnClickOutsideResult
   */
  pause: () => void;
  /**
   * @description 继续监听
   * @memberof OnClickOutsideResult
   */
  proceed: () => void;
}
