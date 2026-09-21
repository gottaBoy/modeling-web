import { IDeLogicContext, IDeLogicLinkCond } from '../../../interface';

/**
 * @description 实体逻辑连接条件
 * @export
 * @abstract
 * @class DELogicLinkCond
 * @implements {IDELogicLinkCond}
 */
export abstract class DELogicLinkCond implements IDeLogicLinkCond {
  /**
   * @description 条件判断
   * @abstract
   * @param {IDeLogicContext} ctx 实体逻辑执行上下文
   * @param {IContext} context 上下文
   * @param {IData} data 数据
   * @returns {*}  {boolean}
   * @memberof DELogicLinkCond
   */
  abstract test(ctx: IDeLogicContext, context: IContext, data: IData): boolean;
}
