import { PSModelCondBase } from './ps-model-cond-base';

/**
 * 逻辑项
 *
 * @author chitanda
 * @date 2022-08-17 23:08:20
 * @export
 * @class PSModelSingleCondBase
 * @extends {PSModelCondBase}
 */
export class PSModelSingleCondBase extends PSModelCondBase {
  /**
   * 值
   *
   * @private
   * @type {(string | null)}
   * @memberof PSModelSingleCondBase
   */
  private strValue?: string;

  /**
   * 值类型
   *
   * @private
   * @type {string}
   * @memberof PSModelSingleCondBase
   */
  private strValueType?: string;

  /**
   * 参数
   *
   * @private
   * @type {string}
   * @memberof PSModelSingleCondBase
   */
  private strParam?: string;

  /**
   * 参数类型
   *
   * @private
   * @type {string}
   * @memberof PSModelSingleCondBase
   */
  private strParamType?: string;

  /**
   * 忽略空值
   *
   * @author tony001
   * @date 2025-03-13 18:03:06
   * @private
   * @type {boolean}
   */
  private ignoreEmpty?: boolean;

  /**
   * 编译条件
   *
   * @author chitanda
   * @date 2022-08-17 23:08:35
   * @param {unknown[]} arr
   */
  parse(arr: unknown[]): void {
    const nCount = arr.length;
    // 是否为条件起始
    let bOpStart = true;
    let bParamStart = false;
    let bValueStart = false;
    for (let i = 0; i < nCount; i++) {
      // 设置判断条件
      if (bOpStart) {
        const strText = arr[i];
        this.setCondOp(strText as string);
        bOpStart = false;
        bParamStart = true;
        continue;
      }
      // 设置参数标识
      if (bParamStart) {
        const strText = arr[i];
        this.setParam(strText as string);
        bParamStart = false;
        bValueStart = true;
        continue;
      }
      // 设置值
      if (bValueStart) {
        // 需要是对象
        const obj = arr[i];
        if (obj instanceof Object && !(obj instanceof Array)) {
          const data = obj as IData;
          // 设置值类型
          if (data.type != null) {
            this.setValueType(data.type.toString());
          }
          // 设置条件值
          if (data.value != null) {
            this.setValue(data.value.toString());
          }
          // 设置忽略空值输入
          if (data.ignoreEmpty != null) {
            this.setIgnoreEmpty(data.ignoreEmpty);
          }
        } else {
          this.setValue(obj as string);
        }
        break;
      }
    }
  }

  getValueType(): string {
    return this.strValueType!;
  }

  setValueType(strValueType: string): void {
    this.strValueType = strValueType;
  }

  getValue(): string {
    return this.strValue!;
  }

  setValue(strValue: string): void {
    this.strValue = strValue;
  }

  getParamType(): string {
    return this.strParamType!;
  }

  setParamType(strParamType: string): void {
    this.strParamType = strParamType;
  }

  getParam(): string {
    return this.strParam!;
  }

  setParam(strParam: string): void {
    this.strParam = strParam;
  }

  getIgnoreEmpty(): boolean {
    return this.ignoreEmpty!;
  }

  setIgnoreEmpty(ignoreEmpty: boolean): void {
    this.ignoreEmpty = ignoreEmpty;
  }
}
