import { IApiChartExpViewState } from '../../../api';
import { IExpViewState } from './i-exp-view.state';

/**
 * @description  实体图表导航视图UI状态
 * @export
 * @interface IChartExpViewState
 * @extends {IExpViewState}
 * @extends {IApiChartExpViewState}
 */
export interface IChartExpViewState
  extends IExpViewState,
    IApiChartExpViewState {}
