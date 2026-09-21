import { RuntimeError } from '@ibiz-template/core';
import { isEmpty, isNil } from 'ramda';
import { IDataEntity } from '../../../interface';

/**
 * 判断数据主键是否存在，不存在抛出异常
 *
 * @export
 * @param {string} funcName 执行方法名称
 * @param {IDataEntity} entity 判断数据
 * @return {*}  {boolean}
 */
export function isExistSrfKey(funcName: string, entity: IDataEntity): boolean {
  if (entity != null) {
    const { srfkey } = entity;
    if (!isNil(srfkey) && !isEmpty(srfkey)) {
      return true;
    }
  }
  throw new RuntimeError(
    ibiz.i18n.t('runtime.service.processedWithout', { funcName }),
  );
}

/**
 * 判断缓存 srfsessionid 是否存在，不存在抛异常
 *
 * @export
 * @param {string} funcName 执行方法名称
 * @param {IContext} context 上下文
 * @return {*}  {boolean}
 */
export function isExistSessionId(funcName: string, context: IContext): boolean {
  const { srfsessionid } = context;
  if (!isNil(srfsessionid) && !isEmpty(srfsessionid)) {
    return true;
  }
  throw new RuntimeError(
    ibiz.i18n.t('runtime.service.noExistProcessed', { funcName }),
  );
}
