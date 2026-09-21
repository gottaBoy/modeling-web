import { IApiFormButtonState } from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * 表单按钮状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export class FormButtonState
  extends FormDetailState
  implements IApiFormButtonState
{
  /**
   * 加载中
   * @author lxm
   * @date 2023-07-21 10:11:21
   * @type {boolean}
   */
  loading: boolean = false;
}
