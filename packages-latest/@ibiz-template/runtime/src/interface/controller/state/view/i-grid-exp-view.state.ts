import { IApiGridExpViewState } from '../../../api';
import { IExpViewState } from './i-exp-view.state';

/**
 * @description 实体表格导航视图UI状态
 * @export
 * @interface IGridExpViewState
 * @extends {IExpViewState}
 * @extends {IApiGridExpViewState}
 */
export interface IGridExpViewState
  extends IExpViewState,
    IApiGridExpViewState {}
