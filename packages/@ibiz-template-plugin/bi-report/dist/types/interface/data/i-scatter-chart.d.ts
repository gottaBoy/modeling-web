import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';
export interface IScatterData {
    caption: string;
    data: {
        measure: IAppBICubeMeasureData[] | undefined;
        dimension: IAppBICubeDimensionData[] | undefined;
        filter: IAppBICubeDimensionData[] | undefined;
    };
    style: {
        graphics: {
            colorScheme: 'default' | 'template';
            color: string[];
        };
        xAxis: {
            show: true;
            showTitle: boolean;
            titleFont: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            showLabel: boolean;
            labelFont: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            showAxisline: boolean;
            axisline: {
                borderSize: number;
                borderStyle: 'solid' | 'dashed' | 'doubleDashed';
                color: string;
            };
            showGridline: boolean;
            gridline: {
                borderSize: number;
                borderStyle: 'solid' | 'dashed' | 'doubleDashed';
                color: string;
            };
            enableLabelInterval: boolean;
            labelInterval: number;
        };
        yAxis: {
            show: true;
            showTitle: boolean;
            titleFont: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            showLabel: boolean;
            labelFont: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            showAxisline: boolean;
            axisline: {
                borderSize: number;
                borderStyle: 'solid' | 'dashed' | 'doubleDashed';
                color: string;
            };
            showGridline: boolean;
            gridline: {
                borderSize: number;
                borderStyle: 'solid' | 'dashed' | 'doubleDashed';
                color: string;
            };
        };
        label: {
            show: boolean;
            font: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            scope: 'all' | 'max_min';
        };
        legend: {
            show: boolean;
            font: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
            position: 'left-top' | 'top' | 'right-top' | 'left-bottom' | 'bottom' | 'right-bottom' | 'left' | 'right';
        };
    };
    extend: IData;
}
