import { IDEChart } from '@ibiz/model-core';
import { IChartEvent } from '../../event';
import { IChartState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 图表控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IChartController
 * @extends {IMDControlController}
 */
export interface IChartController extends IMDControlController<IDEChart, IChartState, IChartEvent> {
    /**
     * 刷新图表的大小
     * @author lxm
     * @date 2023-06-09 09:37:25
     */
    resizeChart(): void;
}
//# sourceMappingURL=i-chart.controller.d.ts.map