import { IDEEditForm } from '@ibiz/model-core';
import { IDataAbilityParams } from '../../../common';
import { IEditFormEvent } from '../../event';
import { IEditFormState } from '../../state';
import { IFormController } from './i-form.controller';
import { IApiDataAbilityParams, IApiEditFormController } from '../../../api';
import { IViewController } from '../view';

export interface FormSaveParams
  extends IDataAbilityParams,
    IApiDataAbilityParams {
  /**
   * @description 保存之后是否不合并后台回来的数据
   * @type {boolean}
   * @memberof FormSaveParams
   */
  noFillBack?: boolean;

  /**
   * @description 是否静默校验
   * @type {boolean}
   * @memberof FormSaveParams
   */
  silentVerify?: boolean;
}

/**
 * 编辑表单控制器
 * @description 编辑表单控制器
 * @export
 * @interface IEditFormController
 * @extends {IFormController<IDEEditForm, IEditFormState, IEditFormEvent>}
 */
export interface IEditFormController
  extends IFormController<IDEEditForm, IEditFormState, IEditFormEvent>,
    IApiEditFormController<IDEEditForm, IEditFormState> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IEditFormController
   */
  view: IViewController;
  /**
   * @description 自动保存
   * @returns {*}  {Promise<void>}
   * @memberof IEditFormController
   */
  autoSave(): Promise<void>;

  /**
   * @description 立即执行自动保存
   * @returns {*}  {Promise<void>}
   * @memberof IEditFormController
   */
  immediateAutoSave(): Promise<void>;
}
