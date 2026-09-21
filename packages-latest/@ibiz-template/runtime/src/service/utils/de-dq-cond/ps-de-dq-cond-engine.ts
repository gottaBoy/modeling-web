import { isEmpty, isNil } from 'ramda';
import { SearchFilter } from '../search-filter/search-filter';
import { CondType } from './cond-type';
import { PSModelCondBase } from './ps-model-cond-base';
import { PSModelCondEngineBase } from './ps-model-cond-engine-base';
import { PSDEDQGroupCond } from './ps-model-group-cond';
import { PSModelGroupCondBase } from './ps-model-group-cond-base';
import { PSDEDQSingleCond } from './ps-model-single-cond';
import { PSModelSingleCondBase } from './ps-model-single-cond-base';

/**
 * 实体查询条件引擎
 *
 * @author chitanda
 * @date 2022-08-17 23:08:58
 * @export
 * @class PSDEDQCondEngine
 * @extends {PSModelCondEngineBase}
 */
export class PSDEDQCondEngine extends PSModelCondEngineBase {
  /**
   * 数据上下文
   *
   * @static
   * @memberof PSDEDQCondEngine
   */
  static readonly PARAMTYPE_DATACONTEXT = 'DATACONTEXT';

  /**
   * 网页请求上下文
   *
   * @static
   * @memberof PSDEDQCondEngine
   */
  static readonly PARAMTYPE_WEBCONTEXT = 'WEBCONTEXT';

  /**
   * 测试
   *
   * @param {IData} data 检测的数据
   * @param {SearchFilter} filter 过滤条件
   * @return {*}  {boolean}
   * @memberof PSDEDQCondEngine
   */
  public test(data: IData, filter: SearchFilter): boolean {
    return this.testCond(this.getPSModelGroupCondBase(), data, filter);
  }

  /**
   * 查询条件判断
   *
   * @author chitanda
   * @date 2022-08-17 23:08:11
   * @protected
   * @param {PSModelCondBase} cond
   * @param {IData} data
   * @param {SearchFilter} filter
   * @return {*}  {boolean}
   */
  protected testCond(
    cond: PSModelCondBase,
    data: IData,
    filter: SearchFilter,
  ): boolean {
    // 分组条件
    if (cond instanceof PSModelGroupCondBase) {
      // 获取子条件
      const list = cond.getChildPSModelCondBases();
      if (list == null || isEmpty(list)) {
        return !cond.isNotMode();
      }
      // 是否为「AND」
      const bAnd = CondType.CONDOP_AND === cond.getCondOp();
      let bRet = bAnd;
      for (let i = 0; i < list.length; i++) {
        const childCond = list[i];
        if (this.testCond(childCond, data, filter)) {
          if (!bAnd) {
            bRet = true;
            break;
          }
        } else if (bAnd) {
          bRet = false;
          break;
        }
      }
      if (cond.isNotMode()) {
        return !bRet;
      }
      return bRet;
    }
    // 逻辑项
    if (cond instanceof PSModelSingleCondBase) {
      if (isEmpty(cond.getParam())) {
        ibiz.log.warn(ibiz.i18n.t('runtime.service.noAttributeName'), cond);
      }
      const objValue = data[cond.getParam().toLowerCase()];
      let objCondValue = null;
      const valType = cond.getValueType();
      const val = cond.getValue();
      if (valType != null && !isEmpty(valType)) {
        if (isEmpty(val)) {
          ibiz.log.warn(ibiz.i18n.t('runtime.service.noContextParameterName'));
        }
        // 网页请求上下文
        if (PSDEDQCondEngine.PARAMTYPE_WEBCONTEXT === valType) {
          objCondValue = filter.data[val.toLowerCase()];
        }
        // 值类型为数据上下文
        else if (PSDEDQCondEngine.PARAMTYPE_DATACONTEXT === valType) {
          // 从过滤条件中获取条件值
          objCondValue = filter.getValue(val.toLowerCase());
        }
      } else {
        objCondValue = cond.getValue();
      }
      // 无值时忽略
      if (cond.getIgnoreEmpty()) {
        if (isNil(objCondValue)) {
          return true;
        }
      }
      // 进行值判断
      return this.testSingleCond(cond.getCondOp(), objValue, objCondValue);
    }
    ibiz.log.warn(
      ibiz.log.warn(ibiz.i18n.t('runtime.service.conditionalObjects')),
      cond,
    );
    return false;
  }

  protected createPSModelSingleCond(): PSModelSingleCondBase {
    return new PSDEDQSingleCond();
  }

  protected createPSModelGroupCond(): PSModelGroupCondBase {
    return new PSDEDQGroupCond();
  }
}
