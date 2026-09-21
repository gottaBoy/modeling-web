import { IDEGridDataItem, IDEGridFieldColumn } from '@ibiz/model-core';
import { GridController } from './grid.controller';
/**
 * 根据json模型计算出表格列模型
 * @author lxm
 * @date 2024-01-02 10:27:40
 * @export
 * @param {IData} json
 * @param {SearchBarController} c
 * @return {*}  {ISearchBarFilter[]}
 */
export declare function calcColumnModelBySchema(json: IData, c: GridController): Promise<{
    degridColumns: IDEGridFieldColumn[];
    degridDataItems: IDEGridDataItem[];
} | undefined>;
//# sourceMappingURL=entity-schema.d.ts.map