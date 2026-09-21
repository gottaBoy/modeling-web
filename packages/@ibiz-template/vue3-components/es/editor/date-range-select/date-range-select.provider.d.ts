import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IEditor } from '@ibiz/model-core';
import { DateRangeSelectEditorController } from './date-range-select.controller';
export declare class DateRangeSelectProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IEditor, parentController: IEditorContainerController): Promise<DateRangeSelectEditorController>;
}
