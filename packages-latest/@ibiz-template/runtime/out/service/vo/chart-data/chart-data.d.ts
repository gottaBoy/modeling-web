import { IDEChartSeries } from '@ibiz/model-core';
import { IChartData } from '../../../interface';
export declare class ChartData implements IChartData {
    private deData;
    private seriesModel?;
    [key: string | symbol]: any;
    _seriesModelId?: string;
    _catalog?: string;
    _groupName?: string;
    _uuid?: string;
    _chartid?: string;
    _catalogLevelData?: IData[];
    constructor(deData: IData, seriesModel?: IDEChartSeries | undefined, catalog?: string, groupName?: string, chartId?: string, catalogLevelData?: IData[]);
    /**
     * @description 预定义导航参数
     * @returns {*}  {IData}
     * @memberof ChartData
     */
    get navParams(): IData;
}
//# sourceMappingURL=chart-data.d.ts.map