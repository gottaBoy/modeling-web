import { IDESearchForm } from '@ibiz/model-core';
import { ISearchFormEvent } from '../../event';
import { ISearchFormState } from '../../state';
import { IFormController } from './i-form.controller';
import { IApiSearchFormController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 搜索表单控制器接口
 * @export
 * @interface ISearchFormController
 * @extends {IFormController<IDESearchForm, ISearchFormState, ISearchFormEvent>}
 * @extends {IApiSearchFormController<IDESearchForm, ISearchFormState>}
 */
export interface ISearchFormController
  extends IFormController<IDESearchForm, ISearchFormState, ISearchFormEvent>,
    IApiSearchFormController<IDESearchForm, ISearchFormState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof ISearchFormController
   */
  view: IViewController;

  /**
   * @description 搜索表单按钮回调
   * @returns {*}  {Promise<void>}
   * @memberof ISearchFormController
   */
  onSearchButtonClick(): Promise<void>;
}
