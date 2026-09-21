/**
 * @description 应用上下文处理接口
 * @export
 * @interface IIBizContext
 * @extends {IContext}
 */
export interface IIBizContext extends IContext {
  /**
   * @description 返回自身的上下文，独有的和与父有差异的
   * @returns {*}  {IData}
   * @memberof IIBizContext
   */
  getOwnContext(): IData;

  /**
   * @description 销毁当前上下文
   * @memberof IIBizContext
   */
  destroy(): void;

  /**
   * @description 克隆当前上下文
   * @returns {*}  {IContext}
   * @memberof IIBizContext
   */
  clone(): IContext;

  /**
   * @description 深度克隆
   * @return {*}  {IData}
   * @memberof IIBizContext
   */
  deepClone(): IData;

  /**
   * @description 在不改变对象引用的情况下，重置上下文，等效于重新实例化，但是引用不变
   * @param {IData} [context] 默认值
   * @param {IContext} [parent] 父上下文
   * @memberof IIBizContext
   */
  reset(context?: IData, parent?: IContext): void;
}
