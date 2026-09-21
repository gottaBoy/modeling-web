import { CondType } from './cond-type';
import { PSModelGroupCondBase } from './ps-model-group-cond-base';
import { PSModelSingleCondBase } from './ps-model-single-cond-base';

/**
 * 模型条件引擎辅助对象
 *
 * @export
 * @abstract
 * @class PSModelCondEngineBase
 */
export abstract class PSModelCondEngineBase {
  /**
   * 根分组条件
   *
   * @private
   * @type {(PSModelGroupCondBase | null)}
   * @memberof PSModelCondEngineBase
   */
  private psModelGroupCondBase: PSModelGroupCondBase | null = null;

  /**
   * 解析条件
   *
   * @param {IData[]} obj
   * @memberof PSModelCondEngineBase
   */
  parse(obj: unknown[]): void {
    if (obj instanceof Array) {
      const psModelGroupCondBase: PSModelGroupCondBase =
        this.createPSModelGroupCond();
      psModelGroupCondBase.parse(obj);
      this.psModelGroupCondBase = psModelGroupCondBase;
    }
  }

  /**
   * 测试项
   *
   * @protected
   * @param {string} strCondOp
   * @param {*} objValue
   * @param {*} objCondValue
   * @return {*}  {boolean}
   * @memberof PSModelCondEngineBase
   */
  protected testSingleCond(
    strCondOp: string,
    objValue: string | number,
    objCondValue: string | number,
  ): boolean {
    try {
      if (CondType.CONDOP_ISNULL === strCondOp) {
        return objValue == null;
      }

      if (CondType.CONDOP_ISNOTNULL === strCondOp) {
        return objValue != null;
      }

      if (
        CondType.CONDOP_EQ === strCondOp ||
        CondType.CONDOP_ABSEQ === strCondOp ||
        CondType.CONDOP_GT === strCondOp ||
        CondType.CONDOP_GTANDEQ === strCondOp ||
        CondType.CONDOP_LT === strCondOp ||
        CondType.CONDOP_LTANDEQ === strCondOp ||
        CondType.CONDOP_NOTEQ === strCondOp
      ) {
        // 特殊处理，如果值为空，直接返回false
        if (objValue == null || objCondValue == null) {
          return false;
        }
        // 大小比较
        let nRet = -1;
        // eslint-disable-next-line eqeqeq
        if (objValue == objCondValue) {
          nRet = 0;
        } else if (objValue > objCondValue) {
          nRet = 1;
        }
        if (
          CondType.CONDOP_EQ === strCondOp ||
          CondType.CONDOP_ABSEQ === strCondOp
        ) {
          return nRet === 0;
        }
        if (CondType.CONDOP_GT === strCondOp) {
          return nRet > 0;
        }
        if (CondType.CONDOP_GTANDEQ === strCondOp) {
          return nRet >= 0;
        }
        if (CondType.CONDOP_LT === strCondOp) {
          return nRet < 0;
        }
        if (CondType.CONDOP_LTANDEQ === strCondOp) {
          return nRet <= 0;
        }
        if (CondType.CONDOP_NOTEQ === strCondOp) {
          return nRet !== 0;
        }
      }

      if (CondType.CONDOP_LIKE === strCondOp) {
        if (objValue != null && objCondValue != null) {
          return (
            objValue
              .toString()
              .toUpperCase()
              .indexOf(objCondValue.toString().toUpperCase()) !== -1
          );
        }
        return false;
      }

      if (CondType.CONDOP_LEFTLIKE === strCondOp) {
        if (objValue != null && objCondValue != null) {
          return (
            objValue
              .toString()
              .toUpperCase()
              .indexOf(objCondValue.toString().toUpperCase()) === 0
          );
        }
        return false;
      }
    } catch (err) {
      ibiz.log.error(err);
    }
    return false;
  }

  /**
   * 创建分组
   *
   * @protected
   * @abstract
   * @return {*}  {PSModelGroupCondBase}
   * @memberof PSModelCondEngineBase
   */
  protected abstract createPSModelGroupCond(): PSModelGroupCondBase;

  /**
   * 创建逻辑项
   *
   * @protected
   * @abstract
   * @return {*}  {PSModelSingleCondBase}
   * @memberof PSModelCondEngineBase
   */
  protected abstract createPSModelSingleCond(): PSModelSingleCondBase;

  /**
   * 获取根分组条件
   *
   * @return {*}  {PSModelGroupCondBase}
   * @memberof PSModelCondEngineBase
   */
  getPSModelGroupCondBase(): PSModelGroupCondBase {
    return this.psModelGroupCondBase!;
  }
}
