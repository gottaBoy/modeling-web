import { ChartType, IBIReportChartController } from '../interface';
import { GaugeConverter } from './gauge-converter';
import { MultiSeriesBarConverter } from './multi-seriesbar-converter';
import { MultiSeriesLineConverter } from './multi-seriesline-converter';
import { MultiSeriesColConverter } from './multi-series-col-converter';
import { PieConverter } from './pie-converter';
import { ScatterConverter } from './scatter-converter';
import { StackColConverter } from './stackcol-converter';
import { ZoneColConverter } from './zonecol-converter';
import { StackBarConverter } from './stackbar-converter';
import { AreaConverter } from './area-converter';
import { ZoneLineConverter } from './zoneline-converter';
import { RadarConverter } from './radar-converter';
import { NumberConverter } from './number-converter';
import { CrossTableConverter } from './cross-table-converter';
import { TableConverter } from './table-converter';
export declare class ConverterFactory {
    static createConverter(chartType: ChartType, controller: IBIReportChartController): GaugeConverter | MultiSeriesBarConverter | MultiSeriesLineConverter | MultiSeriesColConverter | PieConverter | ScatterConverter | StackColConverter | ZoneColConverter | StackBarConverter | AreaConverter | ZoneLineConverter | RadarConverter | NumberConverter | CrossTableConverter | TableConverter | undefined;
}
