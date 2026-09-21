/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IDatePicker } from '@ibiz/model-core';
import { DatePickerEditorController } from './date-picker-editor.controller';

/**
 * 日期时间选择器编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class DatePickerEditorProvider
 * @implements {EditorProvider}
 */
export class DatePickerEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizDatePicker';

  gridEditor: string = 'IBizDatePicker';

  async createController(
    editorModel: IDatePicker,
    parentController: IEditorContainerController,
  ): Promise<DatePickerEditorController> {
    const c = new DatePickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
