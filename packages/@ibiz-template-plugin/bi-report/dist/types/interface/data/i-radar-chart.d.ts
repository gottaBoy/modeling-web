import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';
export interface IRadarData {
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
