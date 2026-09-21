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
export declare class PSModelSingleCondBase extends PSModelCondBase {
    /**
     * 值
     *
     * @private
     * @type {(string | null)}
     * @memberof PSModelSingleCondBase
     */
    private strValue?;
    /**
     * 值类型
     *
     * @private
     * @type {string}
     * @memberof PSModelSingleCondBase
     */
    private strValueType?;
    /**
     * 参数
     *
     * @private
     * @type {string}
     * @memberof PSModelSingleCondBase
     */
    private strParam?;
    /**
     * 参数类型
     *
     * @private
     * @type {string}
     * @memberof PSModelSingleCondBase
     */
    private strParamType?;
    /**
     * 忽略空值
     *
     * @author tony001
     * @date 2025-03-13 18:03:06
     * @private
     * @type {boolean}
     */
    private ignoreEmpty?;
    /**
     * 编译条件
     *
     * @author chitanda
     * @date 2022-08-17 23:08:35
     * @param {unknown[]} arr
     */
    parse(arr: unknown[]): void;
    getValueType(): string;
    setValueType(strValueType: string): void;
    getValue(): string;
    setValue(strValue: string): void;
    getParamType(): string;
    setParamType(strParamType: string): void;
    getParam(): string;
    setParam(strParam: string): void;
    getIgnoreEmpty(): boolean;
    setIgnoreEmpty(ignoreEmpty: boolean): void;
}
//# sourceMappingURL=ps-model-single-cond-base.d.ts.map