/**
 * @description 界面遮罩参数接口
 * @export
 * @interface IApiMaskOption
 */
export interface IApiMaskOption {
  /**
   * @description 遮罩模式
   * @type {('BLANK' | 'MASK')} 空白模式：界面能查看，无蒙层，无遮罩文字；遮罩模式：界面无法查看，有蒙层，有遮罩文字
   * @memberof IApiMaskOption
   */
  mode: 'BLANK' | 'MASK';
  /**
   * @description 遮罩显示文本，支持${context.xxxx}和${params.xxx}的写法
   * @type {string}
   * @memberof IApiMaskOption
   */
  maskInfo?: string;
}
