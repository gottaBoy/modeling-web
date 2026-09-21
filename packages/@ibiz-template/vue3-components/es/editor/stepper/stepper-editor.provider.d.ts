import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IStepper } from '@ibiz/model-core';
import { StepperEditorController } from './stepper-editor.controller';
/**
 * 步进器编辑器适配器
 *
 * @export
 * @class StepperEditorProvider
 * @implements {EditorProvider}
 */
export declare class StepperEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IStepper, parentController: IEditorContainerController): Promise<StepperEditorController>;
}
