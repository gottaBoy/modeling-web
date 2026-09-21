import { IApiDataViewExpViewState } from '../../../api';
import { IExpViewState } from './i-exp-view.state';

/**
 * @description 实体卡片视图导航视图UI状态
 * @export
 * @interface IDataViewExpViewState
 * @extends {IExpViewState}
 * @extends {IApiDataViewExpViewState}
 */
export interface IDataViewExpViewState
  extends IExpViewState,
    IApiDataViewExpViewState {}
