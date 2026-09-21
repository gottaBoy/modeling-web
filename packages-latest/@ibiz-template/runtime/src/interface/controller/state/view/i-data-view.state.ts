import { IApiDataViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体数据视图UI状态
 * @export
 * @interface IDataViewState
 * @extends {IMDViewState}
 * @extends {IApiDataViewState}
 */
export interface IDataViewState extends IMDViewState, IApiDataViewState {}
