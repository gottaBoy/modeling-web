import { IDEChartSeries } from '@ibiz/model-core';
import { IChartData } from '../../../interface';
export declare class ChartData implements IChartData {
    [key: string | symbol]: any;
    _seriesModelId?: string;
    _catalog?: string;
    _groupName?: string;
    _uuid?: string;
    _chartid?: string;
    _catalogLevelData?: IData[];
    constructor(deData: IData, seriesModel?: IDEChartSeries, catalog?: string, groupName?: string, chartId?: string, catalogLevelData?: IData[]);
}
//# sourceMappingURL=chart-data.d.ts.map