import { RuntimeError } from '@ibiz-template/core';
import { CondType } from './cond-type';
import { PSModelCondBase } from './ps-model-cond-base';
import { PSModelSingleCondBase } from './ps-model-single-cond-base';

/**
 * 逻辑组
 *
 * @export
 * @class PSModelGroupCondBase
 * @extends {PSModelCondBase}
 */
export class PSModelGroupCondBase extends PSModelCondBase {
  /**
   * 子条件项
   *
   * @private
   * @type {PSModelCondBase[]}
   * @memberof PSModelGroupCondBase
   */
  private childCondList: PSModelCondBase[] = [];

  /**
   * 是否取反
   *
   * @private
   * @memberof PSModelGroupCondBase
   */
  private bNotMode = false;

  /**
   * 解析分组条件
   *
   * @param {unknown[]} arr
   * @memberof PSModelGroupCondBase
   */
  parse(arr: unknown[]): void {
    const nCount: number = arr.length;
    // 条件取反起始
    let bNotStart = true;
    // 条件参数起始
    let bOpStart = true;
    // 参数条件
    let bCondStart = false;
    for (let i = 0; i < nCount; i++) {
      // 判断是否取反
      if (bNotStart && bOpStart) {
        const strText = arr[i];
        if (strText === '!') {
          this.setNotMode(true);
          bNotStart = false;
          continue;
        }
      }
      // 设置判断条件是「AND」or「OR」
      if (bOpStart) {
        const strText = arr[i];
        this.setCondOp(strText as string);
        bOpStart = false;
        bNotStart = false;
        bCondStart = true;
        continue;
      }
      // 设置子条件组
      if (bCondStart) {
        // 需要是数组
        const list = arr[i];
        if (list instanceof Array) {
          // 判断操作符号
          list.forEach(item => {
            if (item.length > 0) {
              const strText: string = item[0].toString();
              if (
                strText === '!' ||
                CondType.CONDOP_OR === strText ||
                CondType.CONDOP_AND === strText
              ) {
                const child: PSModelGroupCondBase = new PSModelGroupCondBase();
                child.parse(item);
                this.childCondList.push(child);
              } else {
                const child: PSModelSingleCondBase =
                  new PSModelSingleCondBase();
                child.parse(item);
                this.childCondList.push(child);
              }
            }
          });
        } else {
          throw new RuntimeError(ibiz.i18n.t('runtime.service.mustArray'));
        }
      }
    }
  }

  setNotMode(bNotMode: boolean): void {
    this.bNotMode = bNotMode;
  }

  isNotMode(): boolean {
    return this.bNotMode;
  }

  getChildPSModelCondBases(): PSModelCondBase[] {
    return this.childCondList;
  }
}
