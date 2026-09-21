/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IStepper } from '@ibiz/model-core';
import { StepperEditorController } from './stepper-editor.controller';

/**
 * 步进器编辑器适配器
 *
 * @export
 * @class StepperEditorProvider
 * @implements {EditorProvider}
 */
export class StepperEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizStepper';

  gridEditor: string = 'IBizStepper';

  async createController(
    editorModel: IStepper,
    parentController: IEditorContainerController,
  ): Promise<StepperEditorController> {
    const c = new StepperEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
