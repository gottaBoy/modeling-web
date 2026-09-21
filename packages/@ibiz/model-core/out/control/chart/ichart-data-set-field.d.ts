import { IChartObject } from './ichart-object';
/**
 *
 * @export
 * @interface IChartDataSetField
 */
export interface IChartDataSetField extends IChartObject {
    /**
     * 分组模式
     * @type {string}
     * 来源  getGroupMode
     */
    groupMode?: string;
    /**
     * 代码表对象
     *
     * @type {string}
     * 来源  getPSCodeList
     */
    codeListId?: string;
    /**
     * 分组属性
     * @type {boolean}
     * 来源  isGroupField
     */
    groupField?: boolean;
}
