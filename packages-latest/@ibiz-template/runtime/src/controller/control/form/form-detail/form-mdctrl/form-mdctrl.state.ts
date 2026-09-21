import {
  IApiFormMDCtrlState,
  IButtonContainerState,
} from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * @description 表单多数据部件状态（除多数据部件表单样式）
 * @export
 * @class FormMDCtrlState
 * @extends {FormDetailState}
 * @implements {IApiFormMDCtrlState}
 */
export class FormMDCtrlState
  extends FormDetailState
  implements IApiFormMDCtrlState
{
  /**
   * 界面行为组状态
   *
   * @type {(IButtonContainerState | null)}
   * @memberof PortletPartState
   */
  actionGroupState: IButtonContainerState | null = null;
}
