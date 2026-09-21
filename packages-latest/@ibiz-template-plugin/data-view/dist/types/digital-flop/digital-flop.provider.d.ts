import { ISpan } from '@ibiz/model-core';
import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { DigitalFlopController } from './digital-flop.controller';

/**
 * @description 数字表
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export declare class DigitalFlopProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ISpan, parentController: IEditorContainerController): Promise<DigitalFlopController>;
}
