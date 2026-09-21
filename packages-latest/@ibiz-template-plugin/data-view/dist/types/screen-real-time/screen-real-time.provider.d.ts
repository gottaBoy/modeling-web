import { ISpan } from '@ibiz/model-core';
import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ScreenRealTimeController } from './screen-real-time.controller';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export declare class ScreenRealTimeProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ISpan, parentController: IEditorContainerController): Promise<ScreenRealTimeController>;
}
