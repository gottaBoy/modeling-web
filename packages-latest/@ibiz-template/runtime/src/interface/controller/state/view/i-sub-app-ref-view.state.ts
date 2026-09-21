import { IApiSubAppRefViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体子应用引用视图UI状态
 * @export
 * @interface ISubAppRefViewState
 * @extends {IViewState}
 * @extends {IApiSubAppRefViewState}
 */
export interface ISubAppRefViewState
  extends IViewState,
    IApiSubAppRefViewState {}
