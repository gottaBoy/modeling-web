import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IEditor } from '@ibiz/model-core';
import { DateRangeSelectEditorController } from './date-range-select.controller';

export class DateRangeSelectProvider implements IEditorProvider {
  formEditor: string = 'IBizDateRangeSelect';

  gridEditor: string = 'IBizDateRangeSelect';

  async createController(
    editorModel: IEditor,
    parentController: IEditorContainerController,
  ): Promise<DateRangeSelectEditorController> {
    const c = new DateRangeSelectEditorController(
      editorModel,
      parentController,
    );
    await c.init();
    return c;
  }
}
