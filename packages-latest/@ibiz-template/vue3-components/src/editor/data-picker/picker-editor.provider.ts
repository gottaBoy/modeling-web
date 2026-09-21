import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IPicker } from '@ibiz/model-core';
import { PickerEditorController } from './picker-editor.controller';

/**
 * 数据选择器编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class DataPickerEditorProvider
 * @implements {EditorProvider}
 */
export class DataPickerEditorProvider implements IEditorProvider {
  formEditor: string;

  gridEditor: string;

  constructor(editorType: string) {
    let componentName = 'IBizPicker';
    switch (editorType) {
      case 'PICKEREX_TRIGGER':
        componentName = 'IBizPickerDropDown';
        break;
      case 'PICKEREX_LINKONLY':
        componentName = 'IBizPickerLink';
        break;
      case 'ADDRESSPICKUP':
      case 'ADDRESSPICKUP_AC':
      case 'MOBMPICKER':
        componentName = 'IBizMPicker';
        break;
      case 'PICKEREX_DROPDOWNVIEW':
      case 'PICKEREX_DROPDOWNVIEW_LINK':
      case 'MOBPICKER_DROPDOWNVIEW':
        componentName = 'IBizPickerSelectView';
        break;
      case 'PICKUPVIEW':
        componentName = 'IBizPickerEmbedView';
        break;
      case 'TRANSFER_PICKER':
        componentName = 'IBizTransferPicker';
        break;
      default:
    }
    this.formEditor = componentName;
    this.gridEditor = componentName;
  }

  async createController(
    editorModel: IPicker,
    parentController: IEditorContainerController,
  ): Promise<PickerEditorController> {
    const c = new PickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
