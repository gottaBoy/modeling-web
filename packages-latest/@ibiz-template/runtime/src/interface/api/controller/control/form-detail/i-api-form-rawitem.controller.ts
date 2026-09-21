import { IApiFormRawItemState } from '../../../state';
import { IApiFormDetailController } from './i-api-form-detail.controller';
/**
 * @description 表单直接内容控制器
 * @export
 * @interface IApiFormRawItemController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormRawItemController extends IApiFormDetailController {
  /**
   * @description 表单直接内容状态
   * @type {IApiFormRawItemState}
   * @memberof IApiFormRawItemController
   */
  state: IApiFormRawItemState;
}
