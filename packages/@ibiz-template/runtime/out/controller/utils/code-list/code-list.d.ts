import { IAppCodeList } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
export type useCalcOrModeType = {
    getSelectArray: (value: string | number | Array<string | number>, codeList: IAppCodeList | undefined, codeListItem: readonly CodeListItem[], valueSeparator: string, codeItemValueNumber: boolean | undefined) => (string | number)[] | undefined;
    setSelectArray: (val: Array<string | number>, codeListItem: readonly CodeListItem[], valueSeparator: string) => null | string | number | string[] | number[];
};
export interface ICodeListSelection {
    /**
     * 获取选中项
     *
     * @author zhanghengfeng
     * @date 2024-08-16 19:08:47
     * @param {(Array<string | number>)} oldValue
     * @param {(Array<string | number>)} value
     * @param {readonly} items
     * @param {*} CodeListItem
     * @param {*} []
     * @param {readonly} codeListItems
     * @param {*} CodeListItem
     * @param {*} []
     * @return {*}  {(Array<string | number>)}
     */
    getSelection(oldValue: Array<string | number>, value: Array<string | number>, items: readonly CodeListItem[], codeListItems: readonly CodeListItem[]): Array<string | number>;
    /**
     * 获取选中值
     *
     * @author zhanghengfeng
     * @date 2024-08-16 19:08:56
     * @param {(Array<string | number>)} value
     * @return {*}  {(Array<string | number>)}
     */
    getSelectionValue(value: Array<string | number>): Array<string | number>;
}
/**
 * 计算阈值范围
 *
 * @export
 * @param {CodeListItem[]} codelist
 * @param {number} value
 * @return {*}  {(CodeListItem | undefined)}
 */
export declare function calcThresholdRange(codelist: readonly CodeListItem[], value: number): CodeListItem | undefined;
/**
 *   代码表或模式计算
 *
 * @author fangZhiHao
 * @date 2024-07-30 13:07:51
 * @export
 * @param {string} orMode
 * @param {string} valueType
 * @return {*}  {({
 *   getSelectArray: (
 *     value: string | number,
 *     codeList: IAppCodeList | undefined,
 *     codeListItem: readonly CodeListItem[],
 *     valueSeparator: string,
 *     codeItemValueNumber: boolean,
 *   ) => (string | number)[] | undefined;
 *   setSelectArray: (
 *     val: Array<string | number>,
 *     codeListItem: readonly CodeListItem[],
 *     valueSeparator: string,
 *   ) => null | string | number | string[] | number[];
 * })}
 */
export declare function useCalcOrMode(orMode: string, valueType?: string): useCalcOrModeType;
/**
 * 获取代码表选中项
 *
 * @author zhanghengfeng
 * @date 2024-08-16 19:08:27
 * @export
 * @param {string} allItemsValue
 * @return {*}  {ICodeListSelection}
 */
export declare function useCodeListSelection(allItemsValue: string): ICodeListSelection;
//# sourceMappingURL=code-list.d.ts.map