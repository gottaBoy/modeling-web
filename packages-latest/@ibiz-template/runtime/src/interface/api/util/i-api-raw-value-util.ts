/**
 * @description 直接值工具
 * @export
 * @interface IApiRawValueUtil
 */
export interface IApiRawValueUtil {
  /**
   * @description 判断字符串是否为合法数值（支持整数及浮点数）
   * @param {string} str 字符串
   * @returns {*}  {boolean}
   * @memberof IApiRawValueUtil
   */
  isNumber(str: string): boolean;

  /**
   * @description 根据内容自动转换为对应基础类型（如 number、boolean 等）
   * @param {(string | undefined)} val 直接值
   * @returns {*}  {(number | boolean | string | undefined)}
   * @memberof IApiRawValueUtil
   */
  format(val: string | undefined): number | boolean | string | undefined;
}
