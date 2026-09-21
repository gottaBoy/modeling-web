import { IApiFormPageState } from '../../../../../interface';
import { FormGroupPanelState } from '../form-group-panel';

/**
 * @description 表单分页状态
 * @export
 * @class FormPageState
 * @extends {FormGroupPanelState}
 * @implements {IApiFormPageState}
 */
export class FormPageState
  extends FormGroupPanelState
  implements IApiFormPageState {}
