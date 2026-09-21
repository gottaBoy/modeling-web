/* eslint-disable no-shadow */

/**
 * @description 预定义部件绘制器(后续部件级预置绘制器需在此处声明)
 * @export
 * @enum {number}
 */
export enum PredefinedControlRender {
  /**
   * 无数据绘制器标识
   */
  EMPTYPANEL = 'emptypanel',

  /**
   * 部件禁用遮罩层绘制器标识
   */
  DISABLEPANEL = 'disablepanel',
}
