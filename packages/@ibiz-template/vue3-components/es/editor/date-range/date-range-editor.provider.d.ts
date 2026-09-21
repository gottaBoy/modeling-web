import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IDateRange } from '@ibiz/model-core';
import { DateRangeEditorController } from './date-range-editor.controller';
/**
 * 数值范围编辑器适配器
 *
 * @export
 * @class DateRangeEditorProvider
 * @implements {EditorProvider}
 */
export declare class DateRangeEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IDateRange, parentController: IEditorContainerController): Promise<DateRangeEditorController>;
}
