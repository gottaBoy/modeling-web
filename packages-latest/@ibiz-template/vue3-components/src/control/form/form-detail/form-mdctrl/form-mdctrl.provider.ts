import { ModelError } from '@ibiz-template/core';
import {
  FormController,
  FormMDCtrlController,
  FormMDCtrlFormController,
  FormMDCtrlMDController,
  FormMDCtrlRepeaterController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormMDCtrl } from '@ibiz/model-core';
/**
 * 表单多数据部件适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormMDCtrlProvider
 * @implements {EditorProvider}
 */
export class FormMDCtrlProvider implements IFormDetailProvider {
  component: string = 'IBizFormMDCtrl';

  async createController(
    detailModel: IDEFormMDCtrl,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormMDCtrlController> {
    let c;
    switch (detailModel.contentType) {
      case 'LIST':
      case 'GRID':
      case 'DATAVIEW':
        c = new FormMDCtrlMDController(detailModel, form, parent);
        break;
      case 'FORM':
        c = new FormMDCtrlFormController(detailModel, form, parent);
        break;
      case 'REPEATER':
        c = new FormMDCtrlRepeaterController(detailModel, form, parent);
        break;
      default:
        throw new ModelError(
          detailModel,
          `${ibiz.i18n.t('control.form.formMDctrl.errorMessage', {
            contentType: detailModel.contentType,
          })}`,
        );
    }
    await c.init();
    return c;
  }
}
