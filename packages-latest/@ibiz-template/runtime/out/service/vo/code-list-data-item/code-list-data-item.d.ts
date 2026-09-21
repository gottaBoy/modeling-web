import { ISysImage, IAppCodeList } from '@ibiz/model-core';
import { CodeListItem } from '../../../interface';
export declare class CodeListDataItem implements CodeListItem {
    id: string;
    value: string | number;
    text: string;
    color?: string;
    bkcolor?: string;
    children?: CodeListItem[];
    textCls?: string;
    cls?: string;
    disableSelect?: boolean;
    sysImage?: ISysImage;
    data?: IData;
    tooltip?: string;
    userData?: string;
    beginValue?: number;
    endValue?: number;
    includeBeginValue?: boolean;
    includeEndValue?: boolean;
    /**
     * @description 原始后台数据
     * @type {IData}
     * @memberof CodeListDataItem
     */
    $origin: IData;
    /**
     * Creates an instance of CodeListDataItem.
     * @param {IAppCodeList} model
     * @param {(ITreeNodeData | undefined)} data
     * @param {{
     *       index: number;
     *       total: number;
     *     }} opts
     * @memberof CodeListDataItem
     */
    constructor(model: IAppCodeList, data: IData, opts: {
        index: number;
        total: number;
    });
}
//# sourceMappingURL=code-list-data-item.d.ts.map