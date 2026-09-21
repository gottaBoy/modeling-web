import { IApiOptViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体选项操作视图UI状态
 * @export
 * @interface IOptViewState
 * @extends {IViewState}
 * @extends {IApiOptViewState}
 */
export interface IOptViewState extends IViewState, IApiOptViewState {}
