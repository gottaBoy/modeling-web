import { IApiListExpViewState } from '../../../api';
import { IExpViewState } from './i-exp-view.state';

/**
 * @description 实体列表导航视图UI状态
 * @export
 * @interface IListExpViewState
 * @extends {IExpViewState}
 * @extends {IApiListExpViewState}
 */
export interface IListExpViewState
  extends IExpViewState,
    IApiListExpViewState {}
