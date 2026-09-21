/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq, findIndex, isArray } from 'lodash-es';
import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';

/**
 * 比较数组或对象是否存在某个属性的值
 *
 * @author zk
 * @date 2023-06-15 09:06:37
 * @export
 * @class HelperHaCtrl
 * @extends {HelperBase}
 */
export class HelperEqPropertyValue extends HelperBase {
  constructor(hbs: IData) {
    super(hbs, 'eqPropertyValue');
  }

  onExecute(
    obj: unknown[] | unknown,
    key: string,
    val: unknown,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    // 数组
    let bol = false;
    if (isArray(obj)) {
      bol = !eq(
        findIndex(obj, o => eq((o as any)[key], val)),
        -1,
      );
    } else {
      bol =
        // eslint-disable-next-line no-prototype-builtins
        (obj as object).hasOwnProperty(key) &&
        (bol = eq((obj as any)[key], val));
    }
    return HelperUtil.handleJudgmentExecute(this, bol, options);
  }
}
