import { GridController } from './grid.controller';
import { GridRowState } from './grid-row.state';
/**
 * 根据jsonschema初始化自定义表格模型
 *
 * @export
 * @param {GridController} c
 * @return {*}  {Promise<void>}
 */
export declare function initModelByEntitySchema(c: GridController): Promise<void>;
/**
 * 动态表格行编辑
 *
 * @export
 * @param {GridController} c
 * @param {GridRowState} row
 * @param {boolean} [editable]
 * @param {boolean} [_isSave=true]
 * @return {*}  {Promise<void>}
 */
export declare function switchRowEditDynamic(c: GridController, row: GridRowState, editable?: boolean, _isSave?: boolean): Promise<void>;
/**
 * 动态表格新建行
 *
 * @export
 * @param {GridController} c
 * @return {*}  {Promise<void>}
 */
export declare function newRowDynamic(c: GridController): Promise<void>;
//# sourceMappingURL=auto-grid.util.d.ts.map