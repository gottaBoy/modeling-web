import {
  IApiFormButtonListState,
  IButtonContainerState,
} from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * 表单按钮组状态
 *
 * @export
 * @class FormButtonListState
 * @extends {FormDetailState}
 */
export class FormButtonListState
  extends FormDetailState
  implements IApiFormButtonListState
{
  /**
   * 按钮组状态
   *
   * @type {IButtonContainerState}
   * @memberof FormButtonListState
   */
  buttonsState!: IButtonContainerState;
}
