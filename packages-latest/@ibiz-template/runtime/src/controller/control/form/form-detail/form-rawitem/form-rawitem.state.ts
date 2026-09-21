import { IApiFormRawItemState } from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * @description 表单直接内容状态
 * @export
 * @class FormRawItemState
 * @extends {FormDetailState}
 * @implements {IApiFormRawItemState}
 */
export class FormRawItemState
  extends FormDetailState
  implements IApiFormRawItemState {}
