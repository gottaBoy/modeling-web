import { IDEFormPage } from '@ibiz/model-core';
import { FormGroupPanelController } from '../form-group-panel';
import { FormPageState } from './form-page.state';
import { IApiFormPageController } from '../../../../../interface';

/**
 * @description 表单分页控制器
 * @export
 * @class FormPageController
 * @extends {FormGroupPanelController<IDEFormPage>}
 * @implements {IApiFormPageController}
 */
export class FormPageController
  extends FormGroupPanelController<IDEFormPage>
  implements IApiFormPageController
{
  declare state: FormPageState;

  protected createState(): FormPageState {
    return new FormPageState(this.parent?.state);
  }
}
