import { IDEForm } from '@ibiz/model-core';
import { IFormEvent } from '../../event';
import { IFormState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiFormController } from '../../../api';
import { IViewController } from '../view';
import { IFormDetailProvider } from '../../../provider';
import { AppCounter } from '../../../../service';

/**
 * @description 表单控制器
 * @export
 * @interface IFormController
 * @extends {IControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export interface IFormController<
  T extends IDEForm = IDEForm,
  S extends IFormState = IFormState,
  E extends IFormEvent = IFormEvent,
> extends IControlController<T, S, E>,
    IApiFormController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IFormController
   */
  view: IViewController;

  /**
   * @description 所有表单项成员的适配器
   * @type {{ [key: string]: IFormDetailProvider }}
   * @memberof IFormController
   */
  providers: { [key: string]: IFormDetailProvider };

  /**
   * @description 计数器对象
   * @type {{ [key: string]: AppCounter }}
   * @memberof IFormController
   */
  counters: { [key: string]: AppCounter };
}
