import { ISearchCond, ValueOP } from '@ibiz-template/runtime';
import { IAppBIReport, IDatePicker, IDropDownList, IEditor, IPicker } from '@ibiz/model-core';
import { ISchemaField } from '../interface';
/**
 * 不需要编辑器的操作符
 */
export declare const ExcludeOPs: string[];
/**
 * 过滤操作模式
 */
export declare const FilterModes: {
    valueOP: ValueOP;
    label: string;
}[];
/**
 * 类型映射操作符
 */
export declare const TypeToOPs: {
    [p: string]: ValueOP[];
};
/**
 * 类型映射编辑器
 */
export declare const TypeToEditor: {
    [p: string]: IEditor | IDropDownList | IPicker | IDatePicker;
};
/**
 * 获取编辑器模型
 *
 * @export
 * @param {ISchemaField} field Schema属性
 * @return {*}  {IEditor}
 */
export declare function getEditor(field: ISchemaField): IEditor;
/**
 * 获取过滤条件
 *
 * @export
 * @param {string} key
 * @param {IData} data
 * @return {*}  {(ISearchCond[] | undefined)}
 */
export declare function getSearchconds(report: IAppBIReport): ISearchCond[] | undefined;
