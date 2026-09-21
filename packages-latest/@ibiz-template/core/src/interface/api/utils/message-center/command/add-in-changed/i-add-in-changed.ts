/**
 * @description 添加变更
 * @export
 * @interface IAddInChanged
 */
export interface IAddInChanged {
  /**
   * @description 标题
   * @type {string}
   * @memberof IAddInChanged
   */
  title: string;
  /**
   * @description 内容
   * @type {string}
   * @memberof IAddInChanged
   */
  content: string;
  /**
   * @description 消息类型
   * @type {string}
   * @memberof IAddInChanged
   */
  message_type: string;
}
