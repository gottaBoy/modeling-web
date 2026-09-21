import { IApiFormPickupDataViewState } from '../../../api';
import { IPickupDataViewState } from './i-pickup-data-view.state';

/**
 * @description 实体表单选择数据视图（部件视图）UI状态
 * @export
 * @interface IFormPickupDataViewState
 * @extends {IPickupDataViewState}
 * @extends {IApiFormPickupDataViewState}
 */
export interface IFormPickupDataViewState
  extends IPickupDataViewState,
    IApiFormPickupDataViewState {}
