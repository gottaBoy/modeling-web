import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 图表导航栏适配器
 *
 * @export
 * @class ChartExpBarProvider
 * @implements {IControlProvider}
 */
export class ChartExpBarProvider implements IControlProvider {
  component: string = 'IBizChartExpBarControl';
}
