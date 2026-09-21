import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IDateRange } from '@ibiz/model-core';
import { DateRangeEditorController } from './date-range-editor.controller';

/**
 * 数值范围编辑器适配器
 *
 * @export
 * @class DateRangeEditorProvider
 * @implements {EditorProvider}
 */
export class DateRangeEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizDateRangePicker';

  gridEditor: string = 'IBizDateRangePicker';

  async createController(
    editorModel: IDateRange,
    parentController: IEditorContainerController,
  ): Promise<DateRangeEditorController> {
    const c = new DateRangeEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
