/**
 * @description 实体方法处理状态
 * @export
 * @interface IMethodProcessState
 */
export interface IMethodProcessState {
  /**
   * @description 界面域标识
   * @type {string}
   * @memberof IMethodProcessState
   */
  srfsessionid: string;
  /**
   * @description 方法执行前后
   * @type {('BEFORE' | 'AFTER')}
   * @memberof IMethodProcessState
   */
  type: 'BEFORE' | 'AFTER';
  /**
   * @description 当前正在执行总数
   * @type {number}
   * @memberof IMethodProcessState
   */
  count?: number;
}
