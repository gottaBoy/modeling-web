import { IApiFormDruipartState } from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * 表单关系界面状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export class FormDruipartState
  extends FormDetailState
  implements IApiFormDruipartState
{
  /**
   * 关系界面组件绑的key，用来触发强制刷新
   *
   * @author lxm
   * @date 2022-09-15 20:09:21
   * @type {string}
   */
  viewComponentKey?: string;

  /**
   * 是否显示遮罩
   * @author lxm
   * @date 2023-07-28 04:11:57
   * @type {boolean}
   */
  showMask: boolean = false;
}
